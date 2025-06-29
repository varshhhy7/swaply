"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { FloatingBlobs } from "./floating-blobs"

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-main" />
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <FloatingBlobs />
        </Suspense>
      </Canvas>
    </div>
  )
}
