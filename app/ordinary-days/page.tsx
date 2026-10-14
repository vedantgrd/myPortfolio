'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Camera,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react'
import { ordinaryDays, OrdinaryDayEntry } from '@/data/ordinaryDays'

const filters = [
  'All',
  'College & Building',
  'Friendship & Life',
  'Reflections',
]

export default function OrdinaryDaysPage() {
  const [selectedFilter, setSelectedFilter] = useState('All')

  const filteredDays =
    selectedFilter === 'All'
      ? ordinaryDays
      : ordinaryDays.filter((d) => d.theme === selectedFilter)

  return (
    <div className="min-h-screen bg-[#0d0f12] py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="pb-12 border-b border-[#232832]">
          <div className="flex items-center gap-3 font-mono text-xs text-[#e1523d]">
            <span>// CHAPTER 05</span>
            <span>•</span>
            <span>PHOTOGRAPHIC JOURNAL</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee6] mt-3">
            Ordinary Days.
          </h1>
          <p className="text-base sm:text-lg text-[#cfd6e0] mt-4 max-w-2xl leading-relaxed font-light">
            A quiet photographic record of moments that don&apos;t qualify as technical achievements: balancing drone props at 3 AM, post-exam tea stalls, rain on the platform at Thane, and afternoons that stay with you long after the day ends.
          </p>

          {/* Filter Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-2 pt-6 border-t border-[#1d222b]">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`rounded px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  selectedFilter === f
                    ? 'bg-[#e1523d] text-white font-semibold'
                    : 'bg-[#14171d] text-[#8b949e] border border-[#232832] hover:text-[#f2eee6]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Chronological Moments Stream */}
        <div className="space-y-12">
          {filteredDays.map((entry, idx) => (
            <article
              key={entry.id}
              className="rounded-xl border border-[#232832] bg-[#14171d] p-6 sm:p-10 space-y-6 hover:border-[#38404f] transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#8b949e] border-b border-[#1f242e] pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#e1523d] font-bold">ENTRY 0{idx + 1}</span>
                  <span>•</span>
                  <span>{entry.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#10b981]">
                  <MapPin className="h-3 w-3" />
                  <span>{entry.location}</span>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6]">
                  {entry.title}
                </h2>
                <p className="font-serif italic text-base text-[#e1523d]">
                  &ldquo;{entry.caption}&rdquo;
                </p>
              </div>

              {/* Story */}
              {entry.story && (
                <p className="text-sm sm:text-base text-[#cfd6e0] leading-relaxed font-light">
                  {entry.story}
                </p>
              )}

              {/* Tags */}
              <div className="pt-4 border-t border-[#1f242e] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8b949e]">
                <div className="flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-[#1f242e] bg-[#090a0d] px-2 py-0.5 text-[10px] text-[#6b7280]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="mono-badge">{entry.theme}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
