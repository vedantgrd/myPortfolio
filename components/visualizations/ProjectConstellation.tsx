'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, FlaskConical } from 'lucide-react'
import Link from 'next/link'

type ClusterId = 'ai' | 'multiagent' | 'hardware' | 'infosec' | 'core'

interface ConstellationNode {
  id: string
  label: string
  cluster: ClusterId
  clusterLabel: string
  type: 'project' | 'concept' | 'tech'
  x: number // SVG viewBox space (0 - 1000)
  y: number // SVG viewBox space (0 - 520)
  color: string
  radius: number
  description: string
  connections: string[]
  projectSlug?: string
  labAnchor?: string
}

const nodes: ConstellationNode[] = [
  // CLUSTER 1: AI & SCHOLARSHIP ARCHITECTURE
  {
    id: 'vidyut',
    label: 'Vidyut',
    cluster: 'ai',
    clusterLabel: 'AI & Scholarship Discovery',
    type: 'project',
    x: 190,
    y: 130,
    color: '#e1523d',
    radius: 18,
    description: 'AI-first student scholarship discovery and Education DNA matching engine with deterministic sub-45ms passes.',
    connections: ['education-dna', 'state-machines', 'postgres', 'multiagent-coord'],
    projectSlug: 'vidyut',
  },
  {
    id: 'education-dna',
    label: 'Education DNA',
    cluster: 'ai',
    clusterLabel: 'Data Schemas',
    type: 'concept',
    x: 80,
    y: 90,
    color: '#e1523d',
    radius: 10,
    description: '40+ field multi-dimensional student profile schema for deterministic eligibility querying.',
    connections: ['vidyut'],
  },
  {
    id: 'postgres',
    label: 'PostgreSQL Schemas',
    cluster: 'ai',
    clusterLabel: 'Data Layer',
    type: 'tech',
    x: 85,
    y: 200,
    color: '#8b949e',
    radius: 10,
    description: 'Normalized relational schemas with multi-column indexing for instant candidate filtering.',
    connections: ['vidyut', 'fastapi'],
  },
  {
    id: 'fastapi',
    label: 'FastAPI Microservices',
    cluster: 'ai',
    clusterLabel: 'Backend APIs',
    type: 'tech',
    x: 190,
    y: 235,
    color: '#8b949e',
    radius: 10,
    description: 'Asynchronous Python REST API layer handling scholarship heuristic calculations.',
    connections: ['vidyut', 'postgres', 'python'],
  },

  // CLUSTER 2: MULTI-AGENT SYSTEMS & SUPPLY CHAIN DYNAMICS
  {
    id: 'bullwhip',
    label: 'Bullwhip AI',
    cluster: 'multiagent',
    clusterLabel: 'Multi-Agent AI',
    type: 'project',
    x: 480,
    y: 120,
    color: '#3b68ff',
    radius: 18,
    description: 'Decentralized multi-agent simulation dampening perishable demand oscillations by ~34% in food supply chains.',
    connections: ['multiagent-coord', 'perishable-supply', 'discrete-event', 'python'],
    projectSlug: 'bullwhip-ai',
    labAnchor: 'bullwhip-simulator',
  },
  {
    id: 'multiagent-coord',
    label: 'Agent Coordination',
    cluster: 'multiagent',
    clusterLabel: 'Multi-Agent Dynamics',
    type: 'concept',
    x: 335,
    y: 130,
    color: '#3b68ff',
    radius: 12,
    description: 'Decentralized autonomous entities sharing real-time order signals to stabilize upstream bullwhip spikes.',
    connections: ['vidyut', 'bullwhip'],
  },
  {
    id: 'perishable-supply',
    label: 'Perishable Dynamics',
    cluster: 'multiagent',
    clusterLabel: 'System Dynamics',
    type: 'concept',
    x: 580,
    y: 70,
    color: '#3b68ff',
    radius: 10,
    description: 'Mathematical modeling of inventory rot cascades caused by delayed upstream factory production.',
    connections: ['bullwhip'],
  },
  {
    id: 'discrete-event',
    label: 'Discrete-Event Sim',
    cluster: 'multiagent',
    clusterLabel: 'Simulation Engine',
    type: 'concept',
    x: 560,
    y: 185,
    color: '#3b68ff',
    radius: 11,
    description: 'Weekly echelon simulation tracking transit lag, safety stock levels, and order variance amplification.',
    connections: ['bullwhip', 'python'],
  },

  // CLUSTER 3: HARDWARE, AVIONICS & SERIAL TELEMETRY
  {
    id: 'agridrone',
    label: 'Agridrone',
    cluster: 'hardware',
    clusterLabel: 'Hardware & Avionics',
    type: 'project',
    x: 810,
    y: 140,
    color: '#10b981',
    radius: 18,
    description: 'Semi-automated quadcopter avionics prototype with 433MHz telemetry bridge and native Android ground station HUD.',
    connections: ['embedded-avionics', 'radio-telemetry', 'android-gcs', 'imu-sensors'],
    projectSlug: 'agridrone',
  },
  {
    id: 'embedded-avionics',
    label: 'Embedded Avionics',
    cluster: 'hardware',
    clusterLabel: 'Avionics',
    type: 'concept',
    x: 720,
    y: 70,
    color: '#10b981',
    radius: 10,
    description: 'Motor ESC calibration, radio transceiver bridging, and physical hardware-software vibration isolation.',
    connections: ['agridrone', 'imu-sensors'],
  },
  {
    id: 'radio-telemetry',
    label: '433MHz Telemetry',
    cluster: 'hardware',
    clusterLabel: 'Wireless Protocols',
    type: 'concept',
    x: 920,
    y: 100,
    color: '#10b981',
    radius: 10,
    description: 'Low-latency serial packet transmission over wireless radio bridges for real-time flight telemetry.',
    connections: ['agridrone', 'android-gcs'],
  },
  {
    id: 'android-gcs',
    label: 'Android Ground Station',
    cluster: 'hardware',
    clusterLabel: 'Mobile Telemetry',
    type: 'tech',
    x: 890,
    y: 220,
    color: '#10b981',
    radius: 11,
    description: 'Native Java Android app providing real-time flight telemetry, battery warnings, and GPS map tracking.',
    connections: ['agridrone', 'radio-telemetry'],
  },
  {
    id: 'imu-sensors',
    label: 'IMU & GPS Telemetry',
    cluster: 'hardware',
    clusterLabel: 'Sensors',
    type: 'concept',
    x: 730,
    y: 215,
    color: '#10b981',
    radius: 10,
    description: 'Sensor data filtering, compass calibration, and attitude stabilization algorithms.',
    connections: ['agridrone', 'embedded-avionics'],
  },

  // CLUSTER 4: INFOSEC & APPLIED CRYPTOGRAPHY
  {
    id: 'cipherlab',
    label: 'CipherLab',
    cluster: 'infosec',
    clusterLabel: 'Security & Forensics',
    type: 'project',
    x: 210,
    y: 400,
    color: '#f59e0b',
    radius: 18,
    description: 'Applied cryptanalysis workbench, frequency analysis, and bit-level avalanche effect diffusion inspector.',
    connections: ['applied-crypto', 'avalanche-diffusion', 'data-forensics', 'python'],
    projectSlug: 'cipherlab',
    labAnchor: 'cipher-lab',
  },
  {
    id: 'applied-crypto',
    label: 'Applied Cryptography',
    cluster: 'infosec',
    clusterLabel: 'Security',
    type: 'concept',
    x: 90,
    y: 380,
    color: '#f59e0b',
    radius: 11,
    description: 'Frequency analysis, polyalphabetic substitution, and entropy diffusion inspection.',
    connections: ['cipherlab'],
  },
  {
    id: 'data-forensics',
    label: 'Data Forensics (PCE)',
    cluster: 'infosec',
    clusterLabel: 'Specialization',
    type: 'concept',
    x: 160,
    y: 485,
    color: '#f59e0b',
    radius: 11,
    description: 'Academic specialization focus at Pillai College of Engineering covering secure systems and forensics.',
    connections: ['cipherlab', 'applied-crypto'],
  },
  {
    id: 'avalanche-diffusion',
    label: 'Avalanche Diffusion',
    cluster: 'infosec',
    clusterLabel: 'Information Security',
    type: 'concept',
    x: 310,
    y: 450,
    color: '#f59e0b',
    radius: 10,
    description: 'Testing how single-bit input variations propagate into >50% randomized output alterations.',
    connections: ['cipherlab'],
  },

  // CENTRAL CORE & SYSTEM ENGINES
  {
    id: 'python',
    label: 'Python Systems Core',
    cluster: 'core',
    clusterLabel: 'Core Language',
    type: 'tech',
    x: 420,
    y: 320,
    color: '#cfd6e0',
    radius: 13,
    description: 'Core runtime powering discrete-event simulations, Pygame engines, and cryptanalysis scripts.',
    connections: ['bullwhip', 'cipherlab', 'pokemon', 'discrete-event', 'fastapi'],
  },
  {
    id: 'state-machines',
    label: 'Deterministic State Machines',
    cluster: 'core',
    clusterLabel: 'Architecture',
    type: 'concept',
    x: 580,
    y: 380,
    color: '#e1523d',
    radius: 12,
    description: 'Rigorous state transitions for reliable game combat and audit-proof scholarship applications.',
    connections: ['vidyut', 'pokemon'],
  },
  {
    id: 'pokemon',
    label: 'Pokémon RPG',
    cluster: 'core',
    clusterLabel: 'Game Engine',
    type: 'project',
    x: 770,
    y: 390,
    color: '#ef4444',
    radius: 17,
    description: 'Custom 2D tile collision slide physics, delta-time game loop, and battle state machines in Pygame.',
    connections: ['game-loops', 'state-machines', 'python'],
    projectSlug: 'pokemon-rpg',
  },
  {
    id: 'game-loops',
    label: 'Game Loops & Delta-Time',
    cluster: 'core',
    clusterLabel: 'Physics & Rendering',
    type: 'concept',
    x: 900,
    y: 430,
    color: '#ef4444',
    radius: 10,
    description: 'Frame-independent delta-time movement and AABB spatial collision slide vectoring.',
    connections: ['pokemon'],
  },
]

/* ---------- Static graph data (computed once) ---------- */

const byId = new Map(nodes.map((n) => [n.id, n]))

// Symmetric adjacency, so an edge declared on only one side still counts
const neighbors = new Map<string, Set<string>>()
nodes.forEach((n) => neighbors.set(n.id, new Set()))
nodes.forEach((n) =>
  n.connections.forEach((t) => {
    if (!byId.has(t)) return
    neighbors.get(n.id)!.add(t)
    neighbors.get(t)!.add(n.id)
  })
)

// Unique undirected edges
const edges: [ConstellationNode, ConstellationNode][] = []
{
  const seen = new Set<string>()
  nodes.forEach((n) =>
    n.connections.forEach((t) => {
      const target = byId.get(t)
      if (!target) return
      const key = [n.id, t].sort().join('::')
      if (seen.has(key)) return
      seen.add(key)
      edges.push(n.id < t ? [n, target] : [target, n])
    })
  )
}

const clusters: {
  id: 'all' | ClusterId
  label: string
  title: string
  color: string
  cx: number
  cy: number
  rx: number
  ry: number
  lx: number
  ly: number
}[] = [
    { id: 'all', label: 'All', title: '', color: '#cfd6e0', cx: 0, cy: 0, rx: 0, ry: 0, lx: 0, ly: 0 },
    { id: 'ai', label: 'AI & Aid', title: '01 · AI & SCHOLARSHIPS', color: '#e1523d', cx: 160, cy: 150, rx: 190, ry: 165, lx: 36, ly: 42 },
    { id: 'multiagent', label: 'Multi-Agent', title: '02 · MULTI-AGENT SUPPLY CHAINS', color: '#3b68ff', cx: 475, cy: 140, rx: 210, ry: 150, lx: 330, ly: 42 },
    { id: 'hardware', label: 'Avionics', title: '03 · HARDWARE & AVIONICS', color: '#10b981', cx: 820, cy: 145, rx: 210, ry: 160, lx: 664, ly: 42 },
    { id: 'infosec', label: 'InfoSec', title: '04 · INFOSEC & FORENSICS', color: '#f59e0b', cx: 200, cy: 425, rx: 230, ry: 130, lx: 36, ly: 332 },
    { id: 'core', label: 'Systems', title: '05 · SYSTEMS & ENGINES', color: '#cfd6e0', cx: 640, cy: 410, rx: 300, ry: 125, lx: 520, ly: 332 },
  ]

// One glow filter per distinct color
const glowColors = Array.from(new Set([...nodes.map((n) => n.color), ...clusters.map((c) => c.color)]))
const colorKey = (c: string) => c.replace('#', '')

// Slightly curved edge
const edgePath = (a: ConstellationNode, b: ConstellationNode) => {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  const off = Math.min(26, len * 0.12)
  const cx = mx + (-dy / len) * off
  const cy = my + (dx / len) * off
  return `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`
}

const EASE = [0.22, 1, 0.36, 1] as const
const BG = '#090a0d'

export function ProjectConstellation() {
  const reduce = useReducedMotion()
  const [selectedNode, setSelectedNode] = useState<ConstellationNode>(nodes[0])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [activeCluster, setActiveCluster] = useState<'all' | ClusterId>('all')

  const activeNode = byId.get(hoveredNode ?? selectedNode.id) ?? selectedNode

  const isConnected = (id: string) =>
    id === activeNode.id || neighbors.get(activeNode.id)?.has(id) === true

  const inCluster = (n: ConstellationNode) => activeCluster === 'all' || n.cluster === activeCluster

  const handleCluster = (id: 'all' | ClusterId) => {
    setActiveCluster(id)
    if (id !== 'all' && selectedNode.cluster !== id) {
      const next = nodes.find((n) => n.cluster === id && n.type === 'project')
      if (next) setSelectedNode(next)
    }
  }

  const connectedNodes = Array.from(neighbors.get(selectedNode.id) ?? [])
    .map((id) => byId.get(id)!)
    .filter(Boolean)

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#232832] bg-[#14171d] p-6 lg:p-8">
      {/* Subtle blueprint grid, same as the other lab modules */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse at 50% 20%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 20%, black 20%, transparent 75%)',
          }}
        />
      </div>

      <style>{`
        @keyframes cn-flow { to { stroke-dashoffset: -28; } }
        .cn-flow { animation: cn-flow 1.1s linear infinite; }
        .cn-node, .cn-node:focus { outline: none; }
        .cn-node .cn-focus { opacity: 0; }
        .cn-node:focus-visible .cn-focus { opacity: 0.9; }
        .cn-label { transition: fill 0.3s ease; }
        @media (prefers-reduced-motion: reduce) { .cn-flow { animation: none; } }
      `}</style>

      <div className="relative space-y-7">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col justify-between gap-5 border-b border-[#232832] pb-6 lg:flex-row lg:items-center"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="font-semibold text-[#e1523d]">// DATA PORTRAIT</span>
              <span className="text-[#6b7280]">SYSTEM CONSTELLATION GRAPH</span>
            </div>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-[#f2eee6]">
              Interconnected Engineering Knowledge Graph
            </h3>
            <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-[#9ca3af]">
              Every edge is an architectural link between projects, specializations, and systems principles.
              Hover to trace a network, click to pin it.
            </p>
          </div>

          {/* Cluster filter: same pill style as the skill map */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs" role="tablist" aria-label="Clusters">
            {clusters.map((c) => {
              const active = activeCluster === c.id
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleCluster(c.id)}
                  className={`inline-flex items-center gap-2 rounded border px-3.5 py-1.5 outline-none transition-colors focus-visible:ring-1 focus-visible:ring-white/40 ${active
                      ? 'border-[#e1523d] bg-[#1a1e26] font-bold text-[#f2eee6]'
                      : 'border-[#232832] bg-[#090a0d] text-[#8b949e] hover:border-[#38404f] hover:text-[#f2eee6]'
                    }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-opacity"
                    style={{ backgroundColor: c.color, opacity: active ? 1 : 0.6 }}
                  />
                  {c.label}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Graph panel */}
        <div className="overflow-hidden rounded-lg border border-[#1f242e] bg-[#090a0d]">
          {/* Scrolls sideways on small screens instead of shrinking labels or leaving empty space */}
          <div className="overflow-x-auto">
            <div
              className="relative aspect-[1000/520] min-w-[720px] select-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <svg
                viewBox="0 0 1000 520"
                className="h-full w-full outline-none"
                preserveAspectRatio="xMidYMid meet"
                style={{ outline: 'none' }}
              >
                <defs>
                  <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="nodeGlowSoft" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {glowColors.map((c) => (
                    <g key={c}>
                      <filter id={`textGlow-${colorKey(c)}`} x="-40%" y="-120%" width="180%" height="340%">
                        <feDropShadow dx="0" dy="0" stdDeviation="1.4" floodColor={c} floodOpacity="0.9" result="inner" />
                        <feDropShadow in="inner" dx="0" dy="0" stdDeviation="4" floodColor={c} floodOpacity="0.7" />
                      </filter>
                      <filter id={`textGlowSoft-${colorKey(c)}`} x="-40%" y="-120%" width="180%" height="340%">
                        <feDropShadow dx="0" dy="0" stdDeviation="2.2" floodColor={c} floodOpacity="0.6" />
                      </filter>
                    </g>
                  ))}

                  {/* Same 44px blueprint grid as the rest of the site, in SVG space */}
                  <pattern id="cn-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeOpacity="0.035" strokeWidth="1" />
                  </pattern>

                  {clusters
                    .filter((c) => c.id !== 'all')
                    .map((c) => (
                      <radialGradient key={c.id} id={`glow-${c.id}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={c.color} stopOpacity="0.1" />
                        <stop offset="60%" stopColor={c.color} stopOpacity="0.03" />
                        <stop offset="100%" stopColor={c.color} stopOpacity="0" />
                      </radialGradient>
                    ))}
                </defs>

                <rect width="1000" height="520" fill="url(#cn-grid)" />

                {/* Cluster zones: faint tint + mono title, no boxes */}
                {clusters
                  .filter((c) => c.id !== 'all')
                  .map((c) => {
                    const isActive = activeCluster === c.id
                    const on = activeCluster === 'all' || isActive
                    return (
                      <g key={c.id} style={{ transition: 'opacity 0.4s ease' }} opacity={on ? 1 : 0.25} pointerEvents="none">
                        <ellipse cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry} fill={`url(#glow-${c.id})`} />
                        <text
                          x={c.lx}
                          y={c.ly}
                          fill={c.color}
                          fontSize="9"
                          fontFamily="monospace"
                          letterSpacing="1.4"
                          fontWeight={isActive ? 700 : 400}
                          opacity={isActive ? 1 : 0.65}
                          filter={isActive ? `url(#textGlow-${colorKey(c.color)})` : undefined}
                        >
                          {c.title}
                        </text>
                      </g>
                    )
                  })}

                {/* Edges */}
                {edges.map(([a, b]) => {
                  const touchesActive = a.id === activeNode.id || b.id === activeNode.id
                  const aIn = inCluster(a)
                  const bIn = inCluster(b)
                  const d = edgePath(a, b)
                  const baseOpacity = aIn && bIn ? 0.45 : aIn || bIn ? 0.2 : 0.08

                  return (
                    <g key={`${a.id}-${b.id}`} pointerEvents="none">
                      {touchesActive ? (
                        <>
                          <path d={d} fill="none" stroke={activeNode.color} strokeWidth={6} strokeOpacity={0.12} strokeLinecap="round" />
                          <path
                            d={d}
                            fill="none"
                            stroke={activeNode.color}
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            strokeDasharray="5 9"
                            className="cn-flow"
                          />
                        </>
                      ) : (
                        <path d={d} fill="none" stroke="#4a566b" strokeWidth={1} strokeOpacity={baseOpacity} strokeLinecap="round" />
                      )}
                    </g>
                  )
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                  const isSelected = selectedNode.id === node.id
                  const isHovered = hoveredNode === node.id
                  const highlighted = isSelected || isHovered
                  const connected = isConnected(node.id)
                  const linked = connected && !highlighted && node.id !== activeNode.id
                  const inside = inCluster(node)

                  const opacity = connected || highlighted ? (inside ? 1 : 0.78) : inside ? 0.45 : 0.22

                  const r = node.radius
                  const isTech = node.type === 'tech'
                  const s = r * 0.85
                  const key = colorKey(node.color)

                  const bodyFilter = highlighted ? 'url(#nodeGlow)' : linked ? 'url(#nodeGlowSoft)' : undefined
                  const labelFilter = highlighted
                    ? `url(#textGlow-${key})`
                    : linked
                      ? `url(#textGlowSoft-${key})`
                      : undefined
                  const labelFill = highlighted
                    ? '#ffffff'
                    : linked
                      ? '#f2eee6'
                      : node.type === 'project'
                        ? '#e6e9ef'
                        : '#aab3c2'

                  return (
                    <g
                      key={node.id}
                      className="cn-node cursor-pointer"
                      tabIndex={0}
                      role="button"
                      aria-label={`${node.label} — ${node.clusterLabel}`}
                      onClick={() => setSelectedNode(node)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedNode(node)
                        }
                      }}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      opacity={opacity}
                      style={{ transition: 'opacity 0.3s ease', outline: 'none' }}
                    >
                      <circle cx={node.x} cy={node.y} r={r + 12} fill="transparent" />

                      <circle
                        className="cn-focus"
                        cx={node.x}
                        cy={node.y}
                        r={r + 6}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1"
                        strokeDasharray="2 3"
                      />

                      {highlighted && (
                        <circle cx={node.x} cy={node.y} r={r + 8} fill="none" stroke={node.color} strokeWidth="1.2" strokeOpacity={0.6}>
                          {!reduce && (
                            <>
                              <animate attributeName="r" values={`${r + 6};${r + 14};${r + 6}`} dur="2.2s" repeatCount="indefinite" />
                              <animate attributeName="stroke-opacity" values="0.7;0;0.7" dur="2.2s" repeatCount="indefinite" />
                            </>
                          )}
                        </circle>
                      )}

                      {(node.type === 'project' || linked) && (
                        <circle cx={node.x} cy={node.y} r={r + 10} fill={node.color} opacity={highlighted ? 0.16 : linked ? 0.1 : 0.06} />
                      )}

                      {isTech ? (
                        <rect
                          x={-s}
                          y={-s}
                          width={s * 2}
                          height={s * 2}
                          rx="2"
                          transform={`translate(${node.x} ${node.y}) rotate(45)`}
                          fill={isSelected ? node.color : BG}
                          stroke={node.color}
                          strokeWidth="1.5"
                          filter={bodyFilter}
                        />
                      ) : (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={r}
                          fill={isSelected ? node.color : BG}
                          stroke={node.color}
                          strokeWidth={node.type === 'project' ? 2.5 : 1.5}
                          filter={bodyFilter}
                        />
                      )}

                      {node.type === 'project' && (
                        <circle cx={node.x} cy={node.y} r={r * 0.4} fill={isSelected ? '#ffffff' : node.color} />
                      )}

                      <text
                        className="cn-label"
                        x={node.x}
                        y={node.y + r + 15}
                        textAnchor="middle"
                        fontFamily="monospace"
                        fontSize={node.type === 'project' ? 11 : 9.5}
                        fontWeight={highlighted || linked || node.type === 'project' ? 700 : 400}
                        fill={labelFill}
                        stroke={BG}
                        strokeWidth="3.5"
                        strokeLinejoin="round"
                        paintOrder="stroke"
                        filter={labelFilter}
                        pointerEvents="none"
                      >
                        {node.label}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>

          {/* Footer strip: legend + stats, outside the canvas so nothing overlaps nodes */}
          <div className="flex flex-col gap-2 border-t border-[#1f242e] px-4 py-2.5 font-mono text-[10px] text-[#8b949e] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="flex items-center gap-1.5">
                <span className="relative inline-block h-2.5 w-2.5 rounded-full border-2 border-[#8b949e]">
                  <span className="absolute inset-[1.5px] rounded-full bg-[#8b949e]" />
                </span>
                Project
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full border border-[#8b949e]" />
                Concept
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rotate-45 border border-[#8b949e]" />
                Tech
              </span>
            </div>
            <span className="text-[#6b7280]">
              {nodes.length} NODES · {edges.length} EDGES · {clusters.length - 1} CLUSTERS
            </span>
          </div>
        </div>

        {/* Selected node details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="relative flex flex-col justify-between gap-5 overflow-hidden rounded-lg border border-[#232832] bg-[#090a0d] p-5 lg:min-h-[148px] lg:flex-row lg:items-center"
          >
            <span
              className="absolute left-0 top-0 h-full w-[3px]"
              style={{ background: selectedNode.color, boxShadow: `0 0 14px ${selectedNode.color}` }}
            />

            <div className="space-y-2 pl-2">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: selectedNode.color, boxShadow: `0 0 8px ${selectedNode.color}` }}
                />
                <span className="font-semibold uppercase tracking-wider" style={{ color: selectedNode.color }}>
                  {selectedNode.clusterLabel}
                </span>
                <span className="text-[#4b5563]">•</span>
                <span className="text-[#8b949e]">{selectedNode.type.toUpperCase()}</span>
                <span className="text-[#4b5563]">•</span>
                <span className="text-[#6b7280]">{neighbors.get(selectedNode.id)?.size ?? 0} connections</span>
              </div>

              <h4 className="text-lg font-bold text-[#f2eee6]">{selectedNode.label}</h4>

              <p className="max-w-2xl text-xs leading-relaxed text-[#a3abb6]">{selectedNode.description}</p>

              {connectedNodes.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1 font-mono text-[10px]">
                  <span className="mr-1 text-[#6b7280]">LINKED →</span>
                  {connectedNodes.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => setSelectedNode(n)}
                      className="rounded border border-[#232832] bg-[#14171d] px-2 py-0.5 text-[#aab3c2] outline-none transition-colors hover:border-[#38404f] hover:text-[#f2eee6] focus-visible:ring-1 focus-visible:ring-white/40"
                      style={{ borderLeftColor: n.color, borderLeftWidth: 2 }}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 self-start font-mono text-[11px] lg:self-center">
              {selectedNode.projectSlug && (
                <Link
                  href={`/work/${selectedNode.projectSlug}`}
                  className="group inline-flex items-center gap-1.5 rounded bg-[#e1523d] px-3 py-1.5 text-white transition-colors hover:bg-[#ef634f]"
                >
                  <span>View Case Study</span>
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              )}

              {selectedNode.labAnchor && (
                <Link
                  href={`/lab#${selectedNode.labAnchor}`}
                  className="inline-flex items-center gap-1.5 rounded border border-[#3b68ff]/40 bg-[#3b68ff]/10 px-3 py-1.5 text-[#6f8fff] transition-colors hover:bg-[#3b68ff] hover:text-white"
                >
                  <FlaskConical className="h-3 w-3" />
                  <span>Run Simulator</span>
                </Link>
              )}

              <Link
                href="/about#tech-stack"
                className="inline-flex items-center gap-1 rounded border border-[#232832] bg-[#14171d] px-3 py-1.5 text-[#8b949e] transition-colors hover:border-[#38404f] hover:text-[#f2eee6]"
              >
                <span>Explore Repertoire &rarr;</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}