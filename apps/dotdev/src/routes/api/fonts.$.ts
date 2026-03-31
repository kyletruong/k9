import { createFileRoute } from '@tanstack/react-router'

const Route = createFileRoute('/api/fonts/$')({
  server: {
    handlers: {
      GET: async ({ context, params, request }) => {
        const referer = request.headers.get('Origin') ?? request.headers.get('Referer') ?? ''
        try {
          const hostname = new URL(referer).hostname
          if (hostname !== 'k9.dev') {
            return new Response('Forbidden', { status: 403 })
          }
        } catch {
          return new Response('Forbidden', { status: 403 })
        }

        const key = params._splat ?? ''
        const font = await context.env.FONTS.get(key, 'arrayBuffer')
        if (!font) return new Response('Not Found', { status: 404 })

        return new Response(font, {
          headers: {
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Content-Type': 'font/woff2',
          },
        })
      },
    },
  },
})

export { Route }
