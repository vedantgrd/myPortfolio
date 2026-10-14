import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Compass, Home, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#0d0f12] px-4 py-24">
      <div className="max-w-md w-full rounded-2xl border border-[#232832] bg-[#14171d] p-8 sm:p-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded border border-[#e1523d]/30 bg-[#e1523d]/10 px-3 py-1 font-mono text-xs text-[#e1523d]">
          <span>404 // UNFINISHED DRAFT</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#f2eee6]">
            Section Not Yet Penned
          </h1>
          <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed font-sans">
            You&apos;ve wandered into a corner of this portfolio that is either still being researched, underwent an architectural refactor, or was intentionally left unfinished.
          </p>
        </div>

        <div className="pt-4 border-t border-[#1f242e] flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-[#e1523d] px-4 py-2.5 text-white hover:bg-[#ef634f] transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Return to Cover</span>
          </Link>

          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded border border-[#232832] bg-[#090a0d] px-4 py-2.5 text-[#f2eee6] hover:border-[#8b949e] transition-colors"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Explore Projects</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
