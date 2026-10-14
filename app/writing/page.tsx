'use client'

import { useState } from 'react'
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
    <div className="min-h-screen bg-[#0d0f12] py-16 sm:py-24">
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
            I don&apos;t just write about algorithms. I write about being human — mental health, cinema, superheroes, visiting orphanages, what we take for granted, and the quiet questions that keep us awake at night. If I leave this earth tomorrow, let this place be the honest record of how I thought, felt, and tried to make sense of the world.
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
          <section className="rounded-xl border border-[#232832] bg-[#14171d] p-8 sm:p-12 hover:border-[#38404f] transition-all relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
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
                  className="inline-flex items-center gap-1.5 rounded bg-[#e1523d] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white hover:bg-[#ef634f] transition-colors"
                >
                  <span>Read Full Essay</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
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
