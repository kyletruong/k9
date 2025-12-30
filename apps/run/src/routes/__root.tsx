import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

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
    // NOTE: suppressHydrationWarning needed because of FOUC fix in dangerouslySetInnerHtml
    <html lang='en' suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try{
                var t=localStorage.getItem('theme');
                var c=document.documentElement.classList;
                var s=window.matchMedia('(prefers-color-scheme:dark)').matches;
                if(t==='dark'||((t==='system'||!t)&&s)){
                  c.add('dark');
                }else{
                  c.remove('dark');
                }
              }catch(e){}
            })()`,
          }}
        />
      </head>
      <body>
        <WorkOsProvider>
          <ConvexProvider>
            <ThemeSwitcher className='fixed top-4 right-4 z-50' />
            {children}
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
          </ConvexProvider>
        </WorkOsProvider>
        <Scripts />
      </body>
    </html>
  )
}

export { Route }
