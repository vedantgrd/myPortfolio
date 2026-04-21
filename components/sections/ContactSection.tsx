'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react'

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:vedantgarud05@gmail.com',
    icon: Mail,
    color: 'hover:text-cyan-400',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/vedantgrd',
    icon: Github,
    color: 'hover:text-purple-400',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vedant-garud-94bb38263/',
    icon: Linkedin,
    color: 'hover:text-blue-400',
  },
  {
    name: 'Twitter',
    href: 'https://x.com/iamvedantgrd',
    icon: Twitter,
    color: 'hover:text-pink-400',
  },
]

export function ContactSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-2xl w-full"
      >
        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/40 to-slate-950/40 backdrop-blur-xl p-12 shadow-2xl">
          {/* Title */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                You Reached the End. Nice.
              </span>
            </h2>
            <p className="text-base text-muted-foreground">
              Might as well say hi now.
            </p>
          </div>

          {/* Social Links Grid */}
          <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`group flex flex-col items-center gap-3 rounded-lg border border-slate-700/50 bg-slate-900/30 p-6 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/60 ${link.color}`}
                >
                  <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                  <span className="text-xs font-medium uppercase tracking-wider">{link.name}</span>
                </motion.a>
              )
            })}
          </div>

          {/* Direct Message CTA */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <motion.a
              href="mailto:vedantgarud05@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 rounded-lg border border-cyan-500/50 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 px-8 py-3 font-medium text-cyan-300 transition-all duration-300 hover:border-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20"
            >
              <Mail className="h-5 w-5" />
              Send me a message
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </div>

          {/* Status */}
          <div className="mt-12 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Reach out via email or connect with me on social</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
