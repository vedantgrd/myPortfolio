'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Radio,
  Shield,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react'

interface ProjectDiagramProps {
  diagramType:
    | 'student-journey'
    | 'supply-chain'
    | 'drone-architecture'
    | 'crypto-pipeline'
    | 'game-loop'
    | 'event-system'
}

export function ProjectDiagram({ diagramType }: ProjectDiagramProps) {
  // Vidyut: Student Journey & Verification State Machine
  if (diagramType === 'student-journey') {
    return (
      <div className="rounded-xl border border-[#232832] bg-[#090a0d] p-6 lg:p-8 font-mono text-xs">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1f242e] text-[#8b949e]">
          <span className="text-[#e1523d] font-semibold">// ARCHITECTURE: EDUCATION DNA PIPELINE</span>
          <span>DETERMINISTIC EVALUATION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-2">
            <span className="text-[#e1523d] text-[10px] block">STAGE 01</span>
            <div className="font-bold text-[#f2eee6] text-sm">Student Ingestion</div>
            <p className="text-[11px] text-[#9ca3af] font-sans">
              Normalizes academic marks, domicile status, family income, and achievements into JSON Education DNA.
            </p>
            <div className="text-[10px] text-[#6b7280] pt-2 border-t border-[#1f242e]">
              Output: Structured Schema (42 attributes)
            </div>
          </div>

          <div className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-2">
            <span className="text-[#3b68ff] text-[10px] block">STAGE 02</span>
            <div className="font-bold text-[#f2eee6] text-sm">Hard Rule Filter</div>
            <p className="text-[11px] text-[#9ca3af] font-sans">
              Evaluates binary prerequisites (domicile requirements, minimum CGPA, maximum income threshold).
            </p>
            <div className="text-[10px] text-[#10b981] pt-2 border-t border-[#1f242e]">
              Latency: &lt; 45ms deterministic pass
            </div>
          </div>

          <div className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-2">
            <span className="text-[#f59e0b] text-[10px] block">STAGE 03</span>
            <div className="font-bold text-[#f2eee6] text-sm">Semantic Alignment</div>
            <p className="text-[11px] text-[#9ca3af] font-sans">
              Vector evaluation of subjective scholarship priorities (special talents, research interests, career goals).
            </p>
            <div className="text-[10px] text-[#6b7280] pt-2 border-t border-[#1f242e]">
              Output: Match Confidence Score (0-100%)
            </div>
          </div>

          <div className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-2">
            <span className="text-[#10b981] text-[10px] block">STAGE 04</span>
            <div className="font-bold text-[#f2eee6] text-sm">Verified State Machine</div>
            <p className="text-[11px] text-[#9ca3af] font-sans">
              Transitions: Draft &rarr; Pre-Screened &rarr; Doc Matched &rarr; Final Submission &rarr; Institutional Review.
            </p>
            <div className="text-[10px] text-[#10b981] pt-2 border-t border-[#1f242e]">
              Status: Audit-Proof Trail
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Bullwhip AI: Multi-Echelon Signal Flow
  if (diagramType === 'supply-chain') {
    return (
      <div className="rounded-xl border border-[#232832] bg-[#090a0d] p-6 lg:p-8 font-mono text-xs">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1f242e] text-[#8b949e]">
          <span className="text-[#3b68ff] font-semibold">// ARCHITECTURE: 4-ECHELON DECENTRALIZED AGENT NETWORK</span>
          <span>DEMAND SIGNAL DAMPENING</span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              { tier: 'Echelon 1', name: 'Retailer Agent', variance: '±5% base demand', lag: 'Lead: 1 wk' },
              { tier: 'Echelon 2', name: 'Wholesaler Agent', variance: '±12% naive / ±8% agent', lag: 'Lead: 2 wks' },
              { tier: 'Echelon 3', name: 'Distributor Agent', variance: '±24% naive / ±15% agent', lag: 'Lead: 3 wks' },
              { tier: 'Echelon 4', name: 'Factory / Producer', variance: '±48% naive / ±28% agent', lag: 'Lead: 4 wks' },
            ].map((node, i) => (
              <div key={node.name} className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-[#8b949e]">
                  <span>{node.tier}</span>
                  <span>{node.lag}</span>
                </div>
                <div className="font-bold text-[#f2eee6] text-sm">{node.name}</div>
                <div className="text-[11px] text-[#3b68ff]">{node.variance}</div>
              </div>
            ))}
          </div>

          <div className="rounded border border-[#1f242e] bg-[#14171d] p-4 text-[11px] text-[#9ca3af] font-sans flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>
              <strong>Dampening Mechanism:</strong> Exponential smoothing of downstream point-of-sale signals combined with adaptive lead-time inventory buffering reduces upstream oscillation by ~34%.
            </span>
            <a
              href="/lab"
              className="inline-flex items-center gap-1.5 rounded bg-[#3b68ff] px-3 py-1.5 font-mono text-xs text-white uppercase whitespace-nowrap hover:bg-[#507bff] transition-colors"
            >
              <span>Launch Simulator</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Agridrone: Hardware Avionics & Android Ground Station
  if (diagramType === 'drone-architecture') {
    return (
      <div className="rounded-xl border border-[#232832] bg-[#090a0d] p-6 lg:p-8 font-mono text-xs">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1f242e] text-[#8b949e]">
          <span className="text-[#10b981] font-semibold">// ARCHITECTURE: AIR-TO-GROUND TELEMETRY LINK</span>
          <span>433MHz WIRELESS BRIDGE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Airborne Avionics */}
          <div className="rounded-lg border border-[#232832] bg-[#14171d] p-5 space-y-3">
            <div className="flex items-center justify-between text-[#10b981] text-xs font-bold">
              <span>AIRBORNE SYSTEM (QUADCOPTER)</span>
              <Cpu className="h-4 w-4" />
            </div>
            <ul className="space-y-1.5 text-[11px] text-[#9ca3af]">
              <li>• Flight Controller (PID attitude estimation & gyro dampening)</li>
              <li>• Electronic Speed Controllers (ESCs) + Brushless Outrunner Motors</li>
              <li>• GPS & Compass Module (Autonomous hover & return-to-launch)</li>
              <li>• Optical Sensor Camera Mount (RGB Crop Imagery)</li>
              <li>• 433MHz Serial Radio Transceiver (Ground uplink)</li>
            </ul>
          </div>

          {/* Ground Control Station */}
          <div className="rounded-lg border border-[#232832] bg-[#14171d] p-5 space-y-3">
            <div className="flex items-center justify-between text-[#3b68ff] text-xs font-bold">
              <span>GROUND CONTROL STATION (ANDROID)</span>
              <Smartphone className="h-4 w-4" />
            </div>
            <ul className="space-y-1.5 text-[11px] text-[#9ca3af]">
              <li>• Native Android Ground Control APK (Java)</li>
              <li>• Serial USB-OTG Telemetry Radio Receiver</li>
              <li>• Real-Time Flight HUD: Battery Voltage, Altitude, Satellites</li>
              <li>• Failsafe Emergency Override & Hover Trigger</li>
              <li>• Localized Crop Health Analysis Script Integration</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  // CipherLab: Cryptography
  if (diagramType === 'crypto-pipeline') {
    return (
      <div className="rounded-xl border border-[#232832] bg-[#090a0d] p-6 lg:p-8 font-mono text-xs">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1f242e] text-[#8b949e]">
          <span className="text-[#f59e0b] font-semibold">// ARCHITECTURE: CRYPTANALYSIS PIPELINE</span>
          <span>ENTROPY & FREQUENCY INSPECTION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-2">
            <span className="text-[#f59e0b] text-[10px] block">INPUT TRANSFORMATION</span>
            <div className="font-bold text-[#f2eee6] text-sm">Key Scheduling & Matrix Ops</div>
            <p className="text-[11px] text-[#9ca3af] font-sans">
              Modular arithmetic shifts across Caesar, Vigenère polyalphabetic sequences, and substitution mappings.
            </p>
          </div>
          <div className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-2">
            <span className="text-[#3b68ff] text-[10px] block">AVALANCHE DIFFUSION</span>
            <div className="font-bold text-[#f2eee6] text-sm">Bit Cascade Analyzer</div>
            <p className="text-[11px] text-[#9ca3af] font-sans">
              Monitors how flipping a single input bit cascades across hash bit vectors to measure diffusion entropy.
            </p>
          </div>
          <div className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-2">
            <span className="text-[#10b981] text-[10px] block">STATISTICAL CRYPTANALYSIS</span>
            <div className="font-bold text-[#f2eee6] text-sm">Frequency Histogram</div>
            <p className="text-[11px] text-[#9ca3af] font-sans">
              Calculates Chi-squared statistic against standard English letter frequencies to evaluate monoalphabetic vulnerability.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Pokémon RPG & DevSprint default
  return (
    <div className="rounded-xl border border-[#232832] bg-[#090a0d] p-6 lg:p-8 font-mono text-xs">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1f242e] text-[#8b949e]">
        <span className="text-[#ef4444] font-semibold">// ARCHITECTURE: GAME LOOP & STATE STACK</span>
        <span>PYGAME TICK PIPELINE</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-1">
          <span className="text-[10px] text-[#8b949e]">LOOP PHASE 1</span>
          <div className="font-bold text-[#f2eee6]">Input Polling & Delta Timing</div>
          <p className="text-[11px] text-[#9ca3af] font-sans">Normalizes character velocities across varying monitor refresh rates.</p>
        </div>
        <div className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-1">
          <span className="text-[10px] text-[#8b949e]">LOOP PHASE 2</span>
          <div className="font-bold text-[#f2eee6]">AABB Spatial Partitioning</div>
          <p className="text-[11px] text-[#9ca3af] font-sans">Resolves tile collision slide vectors along obstacle boundaries.</p>
        </div>
        <div className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-1">
          <span className="text-[10px] text-[#8b949e]">LOOP PHASE 3</span>
          <div className="font-bold text-[#f2eee6]">Battle State Machine</div>
          <p className="text-[11px] text-[#9ca3af] font-sans">Turn priority calculation, accuracy checks, and HP interpolation animations.</p>
        </div>
      </div>
    </div>
  )
}
