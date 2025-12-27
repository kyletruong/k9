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
    defaultNotFoundComponent: NotFound,
    defaultPreload: 'intent',
    routeTree,
  })

  setupRouterSsrQueryIntegration({ queryClient: rqContext.queryClient, router })

  if (!router.isServer) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.VITE_SENTRY_ENV || 'development',
      integrations: [],
    })
  }

  return router
}
