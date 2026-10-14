'use client'

import { useState, useEffect } from 'react'
import { Quote, Calendar, Sparkles } from 'lucide-react'
import { getDailyQuote, DailyQuote, curatedQuotes } from '@/data/now'

export function DailyQuoteCard() {
  const [quote, setQuote] = useState<DailyQuote>(curatedQuotes[0])
  const [currentDateStr, setCurrentDateStr] = useState<string>('')

  useEffect(() => {
    // Determine the quote deterministically from the user's local calendar day
    const now = new Date()
    const selected = getDailyQuote(now)
    setQuote(selected)

    const formatted = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    setCurrentDateStr(formatted)
  }, [])

  return (
    <div className="rounded-2xl border border-[#e1523d]/40 bg-[#14171d] p-6 sm:p-8 space-y-4 shadow-sm relative overflow-hidden">
      {/* Background Accent Gradient */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-[#e1523d]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8b949e] border-b border-[#1f242e] pb-3">
        <div className="flex items-center gap-2 text-[#e1523d]">
          <Quote className="h-4 w-4" />
          <span className="font-semibold uppercase tracking-wider">
            QUOTE FOR TODAY
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[#a3abb6]">
          <Calendar className="h-3.5 w-3.5 text-[#6b7280]" />
          <span>{currentDateStr || 'Today'}</span>
          <span>•</span>
          <span className="text-[#10b981] text-[10px]">DETERMINISTIC DAILY ROTATION</span>
        </div>
      </div>

      {/* The Quote */}
      <blockquote className="font-serif italic text-xl sm:text-2xl text-[#f2eee6] leading-relaxed">
        &ldquo;{quote.quote}&rdquo;
      </blockquote>

      {/* Attribution & Context */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#8b949e]">
        <div>
          <span className="text-[#f2eee6] font-semibold">{quote.author}</span>
          {quote.source && (
            <span className="text-[#6b7280]"> &mdash; {quote.source}</span>
          )}
        </div>
        {quote.context && (
          <span className="text-[11px] text-[#8b949e] italic sm:text-right max-w-md">
            {quote.context}
          </span>
        )}
      </div>
    </div>
  )
}
