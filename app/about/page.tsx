import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Compass,
  Download,
  GraduationCap,
  Heart,
  MapPin,
  Sparkles,
  Terminal,
  ShieldCheck,
  Film,
  Music,
} from 'lucide-react'
import { timelineEvents } from '@/data/timeline'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#f2eee6] py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Page Header / Masthead */}
        <div className="pb-12 border-b border-[#232832] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8b949e]">
            <div className="flex items-center gap-2">
              <span className="text-[#e1523d] font-semibold">// CHAPTER 04</span>
              <span>PERSONAL NARRATIVE</span>
              <span>•</span>
              <span>THE PERSON BEHIND THE ARCHITECTURE</span>
            </div>
            <div className="flex items-center gap-2 rounded border border-[#232832] bg-[#14171d] px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
              <span>THANE &amp; NEW PANVEL, INDIA</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee6]">
              Vedant Garud
            </h1>
            <p className="text-lg sm:text-xl text-[#9ca3af] leading-relaxed font-light">
              Engineering student at Pillai College of Engineering, builder of tangible prototypes, and someone who believes software without human empathy is hollow.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="mailto:vedantgarud05@gmail.com?subject=Reaching%20Out%20Regarding%20Collaboration"
              className="inline-flex items-center gap-2 rounded bg-[#e1523d] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white font-medium hover:bg-[#ef634f] transition-colors"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-[#232832] bg-[#14171d] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#f2eee6] hover:border-[#8b949e] hover:bg-[#1a1e26] transition-colors"
            >
              <Download className="h-4 w-4 text-[#8b949e]" />
              <span>Verified Résumé (PDF)</span>
            </a>
            <Link
              href="/archive"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8b949e] hover:text-[#f2eee6] px-3 py-2 transition-colors"
            >
              <span>View Chronological Archive &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Narrative Grid: Photo + Section A (Introduction) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Portrait Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-[#232832] bg-[#14171d] p-4 shadow-xl">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-[#282e3b] bg-[#090a0d]">
                <img
                  src="/images/profile.jpg"
                  alt="Vedant Garud"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 space-y-2 font-mono text-xs text-[#8b949e]">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#e1523d] font-semibold">VEDANT GARUD</span>
                  <span>THANE, MAHARASHTRA</span>
                </div>
                <p className="text-[11px] font-sans text-[#a3abb6] leading-relaxed">
                  B.Tech IT (Information Security &amp; Data Forensics) at Pillai College of Engineering. Former Backend Intern at VFS Global.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#232832] bg-[#0d0f12] p-5 font-mono text-xs text-[#8b949e] space-y-2">
              <span className="text-[#f2eee6] block font-semibold text-[11px] uppercase tracking-wider">
                CORE TECHNICAL REPERTOIRE
              </span>
              <p className="text-[11px] text-[#6b7280] leading-relaxed">
                Python, TypeScript, Next.js 16, FastAPI, PostgreSQL, Embedded Hardware, Android, Cryptographic Algorithms, System Dynamics.
              </p>
            </div>
          </div>

          {/* Section A & B: Narrative */}
          <div className="lg:col-span-7 space-y-8 font-light text-[#cfd6e0] leading-relaxed">
            <div className="space-y-3">
              <span className="font-mono text-xs font-semibold text-[#e1523d] uppercase tracking-wider">
                A // THE INTRODUCTION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6]">
                Not Two People, Just One.
              </h2>
              <p>
                Most developer portfolios try to convince you that the engineer is an emotionless code generator who speaks only in benchmarks, Docker containers, and framework acronyms.
              </p>
              <p>
                I don&apos;t believe in that pretense. On one side, I build software: I engineer multi-agent supply chain dampening simulations, architect scholarship matching heuristics with strict sub-45ms latency bounds, and build physical quadcopters.
              </p>
              <p>
                On the other side, I watch movies like <em>The Truman Show</em> and carry their ending for three days. I visit an orphanage in Maharashtra and start questioning my entire life direction. I care about my friends, my country, and the quiet questions that keep people awake at night. This website is the place where both halves exist honestly.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#1f242e]">
              <span className="font-mono text-xs font-semibold text-[#3b68ff] uppercase tracking-wider">
                B // WHY ENGINEERING?
              </span>
              <h3 className="text-xl font-bold text-[#f2eee6]">
                From Tinkering to Systems That Matter
              </h3>
              <p>
                My path into engineering wasn&apos;t sparked by a Silicon Valley pitch deck. It started with an obsession with understanding how invisible systems work beneath the surface.
              </p>
              <p>
                During my diploma at VPM&apos;s Polytechnic, that curiosity moved from screen pixels into physical physics when we built the Agriculture Drone. Seeing motor vibrations break attitude estimators taught me that software is not abstract math—it lives in physical space with friction, thermal limits, and real consequences.
              </p>
              <p>
                Today, specializing in Information Security &amp; Data Forensics at Pillai College of Engineering, I look for systems where failure is catastrophic: supply chain bullwhip oscillations that cause perishable food to rot, or opaque scholarship systems that lock underprivileged students out of higher education aid.
              </p>
            </div>
          </div>
        </section>

        {/* Section C & D: The Builder & How I Work */}
        <section className="border-t border-[#232832] pt-16 space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold text-[#10b981] uppercase tracking-wider">
              C &amp; D // THE BUILDER &amp; HOW I WORK
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6]">
              Working Principles &amp; Craft
            </h2>
            <p className="text-sm text-[#9ca3af] font-light max-w-xl">
              How I approach technical ambiguity, project decisions, and debugging under pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-3">
              <span className="font-mono text-xs text-[#10b981] font-bold block">
                01 // CURIOSITY BEFORE SPECULATION
              </span>
              <h3 className="text-base font-bold text-[#f2eee6]">
                Build to Understand
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                You cannot debug reality with slide decks. When testing Bullwhip AI or Agridrone, building a messy working prototype revealed edge-cases that four hours of theory never surfaced.
              </p>
            </div>

            <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-3">
              <span className="font-mono text-xs text-[#3b68ff] font-bold block">
                02 // HONESTY OVER POLISH
              </span>
              <h3 className="text-base font-bold text-[#f2eee6]">
                Respect the Failures
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                I would rather show you why our drone flipped on test flight one and how we solved motor harmonics with silicone grommets than show an artificial 100% success reel.
              </p>
            </div>

            <div className="rounded-xl border border-[#232832] bg-[#e1523d] p-6 space-y-3">
              <span className="font-mono text-xs text-[#e1523d] font-bold block">
                03 // THE HUMAN STAKES
              </span>
              <h3 className="text-base font-bold text-[#f2eee6]">
                Empathy Is an Architectural Tool
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                An algorithm that matches scholarships in 40ms is useless if the form assumes a high-speed fiber connection. Designing for real people in India requires radical simplicity.
              </p>
            </div>
          </div>
        </section>

        {/* Section E & F: Beyond Engineering -> Links to Taste and Notebook */}
        <section className="border-t border-[#232832] pt-16 space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold text-[#f59e0b] uppercase tracking-wider">
              E &amp; F // BEYOND THE SCREEN
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6]">
              Stories, Music &amp; Personal Writing
            </h2>
            <p className="text-sm text-[#9ca3af] font-light max-w-xl">
              Technical power without cultural literacy creates cold software. My thinking is constantly shaped by cinema, songwriting, and honest reflections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#f59e0b]">
                  <Film className="h-4 w-4" />
                  <span className="font-bold">CULTURAL ARCHIVE: TASTE</span>
                </div>
                <h3 className="text-xl font-bold text-[#f2eee6]">
                  Cinema, Music &amp; Books
                </h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed font-light">
                  A personal collection of works that shaped my moral compass: Peter Weir&apos;s <em>The Truman Show</em> and <em>Dead Poets Society</em>, Christopher Nolan&apos;s <em>The Dark Knight</em>, Sam Raimi&apos;s <em>Spider-Man 2</em>, and artists like The Beatles and The Smiths.
                </p>
              </div>

              <div className="pt-4 border-t border-[#1f242e]">
                <Link
                  href="/taste"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#f59e0b] hover:text-[#fbbf24] transition-colors"
                >
                  <span>Explore Cultural Archive (Taste)</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#e1523d]">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-bold">THE NOTEBOOK &amp; ESSAYS</span>
                </div>
                <h3 className="text-xl font-bold text-[#f2eee6]">
                  Personal Essays &amp; Reflections
                </h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed font-light">
                  Long-form writing about mental health and Robin Williams (<em>So, Suicide.</em>), visiting an orphanage in India, the burden of superheroes, and engineering postmortems.
                </p>
              </div>

              <div className="pt-4 border-t border-[#1f242e]">
                <Link
                  href="/writing"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#e1523d] hover:text-[#ef634f] transition-colors"
                >
                  <span>Browse All Notebook Essays</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section G: Education & Journey */}
        <section className="border-t border-[#232832] pt-16 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-semibold text-[#3b68ff] uppercase tracking-wider">
                G // EDUCATION &amp; JOURNEY
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6] mt-1">
                Verified Academic Path
              </h2>
            </div>
            <Link
              href="/archive"
              className="font-mono text-xs text-[#3b68ff] hover:underline"
            >
              See Full Chronological Archive &rarr;
            </Link>
          </div>

          <div className="space-y-6">
            {timelineEvents.map((event) => (
              <div
                key={event.title}
                className="rounded-xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#8b949e] border-b border-[#1f242e] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#3b68ff] font-semibold">{event.organization}</span>
                    <span>•</span>
                    <span>{event.location}</span>
                  </div>
                  <span className="rounded bg-[#1a1e26] px-2 py-0.5 text-[10px] text-[#e1523d]">
                    {event.period}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#f2eee6]">{event.title}</h3>
                  <p className="text-sm text-[#9ca3af] mt-2 font-light leading-relaxed">
                    {event.summary}
                  </p>
                </div>

                <ul className="space-y-1.5 pt-2">
                  {event.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#cfd6e0] font-light">
                      <span className="text-[#3b68ff] font-mono">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section H & I: Looking Ahead & Transmission */}
        <section className="border-t border-[#232832] pt-16 pb-8 space-y-6">
          <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-8 sm:p-12 space-y-6">
            <span className="font-mono text-xs font-semibold text-[#e1523d] uppercase tracking-wider">
              H &amp; I // LOOKING AHEAD &amp; TRANSMISSION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f2eee6]">
              Building for What Comes Next.
            </h2>
            <p className="text-base text-[#9ca3af] font-light leading-relaxed max-w-2xl">
              I want to continue engineering software systems in India that tackle unglamorous, high-impact problems in security, education access, and logistics. If you share that ambition or want to collaborate on something technically rigorous, my transmission line is always open.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded bg-[#e1523d] px-6 py-3 font-mono text-xs uppercase tracking-wider text-white font-medium hover:bg-[#ef634f] transition-colors"
              >
                <span>Direct Transmission</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/vedantgrd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-[#232832] bg-[#0d0f12] px-6 py-3 font-mono text-xs uppercase tracking-wider text-[#f2eee6] hover:border-[#8b949e] transition-colors"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
