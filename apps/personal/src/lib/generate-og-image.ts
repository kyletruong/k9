import { cache, GoogleFont, ImageResponse } from 'cf-workers-og'
import type { ReactNode } from 'react'

export async function generateOgImage(
  element: ReactNode,
  ctx?: ExecutionContext,
): Promise<Response> {
  if (ctx) {
    cache.setExecutionContext(ctx)
  }

  return ImageResponse.create(element, {
    fonts: [new GoogleFont('Geist Mono', { weight: 700 })],
    height: 630,
    width: 1200,
  })
}
