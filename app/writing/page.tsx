'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Search,
  Tag,
  Heart,
  Film,
  Sparkles,
  Star,
} from 'lucide-react'
import { articles, Article } from '@/data/writing'

const categories = [
  'All',
  'Being Human',
  'Cinema & Culture',
  'Real Life & Journeys',
  'Books & Idols',
  'Systems & Engineering',
]

export default function WritingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightDrawn, setHighlightDrawn] = useState(false)
  const highlightRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = highlightRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setHighlightDrawn(true)
          }, 250)
          observer.disconnect()
          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const featuredArticle = articles.find((a) => a.featured) || articles[0]

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      )
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#0d0f12] pt-6 pb-20 sm:pt-8 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="pb-12 border-b border-[#232832]">
          <div className="flex items-center gap-3 font-mono text-xs text-[#e1523d]">
            <span>// CHAPTER 03</span>
            <span>•</span>
            <span>PERSONAL JOURNAL & LIVING MEMOIR</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee6] mt-3">
            The Journal &amp; Living Memoir
          </h1>
          <p className="text-base sm:text-lg text-[#cfd6e0] mt-4 max-w-3xl leading-relaxed font-light">
            I don&apos;t just write about algorithms. I write about being human — mental health, cinema, superheroes, visiting orphanages, what we take for granted, and the quiet questions that keep us awake at night.{' '}
            <span
              ref={highlightRef}
              className={`journal-highlight font-normal not-italic ${highlightDrawn ? 'is-drawn' : ''}`}
            >
              If I leave this earth tomorrow, let this place be the honest record of how I thought, felt, and tried to make sense of the world.
            </span>
          </p>

          {/* Search & Category Filter Controls */}
          <div className="mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-6 border-t border-[#1d222b]">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${
                      isSelected
                        ? 'bg-[#e1523d] text-white font-medium shadow-sm'
                        : 'bg-[#14171d] text-[#8b949e] border border-[#232832] hover:text-[#f2eee6] hover:border-[#38404f]'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8b949e]" />
              <input
                type="text"
                placeholder="Search memoirs, cinema, essays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded border border-[#232832] bg-[#14171d] py-1.5 pl-9 pr-3 text-xs font-mono text-[#f2eee6] placeholder-[#6b7280] focus:border-[#e1523d] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Featured Cover Story (Visible when no query active) */}
        {!searchQuery && selectedCategory === 'All' && featuredArticle && (
          <section className="rounded-2xl border border-[#232832] bg-[#14171d] p-8 sm:p-10 lg:p-12 hover:border-[#38404f] transition-all relative shadow-2xl">
            {/* Journal Scrapbook Sticker on Top Left Corner */}
            <div className="absolute -top-3.5 left-6 sm:left-10 z-20 select-none cursor-pointer group">
              <div className="relative -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 ease-out">
                {/* Washi Tape Strip holding the sticker */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-3.5 bg-white/20 backdrop-blur-[1px] border-y border-white/30 shadow-xs -rotate-1 z-10 pointer-events-none" />

                {/* Sticker Paper Body */}
                <div className="relative bg-[#faf8f4] text-[#14171d] px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-[2px] shadow-[0_12px_28px_rgba(0,0,0,0.65)] border-2 border-white ring-1 ring-black/20 flex items-center gap-2">
                  <Star className="h-3.5 w-3.5 fill-[#e1523d] text-[#e1523d] shrink-0" />
                  <span className="font-mono text-xs sm:text-[13px] font-black tracking-wider uppercase text-[#14171d]">
                    BEST WORK
                  </span>
                  <span className="text-[#8b949e] font-mono text-xs">/</span>
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#e1523d] uppercase tracking-widest bg-[#e1523d]/10 px-1.5 py-0.5 rounded-[2px] border border-[#e1523d]/25">
                    TOP RATED
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12 relative z-10">
              {/* Left Editorial Text Column */}
              <div className="max-w-2xl space-y-4">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#8b949e]">
                  <span className="mono-badge text-[#e1523d] border-[#e1523d]/30">
                    FEATURED MEMOIR PIECE
                  </span>
                  <span>{featuredArticle.category}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                  <span>•</span>
                  <span>{featuredArticle.date}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold text-[#f2eee6] leading-tight">
                  <Link
                    href={`/writing/${featuredArticle.slug}`}
                    className="hover:text-[#e1523d] transition-colors"
                  >
                    {featuredArticle.title}
                  </Link>
                </h2>

                <p className="font-mono text-xs sm:text-sm text-[#e1523d]">
                  {featuredArticle.subtitle}
                </p>

                <p className="text-sm sm:text-base text-[#cfd6e0] leading-relaxed italic font-serif">
                  &ldquo;{featuredArticle.excerpt}&rdquo;
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {featuredArticle.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-[#1a1e26] px-2 py-0.5 font-mono text-[10px] text-[#a3abb6]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/writing/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-1.5 rounded bg-[#e1523d] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white hover:bg-[#ef634f] transition-colors font-medium shadow-sm"
                  >
                    <span>Read Full Essay</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right: Crooked Photo Frame in Same Style as Contact */}
              {(featuredArticle.photoFrame || featuredArticle.slug === 'so-suicide') && (
                <div className="shrink-0 flex items-center justify-center lg:justify-end lg:mr-4">
                  <div className="relative group cursor-pointer transition-all duration-300 ease-out rotate-2 hover:rotate-0 hover:scale-105">
                    {/* Outer Photo Frame with White Border & Deep Shadow */}
                    <div className="relative bg-[#ffffff] p-2.5 pb-6 sm:p-3 sm:pb-7 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.7)] border-2 border-white ring-1 ring-black/20">
                      {/* Photo Container */}
                      <div className={`relative ${featuredArticle.photoFrame?.aspect || 'aspect-[3/4]'} w-48 sm:w-56 md:w-60 overflow-hidden rounded-[2px] bg-[#0d0f12]`}>
                        <img
                          src={featuredArticle.photoFrame?.url || '/images/rj-mitte.png'}
                          alt={featuredArticle.photoFrame?.caption || 'Photo'}
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Polaroid Handwritten-style Caption */}
                      <div className="pt-2 text-center font-mono text-[10px] sm:text-[11px] text-[#2b2b2b] tracking-wider select-none font-semibold uppercase">
                        {featuredArticle.photoFrame?.caption || 'you will be missed, bro.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Articles Archive List */}
        <section className="space-y-6">
          <div className="flex items-center justify-between font-mono text-xs text-[#8b949e] pb-4 border-b border-[#232832]">
            <span>JOURNAL ENTRIES &amp; ESSAYS // {filteredArticles.length} PIECES</span>
            <span>SORT: CHRONOLOGICAL</span>
          </div>

          <div className="divide-y divide-[#1f242e]">
            {filteredArticles.map((article) => (
              <article
                key={article.slug}
                className="py-8 group flex flex-col md:flex-row md:items-baseline justify-between gap-6"
              >
                <div className="max-w-2xl space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#8b949e]">
                    <span className="text-[#e1523d] font-semibold">{article.category}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#f2eee6] group-hover:text-[#e1523d] transition-colors">
                    <Link href={`/writing/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="font-mono text-xs text-[#8b949e]">
                    {article.subtitle}
                  </p>

                  <p className="text-sm text-[#a3abb6] leading-relaxed pt-1">
                    {article.excerpt}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
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
                  <Link
                    href={`/writing/${article.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#e1523d] hover:text-[#ef634f] transition-colors"
                  >
                    <span>Read Essay</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}

            {filteredArticles.length === 0 && (
              <div className="py-16 text-center font-mono text-xs text-[#8b949e]">
                No entries match your current filter. Try selecting &quot;All&quot; or clearing your search term.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
