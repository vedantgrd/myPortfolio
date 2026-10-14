import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Compass,
  Cpu,
  Eye,
  Film,
  Hammer,
  Lightbulb,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { nowData } from '@/data/now'

export default function NowPage() {
  return (
    <div className="min-h-screen bg-[#0d0f12] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="pb-12 border-b border-[#232832]">
          <div className="flex items-center gap-3 font-mono text-xs text-[#e1523d]">
            <span>// LIVING SNAPSHOT</span>
            <span>•</span>
            <span>THE NOW PAGE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee6] mt-3">
            Right Now.
          </h1>
          <p className="text-base sm:text-lg text-[#cfd6e0] mt-4 leading-relaxed font-light">
            A public log of what occupies my mind, hands, and time at this specific moment in my life. Inspired by Derek Sivers&apos; /now page movement.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs text-[#8b949e]">
            <span className="flex items-center gap-1.5 text-[#10b981]">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>Last Documented: {nowData.lastUpdated}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{nowData.currentLocation}</span>
            </span>
          </div>
        </div>

        {/* Current Motto / Guiding Line */}
        <div className="rounded-xl border border-[#e1523d]/30 bg-[#14171d] p-6 text-center">
          <p className="font-serif italic text-lg sm:text-xl text-[#f2eee6]">
            {nowData.currentMotto}
          </p>
          <span className="font-mono text-xs text-[#8b949e] mt-2 block">
            {nowData.academicFocus}
          </span>
        </div>

        {/* What I'm Building */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-[#e1523d] uppercase font-bold">
            <Hammer className="h-4 w-4" />
            <span>01 // What I&apos;m Building</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {nowData.building.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-2 hover:border-[#3b4352] transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <span className="font-bold text-[#f2eee6] text-base">{item.title}</span>
                  <span className="mono-badge text-[#10b981] border-[#10b981]/30">
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-[#9ca3af] leading-relaxed">
                  {item.description}
                </p>
                {item.link && (
                  <div className="pt-2">
                    <Link
                      href={item.link}
                      className="font-mono text-xs text-[#e1523d] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Explore this system &rarr;</span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* What I'm Learning */}
        <section className="space-y-6 border-t border-[#232832] pt-12">
          <div className="flex items-center gap-2 font-mono text-xs text-[#3b68ff] uppercase font-bold">
            <Cpu className="h-4 w-4" />
            <span>02 // What I&apos;m Learning &amp; Investigating</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nowData.learning.map((item) => (
              <div
                key={item.topic}
                className="rounded-xl border border-[#232832] bg-[#14171d] p-5 space-y-2"
              >
                <h3 className="font-bold text-sm text-[#f2eee6]">{item.topic}</h3>
                <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                  {item.context}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What I'm Reading & Watching */}
        <section className="space-y-6 border-t border-[#232832] pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Reading */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#f59e0b] uppercase font-bold">
                <BookOpen className="h-4 w-4" />
                <span>What I&apos;m Reading</span>
              </div>
              <div className="space-y-3">
                {nowData.reading.map((b) => (
                  <div
                    key={b.title}
                    className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-1"
                  >
                    <div className="font-bold text-sm text-[#f2eee6]">{b.title}</div>
                    <div className="font-mono text-[11px] text-[#8b949e]">by {b.author}</div>
                    <p className="text-xs text-[#9ca3af] pt-1 leading-relaxed">{b.notes}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Watching */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#10b981] uppercase font-bold">
                <Film className="h-4 w-4" />
                <span>What I&apos;m Watching</span>
              </div>
              <div className="space-y-3">
                {nowData.watching.map((w) => (
                  <div
                    key={w.title}
                    className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-1"
                  >
                    <div className="font-bold text-sm text-[#f2eee6]">{w.title}</div>
                    <div className="font-mono text-[11px] text-[#8b949e]">{w.type}</div>
                    <p className="text-xs text-[#9ca3af] pt-1 leading-relaxed">{w.reflection}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What Occupies My Thoughts */}
        <section className="space-y-6 border-t border-[#232832] pt-12">
          <div className="flex items-center gap-2 font-mono text-xs text-[#e1523d] uppercase font-bold">
            <Lightbulb className="h-4 w-4" />
            <span>03 // What Occupies My Mind</span>
          </div>
          <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 space-y-4">
            {nowData.thinkingAbout.map((thought, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-[#cfd6e0] leading-relaxed">
                <span className="font-mono text-[#e1523d] text-xs mt-0.5">0{i + 1}</span>
                <span>{thought}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
