'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from 'lucide-react'

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
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Colophon & Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-[#e1523d]">
                // COLOPHON
              </span>
              <span className="h-px w-8 bg-[#232832]" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#f2eee6]">
              VEDANT / UNFINISHED
            </h2>
            <p className="text-sm leading-relaxed text-[#cfd6e0] max-w-md font-light">
              A life, in progress. The personal living archive of Vedant Garud — uniting engineering projects, cinema reflections, human memories, and ordinary days in one enduring digital home.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
              </span>
              <span className="font-mono text-xs text-[#a3abb6]">
                Thane &amp; Panvel, India // {currentTime ? `${currentTime} IST` : '19:55:00 IST'}
              </span>
            </div>
          </div>

          {/* Directory Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#f2eee6]">
              Archive Directory
            </span>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <Link href="/" className="hover:text-[#e1523d] transition-colors flex items-center justify-between">
                  <span>01 // Home</span>
                  <span className="text-[#3b4252]">Cover</span>
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#e1523d] transition-colors flex items-center justify-between">
                  <span>02 // Work</span>
                  <span className="text-[#3b4252]">Exhibition</span>
                </Link>
              </li>
              <li>
                <Link href="/writing" className="hover:text-[#e1523d] transition-colors flex items-center justify-between">
                  <span>03 // Notebook</span>
                  <span className="text-[#3b4252]">Journal</span>
                </Link>
              </li>
              <li>
                <Link href="/archive" className="hover:text-[#e1523d] transition-colors flex items-center justify-between">
                  <span>04 // Archive</span>
                  <span className="text-[#3b4252]">Time Capsule</span>
                </Link>
              </li>
              <li>
                <Link href="/cinema" className="hover:text-[#e1523d] transition-colors flex items-center justify-between">
                  <span>05 // Cinema</span>
                  <span className="text-[#3b4252]">Stories &amp; Idols</span>
                </Link>
              </li>
              <li>
                <Link href="/ordinary-days" className="hover:text-[#e1523d] transition-colors flex items-center justify-between">
                  <span>06 // Ordinary Days</span>
                  <span className="text-[#3b4252]">Moments</span>
                </Link>
              </li>
              <li>
                <Link href="/now" className="hover:text-[#e1523d] transition-colors flex items-center justify-between">
                  <span>07 // Right Now</span>
                  <span className="text-[#3b4252]">Current State</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#e1523d] transition-colors flex items-center justify-between">
                  <span>08 // About</span>
                  <span className="text-[#3b4252]">The Person</span>
                </Link>
              </li>
              <li>
                <Link href="/lab" className="hover:text-[#e1523d] transition-colors flex items-center justify-between">
                  <span>09 // Lab</span>
                  <span className="text-[#3b4252]">Simulators</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Socials & Direct Line */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#f2eee6]">
              Coordinates &amp; Transmission
            </span>
            <div className="space-y-2">
              <a
                href="mailto:vedantgarud05@gmail.com"
                className="group flex items-center justify-between rounded border border-[#232832] bg-[#14171d] p-3 text-xs font-mono text-[#f2eee6] transition-all hover:border-[#e1523d] hover:bg-[#1a1e26]"
              >
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#e1523d]" />
                  <span>vedantgarud05@gmail.com</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#8b949e] group-hover:text-[#e1523d] transition-colors" />
              </a>

              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://github.com/vedantgrd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded border border-[#232832] bg-[#14171d] py-2.5 text-xs font-mono text-[#9ca3af] transition-colors hover:border-[#8b949e] hover:text-[#f2eee6]"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/vedant-garud-94bb38263/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded border border-[#232832] bg-[#14171d] py-2.5 text-xs font-mono text-[#9ca3af] transition-colors hover:border-[#8b949e] hover:text-[#f2eee6]"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://x.com/iamvedantgrd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded border border-[#232832] bg-[#14171d] py-2.5 text-xs font-mono text-[#9ca3af] transition-colors hover:border-[#8b949e] hover:text-[#f2eee6]"
                >
                  <Twitter className="h-3.5 w-3.5" />
                  <span>Twitter</span>
                </a>
              </div>
            </div>
            <p className="text-[11px] text-[#6b7280] leading-relaxed">
              Pillai College of Engineering, B.Tech IT (InfoSec &amp; Forensics) // Former Backend Intern at VFS Global.
            </p>
          </div>
        </div>

        {/* Bottom Rule & Metadata */}
        <div className="mt-12 pt-8 border-t border-[#1d222b] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#6b7280]">
          <p>
            &copy; {new Date().getFullYear()} Vedant Garud. A life, in progress.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/archive" className="hover:text-[#a3abb6] transition-colors">
              THE ARCHIVE
            </Link>
            <span>•</span>
            <Link href="/now" className="hover:text-[#a3abb6] transition-colors">
              RIGHT NOW
            </Link>
            <span>•</span>
            <span className="hover:text-[#a3abb6] transition-colors">
              ALL RIGHTS RESERVED
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
