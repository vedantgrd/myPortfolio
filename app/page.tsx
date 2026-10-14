import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Terminal,
  Sparkles,
  ExternalLink,
  Shield,
  Bot,
} from 'lucide-react'
import { projects } from '@/data/projects'
import { articles } from '@/data/writing'
import { ProjectConstellation } from '@/components/visualizations/ProjectConstellation'

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured)
  const recentArticles = articles.slice(0, 3)

  return (
    <div className="relative min-h-screen bg-[#0d0f12]">
      {/* Editorial Cover / Hero Section */}
      <section className="relative border-b border-[#232832] pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Masthead Header Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#1d222b] text-xs font-mono text-[#8b949e]">
            <div className="flex items-center gap-3">
              <span className="text-[#e1523d] font-semibold">// COVER ISSUE</span>
              <span>VOL. 01 — EDITION 2026</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">AUTONOMOUS AGENTS & SYSTEMS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#10b981]" />
              <span className="text-[#a3abb6]">
                PILLAI COLLEGE OF ENGINEERING // THANE
              </span>
            </div>
          </div>

          {/* Hero Main Editorial Grid */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Left Typography Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 rounded border border-[#e1523d]/30 bg-[#e1523d]/10 px-3 py-1 font-mono text-xs text-[#e1523d]">
                <span>ARCHIVE & LIVING NOTEBOOK</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f2eee6] leading-[1.08]">
                Still figuring it out. <br />
                <span className="text-[#8b949e] font-serif italic font-normal">
                  Still building anyway.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-[#9ca3af] leading-relaxed max-w-2xl font-light">
                I’m <strong className="text-[#f2eee6] font-semibold">Vedant Garud</strong> — a software engineer and student builder at Pillai College of Engineering, specializing in Information Security & Data Forensics. I build multi-agent supply chain models, scholarship discovery engines, and quadcopter avionics.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded bg-[#e1523d] px-5 py-3 font-mono text-xs uppercase tracking-wider text-white font-medium hover:bg-[#ef634f] transition-colors"
                >
                  <span>Explore Selected Work</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/writing"
                  className="inline-flex items-center gap-2 rounded border border-[#232832] bg-[#14171d] px-5 py-3 font-mono text-xs uppercase tracking-wider text-[#f2eee6] hover:border-[#8b949e] hover:bg-[#1a1e26] transition-colors"
                >
                  <BookOpen className="h-4 w-4 text-[#8b949e]" />
                  <span>The Unfiltered Notebook</span>
                </Link>
              </div>

              {/* Quick Status Bar */}
              <div className="pt-6 border-t border-[#1d222b] grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs text-[#8b949e]">
                <div>
                  <span className="text-[#6b7280] block text-[10px]">CURRENT FOCUS</span>
                  <span className="text-[#e4decb]">Multi-Agent AI & InfoSec</span>
                </div>
                <div>
                  <span className="text-[#6b7280] block text-[10px]">EXPERIENCE</span>
                  <span className="text-[#e4decb]">VFS Global (Backend)</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[#6b7280] block text-[10px]">PHILOSOPHY</span>
                  <span className="text-[#e1523d]">Unfinished by Design</span>
                </div>
              </div>
            </div>

            {/* Right Portrait & Visual Column */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
              <div className="relative w-full max-w-sm rounded-xl border border-[#232832] bg-[#14171d] p-4 shadow-2xl">
                {/* Photo Container */}
                <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-[#282e3b] bg-[#090a0d]">
                  <img
                    src="/images/profile.jpg"
                    alt="Vedant Garud portrait"
                    className="h-full w-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute bottom-2 left-2 rounded bg-[#090a0d]/80 backdrop-blur-sm px-2 py-1 font-mono text-[10px] text-[#a3abb6] border border-[#232832]">
                    VEDANT GARUD // MUMBAI
                  </div>
                </div>

                {/* Photo Annotation Caption */}
                <div className="mt-4 space-y-2 font-mono text-xs text-[#8b949e]">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#e1523d]">FIG. 01 — THE BUILDER</span>
                    <span>19.033° N, 73.029° E</span>
                  </div>
                  <p className="text-[12px] font-sans text-[#a3abb6] leading-relaxed">
                    “I design, build, and occasionally debug my own decisions. Learning how real systems scale, oscillate, and sometimes fail.”
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-[#1f242e] text-[11px]">
                    <span className="text-[#10b981]">● Status: In Progress</span>
                    <Link
                      href="/about"
                      className="text-[#f2eee6] hover:text-[#e1523d] transition-colors inline-flex items-center gap-1"
                    >
                      <span>Read Bio</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION A: SELECTED WORK (Distinct Visual Treatments) */}
      <section className="py-24 border-b border-[#232832]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="font-mono text-xs font-semibold text-[#e1523d] uppercase tracking-wider">
                // SECTION 01: EXHIBITION
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f2eee6] mt-2">
                Selected Work & Systems
              </h2>
              <p className="text-sm text-[#9ca3af] mt-1 max-w-xl">
                Not generic demo cards. Each project explores a distinct technical hypothesis across AI, hardware telemetry, and educational data.
              </p>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#e1523d] hover:text-[#ef634f] transition-colors"
            >
              <span>View Full Project Archive (6)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-12">
            {/* Project 1: Vidyut — Dominant Full-Width Editorial Feature */}
            <div className="rounded-xl border border-[#232832] bg-[#14171d] overflow-hidden hover:border-[#38404f] transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="mono-badge text-[#e1523d] border-[#e1523d]/30">
                        FLAGSHIP R&D
                      </span>
                      <span className="mono-badge">AI & Systems</span>
                      <span className="mono-badge">2025 - Present</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-[#f2eee6]">
                      Vidyut: Autonomous Scholarship Discovery
                    </h3>

                    <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
                      An intelligent scholarship matching engine replacing fragmented portals with an &ldquo;Education DNA&rdquo; profile schema, multi-criteria filtering heuristics, and audit-proof application state machines.
                    </p>

                    {/* Key Architecture Callouts */}
                    <div className="pt-2 grid grid-cols-2 gap-4 font-mono text-xs">
                      <div className="rounded border border-[#1f242e] bg-[#0d0f12] p-3">
                        <span className="text-[#8b949e] block text-[10px]">INNOVATION</span>
                        <span className="text-[#f2eee6] font-semibold">Education DNA Schema</span>
                      </div>
                      <div className="rounded border border-[#1f242e] bg-[#0d0f12] p-3">
                        <span className="text-[#8b949e] block text-[10px]">FILTER SPEED</span>
                        <span className="text-[#10b981] font-semibold">&lt; 45ms deterministic pass</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#1f242e] mt-6">
                    <div className="flex flex-wrap gap-2">
                      {['Next.js 16', 'TypeScript', 'FastAPI', 'PostgreSQL'].map((t) => (
                        <span key={t} className="rounded bg-[#1a1e26] px-2 py-0.5 font-mono text-[10px] text-[#a3abb6]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/work/vidyut"
                      className="inline-flex items-center gap-1.5 rounded bg-[#e1523d] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white hover:bg-[#ef634f] transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Visual Architecture Panel */}
                <div className="lg:col-span-5 bg-[#0d0f12] p-8 border-t lg:border-t-0 lg:border-l border-[#232832] flex flex-col justify-center">
                  <div className="rounded border border-[#232832] bg-[#14171d] p-5 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between text-[#8b949e] text-[11px] pb-2 border-b border-[#232832]">
                      <span>SYSTEM_DIAGRAM // EDUCATION_DNA</span>
                      <span className="text-[#10b981]">ACTIVE</span>
                    </div>
                    <div className="space-y-2 text-[11px]">
                      <div className="flex items-center justify-between text-[#a3abb6]">
                        <span>[1] Student Profile</span>
                        <span className="text-[#e1523d]">&rarr; JSON Schema</span>
                      </div>
                      <div className="flex items-center justify-between text-[#a3abb6]">
                        <span>[2] Deterministic Filter</span>
                        <span className="text-[#e1523d]">&rarr; Cutoffs & Domicile</span>
                      </div>
                      <div className="flex items-center justify-between text-[#a3abb6]">
                        <span>[3] Semantic Matching</span>
                        <span className="text-[#e1523d]">&rarr; Guidelines Analysis</span>
                      </div>
                      <div className="flex items-center justify-between text-[#a3abb6]">
                        <span>[4] State Machine</span>
                        <span className="text-[#10b981]">&rarr; Audit-Verified</span>
                      </div>
                    </div>
                    <div className="pt-2 text-[10px] text-[#6b7280]">
                      Deterministic heuristics reduce false positives before LLM evaluation.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Split Row: Bullwhip AI & Agridrone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bullwhip AI */}
              <div className="rounded-xl border border-[#232832] bg-[#14171d] p-8 flex flex-col justify-between hover:border-[#3b68ff]/50 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="mono-badge text-[#3b68ff] border-[#3b68ff]/30">
                      MULTI-AGENT SIMULATION
                    </span>
                    <span className="font-mono text-xs text-[#8b949e]">2024 - 2025</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#f2eee6]">
                    Bullwhip AI: Perishable Supply Chain Dampener
                  </h3>

                  <p className="text-sm text-[#9ca3af] leading-relaxed">
                    Decentralized multi-agent architecture modeling how consumer demand shocks cascade upstream into food spoilage. Features signal dampening and an interactive in-browser simulation.
                  </p>

                  <div className="rounded border border-[#1f242e] bg-[#0d0f12] p-4 font-mono text-xs">
                    <div className="flex items-center justify-between text-[11px] text-[#8b949e] mb-2">
                      <span>4-ECHELON CHAIN DYNAMICS</span>
                      <span className="text-[#3b68ff]">~34% DAMPENING</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                      <div className="rounded bg-[#1a1e26] py-1 text-[#f2eee6]">Retailer</div>
                      <div className="rounded bg-[#1a1e26] py-1 text-[#f2eee6]">Wholesale</div>
                      <div className="rounded bg-[#1a1e26] py-1 text-[#f2eee6]">Distributor</div>
                      <div className="rounded bg-[#1a1e26] py-1 text-[#3b68ff] font-bold">Factory</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#1f242e] mt-6 flex items-center justify-between">
                  <Link
                    href="/lab"
                    className="font-mono text-xs text-[#3b68ff] hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>Launch Simulator in Lab</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/work/bullwhip-ai"
                    className="font-mono text-xs uppercase tracking-wider text-[#f2eee6] hover:text-[#e1523d] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Agridrone */}
              <div className="rounded-xl border border-[#232832] bg-[#14171d] p-8 flex flex-col justify-between hover:border-[#10b981]/50 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="mono-badge text-[#10b981] border-[#10b981]/30">
                      HARDWARE & TELEMETRY
                    </span>
                    <span className="font-mono text-xs text-[#8b949e]">2023 - 2024</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#f2eee6]">
                    Agriculture Drone: Quadcopter & Android GCS
                  </h3>

                  <p className="text-sm text-[#9ca3af] leading-relaxed">
                    Semi-automated drone prototype built from scratch with custom avionics, 433MHz serial telemetry radio bridge, and a high-contrast Android ground control application for localized crop inspection.
                  </p>

                  <div className="rounded border border-[#1f242e] bg-[#0d0f12] p-4 font-mono text-xs">
                    <div className="flex items-center justify-between text-[11px] text-[#8b949e] mb-2">
                      <span>AVIONICS SPECIFICATION</span>
                      <span className="text-[#10b981]">2.1 : 1 THRUST</span>
                    </div>
                    <div className="space-y-1 text-[11px] text-[#a3abb6]">
                      <div className="flex justify-between">
                        <span>Telemetry Link</span>
                        <span>433MHz Wireless Bridge</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ground Station</span>
                        <span>Native Android (Java)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#1f242e] mt-6 flex items-center justify-between">
                  <a
                    href="https://github.com/vedantgrd/AgricultureDrone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#8b949e] hover:text-[#f2eee6] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Source Code</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <Link
                    href="/work/agridrone"
                    className="font-mono text-xs uppercase tracking-wider text-[#f2eee6] hover:text-[#10b981] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: THE PERSON BEHIND THE CODE */}
      <section className="py-24 border-b border-[#232832] bg-[#0a0c0f]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs font-semibold text-[#e1523d] uppercase tracking-wider">
                // SECTION 02: THE PERSON
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f2eee6]">
                I don’t believe in the myth of the polished 10x engineer.
              </h2>
              <p className="font-mono text-xs text-[#8b949e]">
                (somehow i manage.)
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6 text-[#9ca3af] text-base leading-relaxed">
              <p>
                Most of what I know about systems didn’t come from sterile textbook examples. It came from breaking things: crashing our first drone into dirt because motor vibrations deceived the gyroscope, tracing unindexed SQL queries that timed out during my backend internship at VFS Global, or spending three late nights writing an AABB collision resolver in Python for a Pokémon RPG.
              </p>
              <p>
                I am drawn to <strong className="text-[#f2eee6]">chaotic systems where software intersects physical constraints</strong> — whether that is agricultural drone telemetry in the field, food supply chains oscillating during demand shocks, or students navigating bureaucratic aid portals.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#e1523d] hover:text-[#ef634f] transition-colors font-semibold"
                >
                  <span>Read full personal introduction & timeline</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: THE DATA PORTRAIT (Interactive Constellation) */}
      <section className="py-24 border-b border-[#232832]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="font-mono text-xs font-semibold text-[#e1523d] uppercase tracking-wider">
              // SECTION 03: ARCHITECTURE GRAPH
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f2eee6] mt-2">
              The Project & Idea Constellation
            </h2>
            <p className="text-sm text-[#9ca3af] mt-1">
              A real, documented graph showing how projects, technical domains, and architectural patterns connect in my work.
            </p>
          </div>

          <ProjectConstellation />
        </div>
      </section>

      {/* SECTION D: A GLIMPSE INTO THE NOTEBOOK */}
      <section className="py-24 border-b border-[#232832] bg-[#0a0c0f]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="font-mono text-xs font-semibold text-[#e1523d] uppercase tracking-wider">
                // SECTION 04: THE JOURNAL & LIVING MEMOIR
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f2eee6] mt-2">
                Thoughts, Cinema, Mortality &amp; Being Human
              </h2>
              <p className="text-sm text-[#9ca3af] mt-1 max-w-xl">
                Personal journal entries on mental health, what visiting an orphanage taught me, superheroes, idols, and the quiet questions that keep us awake at night.
              </p>
            </div>
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#e1523d] hover:text-[#ef634f] transition-colors"
            >
              <span>Browse All Articles ({articles.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <article
                key={article.slug}
                className="group rounded-xl border border-[#232832] bg-[#14171d] p-6 flex flex-col justify-between hover:border-[#38404f] transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#8b949e]">
                    <span className="text-[#e1523d]">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#f2eee6] group-hover:text-[#e1523d] transition-colors leading-snug">
                    <Link href={`/writing/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-[#9ca3af] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#1f242e] mt-6 flex items-center justify-between font-mono text-xs text-[#8b949e]">
                  <span>{article.date}</span>
                  <Link
                    href={`/writing/${article.slug}`}
                    className="text-[#f2eee6] group-hover:text-[#e1523d] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Read</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION E: CLOSING INVITATION */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-8 sm:p-14 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-6">
              <span className="font-mono text-xs font-semibold text-[#e1523d] uppercase tracking-wider">
                // TRANSMISSION OPEN
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f2eee6]">
                Have a question, an unfinished idea, or a problem worth building?
              </h2>
              <p className="text-base text-[#9ca3af] leading-relaxed">
                Whether you want to discuss multi-agent simulations in supply chains, argue about flight telemetry protocols, explore scholarship platforms, or collaborate on something technically challenging, I’d love to hear from you.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded bg-[#e1523d] px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-white font-medium hover:bg-[#ef634f] transition-colors"
                >
                  <span>Transmit a Message</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href="mailto:vedantgarud05@gmail.com"
                  className="inline-flex items-center gap-2 rounded border border-[#232832] bg-[#0d0f12] px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-[#f2eee6] hover:border-[#8b949e] transition-colors"
                >
                  <span>vedantgarud05@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
