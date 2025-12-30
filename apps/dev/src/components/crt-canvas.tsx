import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import type { Mesh } from 'three'

import { cubeColors } from '../lib/color'
import { CrtEffects } from './crt-effect'

const CUBE_SIZE = 1.5
const SPEED = 1.5
const ROTATION_SPEED = 1.0

function BouncingCube() {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHover] = useState(false)
  const { viewport } = useThree()

  const bounds = useMemo(() => {
    const halfCube = CUBE_SIZE / 2
    return {
      maxX: viewport.width / 2 - halfCube,
      maxY: viewport.height / 2 - halfCube,
      minX: -viewport.width / 2 + halfCube,
      minY: -viewport.height / 2 + halfCube,
    }
  }, [viewport])

  const motion = useRef({
    vx: SPEED * (Math.random() > 0.5 ? 1 : -1),
    vy: SPEED * 0.7 * (Math.random() > 0.5 ? 1 : -1),
    x: 0,
    y: 0,
  })

  useFrame((_, delta) => {
    if (!meshRef.current) return

    const m = motion.current
    m.x += m.vx * delta
    m.y += m.vy * delta

    if (m.x >= bounds.maxX || m.x <= bounds.minX) {
      m.vx *= -1
      m.x = Math.max(bounds.minX, Math.min(bounds.maxX, m.x))
    }
    if (m.y >= bounds.maxY || m.y <= bounds.minY) {
      m.vy *= -1
      m.y = Math.max(bounds.minY, Math.min(bounds.maxY, m.y))
    }

    meshRef.current.position.x = m.x
    meshRef.current.position.y = m.y
    meshRef.current.rotation.x += ROTATION_SPEED * delta
    meshRef.current.rotation.y += ROTATION_SPEED * delta
  })

  const currentColor = hovered ? cubeColors.hover : cubeColors.base

  return (
    <mesh
      ref={meshRef}
      onPointerOut={() => {
        setHover(false)
      }}
      onPointerOver={() => {
        setHover(true)
      }}
      position={[0, 0, 0]}
    >
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      <meshStandardMaterial color={currentColor} emissive={currentColor} emissiveIntensity={0.3} />
    </mesh>
  )
}

function CrtCanvas({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        dpr={1}
        gl={{ alpha: true, antialias: false, premultipliedAlpha: false }}
        style={{ background: 'transparent', imageRendering: 'pixelated' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight angle={0.15} penumbra={1} position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} />
        <BouncingCube />
        <CrtEffects />
      </Canvas>
    </div>
  )
}

export { CrtCanvas }
