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
    x: 145,
    y: 460,
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
    x: 295,
    y: 445,
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
    x: 440,
    y: 350,
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
    x: 590,
    y: 375,
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
    y: 385,
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
    x: 905,
    y: 430,
    color: '#ef4444',
    radius: 10,
    description: 'Frame-independent delta-time movement and AABB spatial collision slide vectoring.',
    connections: ['pokemon'],
  },
]

interface ClusterConfig {
  id: string
  label: string
  title: string
  color: string
  glowId: string
  leadNodeId: string
  x: number
  y: number
  width: number
  height: number
}

const clusters: ClusterConfig[] = [
  {
    id: 'ai',
    label: 'AI & Aid',
    title: '// CLUSTER 01: AI & SCHOLARSHIPS',
    color: '#e1523d',
    glowId: 'aiGlow',
    leadNodeId: 'vidyut',
    x: 25,
    y: 20,
    width: 270,
    height: 265,
  },
  {
    id: 'multiagent',
    label: 'Multi-Agent',
    title: '// CLUSTER 02: MULTI-AGENT SUPPLY CHAINS',
    color: '#3b68ff',
    glowId: 'agentGlow',
    leadNodeId: 'bullwhip',
    x: 315,
    y: 20,
    width: 315,
    height: 265,
  },
  {
    id: 'hardware',
    label: 'Avionics',
    title: '// CLUSTER 03: HARDWARE & AVIONICS',
    color: '#10b981',
    glowId: 'hardwareGlow',
    leadNodeId: 'agridrone',
    x: 650,
    y: 20,
    width: 325,
    height: 265,
  },
  {
    id: 'infosec',
    label: 'InfoSec',
    title: '// CLUSTER 04: INFOSEC & DATA FORENSICS',
    color: '#f59e0b',
    glowId: 'cryptoGlow',
    leadNodeId: 'cipherlab',
    x: 25,
    y: 300,
    width: 350,
    height: 205,
  },
  {
    id: 'core',
    label: 'Systems Core',
    title: '// CLUSTER 05: SYSTEMS & DETERMINISTIC ENGINES',
    color: '#ef4444',
    glowId: 'coreGlow',
    leadNodeId: 'pokemon',
    x: 395,
    y: 300,
    width: 580,
    height: 205,
  },
]

export function ProjectConstellation() {
  const [selectedNode, setSelectedNode] = useState<ConstellationNode>(nodes[0])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [activeCluster, setActiveCluster] = useState<string>('all')

  const handleClusterSelect = (clusterId: string) => {
    setActiveCluster(clusterId)
    setHoveredNode(null)
    if (clusterId === 'all') {
      const defaultNode = nodes.find((n) => n.id === 'vidyut') || nodes[0]
      setSelectedNode(defaultNode)
    } else {
      const clusterConfig = clusters.find((c) => c.id === clusterId)
      const targetNode =
        nodes.find((n) => n.id === clusterConfig?.leadNodeId) ||
        nodes.find((n) => n.cluster === clusterId)
      if (targetNode) {
        setSelectedNode(targetNode)
      }
    }
  }

  const isFiltered = activeCluster !== 'all'
  const activeClusterConfig = clusters.find((c) => c.id === activeCluster)
  const activeId = hoveredNode || selectedNode.id
  const activeNode = nodes.find((n) => n.id === activeId) || selectedNode

  // Determine if a node is connected to the currently active node
  const isDirectlyConnected = (nodeId: string) => {
    if (nodeId === activeNode.id) return true
    if (activeNode.connections.includes(nodeId)) return true
    const otherNode = nodes.find((n) => n.id === nodeId)
    return otherNode?.connections.includes(activeNode.id) ?? false
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
            { id: 'all', label: 'All Clusters', color: '#e1523d' },
            ...clusters.map((c) => ({ id: c.id, label: c.label, color: c.color })),
          ].map((c) => {
            const isSelectedFilter = activeCluster === c.id
            return (
              <button
                key={c.id}
                onClick={() => handleClusterSelect(c.id)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs transition-all ${
                  isSelectedFilter
                    ? 'bg-[#181d26] text-[#ffffff] font-bold shadow-lg'
                    : 'bg-[#090a0d] text-[#8b949e] border border-[#232832] hover:text-[#f2eee6] hover:border-[#38404f]'
                }`}
                style={{
                  borderColor: isSelectedFilter ? c.color : undefined,
                  borderWidth: isSelectedFilter ? '1.5px' : '1px',
                  boxShadow: isSelectedFilter ? `0 0 14px ${c.color}35` : undefined,
                }}
              >
                <span
                  className="h-2 w-2 rounded-full transition-transform"
                  style={{
                    backgroundColor: c.color,
                    transform: isSelectedFilter ? 'scale(1.25)' : 'scale(1)',
                    boxShadow: isSelectedFilter ? `0 0 8px ${c.color}` : 'none',
                  }}
                />
                <span>{c.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Pure SVG Constellation Canvas: Perfectly unified coordinate space */}
      <div className="relative w-full aspect-[1000/520] min-h-[440px] sm:min-h-[480px] rounded-lg border border-[#1a1e26] bg-[#090a0d] overflow-hidden select-none">
        <svg
          viewBox="0 0 1000 520"
          className="w-full h-full"
        >
          <defs>
            {/* Glowing filter for highlighted pathways and nodes */}
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glowing filter for high-clarity text */}
            <filter id="textGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#ffffff" floodOpacity="0.4" />
            </filter>

            {/* Background radial gradients for cluster zones */}
            <radialGradient id="aiGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e1523d" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#e1523d" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="agentGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b68ff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b68ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hardwareGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cryptoGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Cluster Zones: only the active cluster glows brightly when filtered */}
          {clusters.map((cluster) => {
            const isClusterActive = activeCluster === cluster.id
            const isDimmed = isFiltered && !isClusterActive

            return (
              <g
                key={cluster.id}
                onClick={() => handleClusterSelect(cluster.id)}
                className="cursor-pointer transition-all duration-300"
              >
                <rect
                  x={cluster.x}
                  y={cluster.y}
                  width={cluster.width}
                  height={cluster.height}
                  rx="10"
                  fill={`url(#${cluster.glowId})`}
                  fillOpacity={isClusterActive ? 0.35 : isDimmed ? 0.02 : 0.12}
                  stroke={isClusterActive ? cluster.color : isDimmed ? '#141821' : '#232a38'}
                  strokeDasharray={isClusterActive ? 'none' : '4 4'}
                  strokeWidth={isClusterActive ? 2 : 1}
                  filter={isClusterActive ? 'url(#nodeGlow)' : undefined}
                  opacity={isDimmed ? 0.12 : 1.0}
                  className="transition-all duration-300"
                />
                <text
                  x={cluster.x + 14}
                  y={cluster.y + 22}
                  fill={isClusterActive ? cluster.color : isDimmed ? '#242b38' : cluster.color}
                  fontSize={isClusterActive ? '11' : '9.5'}
                  fontWeight={isClusterActive ? 'bold' : 'normal'}
                  fontFamily="monospace"
                  opacity={isDimmed ? 0.15 : isClusterActive ? 1.0 : 0.75}
                  filter={isClusterActive ? 'url(#nodeGlow)' : undefined}
                  className="transition-all duration-300 select-none"
                >
                  {cluster.title}
                </text>
              </g>
            )
          })}

          {/* Render All Connection Lines */}
          {nodes.map((source) =>
            source.connections.map((targetId) => {
              const target = nodes.find((n) => n.id === targetId)
              if (!target) return null
              if (source.id > target.id) return null // avoid duplicate undirected lines

              // When filtered: ONLY lines between nodes within active cluster glow!
              const bothInActiveCluster =
                isFiltered &&
                source.cluster === activeCluster &&
                target.cluster === activeCluster

              // When NOT filtered: lines connected to the active/hovered node glow
              const isConnectedToActiveNode =
                !isFiltered && (source.id === activeId || target.id === activeId)

              const isGlowingLine = bothInActiveCluster || isConnectedToActiveNode

              // If a cluster is filtered, suppress cross-cluster lines so ONLY that cluster glows
              if (isFiltered && !bothInActiveCluster) {
                return null
              }

              // Determine line color
              const lineColor = isFiltered
                ? activeClusterConfig?.color || '#3b68ff'
                : activeNode.color

              return (
                <line
                  key={`${source.id}-${target.id}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={isGlowingLine ? lineColor : '#283141'}
                  strokeWidth={isGlowingLine ? 2.5 : 1}
                  strokeDasharray={isGlowingLine ? 'none' : '3,3'}
                  strokeOpacity={isGlowingLine ? 1.0 : 0.25}
                  filter={isGlowingLine ? 'url(#nodeGlow)' : undefined}
                  className="transition-all duration-300"
                />
              )
            })
          )}

          {/* Render All Nodes (Circles + Labels with absolute geometric alignment) */}
          {nodes.map((node) => {
            const isNodeInActiveCluster = !isFiltered || node.cluster === activeCluster
            const isSelected = selectedNode.id === node.id
            const isHovered = hoveredNode === node.id
            const isConnected = isDirectlyConnected(node.id)

            // Glowing state:
            // When a cluster filter is clicked, ALL nodes inside that cluster glow!
            // When 'all' is selected, active node and directly connected neighbors glow
            const isGlowing = isFiltered
              ? isNodeInActiveCluster
              : isSelected || isHovered || isConnected

            const opacity = isFiltered
              ? isNodeInActiveCluster
                ? 1.0
                : 0.08 // dim everything else completely
              : isGlowing
              ? 1.0
              : 0.45

            return (
              <g
                key={node.id}
                onClick={() => {
                  setSelectedNode(node)
                  if (isFiltered && node.cluster !== activeCluster) {
                    handleClusterSelect(node.cluster)
                  }
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer transition-opacity duration-300"
                opacity={opacity}
              >
                {/* Active Outer Pulse Halo */}
                {(isSelected || isHovered) && isNodeInActiveCluster && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius + 8}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="2"
                    strokeOpacity="0.8"
                    filter="url(#nodeGlow)"
                    className="animate-pulse"
                  />
                )}

                {/* Node Outer Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius}
                  fill={isSelected && isNodeInActiveCluster ? node.color : '#0d1017'}
                  stroke={isGlowing ? node.color : '#232a38'}
                  strokeWidth={node.type === 'project' ? 2.5 : 1.5}
                  filter={isGlowing ? 'url(#nodeGlow)' : undefined}
                />

                {/* Inner Project Pip */}
                {node.type === 'project' && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius * 0.4}
                    fill={isSelected && isNodeInActiveCluster ? '#ffffff' : node.color}
                  />
                )}

                {/* Label Box Background */}
                <rect
                  x={node.x - 70}
                  y={node.y + node.radius + 5}
                  width="140"
                  height="18"
                  rx="3"
                  fill="#090a0d"
                  fillOpacity={isGlowing ? 0.95 : 0.6}
                  stroke={isGlowing ? node.color : '#1f242e'}
                  strokeWidth={isGlowing ? 1 : 0.5}
                  filter={isGlowing && (isSelected || isHovered) ? 'url(#nodeGlow)' : undefined}
                />

                {/* Node Label Text */}
                <text
                  x={node.x}
                  y={node.y + node.radius + 17.5}
                  fill={
                    !isNodeInActiveCluster
                      ? '#2d3748'
                      : isSelected || isHovered
                      ? '#ffffff'
                      : isGlowing
                      ? '#f2eee6'
                      : '#8b949e'
                  }
                  fontSize="9.5"
                  fontWeight={isGlowing ? 'bold' : 'normal'}
                  fontFamily="monospace"
                  textAnchor="middle"
                  filter={isGlowing && isNodeInActiveCluster ? 'url(#textGlow)' : undefined}
                  className="pointer-events-none select-none transition-colors duration-200"
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
