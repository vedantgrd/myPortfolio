'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Cpu, FlaskConical, Layers, Shield, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface ConstellationNode {
  id: string
  label: string
  cluster: 'ai' | 'multiagent' | 'hardware' | 'infosec' | 'core'
  clusterLabel: string
  type: 'project' | 'concept' | 'tech'
  x: number // exactly in SVG viewBox (0 - 1000)
  y: number // exactly in SVG viewBox (0 - 520)
  color: string
  radius: number
  description: string
  connections: string[]
  projectSlug?: string
  labAnchor?: string
}

const nodes: ConstellationNode[] = [
  // -------------------------------------------------------------
  // CLUSTER 1: AI & SCHOLARSHIP ARCHITECTURE
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // CLUSTER 2: MULTI-AGENT SYSTEMS & SUPPLY CHAIN DYNAMICS
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // CLUSTER 3: HARDWARE, AVIONICS & SERIAL TELEMETRY
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // CLUSTER 4: INFOSEC & APPLIED CRYPTOGRAPHY
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // CENTRAL CORE & SYSTEM ENGINES
  // -------------------------------------------------------------
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

export function ProjectConstellation() {
  const [selectedNode, setSelectedNode] = useState<ConstellationNode>(nodes[0])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [activeCluster, setActiveCluster] = useState<string>('all')

  const activeId = hoveredNode || selectedNode.id
  const activeNode = nodes.find((n) => n.id === activeId) || selectedNode

  // Determine if a node is connected to the currently active node
  const isDirectlyConnected = (nodeId: string) => {
    if (nodeId === activeNode.id) return true
    if (activeNode.connections.includes(nodeId)) return true
    const otherNode = nodes.find((n) => n.id === nodeId)
    return otherNode?.connections.includes(activeNode.id) ?? false
  }

  // Filter clusters if user isolates a quadrant
  const isNodeVisibleInCluster = (node: ConstellationNode) => {
    if (activeCluster === 'all') return true
    return node.cluster === activeCluster
  }

  return (
    <div className="rounded-xl border border-[#232832] bg-[#101217] p-5 sm:p-7 space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232832]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#e1523d] font-semibold">// DATA PORTRAIT</span>
            <span className="text-[11px] font-mono text-[#6b7280]">SYSTEM CONSTELLATION GRAPH</span>
          </div>
          <h3 className="text-xl font-bold text-[#f2eee6] mt-1">
            Interconnected Engineering Knowledge Graph
          </h3>
          <p className="text-xs text-[#9ca3af] mt-1 max-w-xl font-light">
            Every edge represents an architectural link between projects, technical specializations, and systems principles. Click or hover any node to trace its network.
          </p>
        </div>

        {/* Cluster Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {[
            { id: 'all', label: 'All Clusters' },
            { id: 'ai', label: 'AI & Aid' },
            { id: 'multiagent', label: 'Multi-Agent' },
            { id: 'hardware', label: 'Avionics' },
            { id: 'infosec', label: 'InfoSec' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCluster(c.id)}
              className={`rounded px-2.5 py-1 transition-all ${
                activeCluster === c.id
                  ? 'bg-[#1e232d] text-[#f2eee6] font-bold border border-[#e1523d]'
                  : 'bg-[#090a0d] text-[#8b949e] border border-[#232832] hover:text-[#f2eee6]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pure SVG Constellation Canvas: Perfectly unified coordinate space */}
      <div className="relative w-full aspect-[1000/520] min-h-[440px] sm:min-h-[480px] rounded-lg border border-[#1a1e26] bg-[#090a0d] overflow-hidden select-none">
        <svg
          viewBox="0 0 1000 520"
          className="w-full h-full"
        >
          <defs>
            {/* Glowing filter for highlighted pathways */}
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Subtle background glow for clusters */}
            <radialGradient id="aiGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e1523d" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#e1523d" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="agentGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b68ff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#3b68ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hardwareGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cryptoGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Cluster Zones */}
          <rect x="25" y="25" width="270" height="255" rx="8" fill="url(#aiGlow)" stroke="#1a202c" strokeDasharray="3 3" strokeWidth="0.8" opacity="0.6" />
          <text x="35" y="45" fill="#e1523d" fontSize="9" fontFamily="monospace" opacity="0.7">// CLUSTER 01: AI &amp; SCHOLARSHIPS</text>

          <rect x="315" y="25" width="315" height="230" rx="8" fill="url(#agentGlow)" stroke="#1a202c" strokeDasharray="3 3" strokeWidth="0.8" opacity="0.6" />
          <text x="325" y="45" fill="#3b68ff" fontSize="9" fontFamily="monospace" opacity="0.7">// CLUSTER 02: MULTI-AGENT SUPPLY CHAINS</text>

          <rect x="650" y="25" width="325" height="255" rx="8" fill="url(#hardwareGlow)" stroke="#1a202c" strokeDasharray="3 3" strokeWidth="0.8" opacity="0.6" />
          <text x="660" y="45" fill="#10b981" fontSize="9" fontFamily="monospace" opacity="0.7">// CLUSTER 03: HARDWARE &amp; AVIONICS</text>

          <rect x="25" y="315" width="350" height="185" rx="8" fill="url(#cryptoGlow)" stroke="#1a202c" strokeDasharray="3 3" strokeWidth="0.8" opacity="0.6" />
          <text x="35" y="335" fill="#f59e0b" fontSize="9" fontFamily="monospace" opacity="0.7">// CLUSTER 04: INFOSEC &amp; DATA FORENSICS</text>

          <rect x="500" y="315" width="475" height="185" rx="8" fill="#141821" fillOpacity="0.25" stroke="#1a202c" strokeDasharray="3 3" strokeWidth="0.8" opacity="0.6" />
          <text x="510" y="335" fill="#8b949e" fontSize="9" fontFamily="monospace" opacity="0.7">// CLUSTER 05: SYSTEMS &amp; DETERMINISTIC ENGINES</text>

          {/* Render All Connection Lines (Guaranteed 100% precision: from source cx,cy to target cx,cy) */}
          {nodes.map((source) =>
            source.connections.map((targetId) => {
              const target = nodes.find((n) => n.id === targetId)
              if (!target) return null

              // Prevent double rendering undirected lines
              if (source.id > target.id) return null

              const isEdgeConnectedToActive =
                source.id === activeId || target.id === activeId

              const edgeInActiveCluster =
                activeCluster === 'all' ||
                source.cluster === activeCluster ||
                target.cluster === activeCluster

              return (
                <line
                  key={`${source.id}-${target.id}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={
                    isEdgeConnectedToActive
                      ? activeNode.color
                      : edgeInActiveCluster
                      ? '#283141'
                      : '#191f2b'
                  }
                  strokeWidth={isEdgeConnectedToActive ? 2.5 : 1}
                  strokeDasharray={isEdgeConnectedToActive ? 'none' : '3,3'}
                  strokeOpacity={
                    isEdgeConnectedToActive
                      ? 1.0
                      : edgeInActiveCluster
                      ? 0.45
                      : 0.15
                  }
                  filter={isEdgeConnectedToActive ? 'url(#nodeGlow)' : undefined}
                  className="transition-all duration-300"
                />
              )
            })
          )}

          {/* Render All Nodes (Circles + Labels with absolute geometric alignment) */}
          {nodes.map((node) => {
            const isSelected = selectedNode.id === node.id
            const isHovered = hoveredNode === node.id
            const isConnected = isDirectlyConnected(node.id)
            const inCluster = isNodeVisibleInCluster(node)

            const opacity = inCluster
              ? isConnected || isHovered || isSelected
                ? 1.0
                : 0.35
              : 0.15

            return (
              <g
                key={node.id}
                onClick={() => setSelectedNode(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer transition-opacity duration-300"
                opacity={opacity}
              >
                {/* Active Outer Pulse Halo */}
                {(isSelected || isHovered) && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius + 8}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                    className="animate-pulse"
                  />
                )}

                {/* Node Outer Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius}
                  fill={isSelected ? node.color : '#0d1017'}
                  stroke={node.color}
                  strokeWidth={node.type === 'project' ? 2.5 : 1.5}
                  filter={isSelected || isHovered ? 'url(#nodeGlow)' : undefined}
                />

                {/* Inner Project Pip */}
                {node.type === 'project' && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius * 0.4}
                    fill={isSelected ? '#ffffff' : node.color}
                  />
                )}

                {/* Label Box Background */}
                <rect
                  x={node.x - 70}
                  y={node.y + node.radius + 5}
                  width="140"
                  height="16"
                  rx="3"
                  fill="#090a0d"
                  fillOpacity={isSelected || isHovered ? '0.95' : '0.75'}
                  stroke={isSelected || isHovered ? node.color : '#1f242e'}
                  strokeWidth={isSelected || isHovered ? '1' : '0.5'}
                />

                {/* Node Label Text */}
                <text
                  x={node.x}
                  y={node.y + node.radius + 16.5}
                  fill={isSelected || isHovered ? '#ffffff' : '#cfd6e0'}
                  fontSize="9.5"
                  fontWeight={isSelected || isHovered ? 'bold' : 'normal'}
                  fontFamily="monospace"
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                >
                  {node.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Selected Node Details Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="rounded-lg border border-[#232832] bg-[#14171d] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: selectedNode.color }}
              />
              <span
                className="font-mono text-xs uppercase tracking-wider font-semibold"
                style={{ color: selectedNode.color }}
              >
                {selectedNode.clusterLabel}
              </span>
              <span className="text-[#4b5563] text-xs">•</span>
              <span className="font-mono text-xs text-[#8b949e]">
                {selectedNode.type.toUpperCase()}
              </span>
              <span className="text-[#4b5563] text-xs">•</span>
              <span className="font-mono text-[11px] text-[#6b7280]">
                {selectedNode.connections.length} Network Connections
              </span>
            </div>

            <h4 className="text-lg font-bold text-[#f2eee6]">
              {selectedNode.label}
            </h4>

            <p className="text-xs text-[#9ca3af] leading-relaxed max-w-2xl font-light">
              {selectedNode.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0 font-mono text-xs">
            {selectedNode.projectSlug && (
              <Link
                href={`/work/${selectedNode.projectSlug}`}
                className="inline-flex items-center gap-1.5 rounded bg-[#e1523d] px-3.5 py-2 text-white font-medium hover:bg-[#ef634f] transition-colors shadow-sm"
              >
                <span>View Case Study</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}

            {selectedNode.labAnchor && (
              <Link
                href={`/lab#${selectedNode.labAnchor}`}
                className="inline-flex items-center gap-1.5 rounded border border-[#3b68ff]/40 bg-[#3b68ff]/10 px-3 py-2 text-[#3b68ff] hover:bg-[#3b68ff] hover:text-white transition-colors"
              >
                <FlaskConical className="h-3.5 w-3.5" />
                <span>Run Simulator</span>
              </Link>
            )}

            <Link
              href="/about#tech-stack"
              className="inline-flex items-center gap-1 rounded border border-[#232832] bg-[#090a0d] px-3 py-2 text-[#8b949e] hover:text-[#f2eee6] hover:border-[#38404f] transition-colors"
            >
              <span>Explore Repertoire &rarr;</span>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
