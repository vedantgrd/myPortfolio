'use client'

import { useState, useMemo } from 'react'
import { RotateCcw } from 'lucide-react'
function InteractiveBullwhipChart({
  data,
  agentCoordination,
  maxFactory,
}: {
  data: Array<{
    week: string
    'Customer Demand': number
    'Retailer Order': number
    'Wholesaler Order': number
    'Factory Production': number
  }>
  agentCoordination: boolean
  maxFactory: number
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const width = 800
  const height = 340
  const padLeft = 45
  const padRight = 25
  const padTop = 25
  const padBottom = 35

  const plotW = width - padLeft - padRight
  const plotH = height - padTop - padBottom

  const maxVal = Math.max(200, Math.ceil(maxFactory / 40) * 40)

  const getX = (index: number) => padLeft + (index / (data.length - 1)) * plotW
  const getY = (val: number) => padTop + plotH - (val / maxVal) * plotH

  // Build SVG path string with smooth curves
  const makePath = (key: 'Customer Demand' | 'Retailer Order' | 'Wholesaler Order' | 'Factory Production') => {
    return data.reduce((acc, curr, i) => {
      const x = getX(i)
      const y = getY(curr[key])
      if (i === 0) return `M ${x} ${y}`
      const prevX = getX(i - 1)
      const prevY = getY(data[i - 1][key])
      const cx1 = prevX + (x - prevX) / 2
      const cx2 = cx1
      return `${acc} C ${cx1} ${prevY}, ${cx2} ${y}, ${x} ${y}`
    }, '')
  }

  const demandPath = makePath('Customer Demand')
  const retailerPath = makePath('Retailer Order')
  const wholesalerPath = makePath('Wholesaler Order')
  const factoryPath = makePath('Factory Production')

  // Grid steps (0, 50, 100, 150, 200, ...)
  const gridSteps = 4
  const stepVal = Math.round(maxVal / gridSteps)
  const yGrid = Array.from({ length: gridSteps + 1 }, (_, i) => i * stepVal)

  const activePoint = hoveredIndex !== null ? data[hoveredIndex] : null

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Active Telemetry HUD Tooltip */}
      {activePoint ? (
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 rounded border border-[#2d3442] bg-[#14171d] px-3 py-1.5 font-mono text-xs shadow-lg">
          <span className="text-[#f2eee6] font-bold">{activePoint.week} Telemetry:</span>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[#8b949e]">
              Demand: <strong className="text-white">{activePoint['Customer Demand']}</strong>
            </span>
            <span className="text-[#10b981]">
              Retailer: <strong className="text-white">{activePoint['Retailer Order']}</strong>
            </span>
            <span className="text-[#f59e0b]">
              Wholesaler: <strong className="text-white">{activePoint['Wholesaler Order']}</strong>
            </span>
            <span className={agentCoordination ? 'text-[#3b68ff]' : 'text-[#ef4444]'}>
              Factory: <strong className="text-white">{activePoint['Factory Production']}</strong>
            </span>
          </div>
        </div>
      ) : (
        <div className="mb-2 text-right font-mono text-[11px] text-[#6b7280]">
          Move cursor over chart for real-time order tracking
        </div>
      )}

      <div
        className="relative w-full aspect-[800/340] cursor-crosshair rounded-lg bg-[#0d0f12] p-1 border border-[#1f242e]"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const relX = (e.clientX - rect.left) / rect.width
          const idx = Math.round(((relX * width - padLeft) / plotW) * (data.length - 1))
          setHoveredIndex(Math.max(0, Math.min(data.length - 1, idx)))
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="factoryGlow" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={agentCoordination ? '#3b68ff' : '#ef4444'}
                stopOpacity="0.25"
              />
              <stop
                offset="100%"
                stopColor={agentCoordination ? '#3b68ff' : '#ef4444'}
                stopOpacity="0.0"
              />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines & Y-Axis Labels */}
          {yGrid.map((val) => {
            const y = getY(val)
            return (
              <g key={val}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#1f242e"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 8}
                  y={y + 3.5}
                  fill="#6b7280"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {val}
                </text>
              </g>
            )
          })}

          {/* X-Axis Weeks Labels */}
          {data.map((d, i) => {
            if (i % 2 !== 0 && i !== data.length - 1) return null
            const x = getX(i)
            return (
              <text
                key={d.week}
                x={x}
                y={height - 12}
                fill="#6b7280"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {d.week}
              </text>
            )
          })}

          {/* Step shock indicator vertical line at Week 5 */}
          <line
            x1={getX(4)}
            y1={padTop}
            x2={getX(4)}
            y2={padTop + plotH}
            stroke="#ef4444"
            strokeDasharray="3 3"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />
          <text
            x={getX(4) + 4}
            y={padTop + 14}
            fill="#ef4444"
            fontSize="9"
            fontFamily="monospace"
            fillOpacity="0.8"
          >
            SHOCK EVENT (WK 5)
          </text>

          {/* Factory Area fill under curve */}
          <path
            d={`${factoryPath} L ${getX(data.length - 1)} ${padTop + plotH} L ${getX(0)} ${padTop + plotH} Z`}
            fill="url(#factoryGlow)"
          />

          {/* Lines */}
          <path
            d={demandPath}
            fill="none"
            stroke="#8b949e"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <path
            d={retailerPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
          />
          <path
            d={wholesalerPath}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.5"
          />
          <path
            d={factoryPath}
            fill="none"
            stroke={agentCoordination ? '#3b68ff' : '#ef4444'}
            strokeWidth="3.5"
          />

          {/* Active Hover Scrubber Line & Marker Dots */}
          {hoveredIndex !== null && (
            <g>
              <line
                x1={getX(hoveredIndex)}
                y1={padTop}
                x2={getX(hoveredIndex)}
                y2={padTop + plotH}
                stroke="#f2eee6"
                strokeWidth="1.5"
                strokeDasharray="2 2"
                strokeOpacity="0.7"
              />
              <circle
                cx={getX(hoveredIndex)}
                cy={getY(data[hoveredIndex]['Customer Demand'])}
                r="4"
                fill="#8b949e"
                stroke="#090a0d"
                strokeWidth="2"
              />
              <circle
                cx={getX(hoveredIndex)}
                cy={getY(data[hoveredIndex]['Retailer Order'])}
                r="4"
                fill="#10b981"
                stroke="#090a0d"
                strokeWidth="2"
              />
              <circle
                cx={getX(hoveredIndex)}
                cy={getY(data[hoveredIndex]['Wholesaler Order'])}
                r="4.5"
                fill="#f59e0b"
                stroke="#090a0d"
                strokeWidth="2"
              />
              <circle
                cx={getX(hoveredIndex)}
                cy={getY(data[hoveredIndex]['Factory Production'])}
                r="6"
                fill={agentCoordination ? '#3b68ff' : '#ef4444'}
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}

export function BullwhipSimulator() {
  const [demandShock, setDemandShock] = useState<number>(20) // percentage shock
  const [leadTimeWeeks, setLeadTimeWeeks] = useState<number>(3) // weeks
  const [agentCoordination, setAgentCoordination] = useState<boolean>(true)

  // Generate simulated time-series data (20 weeks)
  const simulationData = useMemo(() => {
    const data = []
    const baseline = 100

    for (let t = 1; t <= 20; t++) {
      // Step shock occurs at week 5
      const shockEffect = t >= 5 ? demandShock : 0
      const noise = Math.sin(t * 0.8) * 3
      const customerDemand = Math.round(baseline + shockEffect + noise)

      // Multipliers based on coordination vs naive
      const lag = leadTimeWeeks * 0.4
      const naiveMultiplier = 1 + leadTimeWeeks * 0.35
      const agentMultiplier = 1 + leadTimeWeeks * 0.12

      // Retailer
      const retailerOscillation = agentCoordination
        ? Math.round(baseline + shockEffect * 1.1 + noise * 1.2)
        : Math.round(baseline + shockEffect * 1.35 + noise * 1.8)

      // Wholesaler (delayed by lead time)
      const wholesalerPhase = Math.max(1, t - Math.round(lag))
      const wShock = wholesalerPhase >= 5 ? demandShock : 0
      const wholesalerOrder = agentCoordination
        ? Math.round(baseline + wShock * (1 + agentMultiplier * 0.4) + Math.sin(t) * 4)
        : Math.round(baseline + wShock * (1 + naiveMultiplier * 0.7) + Math.sin(t) * 9)

      // Factory / Producer (accumulated phase lag and safety stock compounding)
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

  // Calculate metrics
  const maxFactory = Math.max(...simulationData.map((d) => d['Factory Production']))
  const maxDemand = Math.max(...simulationData.map((d) => d['Customer Demand']))
  const amplificationFactor = (maxFactory / maxDemand).toFixed(2)

  return (
    <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 lg:p-8 space-y-8">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232832]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-[#3b68ff] font-semibold">// EXPERIMENT 01</span>
            <span className="text-[#6b7280]">BULLWHIP AI SIMULATION ENGINE</span>
          </div>
          <h3 className="text-xl font-bold text-[#f2eee6] mt-1">
            Supply Chain Demand Wave & Oscillation Simulator
          </h3>
          <p className="text-xs text-[#9ca3af] mt-1 max-w-xl">
            Simulate how customer demand shocks amplify upstream into the factory. Compare naive independent purchasing against decentralized agent coordination.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setDemandShock(20)
              setLeadTimeWeeks(3)
              setAgentCoordination(true)
            }}
            className="flex items-center gap-1.5 rounded border border-[#232832] bg-[#090a0d] px-3 py-1.5 font-mono text-xs text-[#8b949e] hover:text-[#f2eee6] hover:border-[#38404f] transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* Control Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        {/* Slider 1: Demand Shock */}
        <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#8b949e]">Consumer Demand Shock</span>
            <span className="text-[#e1523d] font-bold">+{demandShock}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            step="5"
            value={demandShock}
            onChange={(e) => setDemandShock(Number(e.target.value))}
            className="w-full accent-[#e1523d] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#6b7280]">
            <span>+5% (Mild)</span>
            <span>+30%</span>
            <span>+60% (Severe)</span>
          </div>
        </div>

        {/* Slider 2: Transit Lead Time */}
        <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#8b949e]">Transit Lead Time Lag</span>
            <span className="text-[#3b68ff] font-bold">{leadTimeWeeks} Weeks</span>
          </div>
          <input
            type="range"
            min="1"
            max="6"
            step="1"
            value={leadTimeWeeks}
            onChange={(e) => setLeadTimeWeeks(Number(e.target.value))}
            className="w-full accent-[#3b68ff] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#6b7280]">
            <span>1 Wk (Fast)</span>
            <span>3 Wks</span>
            <span>6 Wks (Sluggish)</span>
          </div>
        </div>

        {/* Toggle: Policy */}
        <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-4 flex flex-col justify-between">
          <span className="text-[#8b949e]">Agent Coordination Policy</span>
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => setAgentCoordination(false)}
              className={`flex-1 rounded py-2 text-center text-[11px] font-bold transition-all ${
                !agentCoordination
                  ? 'bg-[#ef4444] text-white shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                  : 'bg-[#14171d] text-[#8b949e] border border-[#232832]'
              }`}
            >
              Naive Local (s, S)
            </button>
            <button
              onClick={() => setAgentCoordination(true)}
              className={`flex-1 rounded py-2 text-center text-[11px] font-bold transition-all ${
                agentCoordination
                  ? 'bg-[#10b981] text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'bg-[#14171d] text-[#8b949e] border border-[#232832]'
              }`}
            >
              Signal Dampened
            </button>
          </div>
          <span className="text-[10px] text-[#6b7280] pt-1">
            {agentCoordination
              ? 'Multi-agent signal sharing active'
              : 'Siloed, panic-driven reordering'}
          </span>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="rounded border border-[#1f242e] bg-[#090a0d] p-3">
          <span className="text-[10px] text-[#8b949e] block">AMPLIFICATION FACTOR</span>
          <span
            className={`text-lg font-bold ${
              Number(amplificationFactor) > 2.0
                ? 'text-[#ef4444]'
                : 'text-[#10b981]'
            }`}
          >
            {amplificationFactor}x
          </span>
          <span className="text-[10px] text-[#6b7280] block">Factory vs Consumer peak</span>
        </div>

        <div className="rounded border border-[#1f242e] bg-[#090a0d] p-3">
          <span className="text-[10px] text-[#8b949e] block">POLICY STATE</span>
          <span
            className={`text-lg font-bold ${
              agentCoordination ? 'text-[#10b981]' : 'text-[#f59e0b]'
            }`}
          >
            {agentCoordination ? 'DAMPENED' : 'UNSTABLE'}
          </span>
          <span className="text-[10px] text-[#6b7280] block">
            {agentCoordination ? 'Variance reduced ~34%' : 'Unchecked oscillation'}
          </span>
        </div>

        <div className="rounded border border-[#1f242e] bg-[#090a0d] p-3">
          <span className="text-[10px] text-[#8b949e] block">PEAK FACTOR ORDER</span>
          <span className="text-lg font-bold text-[#f2eee6]">{maxFactory} units</span>
          <span className="text-[10px] text-[#6b7280] block">Baseline: 100 units</span>
        </div>

        <div className="rounded border border-[#1f242e] bg-[#090a0d] p-3">
          <span className="text-[10px] text-[#8b949e] block">PERISHABLE SPOILAGE RISK</span>
          <span
            className={`text-lg font-bold ${
              Number(amplificationFactor) > 2.2
                ? 'text-[#ef4444]'
                : 'text-[#10b981]'
            }`}
          >
            {Number(amplificationFactor) > 2.2 ? 'CRITICAL' : 'CONTROLLED'}
          </span>
          <span className="text-[10px] text-[#6b7280] block">Food inventory decay risk</span>
        </div>
      </div>

      {/* Chart Visualization (Responsive High-Performance SVG Engine) */}
      <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#8b949e]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-[#f2eee6] font-bold">TIME-SERIES SIMULATION (20 WEEKS)</span>
          </div>
          <span className="text-[11px] text-[#8b949e]">
            Hover or touch curve to inspect tier telemetry
          </span>
        </div>

        {/* Interactive SVG Chart */}
        <InteractiveBullwhipChart
          data={simulationData}
          agentCoordination={agentCoordination}
          maxFactory={maxFactory}
        />

        {/* Chart Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 font-mono text-[11px] border-t border-[#1f242e]">
          <div className="flex items-center gap-2 text-[#8b949e]">
            <span className="h-0.5 w-4 bg-[#8b949e] inline-block" />
            <span>Customer Demand</span>
          </div>
          <div className="flex items-center gap-2 text-[#10b981]">
            <span className="h-1 w-4 bg-[#10b981] rounded inline-block" />
            <span>Retailer Order</span>
          </div>
          <div className="flex items-center gap-2 text-[#f59e0b]">
            <span className="h-1 w-4 bg-[#f59e0b] rounded inline-block" />
            <span>Wholesaler Order</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-4 rounded inline-block ${
                agentCoordination ? 'bg-[#3b68ff]' : 'bg-[#ef4444]'
              }`}
            />
            <span
              className={
                agentCoordination ? 'text-[#3b68ff] font-bold' : 'text-[#ef4444] font-bold'
              }
            >
              Factory Production ({agentCoordination ? 'Dampened' : 'Oscillating'})
            </span>
          </div>
        </div>
      </div>

      {/* Educational Annotation */}
      <div className="rounded border border-[#232832] bg-[#0d0f12] p-4 text-xs font-mono text-[#9ca3af] space-y-1">
        <span className="text-[#3b68ff] font-bold block">
          RESEARCH NOTE // BULLWHIP AI DYNAMICS
        </span>
        <p className="font-sans leading-relaxed text-[#cfd6e0]">
          In real food supply chains, the red curve (Factory Production) represents agricultural contracts or processing plants. When lead times are long and actors panic-order independently, orders overshoot actual demand by over 200%. The resulting surplus rots before consumption. Multi-agent demand dampening smooths the curve to the blue line.
        </p>
      </div>
    </div>
  )
}
