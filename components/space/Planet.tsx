'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PlanetProps {
  position?: [number, number, number]
  scale?: number
}

export function Planet({ position = [60, -20, -80], scale = 15 }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = -state.clock.elapsedTime * 0.02
    }
  })

  return (
    <group position={position}>
      {/* Outer glow */}
      <mesh ref={glowRef} scale={scale * 1.25}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Atmosphere */}
      <mesh ref={atmosphereRef} scale={scale * 1.08}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Planet surface - using gradient material */}
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#1e3a5f"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
}
