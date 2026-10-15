'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  Cpu,
  Layers,
  Shield,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Database,
  Radio,
  ExternalLink,
} from 'lucide-react'

interface TechItem {
  name: string
  category: 'languages' | 'frontend' | 'backend' | 'infosec' | 'ai-robotics'
  highlight: string
  context: string
  project?: string
  projectSlug?: string
  level?: string
}

const techItems: TechItem[] = [
  // Languages
  {
    name: 'TypeScript',
    category: 'languages',
    highlight: 'Strict Typing & Next.js 16',
    context: 'Primary language for modern web applications, simulation state, and high-density editorial UI.',
    project: 'Vidyut',
    projectSlug: 'vidyut',
  },
  {
    name: 'Python 3',
    category: 'languages',
    highlight: 'Systems & Modeling',
    context: 'Applied for discrete-event supply chain modeling, Pygame game physics, and mathematical cryptanalysis.',
    project: 'Bullwhip AI',
    projectSlug: 'bullwhip-ai',
  },
  {
    name: 'Java / Android SDK',
    category: 'languages',
    highlight: 'Native Mobile & GCS',
    context: 'Engineered native Android ground control station for quadcopter telemetry monitoring.',
    project: 'Agridrone',
    projectSlug: 'agridrone',
  },
  {
    name: 'SQL (PostgreSQL / MySQL)',
    category: 'languages',
    highlight: 'Data Architecture',
    context: 'Normalized relational schemas, ACID transactions, and deterministic <45ms query filters.',
    project: 'Vidyut',
    projectSlug: 'vidyut',
  },
  {
    name: 'Embedded C / C++',
    category: 'languages',
    highlight: 'Avionics & Microcontrollers',
    context: 'Flight controller tuning, motor ESC radio bridges, and physical sensor telemetry.',
    project: 'Agridrone',
    projectSlug: 'agridrone',
  },

  // Frontend & UI
  {
    name: 'Next.js 16 (App Router)',
    category: 'frontend',
    highlight: 'Production Framework',
    context: 'Server Components, streaming SSR, Edge middleware, and zero-compromise editorial layout performance.',
    project: 'Vidyut',
    projectSlug: 'vidyut',
  },
  {
    name: 'React 19',
    category: 'frontend',
    highlight: 'Component Architecture',
    context: 'Modern hooks, client-side simulation engines, and accessible state machines.',
    project: 'Bullwhip AI',
    projectSlug: 'bullwhip-ai',
  },
  {
    name: 'Tailwind CSS 4',
    category: 'frontend',
    highlight: 'Tactile Design Systems',
    context: 'Custom CSS tokens, editorial grid typography, responsive dark modes, and high-density HUDs.',
  },
  {
    name: 'Framer Motion',
    category: 'frontend',
    highlight: 'Restrained Physics Transitions',
    context: 'Choreographed layout animations, scroll-linked progress, and tactile button feedback.',
  },
  {
    name: 'Native SVG & Canvas Engines',
    category: 'frontend',
    highlight: 'Data Visualization',
    context: 'Custom zero-latency SVG charting, bezier demand curves, and frequency histograms without third-party bloat.',
    project: 'The Lab',
    projectSlug: 'bullwhip-ai',
  },

  // Backend & Infrastructure
  {
    name: 'FastAPI (Python)',
    category: 'backend',
    highlight: 'Asynchronous APIs',
    context: 'High-throughput microservices, Pydantic validation, and multi-criteria scholarship heuristics.',
    project: 'Vidyut',
    projectSlug: 'vidyut',
  },
  {
    name: 'API Debugging & Optimization',
    category: 'backend',
    highlight: 'Enterprise Tracing',
    context: 'Audited and optimized production API endpoints and database query bottlenecks during VFS Global internship.',
  },
  {
    name: 'Docker & Linux Toolchain',
    category: 'backend',
    highlight: 'Environments & Containers',
    context: 'Containerized development, Bash scripting, systemd process supervision, and Git version control.',
  },

  // InfoSec & Data Forensics (Specialization)
  {
    name: 'Applied Cryptanalysis',
    category: 'infosec',
    highlight: 'Classical & Modern Ciphers',
    context: 'Live cryptanalysis, letter frequency matching against standard English distributions, and Caesar / Vigenère solvers.',
    project: 'CipherLab',
    projectSlug: 'cipherlab',
  },
  {
    name: 'Avalanche Effect Diffusion',
    category: 'infosec',
    highlight: 'Entropy Cascades',
    context: 'Measuring bit diffusion cascades where a 1-bit input flip triggers >50% unpredictable bit toggling in hash outputs.',
    project: 'CipherLab',
    projectSlug: 'cipherlab',
  },
  {
    name: 'Data Forensics & Artifacts',
    category: 'infosec',
    highlight: 'Academic Major (PCE)',
    context: 'Specializing in Information Security & Data Forensics at Pillai College of Engineering, New Panvel.',
  },

  // AI, Robotics & Systems
  {
    name: 'Multi-Agent Coordination',
    category: 'ai-robotics',
    highlight: 'Decentralized Stabilization',
    context: 'Simulating 4-echelon supply dynamics where signal sharing reduces perishable food rot by ~34%.',
    project: 'Bullwhip AI',
    projectSlug: 'bullwhip-ai',
  },
  {
    name: 'Deterministic State Machines',
    category: 'ai-robotics',
    highlight: 'Finite-State Logic',
    context: 'Audit-verified scholarship application lifecycles and 2D battle game state management.',
    project: 'Pokémon RPG',
    projectSlug: 'pokemon-rpg',
  },
]

const categories = [
  { id: 'all', label: 'All Technologies' },
  { id: 'languages', label: 'Languages' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'backend', label: 'Backend & Infra' },
  { id: 'infosec', label: 'InfoSec & Forensics' },
  { id: 'ai-robotics', label: 'AI & Robotics' },
]

export function HomeTechStack() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null)

  const filteredItems = techItems.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  )

  const getCategoryColor = (cat: TechItem['category']) => {
    switch (cat) {
      case 'languages':
        return { text: 'text-[#e1523d]', border: 'border-[#e1523d]/40', bg: 'bg-[#e1523d]/10' }
      case 'frontend':
        return { text: 'text-[#3b68ff]', border: 'border-[#3b68ff]/40', bg: 'bg-[#3b68ff]/10' }
      case 'backend':
        return { text: 'text-[#10b981]', border: 'border-[#10b981]/40', bg: 'bg-[#10b981]/10' }
      case 'infosec':
        return { text: 'text-[#f59e0b]', border: 'border-[#f59e0b]/40', bg: 'bg-[#f59e0b]/10' }
      case 'ai-robotics':
        return { text: 'text-[#ef4444]', border: 'border-[#ef4444]/40', bg: 'bg-[#ef4444]/10' }
    }
  }

  return (
    <div className="space-y-8">
      {/* Category Pills Switcher */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded px-3 py-1.5 font-mono text-xs transition-all duration-200 ${activeCategory === cat.id
                ? 'bg-[#1a1e26] text-[#f2eee6] font-bold border border-[#e1523d] shadow-sm'
                : 'bg-[#090a0d] text-[#8b949e] border border-[#232832] hover:text-[#f2eee6] hover:border-[#38404f]'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Interactive Grid of Tech Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredItems.map((tech) => {
          const colors = getCategoryColor(tech.category)
          const isHovered = hoveredTech?.name === tech.name

          return (
            <Link
              key={tech.name}
              href="/about#tech-stack"
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
              className={`group relative rounded-xl border p-4 transition-all duration-200 flex flex-col justify-between ${isHovered
                  ? 'border-[#e1523d] bg-[#161a22] shadow-[0_0_20px_rgba(225,82,61,0.12)] scale-[1.02]'
                  : 'border-[#232832] bg-[#14171d] hover:border-[#38404f]'
                }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${colors.bg} ${colors.border} border`} />
                    <span className="font-bold text-[#f2eee6] group-hover:text-white">
                      {tech.name}
                    </span>
                  </div>
                  {tech.project && (
                    <span className="rounded bg-[#090a0d] border border-[#1f242e] px-2 py-0.5 font-mono text-[9px] text-[#cfd6e0] group-hover:border-[#e1523d]/50 group-hover:text-[#e1523d] transition-colors">
                      {tech.project}
                    </span>
                  )}
                </div>

                <p className="text-[11px] font-mono text-[#8b949e] leading-snug">
                  {tech.highlight}
                </p>

                <p className="text-xs font-sans text-[#cfd6e0] leading-relaxed line-clamp-2 font-light">
                  {tech.context}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#1f242e] flex items-center justify-between font-mono text-[10px] text-[#6b7280]">
                <span>Click to view in About Repertoire</span>
                <ArrowRight className="h-3 w-3 text-[#e1523d] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Prominent Callout Banner Linking Directly to About */}
      <div className="rounded-xl border border-[#232832] bg-[#0d0f12] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs text-[#e1523d] font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>FULL TECHNICAL INVENTORY &amp; ENGINEERING PRINCIPLES</span>
          </div>
          <p className="text-sm text-[#cfd6e0] font-light max-w-xl">
            Want to see how these languages, frameworks, and forensics skills integrate into actual systems? The narrative in About details every principle.
          </p>
        </div>

        <Link
          href="/about#tech-stack"
          className="inline-flex items-center gap-2 rounded bg-[#e1523d] px-5 py-3 font-mono text-xs uppercase tracking-wider text-white font-medium hover:bg-[#ef634f] transition-all shadow-sm shrink-0"
        >
          <span>Explore Technical Repertoire in About</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
