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
  Image as ImageIcon,
} from 'lucide-react'
import { tasteData, FilmEntry, MusicArtist, BookEntry } from '@/data/taste'

type TabType = 'all' | 'cinema' | 'music' | 'books'

function TasteMediaArtwork({
  src,
  alt,
  aspect = 'aspect-[2/3]',
  type = 'cinema',
  badgeText,
  badgePosition = 'top',
  accentColor = '#e1523d',
  icon: Icon = Film,
}: {
  src: string
  alt: string
  aspect?: string
  type?: 'cinema' | 'music' | 'books'
  badgeText?: string
  badgePosition?: 'top' | 'bottom'
  accentColor?: string
  icon?: any
}) {
  const [hasError, setHasError] = useState(false)

  return (
    <div
      className={`relative ${aspect} w-full overflow-hidden border border-[#2d3442] bg-[#090a0d] shadow-2xl shrink-0 group/media transition-all duration-300 ring-1 ring-white/10 hover:ring-white/30 ${
        type === 'books'
          ? 'rounded-r-xl rounded-l-sm border-l-4 border-l-[#222733]'
          : 'rounded-xl'
      }`}
    >
      {!hasError ? (
        <>
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle glossy sheen on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-300" />

          {/* Minimal glass format pill (top or bottom to avoid obscuring poster title typography) */}
          {badgeText && (
            <div
              className={`absolute ${
                badgePosition === 'bottom' ? 'bottom-2.5 left-2.5' : 'top-2.5 left-2.5'
              } rounded bg-[#090a0d]/90 backdrop-blur-md px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#cfd6e0] border border-white/10 flex items-center gap-1.5 shadow-md z-10`}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <span>{badgeText}</span>
            </div>
          )}
        </>
      ) : (
        /* Stylized fallback ONLY if file failed to load */
        <div className="absolute inset-0 bg-gradient-to-br from-[#12161f] to-[#090a0d] p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#8b949e]">
            <span className="uppercase font-semibold tracking-wider" style={{ color: accentColor }}>
              {badgeText || type}
            </span>
            <Icon className="h-3.5 w-3.5 text-[#8b949e]" />
          </div>
          <div>
            <span className="block text-xs font-bold text-[#f2eee6] leading-tight font-serif line-clamp-2">
              {alt}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TastePage() {
  const [activeTab, setActiveTab] = useState<TabType>('all')

  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#f2eee6] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header / Editorial Masthead */}
        <div className="border-b border-[#232832] pb-12 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8b949e]">
            <div className="flex items-center gap-2">
              <span className="text-[#e1523d] font-semibold">// CHAPTER 04</span>
              <span>CULTURAL ARCHIVE</span>
              <span>•</span>
              <span>TASTE &amp; INFLUENCES</span>
            </div>
            <div className="flex items-center gap-2 rounded border border-[#232832] bg-[#14171d] px-3 py-1">
              <Sparkles className="h-3 w-3 text-[#f59e0b]" />
              <span>4 FILMS • 4 ARTISTS • 4 BOOKS</span>
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
              This isn’t an IMDb rating feed or a Letterboxd log. It is an honest, personal record of the films that altered my perspective, the music that accompanied long nights, and the books that proved engineering without humanity is empty.
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

        {/* PART A: CINEMA (TOP 4 FILMS WITH POSTERS) */}
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
                  className="rounded-2xl border border-[#232832] bg-[#14171d] overflow-hidden flex flex-col justify-between hover:border-[#3b4352] transition-all group"
                >
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Top Row: Year, Director, Theme */}
                    <div className="flex items-center justify-between text-xs font-mono text-[#8b949e] border-b border-[#1f242e] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[#e1523d] font-semibold">#{String(index + 1).padStart(2, '0')}</span>
                        <span>{film.year}</span>
                        <span>•</span>
                        <span>{film.director}</span>
                      </div>
                      <span className="rounded bg-[#1a1e26] px-2 py-0.5 text-[10px] text-[#f59e0b] border border-[#f59e0b]/20">
                        {film.genre}
                      </span>
                    </div>

                    {/* Poster + Title Header Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                      {/* Film Poster Visual Container */}
                      <div className="sm:col-span-5">
                        <TasteMediaArtwork
                          src={film.posterUrl}
                          alt={`${film.title} Theatrical Poster`}
                          aspect="aspect-[2/3]"
                          type="cinema"
                          badgeText={`${film.year} // 35MM`}
                          badgePosition={['shutter-island', 'manchester-by-the-sea', 'the-hangover'].includes(film.slug) ? 'bottom' : 'top'}
                          accentColor={film.accentColor}
                          icon={Film}
                        />
                      </div>

                      {/* Title & Theme Summary */}
                      <div className="sm:col-span-7 space-y-3">
                        <h3 className="text-2xl font-bold text-[#f2eee6] tracking-tight group-hover:text-[#e1523d] transition-colors">
                          {film.title}
                        </h3>
                        <p className="font-mono text-xs text-[#8b949e]">
                          Theme: <span className="text-[#cfd6e0]">{film.theme}</span>
                        </p>
                        <blockquote className="rounded-xl border-l-2 border-[#e1523d] bg-[#0d0f12] p-3 text-xs text-[#cfd6e0] font-serif italic leading-relaxed">
                          &ldquo;{film.favoriteQuote}&rdquo;
                        </blockquote>
                      </div>
                    </div>

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

                  {/* Bottom: Emotional Takeaway */}
                  <div className="p-6 sm:p-8 pt-0">
                    <div className="pt-4 border-t border-[#1f242e] flex items-center justify-between text-[11px] font-mono text-[#6b7280]">
                      <span>What It Made Me Feel: <span className="text-[#cfd6e0]">{film.whatItMadeMeFeel}</span></span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* PART B: MUSIC & SONGWRITERS (WITH POSTERS / COVERS) */}
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
                  className="rounded-2xl border border-[#232832] bg-[#14171d] overflow-hidden flex flex-col justify-between hover:border-[#38404f] transition-all group"
                >
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Top Row: Era & Genre */}
                    <div className="flex items-center justify-between text-xs font-mono text-[#8b949e] border-b border-[#1f242e] pb-3">
                      <div className="flex items-center gap-2">
                        <Disc3 className="h-3.5 w-3.5 text-[#10b981]" />
                        <span>{artist.era}</span>
                      </div>
                      <span className="rounded bg-[#1a1e26] px-2 py-0.5 text-[10px] text-[#9ca3af]">
                        {artist.genre}
                      </span>
                    </div>

                    {/* Band / Artist Poster & Header */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                      <div className="sm:col-span-5">
                        <TasteMediaArtwork
                          src={artist.posterUrl}
                          alt={`${artist.name} Artwork`}
                          aspect="aspect-square"
                          type="music"
                          badgeText="VINYL ARCHIVE"
                          badgePosition={['one-direction', 'the-smiths', 'michael-jackson'].includes(artist.id) ? 'bottom' : 'top'}
                          accentColor={artist.accentColor}
                          icon={Disc3}
                        />
                      </div>

                      <div className="sm:col-span-7 space-y-2">
                        <h3 className="text-2xl font-bold text-[#f2eee6] group-hover:text-[#10b981] transition-colors">
                          {artist.name}
                        </h3>
                        <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                          {artist.whyTheyMatter}
                        </p>
                      </div>
                    </div>

                    {/* Notable Tracks */}
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
                      <p className="text-xs text-[#a3abb6] font-serif italic border-l-2 border-[#10b981] pl-3 py-1 bg-[#0d0f12]/40 rounded-r">
                        {artist.personalNote}
                      </p>
                    )}
                  </div>

                  <div className="p-6 sm:p-8 pt-0">
                    <div className="pt-4 border-t border-[#1f242e] text-[11px] font-mono text-[#6b7280] flex items-center justify-between">
                      <span>Impact: {artist.musicalImpact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PART C: BOOKS THAT CHANGED MY LIFE (4 BOOKS WITH COVERS) */}
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
                  Biographies, cognitive design, and habits that altered how I approach engineering and life.
                </p>
              </div>
              <span className="font-mono text-xs text-[#6b7280]">
                4 CURATED BOOKS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tasteData.books.map((book) => (
                <article
                  key={book.id}
                  className="rounded-2xl border border-[#232832] bg-[#14171d] overflow-hidden flex flex-col justify-between hover:border-[#38404f] transition-all group"
                >
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between text-xs font-mono text-[#8b949e] border-b border-[#1f242e] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[#f59e0b] font-semibold">{book.year}</span>
                        <span>•</span>
                        <span>{book.author}</span>
                      </div>
                      <span className="rounded bg-[#1a1e26] px-2 py-0.5 text-[10px] text-[#cfd6e0]">
                        {book.genre}
                      </span>
                    </div>

                    {/* Book Cover + Header Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                      <div className="sm:col-span-5">
                        <TasteMediaArtwork
                          src={book.posterUrl}
                          alt={`${book.title} Book Cover`}
                          aspect="aspect-[2/3]"
                          type="books"
                          badgeText={`${book.year} EDITION`}
                          badgePosition={book.id.includes('steve-jobs') || book.id.includes('design-of-everyday-things') ? 'bottom' : 'top'}
                          accentColor="#f59e0b"
                          icon={BookOpen}
                        />
                      </div>

                      <div className="sm:col-span-7 space-y-3">
                        <h3 className="text-2xl font-bold text-[#f2eee6] tracking-tight group-hover:text-[#f59e0b] transition-colors">
                          {book.title}
                        </h3>
                        <p className="font-mono text-xs text-[#9ca3af]">
                          By {book.author}
                        </p>
                        <blockquote className="rounded-xl border border-[#f59e0b]/30 bg-[#0d0f12] p-3 space-y-1">
                          <p className="font-serif italic text-xs text-[#f2eee6] leading-relaxed">
                            &ldquo;{book.memorablePassage.text}&rdquo;
                          </p>
                          <span className="block text-[10px] font-mono text-[#8b949e]">
                            — {book.memorablePassage.context}
                          </span>
                        </blockquote>
                      </div>
                    </div>

                    {/* Why Chosen */}
                    <div className="space-y-1 text-xs">
                      <span className="font-mono text-[10px] text-[#6b7280] uppercase tracking-wider block">
                        WHY THIS BOOK
                      </span>
                      <p className="text-[#a3abb6] leading-relaxed font-light">
                        {book.whyChosen}
                      </p>
                    </div>

                    {/* Core Takeaways */}
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-[#f59e0b] uppercase font-bold tracking-wider block">
                        CORE LESSONS
                      </span>
                      <ul className="space-y-1.5">
                        {book.coreTakeaways.slice(0, 3).map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-[#cfd6e0]">
                            <span className="text-[#f59e0b] font-mono font-bold mt-0.5">•</span>
                            <span className="leading-relaxed">{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom: How it shapes work */}
                  <div className="p-6 sm:p-8 pt-0">
                    <div className="pt-4 border-t border-[#1f242e] text-[11px] font-mono text-[#8b949e] space-y-1">
                      <span className="text-[#6b7280] block text-[10px] uppercase">HOW IT SHAPES MY WORK</span>
                      <p className="text-[#cfd6e0] font-sans font-light line-clamp-2">
                        {book.personalReflection}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* PART D: TASTE EVOLVES FOOTNOTE */}
        <div className="rounded-xl border border-[#232832] bg-[#0a0c0f] p-6 text-center space-y-2 font-mono text-xs text-[#8b949e]">
          <p>
            Taste evolves as you live more days and read more lines.
          </p>
          <p className="text-[11px] text-[#6b7280]">
            Poster images can be placed into <code className="text-[#cfd6e0]">/public/images/taste/</code> or customized manually.
          </p>
        </div>
      </div>
    </div>
  )
}
