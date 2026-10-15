'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Layers,
  LayoutGrid,
  List,
  Sparkles,
  Filter,
} from 'lucide-react'
import { projects, Project } from '@/data/projects'

const categories = [
  'All',
  'AI & Systems',
  'Hardware & IoT',
  'Security & Systems',
  'Interactive & Games',
  'Web Platforms',
] as const

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-[#0d0f12] pt-6 pb-20 sm:pt-8 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="pb-12 border-b border-[#232832]">
          <div className="flex items-center gap-3 font-mono text-xs text-[#e1523d]">
            <span>// CHAPTER 02</span>
            <span>•</span>
            <span>EXHIBITION & PROJECT ARCHIVE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee6] mt-3">
            Projects, Systems & Experiments
          </h1>
          <p className="text-base sm:text-lg text-[#9ca3af] mt-4 max-w-3xl leading-relaxed">
            A comprehensive record of what I&apos;ve engineered: from multi-agent supply chain simulations and student aid engines to quadcopter avionics and low-level game loops.
          </p>

          {/* Filter Bar & View Toggle */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#1d222b]">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${
                      isSelected
                        ? 'bg-[#e1523d] text-white font-medium'
                        : 'bg-[#14171d] text-[#8b949e] border border-[#232832] hover:text-[#f2eee6] hover:border-[#38404f]'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 rounded border border-[#232832] bg-[#14171d] p-1 font-mono text-xs text-[#8b949e]">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#1a1e26] text-[#f2eee6]'
                    : 'hover:text-[#f2eee6]'
                }`}
                title="Grid Exhibition View"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Exhibition</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-colors ${
                  viewMode === 'table'
                    ? 'bg-[#1a1e26] text-[#f2eee6]'
                    : 'hover:text-[#f2eee6]'
                }`}
                title="Archive Table View"
              >
                <List className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Archive List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Project View Rendering */}
        {viewMode === 'grid' ? (
          <div className="mt-12 space-y-12">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.slug}
                className="group rounded-xl border border-[#232832] bg-[#14171d] overflow-hidden hover:border-[#3b4352] transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Column: Editorial Summary */}
                  <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-[#e1523d] font-semibold">
                          INDEX_0{idx + 1}
                        </span>
                        <span className="mono-badge">{project.category}</span>
                        <span className="mono-badge">{project.year}</span>
                        <span className="mono-badge text-[#10b981] border-[#10b981]/30">
                          {project.status}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6] group-hover:text-white transition-colors">
                        <Link href={`/work/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h2>

                      <p className="font-mono text-xs text-[#e1523d]">
                        {project.tagline}
                      </p>

                      <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Problem vs Motivation highlights */}
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                        <div className="rounded border border-[#1f242e] bg-[#0d0f12] p-3">
                          <span className="text-[#8b949e] block text-[10px]">CORE CHALLENGE</span>
                          <span className="text-[#a3abb6] line-clamp-2">{project.problem}</span>
                        </div>
                        <div className="rounded border border-[#1f242e] bg-[#0d0f12] p-3">
                          <span className="text-[#8b949e] block text-[10px]">ROLE & CONTRIBUTION</span>
                          <span className="text-[#f2eee6] font-semibold">{project.role}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tech stack badges and Case Study Link */}
                    <div className="pt-6 border-t border-[#1f242e] mt-6 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech.name}
                            className="rounded bg-[#1a1e26] px-2 py-0.5 font-mono text-[10px] text-[#a3abb6]"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center gap-1.5 rounded bg-[#e1523d] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white font-medium hover:bg-[#ef634f] transition-colors"
                        >
                          <span>Full Case Study</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Architectural Highlights & Metrics */}
                  <div className="lg:col-span-4 bg-[#090a0d] p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-[#232832] flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-[#8b949e] pb-2 border-b border-[#232832]">
                        <span>TECHNICAL_METRICS</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                      </div>

                      {project.metrics && project.metrics.length > 0 && (
                        <div className="space-y-3">
                          {project.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="rounded border border-[#1f242e] bg-[#14171d] p-3 font-mono text-xs"
                            >
                              <div className="text-[10px] text-[#8b949e]">{m.label}</div>
                              <div className="text-base font-bold text-[#f2eee6] mt-0.5">
                                {m.value}
                              </div>
                              <div className="text-[10px] text-[#6b7280] mt-0.5">
                                {m.note}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t border-[#1f242e] mt-6 flex items-center justify-between">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-[#8b949e] hover:text-[#f2eee6] transition-colors inline-flex items-center gap-1"
                        >
                          {link.type === 'github' && <Github className="h-3.5 w-3.5" />}
                          <span>{link.label}</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Archive Table View */
          <div className="mt-12 rounded-xl border border-[#232832] bg-[#14171d] overflow-x-auto">
            <table className="w-full text-left font-mono text-xs text-[#a3abb6]">
              <thead className="bg-[#090a0d] border-b border-[#232832] text-[#8b949e] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-6">Year</th>
                  <th className="py-4 px-6">Project Title</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6 hidden md:table-cell">Key Tech</th>
                  <th className="py-4 px-6 hidden sm:table-cell">Role</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f242e]">
                {filteredProjects.map((p) => (
                  <tr
                    key={p.slug}
                    className="hover:bg-[#1a1e26] transition-colors group"
                  >
                    <td className="py-4 px-6 text-[#8b949e] whitespace-nowrap">{p.year}</td>
                    <td className="py-4 px-6 font-semibold text-[#f2eee6] group-hover:text-[#e1523d] transition-colors">
                      <Link href={`/work/${p.slug}`}>{p.title}</Link>
                    </td>
                    <td className="py-4 px-6">
                      <span className="mono-badge">{p.category}</span>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell text-[#8b949e]">
                      {p.techStack.slice(0, 3).map((t) => t.name).join(', ')}
                    </td>
                    <td className="py-4 px-6 hidden sm:table-cell text-[#8b949e]">{p.role}</td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <Link
                        href={`/work/${p.slug}`}
                        className="inline-flex items-center gap-1 text-[#e1523d] hover:text-[#ef634f] transition-colors"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
