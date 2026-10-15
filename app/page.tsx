import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  Cpu,
  Film,
  Layers,
  Sparkles,
  ExternalLink,
  Shield,
  Bot,
  Quote,
  Clock,
  Heart,
  Music,
  Compass,
} from 'lucide-react'
import { projects } from '@/data/projects'
import { articles } from '@/data/writing'
import { tasteData } from '@/data/taste'
import { nowData } from '@/data/now'
import { ProjectConstellation } from '@/components/visualizations/ProjectConstellation'
import { DailyQuoteCard } from '@/components/now/DailyQuoteCard'
import { HomeTechStack } from '@/components/sections/HomeTechStack'

export default function HomePage() {
  // Canonical derivations
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4)
  const featuredArticle = articles.find((a) => a.featured) || articles[0]
  const recentArticles = articles.filter((a) => a.slug !== featuredArticle.slug).slice(0, 2)
  const featuredFilm = tasteData.films[0] // The Truman Show
  const featuredBook = tasteData.books[0] // Steve Jobs by Walter Isaacson
  const featuredArtist = tasteData.artists[1] // The Beatles

  return (
    <div className="relative min-h-screen bg-[#0d0f12] text-[#f2eee6]">
      {/* SECTION 01: INTRODUCTION & EDITORIAL TRAILER */}
      <section className="relative border-b border-[#232832] pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Masthead Header Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#1d222b] text-xs font-mono text-[#8b949e]">
            <div className="flex items-center gap-3">
              <span className="text-[#e1523d] font-semibold">// LIVING ARCHIVE</span>
              <span>A LIFE, IN PROGRESS</span>
              <span className="hidden sm:inline">•</span>
              <span>WHAT I MAKE &amp; WHAT MAKES ME</span>
            </div>
            <Link
              href="/now"
              className="flex items-center gap-2 rounded border border-[#10b981]/30 bg-[#10b981]/10 px-2.5 py-1 text-[#10b981] hover:border-[#10b981] transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span>Right Now ({nowData.lastUpdated}) &rarr;</span>
            </Link>
          </div>

          {/* Hero Main Editorial Grid */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Left Typography Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 rounded border border-[#e1523d]/30 bg-[#e1523d]/10 px-3 py-1 font-mono text-xs text-[#e1523d]">
                <span>PERSONAL ARCHIVE // VOL. 2026</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f2eee6] leading-[1.08]">
                Still figuring it out. <br />
                <span className="text-[#8b949e] font-serif italic font-normal">
                  Still building anyway.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-[#cfd6e0] leading-relaxed max-w-2xl font-light">
                I’m <strong className="text-[#f2eee6] font-semibold">Vedant Garud</strong>, a software engineering student at Pillai College of Engineering. On one side, I build software: multi-agent supply chain models, student aid discovery engines, and quadcopter avionics. On the other side, I think about cinema, mental health, and the things I haven&apos;t figured out yet.
              </p>

              {/* Three Clear Next Steps */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded bg-[#e1523d] px-5 py-3 font-mono text-xs uppercase tracking-wider text-white font-medium hover:bg-[#ef634f] transition-colors shadow-sm"
                >
                  <span>1. Explore My Work</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/writing"
                  className="inline-flex items-center gap-2 rounded border border-[#232832] bg-[#14171d] px-5 py-3 font-mono text-xs uppercase tracking-wider text-[#f2eee6] hover:border-[#8b949e] hover:bg-[#1a1e26] transition-colors"
                >
                  <BookOpen className="h-4 w-4 text-[#8b949e]" />
                  <span>2. Read My Writing</span>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded border border-[#232832] bg-[#090a0d] px-4 py-3 font-mono text-xs uppercase tracking-wider text-[#8b949e] hover:text-[#f2eee6] hover:border-[#38404f] transition-colors"
                >
                  <span>3. Get To Know Me &rarr;</span>
                </Link>
              </div>

              {/* Quick Status Bar */}
              <div className="pt-6 border-t border-[#1d222b] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs text-[#8b949e]">
                <div>
                  <span className="text-[#6b7280] block text-[10px]">CURRENT FOCUS</span>
                  <span className="text-[#e4decb]">Multi-Agent AI &amp; InfoSec</span>
                </div>
                <div>
                  <span className="text-[#6b7280] block text-[10px]">EXPERIENCE</span>
                  <span className="text-[#e4decb]">VFS Global (Backend)</span>
                </div>
                <div>
                  <span className="text-[#6b7280] block text-[10px]">ACADEMIC</span>
                  <span className="text-[#e4decb]">PCE Panvel (B.Tech IT)</span>
                </div>
                <div>
                  <span className="text-[#6b7280] block text-[10px]">PHILOSOPHY</span>
                  <span className="text-[#e1523d]">A Life, in Progress</span>
                </div>
              </div>
            </div>

            {/* Right Portrait & Visual Column */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
              <div className="relative w-full max-w-sm rounded-xl border border-[#232832] bg-[#14171d] p-4 shadow-2xl group hover:border-[#38404f] transition-all">
                {/* Photo Container with b/w to color hover animation */}
                <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-[#282e3b] bg-[#090a0d]">
                  <img
                    src="/images/profile.jpg"
                    alt="Vedant Garud portrait"
                    className="h-full w-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute bottom-2 left-2 rounded bg-[#090a0d]/80 backdrop-blur-sm px-2 py-1 font-mono text-[10px] text-[#a3abb6] border border-[#232832]">
                    VEDANT GARUD // MUMBAI
                  </div>
                </div>

                {/* Photo Annotation Caption */}
                <div className="mt-4 space-y-2 font-mono text-xs text-[#8b949e]">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#e1523d] font-semibold">FIG. 01 — THE PERSON</span>
                    <span>19.033° N, 73.029° E</span>
                  </div>
                  <p className="text-[12px] font-sans text-[#a3abb6] leading-relaxed font-light">
                    “I design, build, and occasionally debug my own decisions. Learning how real systems scale, oscillate, and sometimes fail.”
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-[#1f242e] text-[11px]">
                    <Link
                      href="/now"
                      className="text-[#10b981] hover:underline flex items-center gap-1.5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
                      <span>Status: Active Now</span>
                    </Link>
                    <Link
                      href="/about"
                      className="text-[#f2eee6] hover:text-[#e1523d] transition-colors inline-flex items-center gap-1"
                    >
                      <span>Read Journey</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: SELECTED WORK (3-4 PROJECTS) */}
      <section className="py-24 border-b border-[#232832]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-semibold text-[#e1523d] uppercase tracking-wider">
                // SECTION 02: SELECTED WORK
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f2eee6] mt-2">
                Systems, Simulators &amp; Hardware
              </h2>
              <p className="text-sm text-[#9ca3af] mt-1 max-w-xl font-light">
                Carefully selected projects that demonstrate end-to-end architecture, technical constraints, and working implementations.
              </p>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#e1523d] hover:text-[#ef634f] transition-colors"
            >
              <span>View All Projects &amp; Case Studies</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-8">
            {/* Project 1: Vidyut */}
            <div className="rounded-2xl border border-[#232832] bg-[#14171d] overflow-hidden hover:border-[#38404f] transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="mono-badge text-[#e1523d] border-[#e1523d]/30">
                        FLAGSHIP R&amp;D
                      </span>
                      <span className="mono-badge">AI &amp; Systems</span>
                      <span className="mono-badge">2025 - Present</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-[#f2eee6]">
                      Vidyut: Autonomous Scholarship Discovery
                    </h3>

                    <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed font-light">
                      An intelligent scholarship matching engine replacing fragmented portals with an &ldquo;Education DNA&rdquo; profile schema, multi-criteria filtering heuristics, and audit-proof application state machines.
                    </p>

                    <div className="pt-2 grid grid-cols-2 gap-4 font-mono text-xs">
                      <div className="rounded border border-[#1f242e] bg-[#0d0f12] p-3">
                        <span className="text-[#8b949e] block text-[10px]">CORE SCHEMA</span>
                        <span className="text-[#f2eee6] font-semibold">Education DNA (40+ Fields)</span>
                      </div>
                      <div className="rounded border border-[#1f242e] bg-[#0d0f12] p-3">
                        <span className="text-[#8b949e] block text-[10px]">FILTER SPEED</span>
                        <span className="text-[#10b981] font-semibold">&lt; 45ms deterministic pass</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#1f242e]">
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
                        <span className="text-[#e1523d]">&rarr; Cutoffs &amp; Domicile</span>
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

                  <p className="text-sm text-[#9ca3af] leading-relaxed font-light">
                    Decentralized multi-agent architecture modeling how consumer demand shocks cascade upstream into food spoilage. Features signal dampening and an interactive in-browser simulation.
                  </p>
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
                      HARDWARE &amp; TELEMETRY
                    </span>
                    <span className="font-mono text-xs text-[#8b949e]">2023 - 2024</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#f2eee6]">
                    Agriculture Drone: Quadcopter &amp; Android GCS
                  </h3>

                  <p className="text-sm text-[#9ca3af] leading-relaxed font-light">
                    Semi-automated drone prototype built from scratch with custom avionics, 433MHz serial telemetry radio bridge, and a high-contrast Android ground control application for localized crop inspection.
                  </p>
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

      {/* SECTION 02B: PROJECT CONSTELLATION GRAPH */}
      <section className="py-20 border-b border-[#232832] bg-[#0a0c0f]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="font-mono text-xs font-semibold text-[#e1523d] uppercase tracking-wider">
              // ARCHITECTURAL RELATIONSHIPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f2eee6] mt-1">
              Project &amp; Idea Constellation
            </h2>
            <p className="text-xs sm:text-sm text-[#9ca3af] font-light">
              Interactive network demonstrating how projects, technical domains, and engineering principles connect.
            </p>
          </div>

          <ProjectConstellation />
        </div>
      </section>

      {/* SECTION 02C: TECHNICAL ARSENAL & REPERTOIRE */}
      <section className="py-24 border-b border-[#232832] bg-[#0c0e12]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-semibold text-[#e1523d] uppercase tracking-wider">
                // SECTION 02C: TECHNICAL ARSENAL
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f2eee6] mt-2">
                Core Stack &amp; Systems Matrix
              </h2>
              <p className="text-sm text-[#9ca3af] mt-1 max-w-xl font-light">
                The foundational technologies, full-stack frameworks, forensics tools, and hardware protocols I engineer with. Click any skill chip to inspect its role and context in About.
              </p>
            </div>
            <Link
              href="/about#tech-stack"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#e1523d] hover:text-[#ef634f] transition-colors"
            >
              <span>Explore Detailed Inventory in About</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <HomeTechStack />
        </div>
      </section>

      {/* SECTION 03: THE NOTEBOOK (COMPACT EDITORIAL FEATURE) */}
      <section className="py-24 border-b border-[#232832]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-semibold text-[#e1523d] uppercase tracking-wider">
                // SECTION 03: THE NOTEBOOK
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f2eee6] mt-2">
                Published Essays &amp; Reflections
              </h2>
              <p className="text-sm text-[#9ca3af] mt-1 max-w-xl font-light">
                Long-form writing on mental health, human values, cinema, superheroes, and why perfection is a trap.
              </p>
            </div>
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#e1523d] hover:text-[#ef634f] transition-colors"
            >
              <span>Browse Complete Notebook ({articles.length} Pieces)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Featured Article Card (7 cols) */}
            <article className="lg:col-span-7 rounded-2xl border border-[#232832] bg-[#14171d] p-8 sm:p-10 flex flex-col justify-between space-y-6 hover:border-[#38404f] transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#8b949e] border-b border-[#1f242e] pb-3">
                  <span className="text-[#e1523d] font-semibold">{featuredArticle.category}</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#f2eee6] hover:text-[#e1523d] transition-colors">
                    <Link href={`/writing/${featuredArticle.slug}`}>
                      {featuredArticle.title}
                    </Link>
                  </h3>
                  <p className="font-mono text-xs text-[#8b949e] mt-1">
                    {featuredArticle.subtitle}
                  </p>
                </div>

                <blockquote className="rounded-xl border-l-2 border-[#e1523d] bg-[#0d0f12] p-4 text-xs sm:text-sm text-[#cfd6e0] font-serif italic leading-relaxed">
                  &ldquo;{featuredArticle.excerpt}&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#1f242e] flex items-center justify-between">
                <span className="font-mono text-xs text-[#6b7280]">{featuredArticle.date}</span>
                <Link
                  href={`/writing/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#e1523d] hover:text-[#ef634f] transition-colors"
                >
                  <span>Read Canonical Essay</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>

            {/* Secondary Recent Articles (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {recentArticles.map((article) => (
                <article
                  key={article.slug}
                  className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-3 hover:border-[#38404f] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
                      <span className="text-[#10b981]">{article.category}</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h4 className="text-lg font-bold text-[#f2eee6] hover:text-[#e1523d] transition-colors">
                      <Link href={`/writing/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h4>

                    <p className="text-xs text-[#9ca3af] leading-relaxed line-clamp-2 font-light">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1f242e] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#6b7280]">{article.date}</span>
                    <Link
                      href={`/writing/${article.slug}`}
                      className="text-[#8b949e] hover:text-[#e1523d] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Read</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: WHAT I'M INTO (TASTE PREVIEW) */}
      <section className="py-24 border-b border-[#232832] bg-[#0a0c0f]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-semibold text-[#f59e0b] uppercase tracking-wider">
                // SECTION 04: WHAT I&apos;M INTO
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f2eee6] mt-2">
                Stories, Sounds &amp; Influences
              </h2>
              <p className="text-sm text-[#9ca3af] mt-1 max-w-xl font-light">
                A preview of the cultural archive: the films, songwriters, and books that built my perspective beyond lines of code.
              </p>
            </div>
            <Link
              href="/taste"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#f59e0b] hover:text-[#fbbf24] transition-colors"
            >
              <span>Explore Complete Taste Gallery</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Film Preview Card */}
            <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-4 flex flex-col justify-between hover:border-[#38404f] transition-all group">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-[#8b949e]">
                  <span className="flex items-center gap-1.5 text-[#e1523d]">
                    <Film className="h-3.5 w-3.5" />
                    <span>CINEMA</span>
                  </span>
                  <span>{featuredFilm.year}</span>
                </div>

                {/* Poster visual element */}
                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-[#232832] bg-[#090a0d] shadow-md ring-1 ring-white/10 group-hover:ring-[#e1523d]/30 transition-all">
                  <img
                    src="/images/taste/taxi-driver-horizontal.png"
                    alt={featuredFilm.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 rounded bg-[#090a0d]/85 backdrop-blur-md px-2 py-0.5 font-mono text-[9px] text-[#e1523d] uppercase font-semibold border border-white/10 shadow flex items-center gap-1">
                    <Film className="h-2.5 w-2.5" />
                    <span>#01 FILM</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#f2eee6] group-hover:text-[#e1523d] transition-colors">{featuredFilm.title}</h3>
                  <p className="font-mono text-xs text-[#8b949e]">Dir. {featuredFilm.director}</p>
                </div>

                <p className="font-serif italic text-xs text-[#cfd6e0] leading-relaxed">
                  &ldquo;{featuredFilm.favoriteQuote}&rdquo;
                </p>

                <p className="text-xs text-[#9ca3af] leading-relaxed line-clamp-3 font-light">
                  {featuredFilm.whyILoveIt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1f242e]">
                <Link
                  href="/taste"
                  className="font-mono text-xs text-[#e1523d] hover:text-[#ef634f] inline-flex items-center gap-1 transition-colors"
                >
                  <span>In Taste Archive &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Music Preview Card */}
            <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-4 flex flex-col justify-between hover:border-[#38404f] transition-all group">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-[#8b949e]">
                  <span className="flex items-center gap-1.5 text-[#10b981]">
                    <Music className="h-3.5 w-3.5" />
                    <span>MUSIC</span>
                  </span>
                  <span>{featuredArtist.era}</span>
                </div>

                {/* Artist visual element */}
                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-[#232832] bg-[#090a0d] shadow-md ring-1 ring-white/10 group-hover:ring-[#10b981]/30 transition-all">
                  <img
                    src="/images/taste/the-beatles-horizontal.png"
                    alt={featuredArtist.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 rounded bg-[#090a0d]/85 backdrop-blur-md px-2 py-0.5 font-mono text-[9px] text-[#10b981] uppercase font-semibold border border-white/10 shadow flex items-center gap-1">
                    <Music className="h-2.5 w-2.5" />
                    <span>FEATURED ARTIST</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#f2eee6] group-hover:text-[#10b981] transition-colors">{featuredArtist.name}</h3>
                  <p className="font-mono text-xs text-[#8b949e]">{featuredArtist.genre}</p>
                </div>

                <p className="text-xs text-[#9ca3af] leading-relaxed line-clamp-3 font-light">
                  {featuredArtist.whyTheyMatter}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {featuredArtist.notableWorks.slice(0, 2).map((w) => (
                    <span key={w} className="rounded bg-[#0d0f12] px-2 py-0.5 font-mono text-[10px] text-[#cfd6e0] border border-[#1f242e]">
                      &ldquo;{w}&rdquo;
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#1f242e]">
                <Link
                  href="/taste"
                  className="font-mono text-xs text-[#10b981] hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  <span>In Taste Archive &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Book Preview Card */}
            <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-4 flex flex-col justify-between hover:border-[#38404f] transition-all group">
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-[#8b949e]">
                  <span className="flex items-center gap-1.5 text-[#f59e0b]">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>READING</span>
                  </span>
                  <span>{featuredBook.year}</span>
                </div>

                {/* Book visual element */}
                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-[#232832] bg-[#090a0d] shadow-md ring-1 ring-white/10 group-hover:ring-[#f59e0b]/30 transition-all">
                  <img
                    src="/images/taste/steve-jobs-horizontal.png"
                    alt={featuredBook.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 rounded bg-[#090a0d]/85 backdrop-blur-md px-2 py-0.5 font-mono text-[9px] text-[#f59e0b] uppercase font-semibold border border-white/10 shadow flex items-center gap-1">
                    <BookOpen className="h-2.5 w-2.5" />
                    <span>FEATURED BOOK</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#f2eee6] group-hover:text-[#f59e0b] transition-colors">{featuredBook.title}</h3>
                  <p className="font-mono text-xs text-[#8b949e]">By {featuredBook.author}</p>
                </div>

                <blockquote className="font-serif italic text-xs text-[#cfd6e0] leading-relaxed">
                  &ldquo;{featuredBook.memorablePassage.text}&rdquo;
                </blockquote>

                <p className="text-xs text-[#9ca3af] leading-relaxed line-clamp-2 font-light">
                  {featuredBook.whyChosen}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1f242e]">
                <Link
                  href="/taste"
                  className="font-mono text-xs text-[#f59e0b] hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  <span>In Taste Archive &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: A GLIMPSE OF THE CURRENT CHAPTER (NOW PREVIEW) */}
      <section className="py-24 border-b border-[#232832]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-semibold text-[#10b981] uppercase tracking-wider">
                // SECTION 05: THE CURRENT CHAPTER
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f2eee6] mt-2">
                A Living Snapshot
              </h2>
              <p className="text-sm text-[#9ca3af] mt-1 max-w-xl font-light">
                What occupies my hands and thoughts right now. Features a deterministic daily quote and real-time focus.
              </p>
            </div>
            <Link
              href="/now"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#10b981] hover:text-[#34d399] transition-colors"
            >
              <span>Visit Full &ldquo;Right Now&rdquo; Page</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <DailyQuoteCard />
        </div>
      </section>

      {/* SECTION 06: CLOSING TRANSMISSION */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-8 sm:p-14 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-6">
              <span className="font-mono text-xs font-semibold text-[#e1523d] uppercase tracking-wider">
                // TRANSMISSION OPEN
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f2eee6]">
                Have a question, an unfinished idea, or a story to share?
              </h2>
              <p className="text-base text-[#9ca3af] leading-relaxed font-light">
                Whether you want to discuss multi-agent simulations in supply chains, argue about Peter Parker&apos;s moral duty, talk about cinema endings that stayed with you, or collaborate on something technically challenging, I’d love to hear from you.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded bg-[#e1523d] px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-white font-medium hover:bg-[#ef634f] transition-colors"
                >
                  <span>Transmit a Message</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/archive"
                  className="inline-flex items-center gap-2 rounded border border-[#232832] bg-[#0d0f12] px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-[#f2eee6] hover:border-[#8b949e] transition-colors"
                >
                  <span>Wander the Chronological Archive &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
