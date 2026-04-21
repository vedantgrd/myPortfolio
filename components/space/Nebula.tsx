'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface NebulaCloudProps {
  position: [number, number, number]
  color: string
  scale?: number
  speed?: number
}

function NebulaCloud({ position, color, scale = 1, speed = 0.1 }: NebulaCloudProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialPosition = useRef(position)

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating movement
      meshRef.current.position.x = initialPosition.current[0] + Math.sin(state.clock.elapsedTime * speed) * 2
      meshRef.current.position.y = initialPosition.current[1] + Math.cos(state.clock.elapsedTime * speed * 0.7) * 1.5
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[30, 30]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export function Nebula() {
  const nebulaClouds = useMemo(() => [
    { position: [-40, 20, -60] as [number, number, number], color: '#a855f7', scale: 3, speed: 0.08 },
    { position: [50, -15, -70] as [number, number, number], color: '#ec4899', scale: 2.5, speed: 0.1 },
    { position: [-20, -30, -80] as [number, number, number], color: '#06b6d4', scale: 2.8, speed: 0.06 },
    { position: [30, 35, -55] as [number, number, number], color: '#8b5cf6', scale: 2.2, speed: 0.12 },
    { position: [0, 10, -90] as [number, number, number], color: '#f472b6', scale: 4, speed: 0.05 },
  ], [])

  return (
    <group>
      {nebulaClouds.map((cloud, index) => (
        <NebulaCloud key={index} {...cloud} />
      ))}
    </group>
  )
}
