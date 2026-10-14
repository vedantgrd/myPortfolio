'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Film,
  Music,
  BookOpen,
  ArrowRight,
  Sparkles,
  Quote,
  Clock,
  Heart,
  Disc3,
  Layers,
} from 'lucide-react'
import { tasteData, FilmEntry, MusicArtist, BookEntry } from '@/data/taste'

type TabType = 'all' | 'cinema' | 'music' | 'books'

export default function TastePage() {
  const [activeTab, setActiveTab] = useState<TabType>('all')

  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#f2eee6] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header / Editorial Masthead */}
        <div className="border-b border-[#232832] pb-12 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8b949e]">
            <div className="flex items-center gap-2">
              <span className="text-[#e1523d] font-semibold">// CHAPTER 05</span>
              <span>CULTURAL ARCHIVE</span>
              <span>•</span>
              <span>TASTE &amp; INFLUENCES</span>
            </div>
            <div className="flex items-center gap-2 rounded border border-[#232832] bg-[#14171d] px-3 py-1">
              <Sparkles className="h-3 w-3 text-[#f59e0b]" />
              <span>CINEMA, MUSIC &amp; BOOKS</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee6]">
              Taste, Stories &amp; <br />
              <span className="font-serif italic font-normal text-[#e1523d]">
                The Things That Stay.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed font-light">
              This isn’t an IMDb rating feed or a Letterboxd log. It is a personal record of the films that altered my perspective, the music that accompanied long nights, and the books that proved engineering without humanity is empty.
            </p>
          </div>

          {/* Tab Filter Navigation */}
          <div className="pt-4 flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Selections', count: tasteData.films.length + tasteData.artists.length + tasteData.books.length },
              { id: 'cinema', label: 'Cinema (Top 4)', count: tasteData.films.length, icon: Film },
              { id: 'music', label: 'Music & Songwriters', count: tasteData.artists.length, icon: Music },
              { id: 'books', label: 'Books That Changed Me', count: tasteData.books.length, icon: BookOpen },
            ].map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-all ${
                    isActive
                      ? 'bg-[#f2eee6] text-[#0d0f12] font-semibold shadow-sm'
                      : 'border border-[#232832] bg-[#14171d] text-[#8b949e] hover:text-[#f2eee6] hover:border-[#38404f]'
                  }`}
                >
                  {tab.icon && <tab.icon className="h-3.5 w-3.5" />}
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive ? 'bg-[#0d0f12]/20 text-[#0d0f12]' : 'bg-[#1f242e] text-[#6b7280]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* PART A: CINEMA */}
        {(activeTab === 'all' || activeTab === 'cinema') && (
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1d222b] pb-4">
              <div>
                <span className="font-mono text-xs font-semibold text-[#e1523d] uppercase tracking-wider">
                  01 // CINEMA
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6] mt-1">
                  The Formative Four
                </h2>
                <p className="text-xs sm:text-sm text-[#8b949e] font-light mt-0.5">
                  Films that stayed with me for days after the credits finished rolling.
                </p>
              </div>
              <span className="font-mono text-xs text-[#6b7280]">
                4 CURATED SELECTIONS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tasteData.films.map((film, index) => (
                <article
                  key={film.slug}
                  className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 flex flex-col justify-between hover:border-[#3b4352] transition-all space-y-6"
                >
                  <div className="space-y-5">
                    {/* Top Row: Year, Director, Theme */}
                    <div className="flex items-center justify-between text-xs font-mono text-[#8b949e] border-b border-[#1f242e] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[#e1523d] font-semibold">#{String(index + 1).padStart(2, '0')}</span>
                        <span>{film.year}</span>
                        <span>•</span>
                        <span>{film.director}</span>
                      </div>
                      <span className="rounded bg-[#1a1e26] px-2 py-0.5 text-[10px] text-[#f59e0b] border border-[#f59e0b]/20">
                        {film.theme}
                      </span>
                    </div>

                    {/* Title & Genre */}
                    <div>
                      <h3 className="text-2xl font-bold text-[#f2eee6] tracking-tight">
                        {film.title}
                      </h3>
                      <p className="font-mono text-xs text-[#8b949e] mt-1">
                        {film.genre}
                      </p>
                    </div>

                    {/* Famous Quote */}
                    <blockquote className="rounded-xl border-l-2 border-[#e1523d] bg-[#0d0f12] p-4 text-xs sm:text-sm text-[#cfd6e0] font-serif italic leading-relaxed">
                      &ldquo;{film.favoriteQuote}&rdquo;
                    </blockquote>

                    {/* Why I Love It */}
                    <div className="space-y-1.5 text-xs sm:text-sm">
                      <span className="font-mono text-[10px] text-[#6b7280] uppercase tracking-wider block">
                        WHY IT MATTERS TO ME
                      </span>
                      <p className="text-[#9ca3af] leading-relaxed font-light">
                        {film.whyILoveIt}
                      </p>
                    </div>

                    {/* Memorable Scene */}
                    <div className="space-y-1.5 text-xs sm:text-sm rounded-lg border border-[#1f242e] bg-[#0d0f12]/60 p-4">
                      <span className="font-mono text-[10px] text-[#f59e0b] uppercase tracking-wider block">
                        THE SCENE I CARRY AROUND
                      </span>
                      <p className="text-[#cfd6e0] leading-relaxed font-light">
                        {film.memorableScene}
                      </p>
                    </div>
                  </div>

                  {/* Bottom: Linked Essay if genuinely exists */}
                  <div className="pt-4 border-t border-[#1f242e] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#6b7280]">
                      Feel: {film.whatItMadeMeFeel}
                    </span>
                    {film.linkedEssaySlug ? (
                      <Link
                        href={`/writing/${film.linkedEssaySlug}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[#e1523d] hover:text-[#ef634f] transition-colors"
                      >
                        <span>Read Related Essay</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <span className="text-[11px] font-mono text-[#4b5563]">Standalone Reflection</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* PART B: MUSIC & SONGWRITERS */}
        {(activeTab === 'all' || activeTab === 'music') && (
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1d222b] pb-4">
              <div>
                <span className="font-mono text-xs font-semibold text-[#10b981] uppercase tracking-wider">
                  02 // MUSIC
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6] mt-1">
                  Music &amp; Songwriters
                </h2>
                <p className="text-xs sm:text-sm text-[#8b949e] font-light mt-0.5">
                  The melodies and songwriters that accompanied late-night debugging and college commutes.
                </p>
              </div>
              <span className="font-mono text-xs text-[#6b7280]">
                4 FEATURED ARTISTS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tasteData.artists.map((artist) => (
                <div
                  key={artist.id}
                  className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#38404f] transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-[#8b949e] border-b border-[#1f242e] pb-3">
                      <div className="flex items-center gap-2">
                        <Disc3 className="h-3.5 w-3.5 text-[#10b981]" />
                        <span>{artist.era}</span>
                      </div>
                      <span className="rounded bg-[#1a1e26] px-2 py-0.5 text-[10px] text-[#9ca3af]">
                        {artist.genre}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-[#f2eee6]">
                        {artist.name}
                      </h3>
                    </div>

                    <div className="space-y-1.5 text-xs sm:text-sm">
                      <span className="font-mono text-[10px] text-[#6b7280] uppercase tracking-wider block">
                        WHY THEIR MUSIC MATTERS
                      </span>
                      <p className="text-[#9ca3af] leading-relaxed font-light">
                        {artist.whyTheyMatter}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-[#6b7280] uppercase tracking-wider block">
                        NOTABLE TRACKS &amp; ALBUMS
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {artist.notableWorks.map((work) => (
                          <span
                            key={work}
                            className="rounded border border-[#232832] bg-[#0d0f12] px-2.5 py-1 font-mono text-xs text-[#cfd6e0]"
                          >
                            &ldquo;{work}&rdquo;
                          </span>
                        ))}
                      </div>
                    </div>

                    {artist.personalNote && (
                      <p className="text-xs text-[#a3abb6] font-serif italic border-l-2 border-[#10b981] pl-3 py-0.5">
                        {artist.personalNote}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#1f242e] text-[11px] font-mono text-[#6b7280] flex items-center justify-between">
                    <span>Impact: {artist.musicalImpact}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PART C: BOOKS THAT CHANGED MY LIFE */}
        {(activeTab === 'all' || activeTab === 'books') && (
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1d222b] pb-4">
              <div>
                <span className="font-mono text-xs font-semibold text-[#f59e0b] uppercase tracking-wider">
                  03 // BOOKS
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6] mt-1">
                  Books That Changed My Perspective
                </h2>
                <p className="text-xs sm:text-sm text-[#8b949e] font-light mt-0.5">
                  Long-form biographies and ideas that altered how I approach engineering and craft.
                </p>
              </div>
              <span className="font-mono text-xs text-[#6b7280]">
                CURATED SELECTION
              </span>
            </div>

            <div className="space-y-8">
              {tasteData.books.map((book) => (
                <article
                  key={book.id}
                  className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:border-[#38404f] transition-all"
                >
                  {/* Left Column: Book Identity & Quote */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#8b949e]">
                      <span className="text-[#f59e0b] font-semibold">{book.genre}</span>
                      <span>•</span>
                      <span>{book.year}</span>
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold text-[#f2eee6] tracking-tight">
                        {book.title}
                      </h3>
                      <p className="text-sm font-mono text-[#9ca3af] mt-1">
                        By {book.author}
                      </p>
                    </div>

                    <blockquote className="rounded-xl border border-[#f59e0b]/30 bg-[#0d0f12] p-5 space-y-2">
                      <Quote className="h-4 w-4 text-[#f59e0b]" />
                      <p className="font-serif italic text-sm text-[#f2eee6] leading-relaxed">
                        &ldquo;{book.memorablePassage.text}&rdquo;
                      </p>
                      <span className="block text-[11px] font-mono text-[#8b949e]">
                        — {book.memorablePassage.context}
                      </span>
                    </blockquote>

                    <p className="text-xs sm:text-sm text-[#a3abb6] leading-relaxed font-light">
                      {book.whyChosen}
                    </p>
                  </div>

                  {/* Right Column: Takeaways & Personal Reflection */}
                  <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-[#1f242e] lg:pl-8">
                    <div className="space-y-3">
                      <span className="font-mono text-xs text-[#f59e0b] uppercase font-bold tracking-wider block">
                        CORE ENGINEERING &amp; DESIGN LESSONS
                      </span>
                      <ul className="space-y-2.5">
                        {book.coreTakeaways.map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#cfd6e0]">
                            <span className="text-[#f59e0b] font-mono font-bold mt-0.5">•</span>
                            <span className="leading-relaxed">{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-[#1f242e]">
                      <span className="font-mono text-xs text-[#8b949e] uppercase font-bold tracking-wider block">
                        HOW THIS SHAPES MY OWN WORK
                      </span>
                      <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed font-light">
                        {book.personalReflection}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* PART D: TASTE EVOLVES (FOOTNOTE) */}
        <div className="rounded-xl border border-[#232832] bg-[#0a0c0f] p-6 text-center space-y-2 font-mono text-xs text-[#8b949e]">
          <p>
            Taste evolves as you live more days and read more lines.
          </p>
          <p className="text-[11px] text-[#6b7280]">
            This section updates intentionally, not like a social feed, but whenever a story or record earns a permanent place in my life.
          </p>
        </div>
      </div>
    </div>
  )
}
