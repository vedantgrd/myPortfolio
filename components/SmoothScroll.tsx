'use client'

import { useEffect, useRef, ReactNode, useCallback } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProps {
  children: ReactNode
  onScroll?: (progress: number) => void
}

export function SmoothScroll({ children, onScroll }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const onScrollRef = useRef(onScroll)
  const rafIdRef = useRef<number | null>(null)

  // Keep ref updated without causing re-initialization
  useEffect(() => {
    onScrollRef.current = onScroll
  }, [onScroll])

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    // Track scroll progress
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      onScrollRef.current?.(progress)
    })

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
