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
} from 'lucide-react'
import { timelineEvents } from '@/data/timeline'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0d0f12] py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Page Header */}
        <div className="pb-12 border-b border-[#232832]">
          <div className="flex items-center gap-3 font-mono text-xs text-[#e1523d]">
            <span>// CHAPTER 04</span>
            <span>•</span>
            <span>THE PERSON BEHIND THE ARCHITECTURE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee6] mt-3">
            Vedant Garud
          </h1>
          <p className="text-base sm:text-lg text-[#9ca3af] mt-4 max-w-2xl leading-relaxed">
            Software engineer, student researcher at Pillai College of Engineering, and builder of autonomous systems that refuse to stay in textbook sandboxes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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
          </div>
        </div>

        {/* Narrative & Photographic Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Authentic Portrait Card */}
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
                  <span className="text-[#e1523d]">VEDANT GARUD</span>
                  <span>THANE, MAHARASHTRA</span>
                </div>
                <p className="text-[11px] font-sans text-[#a3abb6] leading-relaxed">
                  B.Tech IT (Specialization in Information Security & Data Forensics) at Pillai College of Engineering. Former Backend Intern at VFS Global.
                </p>
              </div>
            </div>

            {/* Quick Metadata Box */}
            <div className="rounded-lg border border-[#232832] bg-[#090a0d] p-5 font-mono text-xs space-y-2">
              <div className="flex justify-between text-[#8b949e]">
                <span>Coordinates</span>
                <span className="text-[#f2eee6]">19.2183° N, 72.9781° E</span>
              </div>
              <div className="flex justify-between text-[#8b949e]">
                <span>Status</span>
                <span className="text-[#10b981]">Active Builder & Student</span>
              </div>
              <div className="flex justify-between text-[#8b949e]">
                <span>Specialization</span>
                <span className="text-[#e1523d]">InfoSec & Forensics</span>
              </div>
              <div className="flex justify-between text-[#8b949e]">
                <span>Current Curiosity</span>
                <span className="text-[#3b68ff]">Agent Supply Chain Stability</span>
              </div>
            </div>
          </div>

          {/* Narrative Story */}
          <div className="lg:col-span-7 space-y-6 text-[#cfd6e0] text-base leading-relaxed">
            <h2 className="text-2xl font-bold text-[#f2eee6] tracking-tight">
              Curiosity, Deadlines &amp; Broken Hardware
            </h2>
            <p>
              I began programming out of a fascination with how simple logical rules can assemble into emergent, living systems. During my diploma at Vidya Prasarak Mandal&apos;s Polytechnic in Thane, that curiosity shifted from writing code on a screen to building systems that touch the physical world.
            </p>
            <p>
              Leading our capstone team in building the <strong className="text-[#f2eee6]">Agriculture Drone (Agridrone)</strong> was a turning point. When you fly a quadcopter with your own flight controller code and watch high-frequency motor vibrations shake the gyroscope into disorientation, you realize software does not exist in a vacuum. It forced me to think about edge cases, telemetry delays, and physical resilience.
            </p>
            <p>
              At <strong className="text-[#f2eee6]">VFS Global</strong> in Mumbai, I experienced the opposite side of the spectrum: large-scale enterprise backend infrastructure. Tracing live API timeouts, debugging SQL queries across tables with tens of thousands of records, and learning how microservices communicate under heavy load taught me the discipline of reading logs and respecting legacy architecture.
            </p>
            <p>
              Today at <strong className="text-[#f2eee6]">Pillai College of Engineering</strong>, my focus is at the intersection of Information Security, Data Forensics, and Autonomous Multi-Agent Systems. But engineering is only half of who I am.
            </p>
            <p>
              I am an obsessive cinephile and reader. I love stories about the quiet weight of being a hero — why Peter Parker missing his rent while saving New York moves me more than any billionaire hero, or why Christopher Nolan&apos;s ferry scene in <em>The Dark Knight</em> represents the highest ideal of moral courage. Movies like <em>Dead Poets Society</em> and <em>The Truman Show</em> gave me a moral compass long before I learned how to configure a database.
            </p>
            <p>
              Recently, as part of our Human Values and Social Ethics curriculum, I had the chance to visit an orphanage. It was an experience that stopped me in my tracks. When you spend time with kids who have so little yet smile so warmly, all the noise about placements, packages, and corporate ladders fades away. It cemented something very personal for me: while I once thought about taking my career abroad, experiences like that remind me why I want to stay right here, contribute to society, and build things that create real, positive change in India.
            </p>
          </div>
        </section>

        {/* What I Believe Makes a Good Engineer */}
        <section className="border-t border-[#232832] pt-14 space-y-8">
          <div>
            <span className="font-mono text-xs text-[#e1523d] font-semibold uppercase">
              // PRINCIPLES & PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6] mt-1">
              What I Believe About Building Software
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-3">
              <span className="font-mono text-xs text-[#e1523d] font-semibold">
                PRINCIPLE 01
              </span>
              <h3 className="font-bold text-lg text-[#f2eee6]">
                Clarity Over Cleverness
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                A dense one-line regex or an overly abstract inheritance hierarchy is a liability. Good engineering is making complex systems intelligible to the next person reading the logs at 2 AM.
              </p>
            </div>

            <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-3">
              <span className="font-mono text-xs text-[#3b68ff] font-semibold">
                PRINCIPLE 02
              </span>
              <h3 className="font-bold text-lg text-[#f2eee6]">
                Respect the Physical Constraint
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Whether it is battery weight on a drone, network packet drops over 433MHz radio, or database connection pool limits in production, systems only succeed when they respect physical reality.
              </p>
            </div>

            <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-3">
              <span className="font-mono text-xs text-[#10b981] font-semibold">
                PRINCIPLE 03
              </span>
              <h3 className="font-bold text-lg text-[#f2eee6]">
                Learn in Public / Unfinished
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Hiding broken experiments behind polished slides creates a false image. Real engineering growth happens when you document failures, explain trade-offs, and keep iterating.
              </p>
            </div>
          </div>
        </section>

        {/* Visual Timeline of Education & Milestones */}
        <section className="border-t border-[#232832] pt-14 space-y-8">
          <div>
            <span className="font-mono text-xs text-[#e1523d] font-semibold uppercase">
              // VERIFIED JOURNEY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6] mt-1">
              Academic & Professional Timeline
            </h2>
            <p className="text-sm text-[#9ca3af] mt-1 max-w-xl">
              Documented milestones across higher education, internships, and technical development.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l border-[#232832] space-y-12">
            {timelineEvents.map((event, idx) => (
              <div key={event.title + event.year} className="relative group">
                {/* Node indicator */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 bg-[#0d0f12] ${
                    event.status === 'active'
                      ? 'border-[#e1523d] shadow-[0_0_12px_rgba(225,82,61,0.5)]'
                      : 'border-[#3b4252]'
                  }`}
                />

                <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 space-y-4 hover:border-[#38404f] transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                    <span className="text-[#e1523d] font-semibold">{event.period}</span>
                    <span className="mono-badge">{event.type.toUpperCase()}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#f2eee6]">{event.title}</h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#8b949e] mt-1">
                      <span>{event.organization}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[#cfd6e0] leading-relaxed">
                    {event.summary}
                  </p>

                  <ul className="space-y-1.5 text-xs text-[#9ca3af] border-t border-[#1f242e] pt-4">
                    {event.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-[#e1523d] mt-0.5">&rarr;</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {event.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-[#0d0f12] border border-[#1f242e] px-2 py-0.5 font-mono text-[10px] text-[#6b7280]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Curiosities Beyond the Code */}
        <section className="border-t border-[#232832] pt-14 space-y-6">
          <div>
            <span className="font-mono text-xs text-[#e1523d] font-semibold uppercase">
              // ODD OBSERVATIONS
            </span>
            <h2 className="text-2xl font-bold text-[#f2eee6] mt-1">
              Curiosities & Unconventional Interests
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-[#9ca3af]">
            <div className="rounded-lg border border-[#232832] bg-[#14171d] p-5 space-y-2">
              <span className="text-[#e1523d] block font-bold">01 // Turn-Based Battle Mechanics</span>
              <p className="font-sans text-xs text-[#cfd6e0] leading-relaxed">
                Building a Pokémon game from scratch taught me more about state machine isolation, delta timing, and sprite atlas caching than any toy web app.
              </p>
            </div>

            <div className="rounded-lg border border-[#232832] bg-[#14171d] p-5 space-y-2">
              <span className="text-[#3b68ff] block font-bold">02 // The Mathematics of Panic</span>
              <p className="font-sans text-xs text-[#cfd6e0] leading-relaxed">
                How a 5% bump in grocery purchases turns into food rotting on distributor loading docks because of human safety stock paranoia (the Bullwhip Effect).
              </p>
            </div>

            <div className="rounded-lg border border-[#232832] bg-[#14171d] p-5 space-y-2">
              <span className="text-[#10b981] block font-bold">03 // Fieldwork vs. Emulators</span>
              <p className="font-sans text-xs text-[#cfd6e0] leading-relaxed">
                Your mobile UI is never truly tested until you try to read altitude telemetry on a smartphone under the harsh noon sun in rural Maharashtra.
              </p>
            </div>

            <div className="rounded-lg border border-[#232832] bg-[#14171d] p-5 space-y-2">
              <span className="text-[#f59e0b] block font-bold">04 // Cryptographic Avalanches</span>
              <p className="font-sans text-xs text-[#cfd6e0] leading-relaxed">
                Watching a single bit flip in an input string cascade into 50% of hash output bits changing is the closest thing computer science has to magic.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
