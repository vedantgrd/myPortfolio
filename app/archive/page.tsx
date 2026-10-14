'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Camera,
  Film,
  Filter,
  Layers,
  MessageSquare,
  Search,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { archiveEntries, ArchiveEntry } from '@/data/archive'

const typeFilters = [
  { label: 'All Entries', value: 'all' },
  { label: 'Essays & Journal', value: 'essay' },
  { label: 'Projects & Systems', value: 'project' },
  { label: 'Photographic Moments', value: 'photo' },
  { label: 'Cinema & Influences', value: 'cinema' },
  { label: 'Milestones', value: 'milestone' },
  { label: '2 A.M. Fragments', value: 'fragment' },
]

const years = ['All', '2026', '2025', '2024', '2023']

export default function ArchivePage() {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedYear, setSelectedYear] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEntries = archiveEntries.filter((entry) => {
    const matchesType =
      selectedType === 'all' || entry.type === selectedType
    const matchesYear =
      selectedYear === 'All' || entry.year.toString() === selectedYear
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesType && matchesYear && matchesSearch
  })

  const getTypeIcon = (type: ArchiveEntry['type']) => {
    switch (type) {
      case 'essay':
        return <BookOpen className="h-3.5 w-3.5 text-[#e1523d]" />
      case 'project':
        return <Layers className="h-3.5 w-3.5 text-[#3b68ff]" />
      case 'photo':
        return <Camera className="h-3.5 w-3.5 text-[#10b981]" />
      case 'cinema':
        return <Film className="h-3.5 w-3.5 text-[#f59e0b]" />
      case 'milestone':
        return <Trophy className="h-3.5 w-3.5 text-[#a855f7]" />
      case 'fragment':
        return <MessageSquare className="h-3.5 w-3.5 text-[#ec4899]" />
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0f12] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="pb-12 border-b border-[#232832]">
          <div className="flex items-center gap-3 font-mono text-xs text-[#e1523d]">
            <span>// CHAPTER 04</span>
            <span>•</span>
            <span>THE LIVING PERSONAL ARCHIVE &amp; TIME CAPSULE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee6] mt-3">
            A Life, in Progress.
          </h1>
          <p className="text-base sm:text-lg text-[#cfd6e0] mt-4 max-w-3xl leading-relaxed font-light">
            An evolving digital time capsule that preserves who I was, what I built, what I loved, and what I thought as time passed. It connects essays, ordinary photographs, milestone dates, cinema reflections, and late-night fragments in one unified chronological memory.
          </p>

          {/* Filter & Controls Bar */}
          <div className="mt-10 space-y-4 pt-6 border-t border-[#1d222b]">
            {/* Year Selector */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-[#6b7280] mr-2 text-[11px]">TIMELINE YEAR:</span>
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`rounded px-3 py-1 transition-colors ${
                    selectedYear === y
                      ? 'bg-[#e1523d] text-white font-bold'
                      : 'bg-[#14171d] text-[#8b949e] border border-[#232832] hover:text-[#f2eee6]'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Type Filter & Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {typeFilters.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setSelectedType(t.value)}
                    className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${
                      selectedType === t.value
                        ? 'bg-[#1a1e26] text-[#f2eee6] font-semibold border border-[#e1523d]'
                        : 'bg-[#090a0d] text-[#8b949e] border border-[#232832] hover:text-[#f2eee6]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8b949e]" />
                <input
                  type="text"
                  placeholder="Filter by keyword, topic, tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded border border-[#232832] bg-[#14171d] py-1.5 pl-9 pr-3 text-xs font-mono text-[#f2eee6] placeholder-[#6b7280] focus:border-[#e1523d] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Chronological Archive Stream */}
        <div className="space-y-6">
          <div className="flex items-center justify-between font-mono text-xs text-[#8b949e] pb-4 border-b border-[#232832]">
            <span>DOCUMENTED MEMORIES &amp; RECORDS // {filteredEntries.length} ITEMS</span>
            <span>SORT: CHRONOLOGICAL DESCENDING</span>
          </div>

          <div className="divide-y divide-[#1f242e]">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="py-8 group flex flex-col md:flex-row md:items-baseline justify-between gap-6"
              >
                <div className="max-w-2xl space-y-2">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#8b949e]">
                    <span className="flex items-center gap-1 font-semibold text-[#f2eee6]">
                      {getTypeIcon(entry.type)}
                      <span className="capitalize">{entry.type}</span>
                    </span>
                    <span>•</span>
                    <span className="text-[#e1523d]">{entry.date}</span>
                    <span>•</span>
                    <span className="text-[#8b949e]">{entry.category}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#f2eee6] group-hover:text-[#e1523d] transition-colors">
                    {entry.internalLink ? (
                      <Link href={entry.internalLink}>{entry.title}</Link>
                    ) : (
                      <span>{entry.title}</span>
                    )}
                  </h3>

                  {entry.subtitle && (
                    <p className="font-mono text-xs text-[#8b949e]">
                      {entry.subtitle}
                    </p>
                  )}

                  <p className="text-sm text-[#a3abb6] leading-relaxed pt-1 font-light">
                    {entry.description}
                  </p>

                  {entry.quote && (
                    <blockquote className="my-2 border-l-2 border-[#e1523d] pl-3 font-serif italic text-xs text-[#cfd6e0]">
                      &ldquo;{entry.quote}&rdquo;
                    </blockquote>
                  )}

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-[#1f242e] bg-[#0d0f12] px-2 py-0.5 font-mono text-[10px] text-[#6b7280]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0">
                  {entry.internalLink && (
                    <Link
                      href={entry.internalLink}
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#e1523d] hover:text-[#ef634f] transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {filteredEntries.length === 0 && (
              <div className="py-16 text-center font-mono text-xs text-[#8b949e]">
                No archive records match your current filter. Try clearing filters or selecting another year.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
