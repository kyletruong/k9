import { createRouter } from '@tanstack/react-router'

import { NotFound } from './components/not-found'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    defaultHashScrollIntoView: true,
    defaultNotFoundComponent: NotFound,
    defaultPendingMinMs: 200,
    defaultPendingMs: 200,
    defaultPreload: 'intent',
    routeTree,
    scrollRestoration: true,
    search: { strict: true },
  })

  return router
}
