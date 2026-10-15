'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Github, Linkedin, Mail, Twitter, Radio, Sparkles, FileText } from 'lucide-react'

const directoryItems = [
  { href: '/', number: '01', label: 'Home', descriptor: 'Cover Trailer' },
  { href: '/work', number: '02', label: 'Work', descriptor: 'Case Studies' },
  { href: '/writing', number: '03', label: 'Notebook', descriptor: 'All Writing' },
  { href: '/taste', number: '04', label: 'Taste', descriptor: 'Cinema, Music, Books' },
  { href: '/archive', number: '05', label: 'Archive', descriptor: 'Verified Chronology' },
  { href: '/now', number: '06', label: 'Right Now', descriptor: 'Daily Snapshot' },
  { href: '/about', number: '07', label: 'About', descriptor: 'The Narrative' },
  { href: '/lab', number: '08', label: 'The Lab', descriptor: 'Simulators' },
]

export function Footer() {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      const formatter = new Intl.DateTimeFormat([], options)
      setCurrentTime(formatter.format(new Date()))
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="border-t border-[#232832] bg-[#090a0d] text-[#8b949e]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14 space-y-10 lg:space-y-12">
        <div className="grid grid-cols-1 gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-[#e1523d] tracking-wider uppercase">
                // COLOPHON
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f2eee6]">
                VEDANT <span className="text-[#8b949e] font-light">/</span> UNFINISHED
              </h2>
              <p className="text-xs font-mono uppercase tracking-wider text-[#e1523d]">
                A life, in progress.
              </p>
            </div>

            <p className="text-sm leading-relaxed text-[#cfd6e0] max-w-lg font-light">
              The personal living archive and technical laboratory of Vedant Garud — uniting engineering systems, cinema reflections, human memories, and working principles in one enduring digital home.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-[#a3abb6]">
              <div className="flex items-center gap-2 rounded-md border border-[#1f242e] bg-[#101217] px-3 py-1.5 shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
                </span>
                <span>Thane &amp; New Panvel, India</span>
              </div>
              <span className="text-[#3b4252] hidden sm:inline">•</span>
              <div className="rounded-md border border-[#1f242e] bg-[#101217] px-3 py-1.5 text-[#cfd6e0] font-mono text-xs">
                {currentTime ? `${currentTime} IST` : '19:55:00 IST'}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-[#e1523d] tracking-wider uppercase">
                // DIRECTORY
              </span>
            </div>

            <nav aria-label="Footer Navigation">
              <ul className="divide-y divide-[#171b23] border-y border-[#171b23] font-mono text-xs">
                {directoryItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between py-2.5 transition-colors hover:text-[#f2eee6]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[#6b7280] group-hover:text-[#e1523d] transition-colors font-medium">
                          {item.number}
                        </span>
                        <span className="text-[#3b4252] select-none">//</span>
                        <span className="text-[#cfd6e0] group-hover:text-white group-hover:translate-x-0.5 transition-all font-medium">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#6b7280] group-hover:text-[#9ca3af] transition-colors font-sans font-light">
                        {item.descriptor}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-[#e1523d] tracking-wider uppercase">
                // COORDINATES
              </span>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:vedantgarud05@gmail.com"
                className="group flex items-center justify-between rounded-xl border border-[#232832] bg-[#14171d]/60 p-3.5 text-xs font-mono text-[#f2eee6] transition-all hover:border-[#e1523d] hover:bg-[#14171d] shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#e1523d] shrink-0" />
                  <span className="truncate">vedantgarud05@gmail.com</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#8b949e] group-hover:text-[#e1523d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>

              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://github.com/vedantgrd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-[#232832] bg-[#14171d]/60 py-2.5 text-xs font-mono text-[#cfd6e0] transition-all hover:border-[#8b949e] hover:bg-[#14171d] hover:text-white"
                >
                  <Github className="h-3.5 w-3.5 text-[#8b949e]" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/vedant-garud-94bb38263/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-[#232832] bg-[#14171d]/60 py-2.5 text-xs font-mono text-[#cfd6e0] transition-all hover:border-[#8b949e] hover:bg-[#14171d] hover:text-white"
                >
                  <Linkedin className="h-3.5 w-3.5 text-[#8b949e]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://x.com/iamvedantgrd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-[#232832] bg-[#14171d]/60 py-2.5 text-xs font-mono text-[#cfd6e0] transition-all hover:border-[#8b949e] hover:bg-[#14171d] hover:text-white"
                >
                  <Twitter className="h-3.5 w-3.5 text-[#8b949e]" />
                  <span>Twitter</span>
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-[#1f242e] bg-[#0d0f12] p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] text-[#8b949e] border-b border-[#1f242e] pb-2">
                <span className="text-[#f2eee6] font-semibold">ACADEMIC &amp; WORK</span>
                <span className="text-[#10b981]">Active</span>
              </div>
              <div className="space-y-1.5 text-[11px] font-sans leading-relaxed text-[#9ca3af]">
                <p>
                  <strong className="text-[#cfd6e0] font-mono">B.Tech IT (PCE Panvel)</strong> // Specialization in InfoSec &amp; Data Forensics.
                </p>
                <p className="text-[10.5px] text-[#6b7280]">
                  Former Backend Developer Intern at VFS Global.
                </p>
              </div>
              <div className="pt-2 border-t border-[#1f242e] flex items-center justify-between text-[10.5px]">
                <span className="text-[#8b949e]">CURRICULUM VITAE</span>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e1523d] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <FileText className="h-3 w-3" />
                  <span>Resume (PDF) &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#1d222b] flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#6b7280]">
          <p>
            &copy; {new Date().getFullYear()} Vedant Garud. All personal essays, prototypes &amp; reflections preserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/" className="hover:text-[#cfd6e0] transition-colors">
              TOP // COVER
            </Link>
            <span>•</span>
            <Link href="/archive" className="hover:text-[#cfd6e0] transition-colors">
              THE ARCHIVE
            </Link>
            <span>•</span>
            <Link href="/taste" className="hover:text-[#cfd6e0] transition-colors">
              TASTE
            </Link>
            <span>•</span>
            <Link href="/now" className="hover:text-[#cfd6e0] transition-colors">
              RIGHT NOW
            </Link>
            <span>•</span>
            <Link href="/admin" className="text-[#8b949e] hover:text-[#e1523d] transition-colors">
              TERMINAL
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
