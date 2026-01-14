/**
 * Preview OG image locally:
 * > bun scripts/og-image.tsx dev
 *
 * Write OG image to public/og-image.png:
 * > bun scripts/og-image.tsx
 */

import { Resvg } from '@resvg/resvg-js'
import { readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { join } from 'node:path'
import satori from 'satori'

const WIDTH = 1200
const HEIGHT = 630

const COLORS = {
  background: '#0c0a09',
  foreground: '#fafaf9',
}

async function loadFont() {
  const url = 'https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-mono/GeistMono-Black.ttf'
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch font: ${res.status}`)
  }
  return res.arrayBuffer()
}

async function loadLogo() {
  const svgContent = await readFile(join(import.meta.dirname, '../public/icon.svg'), 'utf-8')
  return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`
}

function OgImage({ logoSrc }: { logoSrc: string }) {
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', marginRight: 60 }}>
        <img alt='logo' src={logoSrc} width={200} height={200} />
      </div>

      <div
        style={{
          backgroundColor: COLORS.foreground,
          height: 160,
          width: 4,
        }}
      />

      <div
        style={{
          display: 'flex',
          marginLeft: 80,
        }}
      >
        <span
          style={{
            color: COLORS.foreground,
            fontSize: 140,
            letterSpacing: '-2px',
            lineHeight: 1,
          }}
        >
          k9.dev
        </span>
      </div>
    </div>
  )
}

async function generateSvg() {
  const [fontData, logoSrc] = await Promise.all([loadFont(), loadLogo()])

  return satori(<OgImage logoSrc={logoSrc} />, {
    fonts: [
      {
        data: fontData,
        name: 'Geist Mono',
      },
    ],
    height: HEIGHT,
    width: WIDTH,
  })
}

function generatePng(svg: string) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
  })
  return resvg.render().asPng()
}

async function build() {
  console.log('Generating OG image...')
  const svg = await generateSvg()
  const png = generatePng(svg)
  const outputPath = join(import.meta.dirname, '../public/og-image.png')
  await writeFile(outputPath, png)
  console.log(`Saved to ${outputPath}`)
}

function dev() {
  const port = 3333
  console.log(`Dev server running at http://localhost:${port}`)
  console.log('Rebuild server to see changes\n')

  const server = createServer((req, res) => {
    void (async () => {
      try {
        const svg = await generateSvg()

        if (req.url === '/png') {
          const png = generatePng(svg)
          res.setHeader('Content-Type', 'image/png')
          res.end(png)
          return
        }

        res.setHeader('Content-Type', 'text/html')
        res.end(`<!DOCTYPE html>
<html>
<head>
  <title>OG Image Preview</title>
  <style>
    body { margin: 0; background: #18181b; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; gap: 20px; font-family: system-ui; }
    img { max-width: 90vw; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
    .info { color: #71717a; font-size: 14px; }
    a { color: #3b82f6; }
  </style>
</head>
<body>
  <img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}" width="${WIDTH}" height="${HEIGHT}" />
  <div class="info">${WIDTH}x${HEIGHT} | <a href="/png">Download PNG</a></div>
</body>
</html>`)
      } catch (err) {
        res.statusCode = 500
        res.end(String(err))
      }
    })()
  })

  server.listen(port)
}

const command = process.argv[2]
if (command === 'dev') {
  dev()
} else {
  void build()
}
