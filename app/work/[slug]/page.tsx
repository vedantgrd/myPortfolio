import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { projects } from '@/data/projects'
import { ProjectDiagram } from '@/components/projects/ProjectDiagram'

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  // Find next project for seamless sequential reading
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <article className="min-h-screen bg-[#0d0f12] py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Navigation Breadcrumbs & Back Link */}
        <div className="flex items-center justify-between border-b border-[#232832] pb-6 font-mono text-xs text-[#8b949e]">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-[#e1523d] hover:text-[#ef634f] transition-colors font-semibold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>&larr; Return to Work Exhibition</span>
          </Link>
          <div className="flex items-center gap-2">
            <span>INDEX // 0{currentIndex + 1} OF 0{projects.length}</span>
          </div>
        </div>

        {/* Hero Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono-badge text-[#e1523d] border-[#e1523d]/30">
              {project.category}
            </span>
            <span className="mono-badge">{project.year}</span>
            <span className="mono-badge text-[#10b981] border-[#10b981]/30">
              {project.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f2eee6] leading-[1.1]">
            {project.title}
          </h1>

          <p className="font-mono text-sm sm:text-base text-[#e1523d]">
            {project.tagline}
          </p>

          <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          {/* Action Links */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-[#232832] bg-[#14171d] px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-[#f2eee6] hover:border-[#e1523d] hover:bg-[#1a1e26] transition-all"
              >
                {link.type === 'github' && <Github className="h-4 w-4" />}
                <span>{link.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#8b949e]" />
              </a>
            ))}
            {project.slug === 'bullwhip-ai' && (
              <Link
                href="/lab"
                className="inline-flex items-center gap-2 rounded bg-[#3b68ff] px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-white hover:bg-[#507bff] transition-colors"
              >
                <span>Launch Interactive Lab Simulation</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
            {project.slug === 'cipherlab' && (
              <Link
                href="/lab"
                className="inline-flex items-center gap-2 rounded bg-[#f59e0b] px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-black font-semibold hover:bg-[#fbbf24] transition-colors"
              >
                <span>Open in Cryptography Lab</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </header>

        {/* Technical Metrics Strip */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-[#232832] bg-[#14171d] p-5 space-y-1"
              >
                <span className="text-[#8b949e] block text-[10px]">{m.label}</span>
                <div className="text-xl font-bold text-[#f2eee6]">{m.value}</div>
                <div className="text-[11px] text-[#6b7280]">{m.note}</div>
              </div>
            ))}
          </section>
        )}

        {/* Visual Architecture Diagram */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#8b949e]">
            <span className="text-[#e1523d] font-semibold">// 01</span>
            <span>SYSTEM ARCHITECTURE DIAGRAM</span>
          </div>
          <ProjectDiagram diagramType={project.diagramType} />
        </section>

        {/* Problem & Motivation */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#232832] pt-12">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#e1523d] font-semibold">
              // THE PROBLEM
            </span>
            <h2 className="text-xl font-bold text-[#f2eee6]">The Friction Being Solved</h2>
            <p className="text-sm leading-relaxed text-[#9ca3af]">
              {project.problem}
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs text-[#3b68ff] font-semibold">
              // THE MOTIVATION
            </span>
            <h2 className="text-xl font-bold text-[#f2eee6]">Why I Decided to Build It</h2>
            <p className="text-sm leading-relaxed text-[#9ca3af]">
              {project.motivation}
            </p>
          </div>
        </section>

        {/* Architecture & Key Decisions */}
        <section className="border-t border-[#232832] pt-12 space-y-6">
          <div>
            <span className="font-mono text-xs text-[#e1523d] font-semibold">
              // ENGINEERING DESIGN
            </span>
            <h2 className="text-2xl font-bold text-[#f2eee6] mt-1">
              Important Architectural Decisions
            </h2>
            <p className="text-sm text-[#9ca3af] mt-1 max-w-2xl leading-relaxed">
              {project.architecture}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.keyDecisions.map((decision, i) => (
              <div
                key={decision.title}
                className="rounded-lg border border-[#232832] bg-[#14171d] p-5 space-y-2"
              >
                <span className="font-mono text-xs text-[#e1523d]">DECISION 0{i + 1}</span>
                <h3 className="font-bold text-[#f2eee6] text-sm">{decision.title}</h3>
                <p className="text-xs text-[#9ca3af] leading-relaxed">
                  {decision.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges & Trade-offs */}
        <section className="border-t border-[#232832] pt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Challenges */}
          <div className="space-y-4">
            <span className="font-mono text-xs text-[#f59e0b] font-semibold">
              // ENGINEERING CHALLENGES
            </span>
            <h2 className="text-xl font-bold text-[#f2eee6]">What Broke & How I Solved It</h2>
            <div className="space-y-4">
              {project.challenges.map((c) => (
                <div
                  key={c.title}
                  className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-1"
                >
                  <h3 className="font-bold text-sm text-[#f2eee6]">{c.title}</h3>
                  <p className="text-xs text-[#9ca3af] leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tradeoffs */}
          <div className="space-y-4">
            <span className="font-mono text-xs text-[#8b949e] font-semibold">
              // TRADE-OFFS & LIMITATIONS
            </span>
            <h2 className="text-xl font-bold text-[#f2eee6]">What I Would Change</h2>
            <div className="space-y-4">
              {project.tradeoffs.map((t) => (
                <div
                  key={t.title}
                  className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-1"
                >
                  <h3 className="font-bold text-sm text-[#f2eee6]">{t.title}</h3>
                  <p className="text-xs text-[#9ca3af] leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verified Outcomes */}
        <section className="border-t border-[#232832] pt-12 space-y-4">
          <span className="font-mono text-xs text-[#10b981] font-semibold">
            // OUTCOMES & VERIFICATION
          </span>
          <h2 className="text-2xl font-bold text-[#f2eee6]">What Was Achieved</h2>
          <div className="rounded-lg border border-[#232832] bg-[#14171d] p-6 space-y-3">
            {project.outcomes.map((outcome, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-[#a3abb6]">
                <CheckCircle2 className="h-4 w-4 text-[#10b981] shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack Grid */}
        <section className="border-t border-[#232832] pt-12 space-y-6">
          <div>
            <span className="font-mono text-xs text-[#e1523d] font-semibold">
              // IMPLEMENTATION STACK
            </span>
            <h2 className="text-2xl font-bold text-[#f2eee6] mt-1">
              Technologies Tied to Actual Use
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
            {project.techStack.map((tech) => (
              <div
                key={tech.name}
                className="rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-1"
              >
                <div className="text-[10px] text-[#e1523d] uppercase">{tech.category}</div>
                <div className="font-bold text-[#f2eee6] text-sm">{tech.name}</div>
                <div className="text-[11px] text-[#8b949e] font-sans">{tech.purpose}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Next Project Footer Bar */}
        <footer className="border-t border-[#232832] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/work"
            className="font-mono text-xs text-[#8b949e] hover:text-[#f2eee6] transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Projects</span>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex flex-col sm:items-end text-right"
          >
            <span className="font-mono text-[10px] text-[#e1523d] uppercase tracking-wider">
              Next Case Study &rarr;
            </span>
            <span className="text-lg font-bold text-[#f2eee6] group-hover:text-[#e1523d] transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </footer>
      </div>
    </article>
  )
}
