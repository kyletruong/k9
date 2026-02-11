import { Resvg, initWasm } from '@resvg/resvg-wasm'
import resvgWasm from '@resvg/resvg-wasm/index_bg.wasm'
import type { ReactNode } from 'react'
import satori, { init } from 'satori'
import yogaWasm from 'yoga-wasm-web/dist/yoga.wasm'

import { OG_FONT_URL, OG_HEIGHT, OG_WIDTH } from './theme'

let initialized = false

async function ensureInitialized() {
  if (initialized) return
  await init(yogaWasm)
  await initWasm(resvgWasm)
  initialized = true
}

let fontCache: ArrayBuffer | null = null

async function loadFont(): Promise<ArrayBuffer> {
  if (fontCache) return fontCache
  const res = await fetch(OG_FONT_URL)
  if (!res.ok) {
    throw new Error(`Failed to fetch font: ${res.status}`)
  }
  fontCache = await res.arrayBuffer()
  return fontCache
}

export async function generateOgImage(element: ReactNode): Promise<Uint8Array> {
  const [fontData] = await Promise.all([loadFont(), ensureInitialized()])

  const svg = await satori(element, {
    fonts: [{ data: fontData, name: 'Geist Mono' }],
    height: OG_HEIGHT,
    width: OG_WIDTH,
  })

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: OG_WIDTH },
  })
  return resvg.render().asPng()
}
