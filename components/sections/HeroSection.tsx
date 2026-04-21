'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4">
      {/* Transmission subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mb-6"
      >
        <span className="font-mono text-xs tracking-[0.4em] text-primary uppercase">
          Transmission Detected
        </span>
      </motion.div>

      {/* Profile image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mb-8 relative"
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-md scale-110" />
        {/* Spinning dashed border */}
        <div className="absolute inset-0 rounded-full border border-dashed border-primary/30 animate-spin [animation-duration:12s]" />
        {/* Static border */}
        <div className="absolute inset-[-4px] rounded-full border border-primary/20" />
        {/* Image container */}
        <div className="relative h-28 w-28 rounded-full overflow-hidden border-2 border-primary/40">
          <img
            src="/images/profile.jpg"
            alt="Vedant Garud"
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center"
      >
        <span className="block text-5xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl animate-text-flicker">
          VEDANT GARUD
        </span>
      </motion.h1>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-8 flex flex-col items-center gap-2 text-center"
      >
        <p className="font-mono text-sm tracking-[0.2em] text-muted-foreground sm:text-base">
          (somehow i manage.)
        </p>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-primary/50" />
          <span className="text-xs text-primary">*</span>
          <span className="h-px w-8 bg-primary/50" />
        </div>
        <p className="text-sm text-muted-foreground/70">
          I design, build, and occasionally debug my own decisions.
        </p>
      </motion.div>

      {/* Status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="mt-12 flex items-center gap-2"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          Ready for deployment
        </span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="absolute bottom-9 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs tracking-widest text-muted-foreground/50">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 text-primary/50" />
        </motion.div>
      </motion.div>

      {/* Corner brackets decoration */}
      <div className="pointer-events-none absolute inset-8 hidden sm:block">
        <div className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-border/30" />
        <div className="absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-border/30" />
        <div className="absolute bottom-0 left-0 h-16 w-16 border-b-2 border-l-2 border-border/30" />
        <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-border/30" />
      </div>
    </section>
  )
}