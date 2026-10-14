'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  CheckCircle2,
  GraduationCap,
  Layers,
  Briefcase,
  Trophy,
  Users,
  Search,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'
import { verifiedMilestones, VerifiedMilestone } from '@/data/archive'

const categoryFilters = [
  { label: 'All Milestones', value: 'all' },
  { label: 'Education', value: 'Education' },
  { label: 'Projects', value: 'Projects' },
  { label: 'Experience', value: 'Experience' },
  { label: 'Hackathons & Research', value: 'Hackathons & Research' },
  { label: 'Community', value: 'Community' },
]

const years = ['All', '2026', '2025', '2024', '2023', '2022']

export default function ArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedYear, setSelectedYear] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMilestones = verifiedMilestones.filter((milestone) => {
    const matchesCategory =
      selectedCategory === 'all' || milestone.category === selectedCategory
    const matchesYear =
      selectedYear === 'All' || milestone.year.toString() === selectedYear
    const matchesSearch =
      milestone.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      milestone.factualSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      milestone.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesYear && matchesSearch
  })

  const getCategoryIcon = (category: VerifiedMilestone['category']) => {
    switch (category) {
      case 'Education':
        return <GraduationCap className="h-3.5 w-3.5 text-[#3b68ff]" />
      case 'Projects':
        return <Layers className="h-3.5 w-3.5 text-[#10b981]" />
      case 'Experience':
        return <Briefcase className="h-3.5 w-3.5 text-[#f59e0b]" />
      case 'Hackathons & Research':
        return <Trophy className="h-3.5 w-3.5 text-[#e1523d]" />
      case 'Community':
        return <Users className="h-3.5 w-3.5 text-[#ec4899]" />
      default:
        return <Calendar className="h-3.5 w-3.5 text-[#8b949e]" />
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#f2eee6] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-[#232832] pb-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8b949e]">
            <div className="flex items-center gap-2">
              <span className="text-[#e1523d] font-semibold">// CHAPTER 06</span>
              <span>CHRONOLOGICAL TIME CAPSULE</span>
              <span>•</span>
              <span>VERIFIED MILESTONES (2022 — 2026)</span>
            </div>
            <div className="flex items-center gap-1.5 rounded border border-[#10b981]/30 bg-[#10b981]/10 px-2.5 py-1 text-[#10b981]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>FACTUAL &amp; AUDITED</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee6]">
              A Verified Record <br />
              <span className="font-serif italic font-normal text-[#8b949e]">
                of Work &amp; Education.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed font-light">
              This is not a second article list or a duplicated project catalog. It is a strictly factual chronology documenting my diploma, degree at Pillai College of Engineering, backend internship at VFS Global, hackathon milestones, and community field experiences.
            </p>
          </div>

          {/* Search & Year Filtering Bar */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b7280]" />
              <input
                type="text"
                placeholder="Search milestones, institutions, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#232832] bg-[#14171d] pl-10 pr-4 py-2 font-mono text-xs text-[#f2eee6] placeholder-[#6b7280] focus:border-[#e1523d] focus:outline-none transition-colors"
              />
            </div>

            {/* Year Selector */}
            <div className="md:col-span-7 flex flex-wrap items-center gap-1.5 md:justify-end">
              <span className="font-mono text-xs text-[#6b7280] mr-2">Year:</span>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                    selectedYear === year
                      ? 'bg-[#e1523d] text-white font-medium'
                      : 'border border-[#232832] bg-[#14171d] text-[#8b949e] hover:text-[#f2eee6]'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categoryFilters.map((filter) => {
              const isActive = selectedCategory === filter.value
              return (
                <button
                  key={filter.value}
                  onClick={() => setSelectedCategory(filter.value)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                    isActive
                      ? 'bg-[#f2eee6] text-[#0d0f12] font-semibold'
                      : 'border border-[#232832] bg-[#14171d] text-[#8b949e] hover:text-[#f2eee6]'
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Chronological Milestone Feed */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-[#8b949e]">
            <span>SHOWING {filteredMilestones.length} VERIFIED MILESTONES</span>
            <span>2022 &rarr; 2026</span>
          </div>

          <div className="relative border-l border-[#232832] ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
            {filteredMilestones.map((milestone) => (
              <div
                key={milestone.id}
                className="relative group rounded-xl border border-[#232832] bg-[#14171d] p-6 hover:border-[#38404f] transition-all space-y-4"
              >
                {/* Node Bullet on Timeline */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-6 h-3 w-3 rounded-full border-2 border-[#0d0f12] bg-[#e1523d]" />

                {/* Top Metadata Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8b949e] border-b border-[#1f242e] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 font-semibold text-[#f2eee6]">
                      {getCategoryIcon(milestone.category)}
                      <span>{milestone.category}</span>
                    </span>
                    <span>•</span>
                    <span className="text-[#e1523d]">{milestone.dateDisplay}</span>
                  </div>

                  <span className="rounded bg-[#1a1e26] px-2 py-0.5 text-[10px] text-[#10b981] flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{milestone.verificationLevel}</span>
                  </span>
                </div>

                {/* Milestone Title */}
                <div>
                  <h3 className="text-xl font-bold text-[#f2eee6] group-hover:text-[#e1523d] transition-colors">
                    {milestone.title}
                  </h3>
                </div>

                {/* Factual Summary */}
                <p className="text-sm text-[#9ca3af] leading-relaxed font-light">
                  {milestone.factualSummary}
                </p>

                {/* Tags and Canonical Link */}
                <div className="pt-3 border-t border-[#1f242e] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {milestone.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-[#1f242e] bg-[#0d0f12] px-2 py-0.5 font-mono text-[10px] text-[#6b7280]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {milestone.canonicalLink && (
                    <Link
                      href={milestone.canonicalLink.url}
                      className="inline-flex items-center gap-1 font-mono text-xs text-[#e1523d] hover:text-[#ef634f] transition-colors"
                    >
                      <span>{milestone.canonicalLink.label}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredMilestones.length === 0 && (
          <div className="rounded-xl border border-dashed border-[#232832] bg-[#14171d] p-12 text-center space-y-3 font-mono text-xs text-[#8b949e]">
            <p>No verified milestones matched your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedYear('All')
                setSearchQuery('')
              }}
              className="text-[#e1523d] underline hover:text-[#ef634f]"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
