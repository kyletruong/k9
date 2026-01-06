import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useState, useSyncExternalStore } from 'react'
import type { Mesh } from 'three'

import { cubeColors } from '../lib/color'
import { CrtShader } from './crt-shader'

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

const CUBE_SIZE = 1.5
const SPEED = 1.5
const ROTATION_SPEED = 1.0

function randomVelocity(speed: number) {
  const minAngle = Math.PI / 6 // ~30 degrees
  const maxAngle = Math.PI / 2 - minAngle // ~60 degrees
  const theta = minAngle + Math.random() * (maxAngle - minAngle)
  const signX = Math.random() > 0.5 ? 1 : -1
  const signY = Math.random() > 0.5 ? 1 : -1
  return { vx: speed * Math.cos(theta) * signX, vy: speed * Math.sin(theta) * signY }
}

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
    ...randomVelocity(SPEED),
    x: 0,
    y: 0,
  })

  useFrame((_, delta) => {
    if (!meshRef.current) return

    const m = motion.current
    m.x += m.vx * delta
    m.y += m.vy * delta

    if (m.x <= bounds.minX) {
      m.x = bounds.minX
      m.vx = Math.abs(m.vx)
    } else if (m.x >= bounds.maxX) {
      m.x = bounds.maxX
      m.vx = -Math.abs(m.vx)
    }

    if (m.y <= bounds.minY) {
      m.y = bounds.minY
      m.vy = Math.abs(m.vy)
    } else if (m.y >= bounds.maxY) {
      m.y = bounds.maxY
      m.vy = -Math.abs(m.vy)
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

function BouncingCubeScene({ className }: { className?: string }) {
  const hydrated = useHydrated()
  if (!hydrated) {
    return <div className={className} />
  }

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
        <CrtShader />
      </Canvas>
    </div>
  )
}

export { BouncingCubeScene }
