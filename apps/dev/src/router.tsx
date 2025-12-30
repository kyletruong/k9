import { createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    defaultHashScrollIntoView: true,
    defaultPendingMinMs: 200,
    defaultPendingMs: 200,
    defaultPreload: 'intent',
    routeTree,
    scrollRestoration: true,
    search: { strict: true },
  })

  return router
}
