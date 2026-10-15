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
  Code2,
  Cpu,
  Layers,
  Shield,
  Activity,
  Workflow,
  Radio,
  FileText,
} from 'lucide-react'
import { timelineEvents } from '@/data/timeline'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#f2eee6] pt-6 pb-20 sm:pt-8 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* =========================================================================
            MASTHEAD / PAGE HEADER
        ========================================================================= */}
        <div className="pb-12 border-b border-[#232832] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8b949e]">
            <div className="flex items-center gap-2">
              <span className="text-[#e1523d] font-semibold">// CHAPTER 07</span>
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

        {/* =========================================================================
            ROW 1: IDENTITY & PROFILE (LEFT 5 COL) + SECTION A: NARRATIVE (RIGHT 7 COL)
        ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Portrait & Verified Profile Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-7 flex flex-col justify-between h-full shadow-xl space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#8b949e] border-b border-[#1f242e] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
                    <span className="text-[#f2eee6] font-semibold">VEDANT GARUD</span>
                  </div>
                  <span className="rounded bg-[#1a1e26] border border-[#2d3442] px-2 py-0.5 text-[10px] text-[#e1523d] font-semibold">
                    PROFILE
                  </span>
                </div>

                <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-[#282e3b] bg-[#090a0d] shadow-inner">
                  <img
                    src="/images/profile.jpg"
                    alt="Vedant Garud"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px] text-[#8b949e]">
                    <span className="text-[#e1523d] font-semibold">B.TECH INFORMATION TECHNOLOGY</span>
                    <span>THANE, INDIA</span>
                  </div>
                  <p className="text-xs font-sans text-[#a3abb6] leading-relaxed">
                    Undergraduate engineer specializing in Information Security &amp; Data Forensics at Pillai College of Engineering. Former Backend Intern at VFS Global.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1f242e] font-mono text-[10px]">
                  <div className="rounded border border-[#1f242e] bg-[#090a0d] p-2.5">
                    <span className="text-[#6b7280] block">CURRENT DEGREE</span>
                    <strong className="text-[#cfd6e0] text-[11px] block mt-0.5">B.Tech IT (PCE)</strong>
                  </div>
                  <div className="rounded border border-[#1f242e] bg-[#090a0d] p-2.5">
                    <span className="text-[#6b7280] block">FOUNDATION</span>
                    <strong className="text-[#cfd6e0] text-[11px] block mt-0.5">Diploma IT (VPM)</strong>
                  </div>
                  <div className="rounded border border-[#1f242e] bg-[#090a0d] p-2.5">
                    <span className="text-[#6b7280] block">SPECIALIZATION</span>
                    <strong className="text-[#f59e0b] text-[11px] block mt-0.5">InfoSec / Forensics</strong>
                  </div>
                  <div className="rounded border border-[#1f242e] bg-[#090a0d] p-2.5">
                    <span className="text-[#6b7280] block">CORE CRAFT</span>
                    <strong className="text-[#3b68ff] text-[11px] block mt-0.5">Systems &amp; AI</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1f242e] flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
                <span className="flex items-center gap-1.5 text-[#10b981]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                  <span>Available for 2026 roles</span>
                </span>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8b949e] hover:text-[#f2eee6] inline-flex items-center gap-1 transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>Verified CV &rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Section A (The Narrative Introduction) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 flex flex-col justify-between h-full shadow-xl space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#8b949e] border-b border-[#1f242e] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e1523d] font-semibold">// CHAPTER 04</span>
                    <span>SECTION A: THE INTRODUCTION</span>
                  </div>
                  <span className="text-[#6b7280]">PERSONAL NARRATIVE</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6] tracking-tight">
                  Not Two People, Just One.
                </h2>

                <div className="space-y-4 font-light text-[#cfd6e0] leading-relaxed text-sm sm:text-base">
                  <p>
                    Most developer portfolios try to convince you that the engineer is an emotionless code generator who speaks only in benchmarks, Docker containers, and framework acronyms.
                  </p>
                  <p>
                    I don&apos;t believe in that pretense. On one side, I build software: I engineer multi-agent supply chain dampening simulations, architect scholarship matching heuristics with strict sub-45ms latency bounds, and build physical quadcopters.
                  </p>
                  <p>
                    On the other side, I watch movies like <em>The Truman Show</em> and carry their ending for three days. I visit an orphanage in Maharashtra and start questioning my entire life direction. I care about my friends, my country, and the quiet questions that keep people awake at night. This website is the place where both halves exist honestly.
                  </p>
                  <p>
                    To me, engineering is never just an intellectual exercise in abstract logic—it is an applied form of care. Every line of backend architecture, every optimized database query, and every deterministic state machine is ultimately tethered to a living, breathing human context. If we strip away conscience, wonder, and vulnerability from our craft, all that remains is cold machinery.
                  </p>
                  <p>
                    Whether I am writing distributed consensus protocols or reflecting on a film that shattered my worldview, I bring the exact same intensity and honesty to the table. I refuse to compartmentalize my curiosity into sterile corporate personas.
                  </p>
                </div>

                <blockquote className="rounded-xl border-l-2 border-[#e1523d] bg-[#0d0f12] p-4 text-xs sm:text-sm text-[#cfd6e0] font-serif italic leading-relaxed">
                  &ldquo;A typical portfolio says &apos;here are my skills.&apos; I want this space to feel like entering someone&apos;s world—where technical rigor and human vulnerability belong to the same person.&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#1f242e] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8b949e]">
                <span>Authentic digital archive &amp; engineering log.</span>
                <Link
                  href="/archive"
                  className="text-[#e1523d] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>Explore Chronological Milestones &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ROW 2: BALANCED 2-COLUMN // WHY ENGINEERING JOURNEY (LEFT) + ARCHITECTURAL CONVICTIONS (RIGHT)
            (Both cards share matching heights and balanced content density, eliminating blank space)
        ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Container: Why Engineering Journey */}
          <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 flex flex-col justify-between h-full shadow-xl space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1f242e]">
                <div className="flex items-center gap-2">
                  <span className="text-[#3b68ff] font-bold text-xs uppercase tracking-wider font-mono">
                    // SECTION B
                  </span>
                  <span className="text-xs text-[#8b949e] font-mono">
                    SYSTEMS PHILOSOPHY
                  </span>
                </div>
                <span className="rounded bg-[#1a1e26] border border-[#2d3442] px-2.5 py-1 text-[11px] text-[#3b68ff] font-mono font-semibold">
                  ORIGIN &amp; CRAFT
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-[#f2eee6] tracking-tight">
                  From Tinkering to Systems That Matter
                </h3>
                <div className="space-y-3 font-light text-[#cfd6e0] leading-relaxed text-sm">
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

              {/* Verified Grounding Callout */}
              <div className="rounded-xl border border-[#1f242e] bg-[#090a0d] p-4 space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs text-[#3b68ff]">
                  <Workflow className="h-4 w-4" />
                  <span className="font-semibold uppercase tracking-wider">Applied Engineering Thesis</span>
                </div>
                <p className="text-xs text-[#8b949e] leading-relaxed font-light">
                  Software that solves real problems cannot be designed in vacuum abstractions. Whether interfacing MAVLink telemetry or computing scholarship eligibility, constraints define the architecture.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1f242e] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <Link
                href="/work"
                className="text-[#3b68ff] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>Inspect Verified Case Studies &rarr;</span>
              </Link>
              <Link
                href="/archive"
                className="text-[#8b949e] hover:text-[#f2eee6] inline-flex items-center gap-1 transition-colors"
              >
                <span>Academic Record &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Container: First-Principles Architectural Convictions */}
          <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 flex flex-col justify-between h-full shadow-xl space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1f242e]">
                <div className="flex items-center gap-2">
                  <span className="text-[#10b981] font-bold text-xs uppercase tracking-wider font-mono">
                    // AXIOMS
                  </span>
                  <span className="text-xs text-[#8b949e] font-mono">
                    ENGINEERING CONVICTIONS
                  </span>
                </div>
                <span className="rounded bg-[#1a1e26] border border-[#2d3442] px-2.5 py-1 text-[11px] text-[#10b981] font-mono font-semibold">
                  3 FIRST-PRINCIPLES
                </span>
              </div>

              <div className="space-y-3">
                {/* Axiom 1 */}
                <div className="rounded-xl border border-[#1f242e] bg-[#090a0d] p-4 space-y-1.5 hover:border-[#e1523d]/40 transition-colors">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#e1523d] font-bold">01 // DETERMINISM OVER BLACK BOXES</span>
                    <span className="rounded bg-[#e1523d]/15 px-2 py-0.5 text-[10px] text-[#e1523d] font-bold">Vidyut Engine</span>
                  </div>
                  <p className="text-xs text-[#9ca3af] font-sans leading-relaxed">
                    When software allocates education aid or critical resources, black-box AI hallucinations are unacceptable. Criteria must be auditable, explainable, and bounded by deterministic relational models.
                  </p>
                </div>

                {/* Axiom 2 */}
                <div className="rounded-xl border border-[#1f242e] bg-[#090a0d] p-4 space-y-1.5 hover:border-[#10b981]/40 transition-colors">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#10b981] font-bold">02 // THE PHYSICAL GROUNDING</span>
                    <span className="rounded bg-[#10b981]/15 px-2 py-0.5 text-[10px] text-[#10b981] font-bold">Avionics Core</span>
                  </div>
                  <p className="text-xs text-[#9ca3af] font-sans leading-relaxed">
                    Software executes on spinning drone motors, noisy 433MHz radio transceivers, and battery curves. Respecting physical hardware physics makes code resilient in the real world.
                  </p>
                </div>

                {/* Axiom 3 */}
                <div className="rounded-xl border border-[#1f242e] bg-[#090a0d] p-4 space-y-1.5 hover:border-[#3b68ff]/40 transition-colors">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#3b68ff] font-bold">03 // TRANSPARENCY DAMPENS CHAOS</span>
                    <span className="rounded bg-[#3b68ff]/15 px-2 py-0.5 text-[10px] text-[#3b68ff] font-bold">Bullwhip AI</span>
                  </div>
                  <p className="text-xs text-[#9ca3af] font-sans leading-relaxed">
                    Most organizational and supply failures aren&apos;t malicious—they are caused by siloed panic and information lag. Real-time telemetry sharing dampens catastrophic upstream oscillations.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1f242e] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <Link
                href="/lab#bullwhip-simulator"
                className="text-[#10b981] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>Run Signal Dampening Sim &rarr;</span>
              </Link>
              <Link
                href="/writing"
                className="text-[#8b949e] hover:text-[#f2eee6] inline-flex items-center gap-1 transition-colors"
              >
                <span>Read Engineering Essays &rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ROW 3: TECHNICAL REPERTOIRE & CAPABILITY ARCHITECTURE (FULL WIDTH 4-COL GRID)
            (Clear, visual, balanced across all 4 domains with project links - no cramped sidebar)
        ========================================================================= */}
        <section id="tech-stack" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#232832]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#e1523d]">
                <Activity className="h-4 w-4" />
                <span className="font-bold uppercase tracking-wider">// SECTION C • TECHNICAL REPERTOIRE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6] tracking-tight">
                Verified Engineering Competencies
              </h2>
              <p className="text-sm text-[#9ca3af] font-light max-w-2xl leading-relaxed">
                Technologies, systems, and protocols actively used across production platforms, hardware prototypes, and discrete simulations.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="rounded border border-[#2d3442] bg-[#14171d] px-3 py-1 text-[#10b981]">
                4 CORE DOMAINS
              </span>
              <Link
                href="/lab"
                className="rounded border border-[#e1523d]/30 bg-[#e1523d]/10 px-3 py-1 text-[#e1523d] hover:bg-[#e1523d]/20 transition-colors"
              >
                Test in Lab &rarr;
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Domain 1: Languages & Core Runtimes */}
            <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 flex flex-col justify-between hover:border-[#38404f] transition-all space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1f242e]">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-[#e1523d]" />
                    <h3 className="font-bold text-sm text-[#f2eee6]">Languages &amp; Core</h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#6b7280]">4 RUNTIMES</span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-[12px] font-sans">TypeScript</strong>
                      <span className="text-[10px] text-[#e1523d] font-bold">Vidyut</span>
                    </div>
                    <span className="text-[10px] text-[#8b949e] block font-sans">Next.js 16, strict types, reactive state</span>
                  </div>

                  <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-[12px] font-sans">Python 3</strong>
                      <span className="text-[10px] text-[#3b68ff] font-bold">Bullwhip AI</span>
                    </div>
                    <span className="text-[10px] text-[#8b949e] block font-sans">Discrete-event sim, Pygame loops</span>
                  </div>

                  <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-[12px] font-sans">Java / Android</strong>
                      <span className="text-[10px] text-[#10b981] font-bold">Agridrone</span>
                    </div>
                    <span className="text-[10px] text-[#8b949e] block font-sans">Native GCS, serial MAVLink radio</span>
                  </div>

                  <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-[12px] font-sans">SQL &amp; Relational</strong>
                      <span className="text-[10px] text-[#f59e0b] font-bold">Postgres</span>
                    </div>
                    <span className="text-[10px] text-[#8b949e] block font-sans">ACID schemas, indexed queries</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1f242e] text-[11px] font-mono text-[#8b949e]">
                Primary production stacks
              </div>
            </div>

            {/* Domain 2: Web & Full-Stack Systems */}
            <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 flex flex-col justify-between hover:border-[#38404f] transition-all space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1f242e]">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-[#3b68ff]" />
                    <h3 className="font-bold text-sm text-[#f2eee6]">Web &amp; Full-Stack</h3>
                  </div>
                  <span className="rounded bg-[#3b68ff]/15 px-2 py-0.5 text-[10px] text-[#3b68ff] font-bold font-mono">
                    PRODUCTION
                  </span>
                </div>

                <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                  High-performance web applications, server components, and responsive charting frameworks.
                </p>

                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  {[
                    'Next.js 16',
                    'React 19',
                    'FastAPI',
                    'Tailwind CSS 4',
                    'Framer Motion',
                    'REST APIs',
                    'SVG Charting',
                    'Client State',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-[#282e3b] bg-[#090a0d] px-2 py-1 text-[#f2eee6] text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#1f242e] text-[11px] font-mono text-[#3b68ff]">
                Sub-45ms heuristic latency
              </div>
            </div>

            {/* Domain 3: InfoSec & Data Forensics */}
            <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 flex flex-col justify-between hover:border-[#38404f] transition-all space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1f242e]">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[#f59e0b]" />
                    <h3 className="font-bold text-sm text-[#f2eee6]">InfoSec &amp; Forensics</h3>
                  </div>
                  <span className="rounded bg-[#f59e0b]/15 px-2 py-0.5 text-[10px] text-[#f59e0b] font-bold font-mono">
                    PCE PANVEL
                  </span>
                </div>

                <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                  Academic specialization focusing on applied cryptanalysis, packet inspection, and forensic artifact reconstruction.
                </p>

                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  {[
                    'Applied Cryptanalysis',
                    'Avalanche Effect',
                    'Packet Protocols',
                    'Data Forensics',
                    'Memory Inspection',
                    'Vulnerability Audits',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-[#282e3b] bg-[#090a0d] px-2 py-1 text-[#cfd6e0] text-[11px]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#1f242e] text-[11px] font-mono text-[#f59e0b]">
                Degree Major Focus
              </div>
            </div>

            {/* Domain 4: Multi-Agent & Embedded */}
            <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 flex flex-col justify-between hover:border-[#38404f] transition-all space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1f242e]">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-[#10b981]" />
                    <h3 className="font-bold text-sm text-[#f2eee6]">Multi-Agent &amp; Embedded</h3>
                  </div>
                  <span className="rounded bg-[#10b981]/15 px-2 py-0.5 text-[10px] text-[#10b981] font-bold font-mono">
                    RESEARCH
                  </span>
                </div>

                <div className="space-y-2.5 text-xs font-sans">
                  <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-2.5 space-y-1">
                    <strong className="text-white block text-[11px] font-mono text-[#10b981]">
                      Multi-Agent Coordination
                    </strong>
                    <span className="text-[11px] text-[#8b949e] leading-relaxed block font-light">
                      Decentralized signal dampening mitigating perishable bullwhip oscillations.
                    </span>
                  </div>

                  <div className="rounded-lg border border-[#1f242e] bg-[#090a0d] p-2.5 space-y-1">
                    <strong className="text-white block text-[11px] font-mono text-[#10b981]">
                      Embedded Avionics
                    </strong>
                    <span className="text-[11px] text-[#8b949e] leading-relaxed block font-light">
                      Quadcopter flight controllers, 433MHz telemetry transceivers, and motor vibration dampening.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1f242e] text-[11px] font-mono text-[#10b981]">
                Empirical Hardware &amp; Discrete Sim
              </div>
            </div>
          </div>

          {/* Project-Linked Capability Strip */}
          <div className="rounded-xl border border-[#232832] bg-[#101217] p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[#8b949e]">
                ALL COMPETENCIES BACKED BY OPEN-SOURCE REPOSITORIES &amp; INTERACTIVE SIMULATIONS:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/work/vidyut" className="text-[#e1523d] hover:underline">
                Vidyut &rarr;
              </Link>
              <Link href="/lab#bullwhip-simulator" className="text-[#3b68ff] hover:underline">
                Bullwhip AI &rarr;
              </Link>
              <Link href="/work/agridrone" className="text-[#10b981] hover:underline">
                Agridrone &rarr;
              </Link>
              <Link href="/lab#cipher-lab" className="text-[#f59e0b] hover:underline">
                CipherLab &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ROW 4: WORKING PRINCIPLES & CRAFT (SECTION D)
        ========================================================================= */}
        <section className="border-t border-[#232832] pt-16 space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold text-[#10b981] uppercase tracking-wider">
              // SECTION D • HOW I WORK
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6]">
              Working Principles &amp; Craft
            </h2>
            <p className="text-sm text-[#9ca3af] font-light max-w-xl">
              How I approach technical ambiguity, project decisions, and debugging under pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 space-y-3 flex flex-col justify-between hover:border-[#38404f] transition-all">
              <div className="space-y-3">
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
              <div className="pt-3 border-t border-[#1f242e] text-[11px] font-mono text-[#6b7280]">
                Prototyping as Inquiry
              </div>
            </div>

            <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 space-y-3 flex flex-col justify-between hover:border-[#38404f] transition-all">
              <div className="space-y-3">
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
              <div className="pt-3 border-t border-[#1f242e] text-[11px] font-mono text-[#6b7280]">
                Transparent Postmortems
              </div>
            </div>

            <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 space-y-3 flex flex-col justify-between hover:border-[#38404f] transition-all">
              <div className="space-y-3">
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
              <div className="pt-3 border-t border-[#1f242e] text-[11px] font-mono text-[#6b7280]">
                Accessible Software
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ROW 5: BEYOND THE SCREEN (CULTURAL ARCHIVE & NOTEBOOK)
        ========================================================================= */}
        <section className="border-t border-[#232832] pt-16 space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold text-[#f59e0b] uppercase tracking-wider">
              // SECTION E • BEYOND THE SCREEN
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6]">
              Stories, Music &amp; Personal Writing
            </h2>
            <p className="text-sm text-[#9ca3af] font-light max-w-xl">
              Technical power without cultural literacy creates cold software. My thinking is constantly shaped by cinema, songwriting, and honest reflections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-7 space-y-4 flex flex-col justify-between hover:border-[#38404f] transition-all">
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

            <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-7 space-y-4 flex flex-col justify-between hover:border-[#38404f] transition-all">
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

        {/* =========================================================================
            ROW 6: VERIFIED ACADEMIC PATH & EDUCATION (SECTION F)
        ========================================================================= */}
        <section className="border-t border-[#232832] pt-16 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-semibold text-[#3b68ff] uppercase tracking-wider">
                // SECTION F • EDUCATION &amp; JOURNEY
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {timelineEvents.slice(0, 3).map((event) => (
              <div
                key={event.title}
                className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 flex flex-col justify-between hover:border-[#38404f] transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs border-b border-[#1f242e] pb-3">
                    <span className="text-[#3b68ff] font-semibold">{event.organization}</span>
                    <span className="rounded bg-[#1a1e26] px-2 py-0.5 text-[10px] text-[#e1523d]">
                      {event.period}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#f2eee6]">{event.title}</h3>
                    <span className="text-[11px] font-mono text-[#8b949e]">{event.location}</span>
                  </div>

                  <p className="text-xs text-[#9ca3af] font-light leading-relaxed">
                    {event.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1f242e] flex flex-wrap gap-1">
                  {event.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-[#1f242e] bg-[#090a0d] px-2 py-0.5 font-mono text-[9px] text-[#8b949e]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            ROW 7: LOOKING AHEAD & TRANSMISSION
        ========================================================================= */}
        <section className="border-t border-[#232832] pt-16 pb-8 space-y-6">
          <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-xl">
            <div className="max-w-2xl space-y-6">
              <span className="font-mono text-xs font-semibold text-[#e1523d] uppercase tracking-wider">
                // TRANSMISSION &amp; FUTURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#f2eee6]">
                Building for What Comes Next.
              </h2>
              <p className="text-base text-[#9ca3af] font-light leading-relaxed">
                I want to continue engineering software systems in India that tackle unglamorous, high-impact problems in security, education access, and logistics. If you share that ambition or want to collaborate on something technically rigorous, my transmission line is always open.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
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

            {/* Crooked Photo Frame with Heart Cat & Funny Caption */}
            <div className="shrink-0 flex items-center justify-start md:justify-end md:mr-6 lg:mr-10">
              <div className="relative group cursor-pointer transition-all duration-300 ease-out rotate-2 hover:rotate-0 hover:scale-105">
                {/* Outer Polaroid Frame with White Border & Deep Shadow */}
                <div className="relative bg-[#ffffff] p-2.5 pb-6 sm:p-3 sm:pb-7 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.7)] border-2 border-white ring-1 ring-black/20">
                  {/* Photo Container */}
                  <div className="relative aspect-square w-48 sm:w-56 overflow-hidden rounded-[2px] bg-[#0d0f12]">
                    <img
                      src="/images/heart-cat.png"
                      alt="Waiting For Transmission"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Funny Polaroid Caption */}
                  <div className="pt-2 text-center font-mono text-[10px] sm:text-[11px] text-[#2b2b2b] tracking-wider select-none font-semibold">
                    *ME WAITING FOR YOUR MESSAGES
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
