'use client'

import { useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { LoadingScreen } from '@/components/LoadingScreen'
import { SmoothScroll } from '@/components/SmoothScroll'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ContactSection } from '@/components/sections/ContactSection'

// Dynamic import for the 3D scene to avoid SSR issues
const SpaceScene = dynamic(
  () => import('@/components/space/SpaceScene').then((mod) => mod.SpaceScene),
  { ssr: false }
)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleScroll = useCallback((progress: number) => {
    setScrollProgress(progress)
  }, [])

  return (
    <>
      {/* Loading screen */}
      <LoadingScreen onLoadComplete={handleLoadComplete} />

      {/* 3D Space background - render immediately */}
      <SpaceScene scrollProgress={scrollProgress} />

      {/* Main content */}
      <SmoothScroll onScroll={handleScroll}>
        <main className="relative z-10">
          <HeroSection />
          <ProjectsSection />
          <EducationSection />
          <SkillsSection />
          <ContactSection />
          
          {/* Footer */}
          <footer className="relative py-16 text-center">
            <div className="mx-auto max-w-4xl px-4">
              <div className="flex flex-col items-center gap-4">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <p className="font-mono text-xs tracking-widest text-muted-foreground">
                  TRANSMISSION END
                </p>
                <p className="text-sm text-muted-foreground/70">
                  Built with Next.js, Three.js, and passion for the cosmos
                </p>
                <p className="text-xs text-muted-foreground/50">
                  &copy; {new Date().getFullYear()} Vedant Garud
                </p>
              </div>
            </div>
          </footer>
        </main>
      </SmoothScroll>
    </>
  )
}
