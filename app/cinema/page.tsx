'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Film,
  Quote,
  Sparkles,
  Tv,
  BookOpen,
  Calendar,
} from 'lucide-react'
import { culturalWorks, CulturalWork } from '@/data/cinema'

const filters = ['All', 'Film', 'Superhero & Pop Culture', 'Television']

export default function CinemaPage() {
  const [selectedFilter, setSelectedFilter] = useState('All')

  const filteredWorks =
    selectedFilter === 'All'
      ? culturalWorks
      : culturalWorks.filter((w) => w.type === selectedFilter)

  return (
    <div className="min-h-screen bg-[#0d0f12] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="pb-12 border-b border-[#232832]">
          <div className="flex items-center gap-3 font-mono text-xs text-[#e1523d]">
            <span>// CULTURAL JOURNAL</span>
            <span>•</span>
            <span>CINEMA, STORIES &amp; INFLUENCES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee6] mt-3">
            Cinema, Through My Eyes.
          </h1>
          <p className="text-base sm:text-lg text-[#cfd6e0] mt-4 max-w-3xl leading-relaxed font-light">
            Not a clone of IMDb or Letterboxd. Not a database of star ratings. This is an intimate collection of films, characters, and stories that altered the way I think about courage, time, sacrifice, and what it means to be a decent human being.
          </p>

          {/* Filter Pills */}
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

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredWorks.map((work) => (
            <article
              key={work.slug}
              className="rounded-xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 flex flex-col justify-between hover:border-[#3b4352] transition-all space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#8b949e]">
                  <span className="mono-badge text-[#e1523d] border-[#e1523d]/30">
                    {work.type}
                  </span>
                  <span>{work.year} // {work.creator}</span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#f2eee6]">
                    {work.title}
                  </h2>
                  <span className="font-mono text-xs text-[#8b949e] block mt-0.5">
                    Theme: <strong className="text-[#e4decb]">{work.theme}</strong>
                  </span>
                </div>

                {/* Quote Card */}
                <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#e1523d] uppercase font-bold">
                    <Quote className="h-3 w-3" />
                    <span>Key Dialogue / Anchor</span>
                  </div>
                  <p className="font-serif italic text-xs sm:text-sm text-[#f2eee6] leading-relaxed">
                    &ldquo;{work.favoriteQuote}&rdquo;
                  </p>
                </div>

                {/* Favorite Scene */}
                <div className="space-y-1 text-xs">
                  <span className="font-mono text-[10px] text-[#8b949e] uppercase block">
                    Scene That Altered My Perspective
                  </span>
                  <p className="text-[#cfd6e0] leading-relaxed font-light">
                    {work.favoriteSceneOrMoment}
                  </p>
                </div>

                {/* Personal Reflection */}
                <div className="space-y-1 text-xs border-t border-[#1f242e] pt-4">
                  <span className="font-mono text-[10px] text-[#e1523d] uppercase font-bold block">
                    What It Means To Me
                  </span>
                  <p className="text-[#a3abb6] leading-relaxed">
                    {work.reflection}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-[#1f242e] flex items-center justify-between font-mono text-xs text-[#8b949e]">
                <span>{work.dateExperienced}</span>
                {work.linkedArticleSlug && (
                  <Link
                    href={`/writing/${work.linkedArticleSlug}`}
                    className="text-[#e1523d] hover:text-[#ef634f] inline-flex items-center gap-1 font-semibold transition-colors"
                  >
                    <span>Read Inspired Essay</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
