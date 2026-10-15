'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Twitter,
  FileText,
} from 'lucide-react'

export default function ContactPage() {
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('vedantgarud05@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message before dispatching.')
      return
    }

    setIsSending(true)

    try {
      // 1. Post to persistent backend store
      const res = await fetch('/api/transmission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })

      if (!res.ok) {
        console.warn('Backend transmission logging status:', res.status)
      }
    } catch (err) {
      console.error('Failed to log transmission to backend store:', err)
    } finally {
      setIsSending(false)
      setFormSubmitted(true)

      // 2. Open mailto client for direct user delivery
      const mailtoSubject = encodeURIComponent(
        subject.trim() || `Inquiry from ${name} via Portfolio`
      )
      const mailtoBody = encodeURIComponent(
        `Hi Vedant,\n\n${message}\n\nFrom:\n${name}\nEmail: ${email}`
      )
      const mailtoUrl = `mailto:vedantgarud05@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`

      window.location.href = mailtoUrl
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0f12] pt-6 pb-20 sm:pt-8 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="pb-12 border-b border-[#232832] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-3 font-mono text-xs text-[#e1523d]">
              <span>// CHAPTER 09</span>
              <span>•</span>
              <span>DIRECT TRANSMISSION</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f2eee6]">
              Get In Touch
            </h1>
            <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed font-light">
              I’m always open to discussing autonomous multi-agent systems, scholarship platforms, agricultural robotics, or new engineering opportunities.
            </p>
          </div>

          {/* Crooked / Tilted Photo Frame in Right Space (Moved slightly towards left) */}
          <div className="shrink-0 flex items-center justify-start md:justify-end md:mr-16 lg:mr-28">
            <div className="relative group cursor-pointer transition-all duration-300 ease-out -rotate-3 hover:rotate-0 hover:scale-105">
              {/* Outer Photo Frame with White Border & Shadow */}
              <div className="relative bg-[#ffffff] p-2.5 pb-6 sm:p-3 sm:pb-7 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.7)] border-2 border-white ring-1 ring-black/20">
                {/* Photo Image Container */}
                <div className="relative aspect-[16/10] w-52 sm:w-60 md:w-64 overflow-hidden rounded-[2px] bg-[#0d0f12]">
                  <img
                    src="/images/cat.png"
                    alt="Transmission Cat"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Subtle Monospace Photo Caption */}
                <div className="pt-2 text-center font-mono text-[10px] text-[#333333] tracking-wider select-none font-semibold">
                  *ME REACTING TO YOUR MESSAGES
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Email Card */}
            <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 space-y-4">
              <span className="font-mono text-xs text-[#e1523d] font-semibold">
                DIRECT INBOX
              </span>
              <div>
                <div className="font-mono text-sm sm:text-base font-bold text-[#f2eee6] break-all">
                  vedantgarud05@gmail.com
                </div>
                <p className="text-xs text-[#9ca3af] mt-1">
                  Direct personal email. Monitored daily.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 flex items-center justify-center gap-2 rounded border border-[#232832] bg-[#090a0d] py-2.5 font-mono text-xs text-[#f2eee6] hover:border-[#e1523d] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#10b981]" />
                      <span className="text-[#10b981]">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#8b949e]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
                <a
                  href="mailto:vedantgarud05@gmail.com"
                  className="flex items-center justify-center rounded bg-[#e1523d] px-4 py-2.5 font-mono text-xs text-white hover:bg-[#ef634f] transition-colors"
                  title="Open in Mail Client"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Social Grid */}
            <div className="space-y-3 font-mono text-xs">
              <span className="text-[#8b949e] uppercase tracking-wider block text-[11px]">
                Networks &amp; Profiles
              </span>
              <div className="grid grid-cols-1 gap-2">
                <a
                  href="https://github.com/vedantgrd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded border border-[#232832] bg-[#14171d] p-3 text-[#f2eee6] hover:border-[#8b949e] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="h-4 w-4 text-[#8b949e] group-hover:text-white" />
                    <span>github.com/vedantgrd</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#6b7280] group-hover:text-white" />
                </a>

                <a
                  href="https://www.linkedin.com/in/vedant-garud-94bb38263/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded border border-[#232832] bg-[#14171d] p-3 text-[#f2eee6] hover:border-[#3b68ff] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="h-4 w-4 text-[#3b68ff]" />
                    <span>linkedin.com/in/vedant-garud</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#6b7280] group-hover:text-white" />
                </a>

                <a
                  href="https://x.com/iamvedantgrd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded border border-[#232832] bg-[#14171d] p-3 text-[#f2eee6] hover:border-[#e1523d] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Twitter className="h-4 w-4 text-[#8b949e] group-hover:text-[#e1523d]" />
                    <span>x.com/iamvedantgrd</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#6b7280] group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Location & Status Badge */}
            <div className="rounded-lg border border-[#232832] bg-[#090a0d] p-5 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[#8b949e]">
                <span>BASE LOCATION</span>
                <span className="text-[#f2eee6]">Thane / Mumbai, India</span>
              </div>
              <div className="flex items-center justify-between text-[#8b949e]">
                <span>AVAILABILITY</span>
                <span className="text-[#10b981] font-semibold">● Open for Discussions</span>
              </div>
              <div className="flex items-center justify-between text-[#8b949e]">
                <span>TIMEZONE</span>
                <span className="text-[#e4decb]">IST (UTC+5:30)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7 rounded-xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 space-y-6">
            <div>
              <span className="font-mono text-xs text-[#e1523d] font-semibold uppercase">
                // DISPATCH INQUIRY
              </span>
              <h2 className="text-xl font-bold text-[#f2eee6] mt-1">
                Draft a Transmission
              </h2>
              <p className="text-xs text-[#9ca3af] mt-1 font-sans">
                Fills and dispatches a verified email directly to my personal inbox with zero spam wrappers.
              </p>
            </div>

            {error && (
              <div className="rounded border border-[#dc2626]/40 bg-[#dc2626]/10 p-3 font-mono text-xs text-[#fca5a5]">
                {error}
              </div>
            )}

            {formSubmitted && (
              <div className="rounded border border-[#10b981]/40 bg-[#10b981]/10 p-4 font-mono text-xs text-[#a7f3d0] space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Check className="h-4 w-4" />
                  <span>Transmission Logged &amp; Dispatched!</span>
                </div>
                <p className="font-sans text-xs">
                  Your transmission has been recorded directly into Vedant’s private inbox log and opened in your email client for redundant delivery.
                </p>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[#8b949e] block">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded border border-[#232832] bg-[#090a0d] p-3 text-xs text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#8b949e] block">Your Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border border-[#232832] bg-[#090a0d] p-3 text-xs text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#8b949e] block">Subject / Context</label>
                <input
                  type="text"
                  placeholder="e.g. Multi-agent supply chain discussion or project collaboration"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded border border-[#232832] bg-[#090a0d] p-3 text-xs text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#8b949e] block">Message Content</label>
                <textarea
                  required
                  rows={5}
                  placeholder="What are you building, curious about, or hoping to explore together?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded border border-[#232832] bg-[#090a0d] p-3 text-xs text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full rounded bg-[#e1523d] py-3.5 font-mono text-xs uppercase tracking-wider text-white font-medium hover:bg-[#ef634f] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isSending ? 'Recording Transmission...' : 'Dispatch Transmission'}</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
