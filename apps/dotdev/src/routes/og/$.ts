import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'

import iconSvg from '../../../public/icon-019bbe59-dc79-70a0-b45c-168ac56c0bbf.svg?raw'
import { BlogIndexOgImage, BlogPostOgImage, HomeOgImage } from '../../lib/og/components'
import { generateOgImage } from '../../lib/og/generate'

function getLogoSrc() {
  return `data:image/svg+xml;base64,${btoa(iconSvg)}`
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function pngResponse(png: Uint8Array, cacheControl: string): Response {
  const buffer = new ArrayBuffer(png.byteLength)
  new Uint8Array(buffer).set(png)
  return new Response(buffer, {
    headers: {
      'Cache-Control': cacheControl,
      'Content-Type': 'image/png',
    },
  })
}

const CACHE_CONTROL = 'public, max-age=86400, s-maxage=604800'

const Route = createFileRoute('/og/$')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const splat = params._splat ?? ''
        const segments = splat.split('/').filter(Boolean)
        const logoSrc = getLogoSrc()

        if (segments.length === 0) {
          const png = await generateOgImage(HomeOgImage({ logoSrc }))
          return pngResponse(png, CACHE_CONTROL)
        }

        if (segments[0] === 'blog') {
          if (segments.length === 1) {
            const png = await generateOgImage(BlogIndexOgImage({ logoSrc }))
            return pngResponse(png, CACHE_CONTROL)
          }

          if (segments.length === 2) {
            const slug = segments[1]
            const post = allPosts.find((p) => p.slug === slug)
            if (!post) {
              return new Response('Not Found', { status: 404 })
            }
            const png = await generateOgImage(
              BlogPostOgImage({
                date: formatDate(post.date),
                logoSrc,
                title: post.title,
              }),
            )
            return pngResponse(png, CACHE_CONTROL)
          }
        }

        return new Response('Not Found', { status: 404 })
      },
    },
  },
})

export { Route }
