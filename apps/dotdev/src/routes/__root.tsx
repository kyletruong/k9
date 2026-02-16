import { ThemeProvider } from '@repo/ui/hooks/use-theme'
import { getThemeInitScript } from '@repo/ui/lib/theme-init'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { BouncingCubeScene } from '../components/bouncing-cube'

import appCss from '../app.css?url'
import katexCss from 'katex/dist/katex.min.css?url'

const META_TITLE = 'Kyle Truong | k9.dev'
const META_DESCRIPTION = '$ whoami'
const META_IMAGE = 'https://k9.dev/api/og'

const Route = createRootRoute({
  component: RootLayout,
  head: () => ({
    links: [
      {
        href: '/favicon-019bbe63-6224-702c-b772-f8d95a8798eb.ico',
        rel: 'icon',
        sizes: 'any',
      },
      {
        href: '/icon-019bbe59-dc79-70a0-b45c-168ac56c0bbf.svg',
        rel: 'icon',
        type: 'image/svg+xml',
      },
      {
        href: '/apple-touch-icon.png',
        rel: 'apple-touch-icon',
      },
      {
        href: '/site.webmanifest',
        rel: 'manifest',
      },
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
        href: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap',
        rel: 'stylesheet',
      },
      {
        href: appCss,
        rel: 'stylesheet',
      },
      {
        href: katexCss,
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
        title: META_TITLE,
      },
      {
        content: META_DESCRIPTION,
        name: 'description',
      },
      {
        content: META_TITLE,
        property: 'og:title',
      },
      {
        content: META_DESCRIPTION,
        property: 'og:description',
      },
      {
        content: META_IMAGE,
        property: 'og:image',
      },
      {
        content: 'https://k9.dev',
        property: 'og:url',
      },
      {
        content: 'website',
        property: 'og:type',
      },
      {
        content: META_TITLE,
        name: 'twitter:title',
      },
      {
        content: META_DESCRIPTION,
        name: 'twitter:description',
      },
      {
        content: META_IMAGE,
        name: 'twitter:image',
      },
      {
        content: 'summary_large_image',
        name: 'twitter:card',
      },
      {
        content: '@kyletruong',
        name: 'twitter:site',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootLayout() {
  return (
    <main className='px-8 relative min-h-dvh pt-[20vh]'>
      <div
        aria-hidden='true'
        className='right-0 left-0 pointer-events-none absolute top-[20vh] border-t-2 border-dashed border-foreground/20'
      />
      <div
        aria-hidden='true'
        className='top-0 bottom-0 pointer-events-none absolute left-1/2 w-[calc(100%-2rem)] max-w-[calc(80ch+2rem)] -translate-x-1/2 overflow-hidden'
      >
        <div className='top-0 bottom-0 left-0 absolute border-l-2 border-dashed border-foreground/20' />
        <div className='top-0 bottom-0 right-0 absolute border-r-2 border-dashed border-foreground/20' />
        <BouncingCubeScene className='top-0 right-0 left-0 absolute hidden h-[20vh] dark:block' />
      </div>
      <div className='mt-4 relative z-10 mx-auto w-full max-w-[80ch]'>
        <Outlet />
      </div>
    </main>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
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
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

export { Route }
