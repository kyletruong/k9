import { createFileRoute } from '@tanstack/react-router'

import { removeSearchParams } from '../../lib/cache-key'
import { generateOgImage } from '../../lib/generate-og-image'
import { resolveOgImage } from '../../lib/resolve-og-image'

const Route = createFileRoute('/api/og/$')({
  server: {
    handlers: {
      GET: async ({ context, params, request }) => {
        const cache = caches.default
        const cacheKey = removeSearchParams(request)

        const cached = await cache.match(cacheKey)
        if (cached) return cached

        const splat = params._splat ?? ''
        const segments = splat.split('/').filter(Boolean)
        const node = await resolveOgImage(segments)

        if (!node) return new Response('Not Found', { status: 404 })

        const response = await generateOgImage(node, context.ctx)
        response.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800')

        context.ctx?.waitUntil(cache.put(cacheKey, response.clone()).catch(() => {}))
        return response
      },
    },
  },
})

export { Route }
