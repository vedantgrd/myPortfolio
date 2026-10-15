import Link from 'next/link'
import { ArrowLeft, Cpu, FlaskConical, Sparkles, Terminal } from 'lucide-react'
import { BullwhipSimulator } from '@/components/lab/BullwhipSimulator'
import { CipherVisualizer } from '@/components/lab/CipherVisualizer'
import { ProjectSkillMap } from '@/components/lab/ProjectSkillMap'

export default function LabPage() {
  return (
    <div className="min-h-screen bg-[#0d0f12] pt-6 pb-20 sm:pt-8 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="pb-12 border-b border-[#232832]">
          <div className="flex items-center gap-3 font-mono text-xs text-[#e1523d]">
            <span>// CHAPTER 05</span>
            <span>•</span>
            <span>TECHNICAL PLAYGROUND & REPRODUCIBLE EXPERIMENTS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee6] mt-3">
            The Living Laboratory
          </h1>
          <p className="text-base sm:text-lg text-[#9ca3af] mt-4 max-w-3xl leading-relaxed">
            A sandbox for interactive simulations, live cryptographic algorithms, and empirical system models. Every control on this page runs genuine client-side code — no static mockups or non-functional sliders.
          </p>
        </div>

        {/* Experiment 1: Bullwhip AI Simulator */}
        <section id="bullwhip-simulator">
          <BullwhipSimulator />
        </section>

        {/* Experiment 2: CipherLab Cryptography */}
        <section id="cipher-lab">
          <CipherVisualizer />
        </section>

        {/* Experiment 3: Project-Linked Skill Map */}
        <section id="skill-matrix">
          <ProjectSkillMap />
        </section>

        {/* Closing note */}
        <div className="rounded-xl border border-[#232832] bg-[#090a0d] p-6 text-center font-mono text-xs text-[#8b949e]">
          <span>
            HAVE AN EXPERIMENT OR SIMULATION IDEA TO EXPLORE? //{' '}
          </span>
          <Link href="/contact" className="text-[#e1523d] hover:underline font-semibold">
            Transmit a suggestion &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
