'use client'

import { useEffect, useRef } from 'react'

interface SpaceSceneProps {
  scrollProgress?: number
}

export function SpaceScene({ scrollProgress = 0 }: SpaceSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    // Set canvas size to match window
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Create stars array
    const stars: Array<{x: number; y: number; z: number; size: number; vx: number; vy: number}> = []
    const starCount = 1000
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * 1000,
        size: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      })
    }

    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.001

      // Clear canvas with dark background
      ctx.fillStyle = '#050510'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw nebula clouds
      const nebula1 = ctx.createRadialGradient(
        canvas.width * 0.25, canvas.height * 0.35, 0,
        canvas.width * 0.25, canvas.height * 0.35, canvas.width * 0.4
      )
      nebula1.addColorStop(0, 'rgba(168, 85, 247, 0.22)')
      nebula1.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)')
      nebula1.addColorStop(1, 'transparent')
      ctx.fillStyle = nebula1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const nebula2 = ctx.createRadialGradient(
        canvas.width * 0.75, canvas.height * 0.65, 0,
        canvas.width * 0.75, canvas.height * 0.65, canvas.width * 0.45
      )
      nebula2.addColorStop(0, 'rgba(6, 182, 212, 0.18)')
      nebula2.addColorStop(0.5, 'rgba(6, 182, 212, 0.06)')
      nebula2.addColorStop(1, 'transparent')
      ctx.fillStyle = nebula2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const nebula3 = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.2, 0,
        canvas.width * 0.5, canvas.height * 0.2, canvas.width * 0.35
      )
      nebula3.addColorStop(0, 'rgba(236, 72, 153, 0.15)')
      nebula3.addColorStop(0.5, 'rgba(236, 72, 153, 0.05)')
      nebula3.addColorStop(1, 'transparent')
      ctx.fillStyle = nebula3
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        star.z -= 2
        
        if (star.z <= 0) {
          star.z = 1000
          star.x = (Math.random() - 0.5) * canvas.width * 2
          star.y = (Math.random() - 0.5) * canvas.height * 2
        }

        const k = 300 / star.z
        const x = star.x * k + canvas.width / 2
        const y = star.y * k + canvas.height / 2

        if (x > -10 && x < canvas.width + 10 && y > -10 && y < canvas.height + 10) {
          const brightness = (1 - star.z / 1000)
          const size = star.size * brightness * (1 + Math.sin(time * 2 + x + y) * 0.3)
          
          const twinkle = Math.sin(time * 3 + star.x + star.y) * 0.3 + 0.7
          const opacity = brightness * twinkle

          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()

          // Add glow to brighter stars
          if (brightness > 0.7) {
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.5})`
            ctx.lineWidth = size * 0.5
            ctx.stroke()
          }
        }
      })

      // Draw planet
      const planetX = canvas.width * 0.75
      const planetY = canvas.height * 0.35
      const planetRadius = 80

      // Atmosphere glow
      const atmosphereGradient = ctx.createRadialGradient(
        planetX, planetY, planetRadius * 0.8,
        planetX, planetY, planetRadius * 1.8
      )
      atmosphereGradient.addColorStop(0, 'rgba(100, 200, 255, 0.15)')
      atmosphereGradient.addColorStop(1, 'transparent')
      ctx.fillStyle = atmosphereGradient
      ctx.beginPath()
      ctx.arc(planetX, planetY, planetRadius * 1.8, 0, Math.PI * 2)
      ctx.fill()

      // Planet body with gradient
      const planetGradient = ctx.createRadialGradient(
        planetX - 20, planetY - 20, 0,
        planetX, planetY, planetRadius
      )
      planetGradient.addColorStop(0, '#2a4a6a')
      planetGradient.addColorStop(0.5, '#1a2a4a')
      planetGradient.addColorStop(1, '#0a0a1a')
      ctx.fillStyle = planetGradient
      ctx.beginPath()
      ctx.arc(planetX, planetY, planetRadius, 0, Math.PI * 2)
      ctx.fill()

      // Planet surface details
      ctx.fillStyle = 'rgba(100, 180, 220, 0.2)'
      for (let i = 0; i < 5; i++) {
        const angle = (time * 0.3 + i) * Math.PI * 0.4
        const x = planetX + Math.cos(angle) * planetRadius * 0.6
        const y = planetY + Math.sin(angle) * planetRadius * 0.6
        ctx.beginPath()
        ctx.arc(x, y, 15, 0, Math.PI * 2)
        ctx.fill()
      }

      // Rim light on planet
      ctx.strokeStyle = 'rgba(100, 220, 255, 0.4)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(planetX, planetY, planetRadius, -Math.PI * 0.4, Math.PI * 0.4)
      ctx.stroke()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 block"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -100,
        display: 'block'
      }}
    />
  )
}
