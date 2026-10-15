import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Eye,
  Hammer,
  Lightbulb,
  MapPin,
  Sparkles,
  BookOpen,
  Film,
  Music,
  Calendar,
  Compass,
} from 'lucide-react'
import { nowData } from '@/data/now'
import { DailyQuoteCard } from '@/components/now/DailyQuoteCard'

export default function NowPage() {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#f2eee6] pt-6 pb-20 sm:pt-8 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* =========================================================================
            HEADER / MASTHEAD
        ========================================================================= */}
        <div className="pb-10 border-b border-[#232832] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8b949e]">
            <div className="flex items-center gap-2">
              <span className="text-[#e1523d] font-semibold">// CHAPTER 06</span>
              <span>LIVING SNAPSHOT</span>
              <span>•</span>
              <span>THE NOW PAGE</span>
            </div>
            <div className="flex items-center gap-2 text-[#10b981] font-mono text-xs">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>Documented: {nowData.lastUpdated}</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee6]">
              Right Now.
            </h1>
            <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed font-light">
              A public, deliberate snapshot of what occupies my hands, mind, and curiosity at this specific moment in my life. Inspired by Derek Sivers&apos; public /now movement.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-[#8b949e]">
            <span className="flex items-center gap-1.5 text-[#cfd6e0]">
              <MapPin className="h-3.5 w-3.5 text-[#e1523d]" />
              <span>{nowData.currentLocation}</span>
            </span>
            <span>•</span>
            <span className="text-[#8b949e]">{nowData.academicStatus}</span>
          </div>
        </div>

        {/* =========================================================================
            MAIN 12-COLUMN EDITORIAL COMPOSITION (8 COL CONTENT + 4 COL STATUS SIDEBAR)
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (8 cols): Main Living Feed */}
          <div className="lg:col-span-8 space-y-12">
            {/* PART A: DAILY ROTATING QUOTATION */}
            <section className="space-y-3">
              <DailyQuoteCard />
            </section>

            {/* PART B: WHAT I AM CURRENTLY BUILDING */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1d222b] pb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#e1523d] uppercase font-bold tracking-wider">
                  <Hammer className="h-4 w-4" />
                  <span>What I Am Currently Building</span>
                </div>
                <span className="font-mono text-[11px] text-[#6b7280]">ACTIVE PROTOTYPES</span>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {nowData.building.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-7 space-y-4 hover:border-[#38404f] transition-all flex flex-col justify-between shadow-lg"
                  >
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                        <span className="font-bold text-[#f2eee6] text-base sm:text-lg">
                          {item.title}
                        </span>
                        <span className="rounded bg-[#1a1e26] px-2.5 py-0.5 text-[10px] text-[#10b981] border border-[#10b981]/20 font-semibold">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#9ca3af] leading-relaxed font-light">
                        {item.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#1f242e] flex justify-end">
                      <Link
                        href={item.canonicalLink}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[#e1523d] hover:text-[#ef634f] transition-colors font-medium"
                      >
                        <span>Explore Full Case Study</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PART C: WHAT I AM LEARNING & INVESTIGATING */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1d222b] pb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#3b68ff] uppercase font-bold tracking-wider">
                  <Cpu className="h-4 w-4" />
                  <span>What I Am Learning &amp; Investigating</span>
                </div>
                <span className="font-mono text-[11px] text-[#6b7280]">ACADEMIC FOCUS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {nowData.learning.map((item) => (
                  <div
                    key={item.topic}
                    className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 space-y-2.5 hover:border-[#38404f] transition-all flex flex-col justify-between shadow-lg"
                  >
                    <h4 className="font-bold text-sm text-[#f2eee6] font-mono leading-snug">
                      {item.topic}
                    </h4>
                    <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* PART D: WHAT IS ON MY MIND */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1d222b] pb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#10b981] uppercase font-bold tracking-wider">
                  <Lightbulb className="h-4 w-4" />
                  <span>What Is On My Mind</span>
                </div>
                <Link
                  href="/writing"
                  className="font-mono text-[11px] text-[#10b981] hover:underline"
                >
                  Read Full Notebook &rarr;
                </Link>
              </div>

              <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 space-y-4 shadow-lg">
                <ul className="space-y-4">
                  {nowData.thinkingAbout.map((thought, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3.5 text-sm text-[#cfd6e0] font-light leading-relaxed"
                    >
                      <span className="shrink-0 font-mono text-xs text-[#10b981] font-bold mt-0.5 whitespace-nowrap select-none">
                        0{i + 1} //
                      </span>
                      <span className="flex-1">{thought}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Right Column (4 cols): Ambient Status & Cultural Consumption Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Snapshot Card */}
            <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#1f242e] font-mono text-xs text-[#8b949e]">
                <span className="text-[#e1523d] font-bold">// AMBIENT STATUS</span>
                <span className="flex items-center gap-1.5 text-[#10b981]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span>Active</span>
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-3 space-y-0.5">
                  <span className="text-[#6b7280] block text-[10px]">CURRENT BASE</span>
                  <span className="text-[#f2eee6] font-sans font-medium block">
                    {nowData.currentLocation}
                  </span>
                </div>

                <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-3 space-y-0.5">
                  <span className="text-[#6b7280] block text-[10px]">SEMESTER STATUS</span>
                  <span className="text-[#f2eee6] font-sans font-medium block">
                    {nowData.academicStatus}
                  </span>
                </div>

                <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-3 space-y-0.5">
                  <span className="text-[#6b7280] block text-[10px]">LAST MANUAL UPDATE</span>
                  <span className="text-[#10b981] font-sans font-semibold block">
                    {nowData.lastUpdated}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#8b949e] font-light leading-relaxed pt-1">
                This page reflects deliberate manual updates as my semester unfolds. Not automated analytics or bot logs.
              </p>
            </div>

            {/* Cultural Consumption Card */}
            <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#1f242e]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#f59e0b] font-bold">
                  <Eye className="h-4 w-4" />
                  <span>CURRENTLY CONSUMING</span>
                </div>
                <Link
                  href="/taste"
                  className="font-mono text-[10px] text-[#f59e0b] hover:underline"
                >
                  Taste Archive &rarr;
                </Link>
              </div>

              <div className="space-y-3">
                {nowData.consuming.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-[#1f242e] bg-[#090a0d] p-3.5 space-y-1.5 hover:border-[#38404f] transition-all"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#8b949e]">
                      <span className="uppercase text-[#e1523d] font-semibold">{item.category}</span>
                      <span>{item.creator}</span>
                    </div>
                    <h5 className="font-bold text-xs text-[#f2eee6]">{item.title}</h5>
                    <p className="text-[11px] text-[#9ca3af] font-light leading-relaxed">
                      {item.note}
                    </p>
                    {item.canonicalLink && (
                      <div className="pt-1.5 flex justify-end">
                        <Link
                          href={item.canonicalLink}
                          className="font-mono text-[10px] text-[#8b949e] hover:text-[#f2eee6] inline-flex items-center gap-1"
                        >
                          <span>Explore in Taste</span>
                          <ArrowRight className="h-2.5 w-2.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation & Footnote Card */}
            <div className="rounded-2xl border border-[#232832] bg-[#0a0c0f] p-5 space-y-3 text-xs font-mono text-[#8b949e]">
              <div className="flex items-center gap-2 text-[#e1523d] font-bold">
                <Compass className="h-4 w-4" />
                <span>CANONICAL REFERENCE</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#6b7280]">
                Curious how this aligns with past years? Inspect the full milestone chronology in the{' '}
                <Link href="/archive" className="text-[#f2eee6] underline hover:text-[#e1523d]">
                  Archive
                </Link>{' '}
                or read my long-form reflections in the{' '}
                <Link href="/writing" className="text-[#f2eee6] underline hover:text-[#e1523d]">
                  Notebook
                </Link>.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
