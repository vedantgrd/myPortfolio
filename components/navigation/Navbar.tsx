'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', number: '01' },
  { href: '/work', label: 'Work', number: '02' },
  { href: '/writing', label: 'Notebook', number: '03' },
  { href: '/archive', label: 'Archive', number: '04' },
  { href: '/cinema', label: 'Cinema', number: '05' },
  { href: '/ordinary-days', label: 'Days', number: '06' },
  { href: '/now', label: 'Now', number: '07' },
  { href: '/about', label: 'About', number: '08' },
  { href: '/lab', label: 'Lab', number: '09' },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d0f12]/92 backdrop-blur-md border-b border-[#232832]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Masthead Branding */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              className="group flex items-baseline gap-2 text-foreground hover:text-white transition-colors"
            >
              <span className="font-mono text-xs font-semibold tracking-wider text-[#e1523d]">
                //
              </span>
              <span className="font-sans text-xs sm:text-sm font-bold tracking-tight uppercase whitespace-nowrap">
                VEDANT <span className="text-[#8b949e] font-normal">/</span> UNFINISHED
              </span>
            </Link>
            <span className="hidden xl:inline-flex items-center gap-1.5 rounded border border-[#232832] bg-[#14171d] px-2 py-0.5 font-mono text-[10px] tracking-wider text-[#8b949e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
              LIVING ARCHIVE
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-2.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'text-[#f2eee6] font-semibold'
                      : 'text-[#8b949e] hover:text-[#f2eee6]'
                  }`}
                >
                  <span className="text-[10px] text-[#e1523d] mr-1 opacity-70">
                    {item.number}
                  </span>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#e1523d]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Quick Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded border border-[#e1523d]/40 bg-[#e1523d]/10 px-3 py-1.5 font-mono text-xs text-[#f2eee6] transition-all hover:bg-[#e1523d] hover:text-white hover:border-[#e1523d]"
            >
              <span>Transmission</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded p-2 text-[#9ca3af] hover:text-[#f2eee6] hover:bg-[#1a1e26] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b border-[#232832] bg-[#0d0f12] px-4 pt-2 pb-6 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded px-3 py-2 text-sm font-mono tracking-wider transition-colors ${
                      isActive
                        ? 'bg-[#1a1e26] text-[#e1523d] font-semibold'
                        : 'text-[#9ca3af] hover:bg-[#14171d] hover:text-[#f2eee6]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#e1523d]">{item.number}</span>
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#e1523d]" />
                    )}
                  </Link>
                )
              })}

              <div className="pt-4 mt-2 border-t border-[#232832] flex flex-col gap-2">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded bg-[#e1523d] px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-white font-medium"
                >
                  <span>Start a Conversation</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
