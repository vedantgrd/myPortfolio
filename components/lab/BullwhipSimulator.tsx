'use client'

import { useState, useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts'
import { RotateCcw, Play, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react'

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

      {/* Chart Visualization */}
      <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#8b949e]">
          <span>TIME-SERIES SIMULATION (20 WEEKS)</span>
          <span className="text-[11px] text-[#6b7280]">
            Notice the phase lag & order surge at Factory tier
          </span>
        </div>

        <div className="h-[320px] sm:h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={simulationData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid stroke="#1f242e" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="week"
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                domain={[0, 'auto']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#14171d',
                  borderColor: '#282e3b',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: '16px',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                }}
              />
              <Line
                type="monotone"
                dataKey="Customer Demand"
                stroke="#8b949e"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Retailer Order"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Wholesaler Order"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Factory Production"
                stroke={agentCoordination ? '#3b68ff' : '#ef4444'}
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
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
