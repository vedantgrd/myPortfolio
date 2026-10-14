import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Compass,
  Cpu,
  Eye,
  Hammer,
  Lightbulb,
  MapPin,
  Sparkles,
  Music,
  Film,
} from 'lucide-react'
import { nowData } from '@/data/now'
import { DailyQuoteCard } from '@/components/now/DailyQuoteCard'

export default function NowPage() {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#f2eee6] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header / Masthead */}
        <div className="pb-10 border-b border-[#232832] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8b949e]">
            <div className="flex items-center gap-2">
              <span className="text-[#e1523d] font-semibold">// CHAPTER 07</span>
              <span>LIVING SNAPSHOT</span>
              <span>•</span>
              <span>THE NOW PAGE</span>
            </div>
            <div className="flex items-center gap-2 text-[#10b981]">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>Documented: {nowData.lastUpdated}</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee6]">
            Right Now.
          </h1>
          <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed font-light">
            A public, deliberate snapshot of what occupies my hands, mind, and curiosity at this specific moment in my life. Inspired by Derek Sivers&apos; public /now movement.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-[#8b949e]">
            <span className="flex items-center gap-1.5 text-[#cfd6e0]">
              <MapPin className="h-3.5 w-3.5 text-[#e1523d]" />
              <span>{nowData.currentLocation}</span>
            </span>
            <span>•</span>
            <span className="text-[#8b949e]">{nowData.academicStatus}</span>
          </div>
        </div>

        {/* PART A: DAILY ROTATING QUOTATION */}
        <section className="space-y-3">
          <DailyQuoteCard />
        </section>

        {/* Current Philosophy Banner */}
        <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 text-center space-y-1.5">
          <p className="font-serif italic text-lg sm:text-xl text-[#f2eee6]">
            {nowData.currentMotto}
          </p>
          <span className="font-mono text-xs text-[#8b949e] block">
            Focus: Software Architecture, Information Security, and Staying in India
          </span>
        </div>

        {/* PART B: WHAT I AM BUILDING */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#1d222b] pb-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#e1523d] uppercase font-bold tracking-wider">
              <Hammer className="h-4 w-4" />
              <span>What I Am Currently Building</span>
            </div>
            <span className="font-mono text-[11px] text-[#6b7280]">CANONICAL CASE STUDIES</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {nowData.building.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-3 hover:border-[#38404f] transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-[#f2eee6] text-base">{item.title}</span>
                    <span className="rounded bg-[#1a1e26] px-2 py-0.5 text-[10px] text-[#10b981] border border-[#10b981]/20">
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
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#e1523d] hover:text-[#ef634f] transition-colors"
                  >
                    <span>Explore Full Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PART C: WHAT I AM CONSUMING */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#1d222b] pb-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#f59e0b] uppercase font-bold tracking-wider">
              <Eye className="h-4 w-4" />
              <span>What I Am Consuming</span>
            </div>
            <Link
              href="/taste"
              className="font-mono text-[11px] text-[#f59e0b] hover:underline"
            >
              See Cultural Archive (Taste) &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {nowData.consuming.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#232832] bg-[#14171d] p-5 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] text-[#8b949e] uppercase block">
                    {item.category} // {item.creator}
                  </span>
                  <h4 className="font-bold text-sm text-[#f2eee6]">{item.title}</h4>
                  <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                    {item.note}
                  </p>
                </div>

                {item.canonicalLink && (
                  <div className="pt-3 border-t border-[#1f242e]">
                    <Link
                      href={item.canonicalLink}
                      className="text-[11px] font-mono text-[#8b949e] hover:text-[#f2eee6] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>In Taste</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* PART D: WHAT I AM LEARNING */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#1d222b] pb-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#3b68ff] uppercase font-bold tracking-wider">
              <Cpu className="h-4 w-4" />
              <span>What I Am Learning &amp; Investigating</span>
            </div>
            <span className="font-mono text-[11px] text-[#6b7280]">CURRENT ACADEMIC GOALS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nowData.learning.map((item) => (
              <div
                key={item.topic}
                className="rounded-xl border border-[#232832] bg-[#14171d] p-5 space-y-2"
              >
                <h4 className="font-bold text-sm text-[#f2eee6] font-mono">{item.topic}</h4>
                <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PART E: WHAT IS ON MY MIND */}
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

          <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-4">
            <ul className="space-y-3">
              {nowData.thinkingAbout.map((thought, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#cfd6e0] font-light leading-relaxed">
                  <span className="font-mono text-xs text-[#10b981] mt-0.5 font-bold">
                    0{i + 1} //
                  </span>
                  <span>{thought}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PART F: PRESERVATION FOOTNOTE */}
        <div className="rounded-xl border border-[#232832] bg-[#0a0c0f] p-6 text-center space-y-2 font-mono text-xs text-[#8b949e]">
          <p>
            Last manually updated: <span className="text-[#f2eee6]">{nowData.lastUpdated}</span>.
          </p>
          <p className="text-[11px] text-[#6b7280]">
            The daily quotation rotates automatically based on the calendar day, while the activities reflect deliberate manual updates as my semester unfolds.
          </p>
        </div>
      </div>
    </div>
  )
}
