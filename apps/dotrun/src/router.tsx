import * as Sentry from '@sentry/tanstackstart-react'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import { NotFound } from './components/not-found'
import * as TanstackQuery from './integrations/tanstack-query/provider'
import { routeTree } from './routeTree.gen'

export const getRouter = () => {
  const rqContext = TanstackQuery.getContext()

  const router = createRouter({
    Wrap: (props: { children: React.ReactNode }) => {
      return <TanstackQuery.Provider {...rqContext}>{props.children}</TanstackQuery.Provider>
    },
    context: { ...rqContext },
    defaultHashScrollIntoView: true,
    defaultNotFoundComponent: NotFound,
    defaultPendingMinMs: 200,
    defaultPendingMs: 200,
    defaultPreload: 'intent',
    routeTree,
    search: { strict: true },
  })

  setupRouterSsrQueryIntegration({ queryClient: rqContext.queryClient, router })

  if (!router.isServer) {
    const dsn = import.meta.env.VITE_SENTRY_DSN
    const environment = import.meta.env.VITE_SENTRY_ENV ?? 'development'

    Sentry.init({
      dsn: typeof dsn === 'string' && dsn.length > 0 ? dsn : undefined,
      environment,
      integrations: [],
    })
  }

  return router
}
