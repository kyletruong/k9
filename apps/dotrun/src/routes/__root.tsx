import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import {
  createRootRouteWithContext,
  HeadContent,
  ScriptOnce,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { ThemeProvider } from '@repo/ui/hooks/use-theme'
import { getThemeInitScript } from '@repo/ui/lib/theme-init'
import ConvexProvider from '../integrations/convex/provider'
import WorkOsProvider from '../integrations/workos/provider'

import appCss from '../app.css?url'

interface MyRouterContext {
  queryClient: QueryClient
}

const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    links: [
      {
        href: 'https://fonts.googleapis.com',
        rel: 'preconnect',
      },
      {
        crossOrigin: 'anonymous',
        href: 'https://fonts.gstatic.com',
        rel: 'preconnect',
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap',
        rel: 'stylesheet',
      },
      {
        href: appCss,
        rel: 'stylesheet',
      },
    ],
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        content: 'width=device-width, initial-scale=1',
        name: 'viewport',
      },
      {
        title: 'K9: Run agents everywhere all at once',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ScriptOnce>{getThemeInitScript()}</ScriptOnce>
        <ThemeProvider>
          <WorkOsProvider>
            <ConvexProvider>
              <ThemeSwitcher className='top-4 right-4 fixed z-50' />
              {children}
            </ConvexProvider>
          </WorkOsProvider>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            inspectHotkey: ['Alt', 'Shift'],
            openHotkey: ['CtrlOrMeta', 'i'],
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            { name: 'Tanstack Query', render: <ReactQueryDevtoolsPanel /> },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

export { Route }
