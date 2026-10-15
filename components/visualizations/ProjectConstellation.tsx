'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Network, Sparkles, Layers, Cpu, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface Node {
  id: string
  label: string
  type: 'project' | 'domain' | 'concept' | 'tech'
  category: string
  x: number // 0 - 100 percentage
  y: number // 0 - 100 percentage
  color: string
  description: string
  connections: string[]
  projectSlug?: string
}

const nodes: Node[] = [
  // Flagship Projects
  {
    id: 'vidyut',
    label: 'Vidyut',
    type: 'project',
    category: 'AI & Education',
    x: 20,
    y: 28,
    color: '#e1523d',
    description: 'AI-first student scholarship discovery and Education DNA matching engine with sub-45ms deterministic query passes.',
    connections: ['education-dna', 'fullstack', 'postgres', 'agentic-systems'],
    projectSlug: 'vidyut',
  },
  {
    id: 'bullwhip',
    label: 'Bullwhip AI',
    type: 'project',
    category: 'Multi-Agent AI',
    x: 50,
    y: 20,
    color: '#3b68ff',
    description: 'Decentralized multi-agent simulation dampening perishable demand oscillations by ~34% in food supply chains.',
    connections: ['agentic-systems', 'simulation', 'supply-chain', 'python'],
    projectSlug: 'bullwhip-ai',
  },
  {
    id: 'agridrone',
    label: 'Agridrone',
    type: 'project',
    category: 'Hardware & IoT',
    x: 80,
    y: 30,
    color: '#10b981',
    description: 'Semi-automated quadcopter avionics with 433MHz telemetry bridge and native Android ground station HUD.',
    connections: ['embedded', 'android', 'sensors', 'telemetry'],
    projectSlug: 'agridrone',
  },
  {
    id: 'cipherlab',
    label: 'CipherLab',
    type: 'project',
    category: 'Security & Forensics',
    x: 28,
    y: 74,
    color: '#f59e0b',
    description: 'Applied cryptanalysis workbench, frequency analysis, and bit-level avalanche effect diffusion inspector.',
    connections: ['cryptography', 'infosec', 'python'],
    projectSlug: 'cipherlab',
  },
  {
    id: 'pokemon',
    label: 'Pokémon RPG',
    type: 'project',
    category: 'Game Engine',
    x: 75,
    y: 76,
    color: '#ef4444',
    description: 'Custom 2D tile collision slide physics, delta-time game loop, and battle state machines in Pygame.',
    connections: ['game-loops', 'state-machines', 'python'],
    projectSlug: 'pokemon-rpg',
  },

  // Domains & Architecture Concepts
  {
    id: 'agentic-systems',
    label: 'Multi-Agent Coordination',
    type: 'domain',
    category: 'AI Systems',
    x: 36,
    y: 34,
    color: '#3b68ff',
    description: 'Decentralized autonomous agents sharing state signals to stabilize complex systemic dynamics.',
    connections: ['bullwhip', 'vidyut', 'simulation'],
  },
  {
    id: 'education-dna',
    label: 'Education DNA',
    type: 'concept',
    category: 'Schema',
    x: 12,
    y: 48,
    color: '#e1523d',
    description: '40+ field multi-dimensional student profile schema for deterministic eligibility matching.',
    connections: ['vidyut', 'postgres'],
  },
  {
    id: 'fullstack',
    label: 'Next.js 16 & TypeScript',
    type: 'tech',
    category: 'Frontend/Full-Stack',
    x: 24,
    y: 12,
    color: '#cfd6e0',
    description: 'Modern App Router, server-rendered components, strict type invariants, and responsive editorial layout.',
    connections: ['vidyut', 'postgres'],
  },
  {
    id: 'postgres',
    label: 'PostgreSQL Schemas',
    type: 'tech',
    category: 'Data Layer',
    x: 10,
    y: 28,
    color: '#8b949e',
    description: 'Normalized relational database schemas with indexed queries for sub-45ms scholarship matching.',
    connections: ['vidyut', 'education-dna', 'fullstack'],
  },
  {
    id: 'simulation',
    label: 'Discrete-Event Modeling',
    type: 'concept',
    category: 'Simulation',
    x: 62,
    y: 36,
    color: '#8b949e',
    description: 'Simulating order lag, lead times, and inventory oscillations across cascading supply tiers.',
    connections: ['bullwhip', 'supply-chain', 'agentic-systems'],
  },
  {
    id: 'supply-chain',
    label: 'Perishable Supply Dynamics',
    type: 'domain',
    category: 'System Dynamics',
    x: 58,
    y: 12,
    color: '#3b68ff',
    description: 'Mitigating bullwhip amplification to prevent catastrophic food rot in agricultural distribution.',
    connections: ['bullwhip', 'simulation'],
  },
  {
    id: 'python',
    label: 'Python Systems',
    type: 'tech',
    category: 'Languages',
    x: 50,
    y: 68,
    color: '#cfd6e0',
    description: 'Core language for discrete-event modeling, mathematical cryptanalysis, and Pygame simulation loops.',
    connections: ['bullwhip', 'cipherlab', 'pokemon'],
  },
  {
    id: 'telemetry',
    label: '433MHz Radio Telemetry',
    type: 'concept',
    category: 'Avionics',
    x: 90,
    y: 46,
    color: '#10b981',
    description: 'Serial telemetry transmission over radio frequency transceivers for real-time quadcopter HUD.',
    connections: ['agridrone', 'embedded', 'android'],
  },
  {
    id: 'embedded',
    label: 'Embedded Avionics',
    type: 'tech',
    category: 'Hardware',
    x: 88,
    y: 18,
    color: '#10b981',
    description: 'Flight controller tuning, motor ESC vibration isolation, and physical hardware-software debugging.',
    connections: ['agridrone', 'telemetry', 'sensors'],
  },
  {
    id: 'sensors',
    label: 'IMU & GPS Telemetry',
    type: 'concept',
    category: 'Sensors',
    x: 70,
    y: 20,
    color: '#8b949e',
    description: 'Sensor data filtering, compass calibration, and attitude stabilization algorithms.',
    connections: ['agridrone', 'embedded'],
  },
  {
    id: 'android',
    label: 'Android Ground Station',
    type: 'tech',
    category: 'Mobile Ground Station',
    x: 92,
    y: 66,
    color: '#10b981',
    description: 'Native Java Android app providing real-time flight telemetry, battery warnings, and GPS map tracking.',
    connections: ['agridrone', 'telemetry'],
  },
  {
    id: 'cryptography',
    label: 'Applied Cryptography',
    type: 'domain',
    category: 'Security',
    x: 14,
    y: 82,
    color: '#f59e0b',
    description: 'Frequency analysis, polyalphabetic substitution, and entropy diffusion inspection.',
    connections: ['cipherlab', 'infosec'],
  },
  {
    id: 'infosec',
    label: 'Data Forensics & InfoSec',
    type: 'domain',
    category: 'Specialization',
    x: 36,
    y: 88,
    color: '#f59e0b',
    description: 'Academic specialization focus at Pillai College of Engineering covering secure systems and forensics.',
    connections: ['cipherlab', 'cryptography'],
  },
  {
    id: 'state-machines',
    label: 'Deterministic State Machines',
    type: 'concept',
    category: 'Architecture',
    x: 58,
    y: 86,
    color: '#ef4444',
    description: 'Rigorous state transitions for reliable game combat and audit-proof scholarship applications.',
    connections: ['pokemon', 'game-loops', 'vidyut'],
  },
  {
    id: 'game-loops',
    label: 'Game Physics & Delta-Time',
    type: 'concept',
    category: 'Game Engine',
    x: 86,
    y: 84,
    color: '#ef4444',
    description: 'Frame-independent physics loops, collision slide vectors, and sprite animation rendering.',
    connections: ['pokemon', 'state-machines'],
  },
]

export function ProjectConstellation() {
  const [selectedNode, setSelectedNode] = useState<Node>(nodes[0])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const activeId = hoveredNode || selectedNode.id
  const activeNode = nodes.find((n) => n.id === activeId) || selectedNode

  const isConnectedToActive = (nodeId: string) => {
    return (
      activeNode.connections.includes(nodeId) ||
      (nodes.find((n) => n.id === nodeId)?.connections.includes(activeNode.id) ?? false) ||
      nodeId === activeId
    )
  }

  return (
    <div className="rounded-xl border border-[#232832] bg-[#101217] p-6 lg:p-8">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#232832]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#e1523d] font-semibold">// DATA PORTRAIT</span>
            <span className="text-[11px] font-mono text-[#6b7280]">INTERACTIVE ARCHITECTURE GRAPH</span>
          </div>
          <h3 className="text-lg font-bold text-[#f2eee6] mt-1">
            System Constellation &amp; Knowledge Graph
          </h3>
          <p className="text-xs text-[#9ca3af] mt-1">
            Explore how my projects, engineering principles, and core tech stacks intersect. Click or hover any node.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] font-mono text-[#8b949e]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#e1523d]" /> Flagship Project
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#3b68ff]" /> Multi-Agent AI
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#10b981]" /> Hardware/IoT
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#f59e0b]" /> Security/Forensics
          </span>
        </div>
      </div>

      {/* Interactive Visualization Canvas */}
      <div className="relative h-[420px] sm:h-[480px] w-full rounded-lg border border-[#1a1e26] bg-[#090a0d] overflow-hidden select-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        {/* SVG connection lines with fixed viewBox 0 0 1000 550 for 100% reliable geometric scaling */}
        <svg
          viewBox="0 0 1000 550"
          className="absolute inset-0 h-full w-full pointer-events-none overflow-visible"
        >
          {nodes.map((node) =>
            node.connections.map((targetId) => {
              const targetNode = nodes.find((n) => n.id === targetId)
              if (!targetNode) return null

              const isHighlighted =
                node.id === activeId || targetNode.id === activeId

              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={node.x * 10}
                  y1={node.y * 5.5}
                  x2={targetNode.x * 10}
                  y2={targetNode.y * 5.5}
                  stroke={isHighlighted ? activeNode.color : '#232832'}
                  strokeWidth={isHighlighted ? 2.5 : 1}
                  strokeDasharray={isHighlighted ? 'none' : '3,3'}
                  strokeOpacity={isHighlighted ? 0.95 : 0.35}
                  className="transition-all duration-300"
                />
              )
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const isSelected = selectedNode.id === node.id
          const isHovered = hoveredNode === node.id
          const isConnected = isConnectedToActive(node.id)

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10 transition-transform duration-200 hover:scale-110 active:scale-95"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              aria-label={`Inspect ${node.label}`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                    node.type === 'project'
                      ? 'h-9 w-9 border-2 shadow-lg'
                      : 'h-6 w-6 border'
                  } ${
                    isSelected
                      ? 'ring-4 ring-white/20 scale-110'
                      : isConnected
                      ? 'opacity-100'
                      : 'opacity-40'
                  }`}
                  style={{
                    backgroundColor: isSelected ? node.color : '#14171d',
                    borderColor: node.color,
                    boxShadow: isSelected || isHovered ? `0 0 16px ${node.color}66` : 'none',
                  }}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isSelected ? 'bg-white' : ''
                    }`}
                    style={{
                      backgroundColor: isSelected ? '#ffffff' : node.color,
                    }}
                  />
                </div>

                <span
                  className={`mt-1 font-mono text-[10px] tracking-wider whitespace-nowrap px-1.5 py-0.5 rounded transition-all duration-200 ${
                    isSelected || isHovered
                      ? 'bg-[#1a1e26] text-[#f2eee6] font-semibold border border-[#323844] shadow'
                      : isConnected
                      ? 'text-[#cfd6e0] bg-[#0d0f12]/80'
                      : 'text-[#4b5563]'
                  }`}
                >
                  {node.label}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Node Details Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-6 rounded-lg border border-[#232832] bg-[#14171d] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: selectedNode.color }}
              />
              <span
                className="font-mono text-xs uppercase tracking-wider font-semibold"
                style={{ color: selectedNode.color }}
              >
                {selectedNode.category}
              </span>
              <span className="text-[#4b5563] text-xs">•</span>
              <span className="font-mono text-xs text-[#8b949e]">
                {selectedNode.type.toUpperCase()}
              </span>
              <span className="text-[#4b5563] text-xs">•</span>
              <span className="font-mono text-[11px] text-[#6b7280]">
                {selectedNode.connections.length} Intersections
              </span>
            </div>
            <h4 className="text-base font-bold text-[#f2eee6]">
              {selectedNode.label}
            </h4>
            <p className="text-xs text-[#9ca3af] leading-relaxed max-w-xl">
              {selectedNode.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {selectedNode.projectSlug && (
              <Link
                href={`/work/${selectedNode.projectSlug}`}
                className="inline-flex items-center gap-1.5 rounded bg-[#e1523d] px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-white font-medium hover:bg-[#ef634f] transition-colors whitespace-nowrap shadow-sm"
              >
                <span>View Case Study</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
            <Link
              href="/about#tech-stack"
              className="inline-flex items-center gap-1 rounded border border-[#232832] bg-[#090a0d] px-3 py-2 font-mono text-xs text-[#8b949e] hover:text-[#f2eee6] hover:border-[#38404f] transition-colors whitespace-nowrap"
            >
              <span>Explore Repertoire &rarr;</span>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
