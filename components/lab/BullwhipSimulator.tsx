'use client'

import { useEffect, useMemo, useState } from 'react'
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

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

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
    <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-4 transition-colors hover:border-[#38404f]">
      <div className="flex items-center justify-between">
        <span className="text-[#8b949e]">{label}</span>
        <span className="font-bold tabular-nums" style={{ color, textShadow: `0 0 14px ${color}88` }}>
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
        className="bw-range mt-3 w-full cursor-pointer"
        style={{ ['--p' as string]: `${pct}%`, ['--c' as string]: color }}
      />
      <div className="mt-2 flex justify-between text-[10px] text-[#6b7280]">
        {marks.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tier pipeline: nodes breathe with the order volume                  */
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
  const demand = point['Customer Demand']
  return (
    <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between font-mono text-[11px]">
        <span className="text-[#8b949e]">ORDER FLOW · UPSTREAM PROPAGATION</span>
        <span className="rounded-full border border-[#232832] bg-[#14171d] px-2 py-0.5 text-[#f2eee6]">{weekLabel}</span>
      </div>

      <div className="flex items-center">
        {SERIES_META.map((s, i) => {
          const color = s.key === 'Factory Production' ? factoryColor : s.color
          const v = point[s.key]
          const size = 46 + (v / maxVal) * 46
          const ratio = v / Math.max(1, demand)
          const Icon = s.icon
          const dim = hidden.has(s.key)
          return (
            <div key={s.key} className="flex flex-1 items-center last:flex-none">
              <div className="flex w-[84px] shrink-0 flex-col items-center sm:w-[104px]" style={{ opacity: dim ? 0.3 : 1 }}>
                <div className="flex h-[96px] items-center justify-center">
                  <motion.div
                    animate={{ width: size, height: size }}
                    transition={{ type: 'spring', stiffness: 140, damping: 16 }}
                    className="relative flex items-center justify-center rounded-full"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, ${color}55, ${color}12 70%)`,
                      border: `1.5px solid ${color}`,
                      boxShadow: `0 0 ${12 + ratio * 10}px ${color}66, inset 0 0 18px ${color}33`,
                    }}
                  >
                    <span className="absolute inset-0 animate-ping rounded-full opacity-20" style={{ border: `1px solid ${color}` }} />
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color }} />
                  </motion.div>
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider" style={{ color }}>
                  {s.short}
                </div>
                <div className="font-mono text-sm font-bold tabular-nums text-white">
                  <AnimatedNumber value={v} />
                </div>
                <div className="font-mono text-[10px] tabular-nums text-[#6b7280]">
                  {i === 0 ? 'base signal' : `×${ratio.toFixed(2)}`}
                </div>
              </div>
              {i < SERIES_META.length - 1 && (
                <div className="bw-flow mx-1 h-[2px] flex-1 rounded-full opacity-80" style={{ ['--c' as string]: color }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Chart                                                               */
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

  const width = 800
  const height = 340
  const padLeft = 45
  const padRight = 25
  const padTop = 25
  const padBottom = 35
  const plotW = width - padLeft - padRight
  const plotH = height - padTop - padBottom

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

  const colorOf = (k: SeriesKey) => (k === 'Factory Production' ? factoryColor : SERIES_META.find((s) => s.key === k)!.color)

  const factoryPath = makePath('Factory Production')
  const areaPath = `${factoryPath} L ${getX(data.length - 1)} ${padTop + plotH} L ${getX(0)} ${padTop + plotH} Z`

  const gridSteps = 4
  const stepVal = Math.round(maxVal / gridSteps)
  const yGrid = Array.from({ length: gridSteps + 1 }, (_, i) => i * stepVal)

  const tip = hoveredIndex !== null ? data[hoveredIndex] : null
  const tipPct = hoveredIndex !== null ? (getX(hoveredIndex) / width) * 100 : 0

  return (
    <div
      className="relative aspect-[800/340] w-full cursor-crosshair select-none overflow-hidden rounded-lg border border-[#1f242e] bg-[#0d0f12]"
      style={{ touchAction: 'pan-y' }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const relX = (e.clientX - rect.left) / rect.width
        const idx = Math.round(((relX * width - padLeft) / plotW) * (data.length - 1))
        setHoveredIndex(Math.max(0, Math.min(data.length - 1, idx)))
      }}
      onPointerLeave={() => setHoveredIndex(null)}
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="relative h-full w-full">
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
              <text x={padLeft - 8} y={y + 3.5} fill="#6b7280" fontSize="10" fontFamily="monospace" textAnchor="end">
                {val}
              </text>
            </g>
          )
        })}

        {/* X-axis labels: Wk 2, 4, ... 20 (no crowding at the end) */}
        {data.map((d, i) =>
          i % 2 === 1 ? (
            <text key={d.week} x={getX(i)} y={height - 12} fill="#6b7280" fontSize="10" fontFamily="monospace" textAnchor="middle">
              {d.week}
            </text>
          ) : null
        )}

        {/* Shock event: beacon + ripples */}
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
              <animate attributeName="r" values="4;34" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.7;0" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
            </circle>
          ))}
        <circle cx={getX(SHOCK_WEEK_INDEX)} cy={padTop + plotH} r="3.5" fill="#ff4d5e" filter="url(#bw-glow-soft)" />
        <text x={getX(SHOCK_WEEK_INDEX) + 6} y={padTop + 12} fill="#ff4d5e" fontSize="9" fontFamily="monospace" letterSpacing="1.2" fillOpacity="0.9">
          ⚡ SHOCK · WK 5
        </text>

        <g clipPath="url(#bw-plot)">
          {/* Factory area */}
          {!hidden.has('Factory Production') && (
            <motion.path
              d={areaPath}
              fill="url(#bw-area)"
              initial={{ opacity: 0 }}
              animate={{ d: areaPath, opacity: 1 }}
              transition={{ d: { type: 'spring', stiffness: 90, damping: 18 }, opacity: { duration: 1.2 } }}
            />
          )}

          {/* Lines: morph smoothly when sliders change */}
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
                strokeWidth={isFactory ? 3.5 : isDemand ? 2 : 2.5}
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

          {/* Data packets riding the factory curve */}
          {!reduce && !hidden.has('Factory Production') &&
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
            <line x1={getX(hoveredIndex)} y1={padTop} x2={getX(hoveredIndex)} y2={padTop + plotH} stroke="#fff" strokeOpacity="0.55" strokeDasharray="2 3" />
            {SERIES_META.map((s) =>
              hidden.has(s.key) ? null : (
                <g key={s.key}>
                  <circle cx={getX(hoveredIndex)} cy={getY(tip[s.key])} r="9" fill={colorOf(s.key)} opacity="0.2" />
                  <circle cx={getX(hoveredIndex)} cy={getY(tip[s.key])} r={s.key === 'Factory Production' ? 5.5 : 4} fill={colorOf(s.key)} stroke="#090a0d" strokeWidth="2" />
                </g>
              )
            )}
          </g>
        )}
      </svg>

      {/* Floating tooltip */}
      <AnimatePresence>
        {tip && (
          <motion.div
            key="tip"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute top-3 z-10 min-w-[150px] rounded-lg border border-[#2d3442] bg-[#14171d]/95 p-2.5 font-mono text-[11px] shadow-2xl"
            style={{
              left: `${tipPct}%`,
              transform: tipPct > 62 ? 'translateX(calc(-100% - 14px))' : 'translateX(14px)',
            }}
          >
            <div className="mb-1.5 flex items-center gap-1.5 font-bold text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: factoryColor }} />
              {tip.week}
            </div>
            {SERIES_META.map((s) => (
              <div key={s.key} className="flex items-center justify-between gap-4" style={{ opacity: hidden.has(s.key) ? 0.3 : 1 }}>
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

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#232832] bg-[#14171d] p-6 lg:p-8">
      {/* Scoped CSS: sliders and flow lines */}
      <style>{`
        .bw-range { -webkit-appearance: none; appearance: none; height: 6px; border-radius: 999px; outline: none;
          background: linear-gradient(90deg, var(--c) var(--p), rgba(255,255,255,0.09) var(--p)); }
        .bw-range::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%;
          background: #fff; border: 3px solid var(--c); box-shadow: 0 0 0 4px color-mix(in srgb, var(--c) 25%, transparent), 0 0 16px var(--c);
          transition: transform .15s ease; }
        .bw-range::-webkit-slider-thumb:hover { transform: scale(1.2); }
        .bw-range::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 3px solid var(--c);
          box-shadow: 0 0 16px var(--c); }
        .bw-flow { background-image: repeating-linear-gradient(90deg, var(--c) 0 6px, transparent 6px 14px);
          background-size: 14px 100%; animation: bw-flow 0.9s linear infinite; }
        @keyframes bw-flow { to { background-position: 14px 0; } }
        @media (prefers-reduced-motion: reduce) { .bw-flow { animation: none; } }
      `}</style>

      {/* Subtle blueprint grid only: no colored glows */}
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

      <div className="relative space-y-7">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-4 border-b border-[#232832] pb-6 sm:flex-row sm:items-center"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="font-semibold text-[#3b68ff]">// EXPERIMENT 01</span>
              <span className="text-[#6b7280]">BULLWHIP AI SIMULATION ENGINE</span>
              <span className="ml-1 inline-flex items-center gap-1 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-2 py-0.5 text-[10px] text-[#10b981]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#10b981]" />
                LIVE
              </span>
            </div>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-[#f2eee6]">
              Supply Chain Demand Wave & Oscillation Simulator
            </h3>
            <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-[#9ca3af]">
              Watch a small consumer shock whip upstream into the factory. Compare naive independent purchasing against decentralized agent coordination.
            </p>
          </div>

          <motion.button
            onClick={reset}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 self-start rounded border border-[#232832] bg-[#090a0d] px-3 py-1.5 font-mono text-xs text-[#8b949e] transition-colors hover:border-[#38404f] hover:text-[#f2eee6]"
          >
            <motion.span animate={{ rotate: resetSpin * -360 }} transition={{ duration: 0.6, ease: 'easeInOut' }} className="inline-flex">
              <RotateCcw className="h-3 w-3" />
            </motion.span>
            Reset Baseline
          </motion.button>
        </motion.div>

        {/* Controls */}
        <div className="grid grid-cols-1 gap-4 font-mono text-xs md:grid-cols-3">
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

          <div className="flex flex-col justify-between rounded-lg border border-[#1f242e] bg-[#090a0d] p-4">
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
                    className="relative z-10 flex-1 rounded-md py-2 text-center text-[11px] font-bold transition-colors"
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

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 font-mono text-xs sm:grid-cols-4">
          {/* Amplification */}
          <div className="rounded border border-[#1f242e] bg-[#090a0d] p-3.5">
            <span className="block text-[10px] text-[#8b949e]">AMPLIFICATION FACTOR</span>
            <span
              className="block text-2xl font-bold tabular-nums transition-colors duration-500"
              style={{ color: ampBad ? '#ff5a6a' : '#10b981', textShadow: `0 0 18px ${ampBad ? '#ff5a6a' : '#10b981'}66` }}
            >
              <AnimatedNumber value={amplification} decimals={2} suffix="x" />
            </span>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                animate={{ width: `${Math.min(100, (amplification / 4) * 100)}%`, backgroundColor: ampBad ? '#ff5a6a' : '#10b981' }}
                transition={{ type: 'spring', stiffness: 90, damping: 16 }}
              />
            </div>
            <span className="mt-1 block text-[10px] text-[#6b7280]">Factory vs Consumer peak</span>
          </div>

          {/* Policy state */}
          <div className="rounded border border-[#1f242e] bg-[#090a0d] p-3.5">
            <span className="block text-[10px] text-[#8b949e]">POLICY STATE</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={String(agentCoordination)}
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.25 }}
                className="block text-2xl font-bold"
                style={{ color: agentCoordination ? '#10b981' : '#f59e0b', textShadow: `0 0 18px ${agentCoordination ? '#10b981' : '#f59e0b'}66` }}
              >
                {agentCoordination ? 'DAMPENED' : 'UNSTABLE'}
              </motion.span>
            </AnimatePresence>
            <span className="mt-[14px] block text-[10px] text-[#6b7280]">
              {agentCoordination ? 'Variance reduced ~34%' : 'Unchecked oscillation'}
            </span>
          </div>

          {/* Peak */}
          <div className="rounded border border-[#1f242e] bg-[#090a0d] p-3.5">
            <span className="block text-[10px] text-[#8b949e]">PEAK FACTORY ORDER</span>
            <span className="block text-2xl font-bold tabular-nums text-[#f2eee6]">
              <AnimatedNumber value={maxFactory} />
              <span className="ml-1 text-xs font-normal text-[#6b7280]">units</span>
            </span>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                animate={{ width: `${Math.min(100, (maxFactory / maxVal) * 100)}%`, backgroundColor: factoryColor }}
                transition={{ type: 'spring', stiffness: 90, damping: 16 }}
              />
            </div>
            <span className="mt-1 block text-[10px] text-[#6b7280]">Baseline: 100 units</span>
          </div>

          {/* Spoilage */}
          <div
            className="relative overflow-hidden rounded border bg-[#090a0d] p-3.5 transition-colors duration-500"
            style={{ borderColor: critical ? 'rgba(255,90,106,0.45)' : '#1f242e' }}
          >
            {critical && !reduce && (
              <motion.span
                className="pointer-events-none absolute inset-0 bg-[#ff5a6a]"
                animate={{ opacity: [0.02, 0.1, 0.02] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            )}
            <span className="relative block text-[10px] text-[#8b949e]">PERISHABLE SPOILAGE RISK</span>
            <span
              className="relative block text-2xl font-bold transition-colors duration-500"
              style={{ color: critical ? '#ff5a6a' : '#10b981', textShadow: `0 0 18px ${critical ? '#ff5a6a' : '#10b981'}66` }}
            >
              {critical ? 'CRITICAL' : 'CONTROLLED'}
            </span>
            <span className="relative mt-[14px] block text-[10px] text-[#6b7280]">Food inventory decay risk</span>
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
        <div className="space-y-4 rounded-lg border border-[#1f242e] bg-[#090a0d] p-4 sm:p-6">
          <div className="flex flex-col justify-between gap-2 font-mono text-xs text-[#8b949e] sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10b981]" />
              </span>
              <span className="font-bold text-[#f2eee6]">TIME-SERIES SIMULATION · 20 WEEKS</span>
            </div>
            <span className="text-[11px]">Hover or touch the chart to inspect every tier</span>
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
          <div className="flex flex-wrap items-center justify-center gap-2 border-t border-[#1f242e] pt-3 font-mono text-[11px]">
            {SERIES_META.map((s) => {
              const color = s.key === 'Factory Production' ? factoryColor : s.color
              const off = hidden.has(s.key)
              return (
                <button
                  key={s.key}
                  onClick={() => toggleSeries(s.key)}
                  className="flex items-center gap-2 rounded-full border px-3 py-1 transition-all hover:bg-white/5"
                  style={{
                    borderColor: off ? 'rgba(255,255,255,0.08)' : `${color}66`,
                    color: off ? '#4b5563' : color,
                    opacity: off ? 0.6 : 1,
                    textDecoration: off ? 'line-through' : 'none',
                  }}
                >
                  <span className="h-1.5 w-4 rounded" style={{ background: color, boxShadow: off ? 'none' : `0 0 8px ${color}` }} />
                  {s.key === 'Factory Production' ? `Factory (${agentCoordination ? 'Dampened' : 'Oscillating'})` : s.short}
                </button>
              )
            })}
          </div>
        </div>

        {/* Research note */}
        <div className="relative overflow-hidden rounded border border-[#232832] bg-[#0d0f12] p-4 text-xs">
          <span className="absolute left-0 top-0 h-full w-[3px]" style={{ background: factoryColor, boxShadow: `0 0 16px ${factoryColor}` }} />
          <span className="flex items-center gap-1.5 pl-2 font-mono font-bold text-[#6f8fff]">
            <Zap className="h-3 w-3" />
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