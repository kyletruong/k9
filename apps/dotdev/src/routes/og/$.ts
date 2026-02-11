import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import type { ReactNode } from 'react'

import iconSvg from '../../../public/icon-019bbe59-dc79-70a0-b45c-168ac56c0bbf.svg?raw'
import { BlogPostOgImage, HomeOgImage, SectionOgImage } from '../../lib/og/components'
import { generateOgImage } from '../../lib/og/generate'
import { routeTree } from '../../routeTree.gen'

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

const CACHE_CONTROL = 'public, max-age=86400, s-maxage=604800'

function fullPathToRegExp(fullPath: string): RegExp {
  const normalized = fullPath === '/' ? '/' : fullPath.replace(/\/+$/, '')
  const pattern =
    '^' +
    normalized
      .split('/')
      .map((seg) => (seg.startsWith('$') ? '[^/]+' : seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
      .join('/') +
    '$'
  return new RegExp(pattern)
}

function buildValidMatchers(): Array<RegExp> {
  const matchers: Array<RegExp> = []
  const children = routeTree.children
  if (!children) return matchers
  let key: keyof typeof children
  for (key in children) {
    const fullPath = String(children[key].fullPath)
    if (fullPath !== '/' && !fullPath.startsWith('/og')) {
      matchers.push(fullPathToRegExp(fullPath))
    }
  }
  return matchers
}

let validMatchers: Array<RegExp> | undefined

function isValidPath(path: string): boolean {
  validMatchers ??= buildValidMatchers()
  const normalized = path === '/' ? '/' : path.replace(/\/+$/, '')
  return validMatchers.some((matcher) => matcher.test(normalized))
}

function resolveOgImage(segments: Array<string>): ReactNode | null {
  const logoSrc = getLogoSrc()

  if (segments.length === 0) {
    return HomeOgImage({ logoSrc })
  }

  if (!isValidPath(`/${segments.join('/')}`)) return null

  if (segments[0] === 'blog' && segments.length === 2) {
    const post = allPosts.find((p) => p.slug === segments[1])
    if (!post) return null
    return BlogPostOgImage({
      date: formatDate(post.date),
      logoSrc,
      title: post.title,
    })
  }

  const title = segments[segments.length - 1]!
  return SectionOgImage({ logoSrc, title })
}

const Route = createFileRoute('/og/$')({
  server: {
    handlers: {
      GET: async ({ context, params }) => {
        const splat = params._splat ?? ''
        const segments = splat.split('/').filter(Boolean)
        const node = resolveOgImage(segments)

        if (!node) return new Response('Not Found', { status: 404 })

        const response = await generateOgImage(node, context.ctx)
        response.headers.set('Cache-Control', CACHE_CONTROL)
        return response
      },
    },
  },
})

export { Route }
