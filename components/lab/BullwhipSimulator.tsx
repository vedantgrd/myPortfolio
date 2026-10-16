'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { RotateCcw, Users, Store, Warehouse, Factory, Zap } from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Types & config                                                      */
/* ------------------------------------------------------------------ */

type SeriesKey = 'Customer Demand' | 'Retailer Order' | 'Wholesaler Order' | 'Factory Production'

interface DataPoint {
  week: string
  'Customer Demand': number
  'Retailer Order': number
  'Wholesaler Order': number
  'Factory Production': number
}

const SERIES_META: {
  key: SeriesKey
  short: string
  color: string
  icon: typeof Users
}[] = [
    { key: 'Customer Demand', short: 'Demand', color: '#9fb0c8', icon: Users },
    { key: 'Retailer Order', short: 'Retailer', color: '#10b981', icon: Store },
    { key: 'Wholesaler Order', short: 'Wholesaler', color: '#f59e0b', icon: Warehouse },
    { key: 'Factory Production', short: 'Factory', color: '#3b68ff', icon: Factory },
  ]

const SHOCK_WEEK_INDEX = 4

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/* ------------------------------------------------------------------ */
/* Hooks & small building blocks                                       */
/* ------------------------------------------------------------------ */

/** Measures an element's content width so SVG/graphics can adapt to any screen. */
function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    setWidth(el.getBoundingClientRect().width)
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return [ref, width] as const
}

function AnimatedNumber({
  value,
  decimals = 0,
  suffix = '',
}: {
  value: number
  decimals?: number
  suffix?: string
}) {
  const mv = useMotionValue(value)
  const text = useTransform(mv, (v) => `${v.toFixed(decimals)}${suffix}`)

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.9, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [value, mv])

  return <motion.span>{text}</motion.span>
}

function GlowSlider({
  label,
  valueLabel,
  color,
  min,
  max,
  step,
  value,
  onChange,
  marks,
}: {
  label: string
  valueLabel: string
  color: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  marks: string[]
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="min-w-0 rounded-lg border border-[#1f242e] bg-[#090a0d] p-3.5 transition-colors hover:border-[#38404f] sm:p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="min-w-0 truncate text-[#8b949e]">{label}</span>
        <span className="shrink-0 font-bold tabular-nums" style={{ color, textShadow: `0 0 14px ${color}88` }}>
          {valueLabel}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="bw-range mt-3 w-full cursor-pointer"
        style={{ ['--p' as string]: `${pct}%`, ['--c' as string]: color }}
      />
      <div className="mt-2 flex justify-between gap-1 text-[9px] text-[#6b7280] sm:text-[10px]">
        {marks.map((m) => (
          <span key={m} className="whitespace-nowrap">
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tier pipeline: sizes from its measured width, so it always fits     */
/* ------------------------------------------------------------------ */

function TierPipeline({
  point,
  maxVal,
  factoryColor,
  weekLabel,
  hidden,
}: {
  point: DataPoint
  maxVal: number
  factoryColor: string
  weekLabel: string
  hidden: Set<SeriesKey>
}) {
  const [rowRef, rowW] = useElementWidth<HTMLDivElement>()
  const demand = point['Customer Demand']

  const compact = rowW > 0 && rowW < 460
  const colW = rowW === 0 ? 100 : compact ? Math.floor(rowW * 0.22) : clamp(Math.floor(rowW * 0.17), 90, 120)
  const maxNode = clamp(colW - 6, 38, 92)
  const minNode = Math.round(maxNode * 0.55)

  return (
    <div className="min-w-0 rounded-lg border border-[#1f242e] bg-[#090a0d] p-3.5 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px]">
        <span className="text-[#8b949e]">
          ORDER FLOW<span className="hidden sm:inline"> · UPSTREAM PROPAGATION</span>
        </span>
        <span className="whitespace-nowrap rounded-full border border-[#232832] bg-[#14171d] px-2 py-0.5 text-[#f2eee6]">
          {weekLabel}
        </span>
      </div>

      <div ref={rowRef} className="flex items-start justify-between">
        {SERIES_META.map((s, i) => {
          const color = s.key === 'Factory Production' ? factoryColor : s.color
          const v = point[s.key]
          const size = Math.round(minNode + (v / maxVal) * (maxNode - minNode))
          const ratio = v / Math.max(1, demand)
          const Icon = s.icon
          const dim = hidden.has(s.key)
          return (
            <div key={s.key} className="flex min-w-0 flex-1 items-start last:flex-none">
              <div
                className="flex shrink-0 flex-col items-center transition-opacity"
                style={{ width: colW, opacity: dim ? 0.3 : 1 }}
              >
                <div className="flex items-center justify-center" style={{ height: maxNode }}>
                  <motion.div
                    animate={{ width: size, height: size }}
                    transition={{ type: 'spring', stiffness: 140, damping: 16 }}
                    className="relative flex items-center justify-center rounded-full"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, ${color}55, ${color}12 70%)`,
                      border: `1.5px solid ${color}`,
                      boxShadow: `0 0 ${10 + ratio * 8}px ${color}55, inset 0 0 14px ${color}33`,
                    }}
                  >
                    <span
                      className="absolute inset-0 animate-ping rounded-full opacity-20"
                      style={{ border: `1px solid ${color}` }}
                    />
                    <Icon style={{ color, width: Math.round(size * 0.36), height: Math.round(size * 0.36) }} />
                  </motion.div>
                </div>

                <div
                  className="mt-1 max-w-full truncate font-mono text-[9px] uppercase tracking-tight sm:text-[10px] sm:tracking-wider"
                  style={{ color }}
                >
                  {s.short}
                </div>
                <div className="font-mono text-xs font-bold tabular-nums text-white sm:text-sm">
                  <AnimatedNumber value={v} />
                </div>
                <div className="whitespace-nowrap font-mono text-[9px] tabular-nums text-[#6b7280] sm:text-[10px]">
                  {i === 0 ? 'base' : `×${ratio.toFixed(2)}`}
                </div>
              </div>

              {i < SERIES_META.length - 1 && (
                <div className="flex min-w-[4px] flex-1 items-center px-0.5 sm:px-1" style={{ height: maxNode }}>
                  <div className="bw-flow h-[2px] w-full rounded-full opacity-80" style={{ ['--c' as string]: color }} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Chart: real-pixel SVG that re-lays itself out for every width       */
/* ------------------------------------------------------------------ */

function InteractiveBullwhipChart({
  data,
  maxVal,
  hoveredIndex,
  setHoveredIndex,
  hidden,
  factoryColor,
}: {
  data: DataPoint[]
  maxVal: number
  hoveredIndex: number | null
  setHoveredIndex: (i: number | null) => void
  hidden: Set<SeriesKey>
  factoryColor: string
}) {
  const reduce = useReducedMotion()
  const [boxRef, measured] = useElementWidth<HTMLDivElement>()

  const width = measured || 0
  const compact = width > 0 && width < 520
  const height = compact
    ? clamp(Math.round(width * 0.62), 210, 300)
    : clamp(Math.round(width * 0.425), 260, 360)

  const padLeft = compact ? 32 : 45
  const padRight = compact ? 14 : 25
  const padTop = compact ? 22 : 25
  const padBottom = compact ? 28 : 35
  const plotW = Math.max(1, width - padLeft - padRight)
  const plotH = height - padTop - padBottom
  const font = compact ? 9 : 10

  const getX = (i: number) => padLeft + (i / (data.length - 1)) * plotW
  const getY = (v: number) => padTop + plotH - (v / maxVal) * plotH

  const makePath = (key: SeriesKey) =>
    data.reduce((acc, curr, i) => {
      const x = getX(i)
      const y = getY(curr[key])
      if (i === 0) return `M ${x} ${y}`
      const px = getX(i - 1)
      const py = getY(data[i - 1][key])
      const cx = px + (x - px) / 2
      return `${acc} C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`
    }, '')

  const colorOf = (k: SeriesKey) =>
    k === 'Factory Production' ? factoryColor : SERIES_META.find((s) => s.key === k)!.color

  const factoryPath = makePath('Factory Production')
  const areaPath = `${factoryPath} L ${getX(data.length - 1)} ${padTop + plotH} L ${getX(0)} ${padTop + plotH} Z`

  const gridSteps = 4
  const stepVal = Math.round(maxVal / gridSteps)
  const yGrid = Array.from({ length: gridSteps + 1 }, (_, i) => i * stepVal)

  // Fewer x labels on narrow screens so nothing collides
  const xStep = compact ? 4 : 2

  const tip = hoveredIndex !== null ? data[hoveredIndex] : null
  const tipX = hoveredIndex !== null ? getX(hoveredIndex) : 0

  return (
    <div
      ref={boxRef}
      className="relative w-full cursor-crosshair select-none overflow-hidden rounded-lg border border-[#1f242e] bg-[#0d0f12]"
      style={{ height: width ? height : 260, touchAction: 'pan-y' }}
      onPointerMove={(e) => {
        if (!width) return
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const idx = Math.round(((x - padLeft) / plotW) * (data.length - 1))
        setHoveredIndex(clamp(idx, 0, data.length - 1))
      }}
      onPointerLeave={() => setHoveredIndex(null)}
    >
      {width > 0 && (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block">
          <defs>
            <linearGradient id="bw-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={factoryColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={factoryColor} stopOpacity="0" />
            </linearGradient>
            <filter id="bw-glow" x="-20%" y="-30%" width="140%" height="160%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="bw-glow-soft" x="-20%" y="-30%" width="140%" height="160%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="bw-plot">
              <rect x={padLeft} y={padTop - 6} width={plotW} height={plotH + 12} />
            </clipPath>
          </defs>

          {/* Grid */}
          {yGrid.map((val) => {
            const y = getY(val)
            return (
              <g key={val}>
                <line x1={padLeft} y1={y} x2={width - padRight} y2={y} stroke="#ffffff" strokeOpacity="0.07" strokeDasharray="4 4" />
                <text x={padLeft - 6} y={y + 3.5} fill="#6b7280" fontSize={font} fontFamily="monospace" textAnchor="end">
                  {val}
                </text>
              </g>
            )
          })}

          {/* X-axis labels */}
          {data.map((d, i) =>
            (i + 1) % xStep === 0 ? (
              <text key={d.week} x={getX(i)} y={height - 10} fill="#6b7280" fontSize={font} fontFamily="monospace" textAnchor="middle">
                {compact ? d.week.replace('Wk ', '') : d.week}
              </text>
            ) : null
          )}
          {compact && (
            <text x={padLeft - 6} y={height - 10} fill="#4b5563" fontSize={8} fontFamily="monospace" textAnchor="end">
              WK
            </text>
          )}

          {/* Shock event */}
          <line
            x1={getX(SHOCK_WEEK_INDEX)}
            y1={padTop}
            x2={getX(SHOCK_WEEK_INDEX)}
            y2={padTop + plotH}
            stroke="#ff4d5e"
            strokeOpacity="0.45"
            strokeDasharray="3 4"
          />
          {!reduce &&
            [0, 1, 2].map((i) => (
              <circle key={i} cx={getX(SHOCK_WEEK_INDEX)} cy={padTop + plotH} r="4" fill="none" stroke="#ff4d5e" strokeWidth="1.2">
                <animate attributeName="r" values={`4;${compact ? 24 : 34}`} dur="3s" begin={`${i}s`} repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.7;0" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
              </circle>
            ))}
          <circle cx={getX(SHOCK_WEEK_INDEX)} cy={padTop + plotH} r="3.5" fill="#ff4d5e" filter="url(#bw-glow-soft)" />
          <text
            x={getX(SHOCK_WEEK_INDEX) + 6}
            y={padTop + 11}
            fill="#ff4d5e"
            fontSize={compact ? 8 : 9}
            fontFamily="monospace"
            letterSpacing={compact ? 0.4 : 1.2}
            fillOpacity="0.9"
          >
            {compact ? '⚡ WK 5' : '⚡ SHOCK · WK 5'}
          </text>

          <g clipPath="url(#bw-plot)">
            {!hidden.has('Factory Production') && (
              <motion.path
                d={areaPath}
                fill="url(#bw-area)"
                initial={{ opacity: 0 }}
                animate={{ d: areaPath, opacity: 1 }}
                transition={{ d: { type: 'spring', stiffness: 90, damping: 18 }, opacity: { duration: 1.2 } }}
              />
            )}

            {SERIES_META.map((s, i) => {
              if (hidden.has(s.key)) return null
              const d = makePath(s.key)
              const isFactory = s.key === 'Factory Production'
              const isDemand = s.key === 'Customer Demand'
              return (
                <motion.path
                  key={s.key}
                  id={isFactory ? 'bw-factory-path' : undefined}
                  fill="none"
                  stroke={colorOf(s.key)}
                  strokeWidth={compact ? (isFactory ? 2.8 : 2) : isFactory ? 3.5 : isDemand ? 2 : 2.5}
                  strokeLinecap="round"
                  strokeDasharray={isDemand ? '5 5' : undefined}
                  filter={isFactory ? 'url(#bw-glow)' : 'url(#bw-glow-soft)'}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ d, pathLength: 1, opacity: 1 }}
                  transition={{
                    d: { type: 'spring', stiffness: 90, damping: 18 },
                    pathLength: { duration: 1.6, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.4, delay: i * 0.18 },
                  }}
                />
              )
            })}

            {!reduce &&
              !hidden.has('Factory Production') &&
              [0, 2, 4].map((b) => (
                <circle key={b} r="3.2" fill="#fff" filter="url(#bw-glow)">
                  <animateMotion dur="6s" begin={`${b}s`} repeatCount="indefinite">
                    <mpath href="#bw-factory-path" />
                  </animateMotion>
                </circle>
              ))}
          </g>

          {/* Scrubber */}
          {hoveredIndex !== null && tip && (
            <g>
              <line x1={tipX} y1={padTop} x2={tipX} y2={padTop + plotH} stroke="#fff" strokeOpacity="0.55" strokeDasharray="2 3" />
              {SERIES_META.map((s) =>
                hidden.has(s.key) ? null : (
                  <g key={s.key}>
                    <circle cx={tipX} cy={getY(tip[s.key])} r="9" fill={colorOf(s.key)} opacity="0.2" />
                    <circle cx={tipX} cy={getY(tip[s.key])} r={s.key === 'Factory Production' ? 5.5 : 4} fill={colorOf(s.key)} stroke="#090a0d" strokeWidth="2" />
                  </g>
                )
              )}
            </g>
          )}
        </svg>
      )}

      {/* Tooltip: flips sides so it never leaves the chart */}
      <AnimatePresence>
        {tip && width > 0 && (
          <motion.div
            key="tip"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute top-2 z-10 rounded-lg border border-[#2d3442] bg-[#14171d]/95 p-2 font-mono text-[10px] shadow-2xl sm:top-3 sm:min-w-[150px] sm:p-2.5 sm:text-[11px]"
            style={{
              left: tipX,
              transform: tipX > width * 0.55 ? 'translateX(calc(-100% - 12px))' : 'translateX(12px)',
            }}
          >
            <div className="mb-1 flex items-center gap-1.5 font-bold text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: factoryColor }} />
              {tip.week}
            </div>
            {SERIES_META.map((s) => (
              <div key={s.key} className="flex items-center justify-between gap-3" style={{ opacity: hidden.has(s.key) ? 0.3 : 1 }}>
                <span style={{ color: colorOf(s.key) }}>{s.short}</span>
                <strong className="tabular-nums text-white">{tip[s.key]}</strong>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main simulator                                                      */
/* ------------------------------------------------------------------ */

export function BullwhipSimulator() {
  const reduce = useReducedMotion()
  const [demandShock, setDemandShock] = useState(20)
  const [leadTimeWeeks, setLeadTimeWeeks] = useState(3)
  const [agentCoordination, setAgentCoordination] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hidden, setHidden] = useState<Set<SeriesKey>>(new Set())
  const [resetSpin, setResetSpin] = useState(0)

  const factoryColor = agentCoordination ? '#4d7cff' : '#ff4d5e'

  const simulationData = useMemo<DataPoint[]>(() => {
    const data: DataPoint[] = []
    const baseline = 100

    for (let t = 1; t <= 20; t++) {
      const shockEffect = t >= 5 ? demandShock : 0
      const noise = Math.sin(t * 0.8) * 3
      const customerDemand = Math.round(baseline + shockEffect + noise)

      const lag = leadTimeWeeks * 0.4
      const naiveMultiplier = 1 + leadTimeWeeks * 0.35
      const agentMultiplier = 1 + leadTimeWeeks * 0.12

      const retailerOscillation = agentCoordination
        ? Math.round(baseline + shockEffect * 1.1 + noise * 1.2)
        : Math.round(baseline + shockEffect * 1.35 + noise * 1.8)

      const wholesalerPhase = Math.max(1, t - Math.round(lag))
      const wShock = wholesalerPhase >= 5 ? demandShock : 0
      const wholesalerOrder = agentCoordination
        ? Math.round(baseline + wShock * (1 + agentMultiplier * 0.4) + Math.sin(t) * 4)
        : Math.round(baseline + wShock * (1 + naiveMultiplier * 0.7) + Math.sin(t) * 9)

      const factoryPhase = Math.max(1, t - Math.round(lag * 2))
      const fShock = factoryPhase >= 5 ? demandShock : 0
      const factoryOrder = agentCoordination
        ? Math.round(baseline + fShock * (1 + agentMultiplier * 0.8) + Math.sin(t * 0.9) * 6)
        : Math.round(baseline + fShock * (1 + naiveMultiplier * 1.6) + Math.sin(t * 0.9) * 18)

      data.push({
        week: `Wk ${t}`,
        'Customer Demand': customerDemand,
        'Retailer Order': Math.max(20, retailerOscillation),
        'Wholesaler Order': Math.max(10, wholesalerOrder),
        'Factory Production': Math.max(0, factoryOrder),
      })
    }
    return data
  }, [demandShock, leadTimeWeeks, agentCoordination])

  const maxFactory = Math.max(...simulationData.map((d) => d['Factory Production']))
  const maxDemand = Math.max(...simulationData.map((d) => d['Customer Demand']))
  const amplification = maxFactory / maxDemand
  const maxVal = Math.max(200, Math.ceil(maxFactory / 40) * 40)

  const peakIndex = simulationData.findIndex((d) => d['Factory Production'] === maxFactory)
  const activeIndex = hoveredIndex ?? peakIndex
  const activePoint = simulationData[activeIndex]

  const critical = amplification > 2.2
  const ampBad = amplification > 2.0

  const toggleSeries = (k: SeriesKey) =>
    setHidden((prev) => {
      const n = new Set(prev)
      if (n.has(k)) n.delete(k)
      else n.add(k)
      return n
    })

  const reset = () => {
    setDemandShock(20)
    setLeadTimeWeeks(3)
    setAgentCoordination(true)
    setResetSpin((s) => s + 1)
  }

  // Shared classes so every metric card behaves the same at every width
  const metricCard = 'flex min-w-0 flex-col rounded border border-[#1f242e] bg-[#090a0d] p-3 sm:p-3.5'
  const metricLabel = 'block text-[9px] leading-tight text-[#8b949e] sm:text-[10px]'
  const metricValue = 'mt-1 block whitespace-nowrap text-lg font-bold leading-none sm:text-xl lg:text-2xl'
  const metricFoot = 'mt-auto block pt-2 text-[9px] leading-tight text-[#6b7280] sm:text-[10px]'

  return (
    <div className="relative w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-[#232832] bg-[#14171d] p-4 sm:p-6 lg:p-8">
      <style>{`
        .bw-range { -webkit-appearance: none; appearance: none; height: 6px; border-radius: 999px; outline: none;
          background: linear-gradient(90deg, var(--c) var(--p), rgba(255,255,255,0.09) var(--p)); }
        .bw-range::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%;
          background: #fff; border: 3px solid var(--c); box-shadow: 0 0 0 4px color-mix(in srgb, var(--c) 25%, transparent), 0 0 16px var(--c);
          transition: transform .15s ease; }
        .bw-range::-webkit-slider-thumb:hover { transform: scale(1.2); }
        .bw-range::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 3px solid var(--c);
          box-shadow: 0 0 16px var(--c); }
        @media (pointer: coarse) {
          .bw-range { height: 8px; }
          .bw-range::-webkit-slider-thumb { width: 26px; height: 26px; }
          .bw-range::-moz-range-thumb { width: 22px; height: 22px; }
        }
        .bw-flow { background-image: repeating-linear-gradient(90deg, var(--c) 0 6px, transparent 6px 14px);
          background-size: 14px 100%; animation: bw-flow 0.9s linear infinite; }
        @keyframes bw-flow { to { background-position: 14px 0; } }
        @media (prefers-reduced-motion: reduce) { .bw-flow { animation: none; } }
      `}</style>

      {/* Subtle blueprint grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative space-y-5 sm:space-y-7">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-4 border-b border-[#232832] pb-5 sm:flex-row sm:items-center sm:pb-6"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] sm:text-xs">
              <span className="font-semibold text-[#3b68ff]">// EXPERIMENT 01</span>
              <span className="text-[#6b7280]">BULLWHIP AI SIMULATION ENGINE</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-2 py-0.5 text-[10px] text-[#10b981]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#10b981]" />
                LIVE
              </span>
            </div>
            <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-[#f2eee6] sm:text-xl">
              Supply Chain Demand Wave &amp; Oscillation Simulator
            </h3>
            <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-[#9ca3af]">
              Watch a small consumer shock whip upstream into the factory. Compare naive independent purchasing against decentralized agent coordination.
            </p>
          </div>

          <motion.button
            onClick={reset}
            whileTap={{ scale: 0.95 }}
            className="flex shrink-0 items-center gap-1.5 self-start rounded border border-[#232832] bg-[#090a0d] px-3 py-1.5 font-mono text-xs text-[#8b949e] transition-colors hover:border-[#38404f] hover:text-[#f2eee6]"
          >
            <motion.span animate={{ rotate: resetSpin * -360 }} transition={{ duration: 0.6, ease: 'easeInOut' }} className="inline-flex">
              <RotateCcw className="h-3 w-3" />
            </motion.span>
            Reset Baseline
          </motion.button>
        </motion.div>

        {/* Controls: 1 col phone, 2 col tablet (policy spans), 3 col desktop */}
        <div className="grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <GlowSlider
            label="Consumer Demand Shock"
            valueLabel={`+${demandShock}%`}
            color="#ff5a45"
            min={5}
            max={60}
            step={5}
            value={demandShock}
            onChange={setDemandShock}
            marks={['+5% Mild', '+30%', '+60% Severe']}
          />
          <GlowSlider
            label="Transit Lead Time Lag"
            valueLabel={`${leadTimeWeeks} Weeks`}
            color="#4d7cff"
            min={1}
            max={6}
            step={1}
            value={leadTimeWeeks}
            onChange={setLeadTimeWeeks}
            marks={['1 Wk Fast', '3 Wks', '6 Wks Sluggish']}
          />

          <div className="flex min-w-0 flex-col justify-between rounded-lg border border-[#1f242e] bg-[#090a0d] p-3.5 sm:col-span-2 sm:p-4 lg:col-span-1">
            <span className="text-[#8b949e]">Agent Coordination Policy</span>
            <div className="relative mt-3 flex rounded-lg border border-[#232832] bg-[#14171d] p-1">
              {[
                { v: false, label: 'Naive Local (s, S)', c: '#ef4444' },
                { v: true, label: 'Signal Dampened', c: '#10b981' },
              ].map((o) => {
                const on = agentCoordination === o.v
                return (
                  <button
                    key={o.label}
                    onClick={() => setAgentCoordination(o.v)}
                    aria-pressed={on}
                    className="relative z-10 min-w-0 flex-1 rounded-md px-1 py-2 text-center text-[10px] font-bold leading-tight transition-colors sm:text-[11px]"
                    style={{ color: on ? '#fff' : '#8b949e' }}
                  >
                    {on && (
                      <motion.span
                        layoutId="policyPill"
                        className="absolute inset-0 -z-10 rounded-md"
                        style={{ background: o.c, boxShadow: `0 0 16px ${o.c}66` }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {o.label}
                  </button>
                )
              })}
            </div>
            <span className="pt-2 text-[10px] text-[#6b7280]">
              {agentCoordination ? 'Multi-agent signal sharing active' : 'Siloed, panic-driven reordering'}
            </span>
          </div>
        </div>

        {/* Metrics: 2 cols on phone/tablet-portrait, 4 from md up */}
        <div className="grid grid-cols-2 gap-2.5 font-mono text-xs sm:gap-3 md:grid-cols-4">
          <div className={metricCard}>
            <span className={metricLabel}>AMPLIFICATION FACTOR</span>
            <span
              className={`${metricValue} tabular-nums transition-colors duration-500`}
              style={{ color: ampBad ? '#ff5a6a' : '#10b981', textShadow: `0 0 18px ${ampBad ? '#ff5a6a' : '#10b981'}66` }}
            >
              <AnimatedNumber value={amplification} decimals={2} suffix="x" />
            </span>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                animate={{ width: `${Math.min(100, (amplification / 4) * 100)}%`, backgroundColor: ampBad ? '#ff5a6a' : '#10b981' }}
                transition={{ type: 'spring', stiffness: 90, damping: 16 }}
              />
            </div>
            <span className={metricFoot}>Factory vs Consumer peak</span>
          </div>

          <div className={metricCard}>
            <span className={metricLabel}>POLICY STATE</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={String(agentCoordination)}
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.25 }}
                className={metricValue}
                style={{ color: agentCoordination ? '#10b981' : '#f59e0b', textShadow: `0 0 18px ${agentCoordination ? '#10b981' : '#f59e0b'}66` }}
              >
                {agentCoordination ? 'DAMPENED' : 'UNSTABLE'}
              </motion.span>
            </AnimatePresence>
            <span className={metricFoot}>{agentCoordination ? 'Variance reduced ~34%' : 'Unchecked oscillation'}</span>
          </div>

          <div className={metricCard}>
            <span className={metricLabel}>PEAK FACTORY ORDER</span>
            <span className={`${metricValue} tabular-nums text-[#f2eee6]`}>
              <AnimatedNumber value={maxFactory} />
              <span className="ml-1 text-[10px] font-normal text-[#6b7280] sm:text-xs">units</span>
            </span>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                animate={{ width: `${Math.min(100, (maxFactory / maxVal) * 100)}%`, backgroundColor: factoryColor }}
                transition={{ type: 'spring', stiffness: 90, damping: 16 }}
              />
            </div>
            <span className={metricFoot}>Baseline: 100 units</span>
          </div>

          <div
            className={`${metricCard} relative overflow-hidden transition-colors duration-500`}
            style={{ borderColor: critical ? 'rgba(255,90,106,0.45)' : '#1f242e' }}
          >
            {critical && !reduce && (
              <motion.span
                className="pointer-events-none absolute inset-0 bg-[#ff5a6a]"
                animate={{ opacity: [0.02, 0.1, 0.02] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            )}
            <span className={`${metricLabel} relative`}>PERISHABLE SPOILAGE RISK</span>
            <span
              className={`${metricValue} relative transition-colors duration-500`}
              style={{ color: critical ? '#ff5a6a' : '#10b981', textShadow: `0 0 18px ${critical ? '#ff5a6a' : '#10b981'}66` }}
            >
              {critical ? 'CRITICAL' : 'CONTROLLED'}
            </span>
            <span className={`${metricFoot} relative`}>Food inventory decay risk</span>
          </div>
        </div>

        {/* Pipeline */}
        <TierPipeline
          point={activePoint}
          maxVal={maxVal}
          factoryColor={factoryColor}
          weekLabel={hoveredIndex === null ? `${activePoint.week} · peak` : activePoint.week}
          hidden={hidden}
        />

        {/* Chart card */}
        <div className="min-w-0 space-y-3 rounded-lg border border-[#1f242e] bg-[#090a0d] p-3 sm:space-y-4 sm:p-6">
          <div className="flex flex-col justify-between gap-1.5 font-mono text-[11px] text-[#8b949e] sm:flex-row sm:items-center sm:text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10b981]" />
              </span>
              <span className="font-bold text-[#f2eee6]">
                TIME-SERIES<span className="hidden sm:inline"> SIMULATION</span> · 20 WEEKS
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px]">
              <span className="sm:hidden">Touch the chart to inspect tiers</span>
              <span className="hidden sm:inline">Hover or touch the chart to inspect every tier</span>
            </span>
          </div>

          <InteractiveBullwhipChart
            data={simulationData}
            maxVal={maxVal}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            hidden={hidden}
            factoryColor={factoryColor}
          />

          {/* Interactive legend */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 border-t border-[#1f242e] pt-3 font-mono text-[10px] sm:gap-2 sm:text-[11px]">
            {SERIES_META.map((s) => {
              const color = s.key === 'Factory Production' ? factoryColor : s.color
              const off = hidden.has(s.key)
              return (
                <button
                  key={s.key}
                  onClick={() => toggleSeries(s.key)}
                  aria-pressed={!off}
                  className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-all hover:bg-white/5 sm:gap-2 sm:px-3"
                  style={{
                    borderColor: off ? 'rgba(255,255,255,0.08)' : `${color}66`,
                    color: off ? '#4b5563' : color,
                    opacity: off ? 0.6 : 1,
                    textDecoration: off ? 'line-through' : 'none',
                  }}
                >
                  <span className="h-1.5 w-3 rounded sm:w-4" style={{ background: color, boxShadow: off ? 'none' : `0 0 8px ${color}` }} />
                  {s.key === 'Factory Production' ? `Factory (${agentCoordination ? 'Dampened' : 'Oscillating'})` : s.short}
                </button>
              )
            })}
          </div>
        </div>

        {/* Research note */}
        <div className="relative overflow-hidden rounded border border-[#232832] bg-[#0d0f12] p-3.5 text-xs sm:p-4">
          <span className="absolute left-0 top-0 h-full w-[3px]" style={{ background: factoryColor, boxShadow: `0 0 16px ${factoryColor}` }} />
          <span className="flex items-center gap-1.5 pl-2 font-mono text-[11px] font-bold text-[#6f8fff] sm:text-xs">
            <Zap className="h-3 w-3 shrink-0" />
            RESEARCH NOTE // BULLWHIP AI DYNAMICS
          </span>
          <p className="mt-1.5 pl-2 leading-relaxed text-[#cfd6e0]">
            In real food supply chains, the factory curve represents agricultural contracts or processing plants. When lead times are long and actors panic-order independently, orders overshoot actual demand by over 200%. The resulting surplus rots before consumption. Multi-agent demand dampening smooths the curve to the blue line.
          </p>
        </div>
      </div>
    </div>
  )
}