"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

function Blob({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.1} />
    </mesh>
  )
}

export function FloatingBlobs() {
  return (
    <>
      <Blob position={[-3, 2, -2]} scale={1.5} color="#3B82F6" />
      <Blob position={[3, -1, -3]} scale={1.2} color="#8B5CF6" />
      <Blob position={[0, 3, -4]} scale={0.8} color="#06B6D4" />
      <Blob position={[-2, -2, -1]} scale={1.0} color="#EC4899" />
      <Blob position={[4, 1, -2]} scale={0.6} color="#10B981" />
    </>
  )
}
