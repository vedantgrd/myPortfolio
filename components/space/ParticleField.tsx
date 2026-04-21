'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
  scrollProgress?: number
}

export function ParticleField({ count = 500, scrollProgress = 0 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    
    const colorCyan = new THREE.Color('#06b6d4')
    const colorPurple = new THREE.Color('#a855f7')
    
    for (let i = 0; i < count; i++) {
      // Create a flowing field around the viewport
      const x = (Math.random() - 0.5) * 100
      const y = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 50 - 10

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      // Gradient from cyan to purple based on position
      const t = (y + 50) / 100
      const color = colorCyan.clone().lerp(colorPurple, t)
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        // Wave motion
        positions[i3 + 1] += Math.sin(time + positions[i3] * 0.1) * 0.01
        positions[i3] += Math.cos(time * 0.5 + positions[i3 + 1] * 0.1) * 0.005
        
        // Reset particles that go too far
        if (positions[i3 + 1] > 50) positions[i3 + 1] = -50
        if (positions[i3 + 1] < -50) positions[i3 + 1] = 50
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
      
      // Subtle rotation based on scroll
      pointsRef.current.rotation.z = scrollProgress * 0.5
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.5}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}
