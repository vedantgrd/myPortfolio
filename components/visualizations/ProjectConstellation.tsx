'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Network, Sparkles, Layers, Cpu, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface Node {
  id: string
  label: string
  type: 'project' | 'domain' | 'concept'
  category: string
  x: number // percentage
  y: number // percentage
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
    x: 22,
    y: 28,
    color: '#e1523d',
    description: 'AI-first student scholarship discovery and Education DNA matching engine.',
    connections: ['education-dna', 'fullstack', 'decision-trees', 'postgres'],
    projectSlug: 'vidyut',
  },
  {
    id: 'bullwhip',
    label: 'Bullwhip AI',
    type: 'project',
    category: 'Multi-Agent AI',
    x: 52,
    y: 22,
    color: '#3b68ff',
    description: 'Multi-agent simulation dampening demand oscillations in food supply chains.',
    connections: ['agentic-systems', 'simulation', 'supply-chain', 'python'],
    projectSlug: 'bullwhip-ai',
  },
  {
    id: 'agridrone',
    label: 'Agridrone',
    type: 'project',
    category: 'Hardware & IoT',
    x: 80,
    y: 35,
    color: '#10b981',
    description: 'Semi-automated quadcopter avionics + Android ground station telemetry.',
    connections: ['embedded', 'android', 'sensors', 'telemetry'],
    projectSlug: 'agridrone',
  },
  {
    id: 'cipherlab',
    label: 'CipherLab',
    type: 'project',
    category: 'Security & Forensics',
    x: 35,
    y: 72,
    color: '#f59e0b',
    description: 'Interactive cryptanalysis, frequency analysis, and cryptographic algorithm suite.',
    connections: ['cryptography', 'infosec', 'forensics', 'python'],
    projectSlug: 'cipherlab',
  },
  {
    id: 'pokemon',
    label: 'Pokémon RPG',
    type: 'project',
    category: 'Game Engine',
    x: 72,
    y: 75,
    color: '#ef4444',
    description: 'Custom 2D tile collision physics, game loops, and battle state machines in Pygame.',
    connections: ['game-loops', 'state-machines', 'python'],
    projectSlug: 'pokemon-rpg',
  },

  // Domains & Concepts
  {
    id: 'agentic-systems',
    label: 'Multi-Agent Coordination',
    type: 'domain',
    category: 'Domain',
    x: 40,
    y: 42,
    color: '#8b949e',
    description: 'Decentralized autonomous entities cooperating to solve complex system dynamics.',
    connections: ['bullwhip', 'simulation'],
  },
  {
    id: 'education-dna',
    label: 'Education DNA',
    type: 'concept',
    category: 'Schema',
    x: 14,
    y: 48,
    color: '#8b949e',
    description: 'Multi-dimensional student profile schema for deterministic eligibility querying.',
    connections: ['vidyut', 'postgres'],
  },
  {
    id: 'telemetry',
    label: 'MAVLink & Serial Telemetry',
    type: 'concept',
    category: 'Protocols',
    x: 88,
    y: 52,
    color: '#8b949e',
    description: 'Low-latency packet transmission over noisy 433MHz wireless radio transceivers.',
    connections: ['agridrone', 'embedded', 'android'],
  },
  {
    id: 'cryptography',
    label: 'Applied Cryptography',
    type: 'domain',
    category: 'Security',
    x: 20,
    y: 78,
    color: '#8b949e',
    description: 'Cipher strength, avalanche diffusion tests, and entropy measurement.',
    connections: ['cipherlab', 'infosec'],
  },
  {
    id: 'simulation',
    label: 'Discrete-Event Simulation',
    type: 'concept',
    category: 'Modeling',
    x: 60,
    y: 45,
    color: '#8b949e',
    description: 'Modeling real-world stochastic processes and order buffer delays.',
    connections: ['bullwhip', 'agentic-systems'],
  },
  {
    id: 'state-machines',
    label: 'Deterministic State Machines',
    type: 'concept',
    category: 'Architecture',
    x: 55,
    y: 80,
    color: '#8b949e',
    description: 'Rigorous state management across game engines and verification workflows.',
    connections: ['pokemon', 'vidyut'],
  },
]

export function ProjectConstellation() {
  const [selectedNode, setSelectedNode] = useState<Node>(nodes[0])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const activeId = hoveredNode || selectedNode.id
  const activeNode = nodes.find((n) => n.id === activeId) || selectedNode

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
            System Constellation & Knowledge Graph
          </h3>
          <p className="text-xs text-[#9ca3af] mt-1">
            Explore how my projects, core research domains, and architectural concepts intersect. Click or hover any node.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] font-mono text-[#8b949e]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#e1523d]" /> Project
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#3b68ff]" /> Multi-Agent
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#10b981]" /> Hardware
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#8b949e]" /> Domain
          </span>
        </div>
      </div>

      {/* Interactive Visualization Canvas */}
      <div className="relative h-[360px] sm:h-[420px] w-full rounded-lg border border-[#1a1e26] bg-[#090a0d] overflow-hidden select-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />

        {/* SVG connection lines */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none">
          {nodes.map((node) =>
            node.connections.map((targetId) => {
              const targetNode = nodes.find((n) => n.id === targetId)
              if (!targetNode) return null

              const isHighlighted =
                node.id === activeId || targetNode.id === activeId

              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${targetNode.x}%`}
                  y2={`${targetNode.y}%`}
                  stroke={isHighlighted ? '#e1523d' : '#232832'}
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeDasharray={isHighlighted ? 'none' : '3,3'}
                  strokeOpacity={isHighlighted ? 0.9 : 0.4}
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
          const isConnected =
            activeNode.connections.includes(node.id) ||
            node.connections.includes(activeNode.id) ||
            node.id === activeId

          return (
            <motion.button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                    node.type === 'project'
                      ? 'h-9 w-9 border-2'
                      : 'h-6 w-6 border'
                  } ${
                    isSelected
                      ? 'ring-4 ring-[#e1523d]/30 scale-110'
                      : isConnected
                      ? 'opacity-100'
                      : 'opacity-40'
                  }`}
                  style={{
                    backgroundColor: isSelected ? node.color : '#14171d',
                    borderColor: node.color,
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
                  className={`mt-1 font-mono text-[10px] tracking-wider whitespace-nowrap px-1.5 py-0.5 rounded transition-colors ${
                    isSelected || isHovered
                      ? 'bg-[#1a1e26] text-[#f2eee6] font-semibold border border-[#323844]'
                      : isConnected
                      ? 'text-[#a3abb6]'
                      : 'text-[#4b5563]'
                  }`}
                >
                  {node.label}
                </span>
              </div>
            </motion.button>
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
          className="mt-6 rounded-lg border border-[#232832] bg-[#14171d] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: selectedNode.color }}
              />
              <span className="font-mono text-xs text-[#e1523d] uppercase tracking-wider font-semibold">
                {selectedNode.category}
              </span>
              <span className="text-[#4b5563] text-xs">•</span>
              <span className="font-mono text-xs text-[#8b949e]">
                {selectedNode.type.toUpperCase()}
              </span>
            </div>
            <h4 className="text-base font-bold text-[#f2eee6]">
              {selectedNode.label}
            </h4>
            <p className="text-xs text-[#9ca3af] leading-relaxed max-w-xl">
              {selectedNode.description}
            </p>
          </div>

          {selectedNode.projectSlug && (
            <Link
              href={`/work/${selectedNode.projectSlug}`}
              className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded bg-[#e1523d] px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-white font-medium hover:bg-[#ef634f] transition-colors"
            >
              <span>View Case Study</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
