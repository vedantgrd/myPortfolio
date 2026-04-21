'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onLoadComplete?: () => void
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEMS')
  const [subText, setSubText] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  const statuses = [
    { text: 'INITIALIZING SYSTEMS', sub: 'Booting quantum processors...' },
    { text: 'LOADING ASSETS', sub: 'Streaming 3D environments...' },
    { text: 'CALIBRATING SENSORS', sub: 'Syncing neural networks...' },
    { text: 'ESTABLISHING CONNECTION', sub: 'Connecting to the portfolio dimension...' },
    { text: 'READY FOR TAKEOFF', sub: 'Welcome aboard, traveler!' }
  ]

  // Only run on client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Animation loop - only runs when mounted
  useEffect(() => {
    if (!isMounted) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 18 + 4
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
            onLoadComplete?.()
          }, 300)
          return 100
        }

        const statusIndex = Math.floor((next / 100) * (statuses.length - 1))
        const currentStatus = statuses[Math.min(statusIndex, statuses.length - 1)]
        setStatusText(currentStatus.text)
        setSubText(currentStatus.sub)

        return next
      })
    }, 150)

    return () => clearInterval(interval)
  }, [isMounted, onLoadComplete])

  // Don't render on server
  if (!isMounted) {
    return null
  }

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #050510 0%, #0a0a1a 50%, #050510 100%)'
          }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
              animate={{
                scale: [1, 1.2, 0.9, 1],
                opacity: [0.3, 0.5, 0.2, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
              animate={{
                scale: [0.8, 1, 1.1, 0.8],
                opacity: [0.2, 0.4, 0.3, 0.2]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Main loading content */}
          <div className="relative z-10 flex flex-col items-center gap-12 px-8">
            {/* Animated logo/orb */}
            <motion.div
              className="relative w-32 h-32"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {/* Outer ring with gradient */}
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  backgroundImage: 'conic-gradient(from 0deg, #a855f7, #06b6d4, #ec4899, #a855f7)',
                  padding: '2px'
                }}
              />

              {/* Inner glow */}
              <motion.div
                className="absolute inset-4 rounded-full backdrop-blur-sm border border-cyan-500/30"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(6, 182, 212, 0.5)',
                    '0 0 40px rgba(168, 85, 247, 0.7)',
                    '0 0 20px rgba(6, 182, 212, 0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Center orb */}
              <motion.div
                className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20"
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Status text */}
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                key={statusText}
                className="text-2xl font-bold tracking-widest text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #06b6d4, #a855f7, #ec4899)'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {statusText}
              </motion.h2>
              
              <motion.p
                key={subText}
                className="text-sm text-cyan-300/70 tracking-wide font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {subText}
              </motion.p>
            </motion.div>

            {/* Advanced progress bar */}
            <div className="w-80 space-y-4">
              {/* Outer frame */}
              <div className="relative h-2 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 rounded-full overflow-hidden border border-cyan-500/30">
                {/* Inner progress */}
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    boxShadow: '0 0 15px rgba(6, 182, 212, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.3)'
                  }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '500%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Progress percentage and status */}
              <div className="flex items-center justify-between px-2">
                <motion.span
                  className="text-xs font-mono text-cyan-300/60"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {Math.round(progress)}%
                </motion.span>
                <span className="text-xs font-mono text-purple-300/60">
                  100%
                </span>
              </div>
            </div>

            {/* Floating particles - deterministic positioning */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-cyan-300"
                  animate={{
                    x: [0, Math.sin(i) * 300, 0],
                    y: [0, Math.cos(i) * 300, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                    filter: 'blur(1px)'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Scanlines effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)',
              backgroundSize: '100% 4px'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
