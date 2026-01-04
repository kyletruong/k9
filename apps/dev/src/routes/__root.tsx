import { ThemeProvider } from '@repo/ui/hooks/use-theme'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { CrtCanvas } from '../components/crt-canvas'

import appCss from '../app.css?url'

const Route = createRootRoute({
  component: RootLayout,
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
        href: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap',
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
        content: 'Kyle Truong - Senior Software Engineer',
        name: 'description',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootLayout() {
  return (
    <main className='relative min-h-screen px-8 pt-[20vh]'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute top-[20vh] right-0 left-0 border-t-2 border-dashed border-foreground/20'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute top-0 bottom-0 left-1/2 w-[calc(100%-2rem)] max-w-[calc(80ch+2rem)] -translate-x-1/2 overflow-hidden'
      >
        <div className='absolute top-0 bottom-0 left-0 border-l-2 border-dashed border-foreground/20' />
        <div className='absolute top-0 bottom-0 right-0 border-r-2 border-dashed border-foreground/20' />
        <CrtCanvas className='absolute top-0 right-0 left-0 hidden h-[20vh] dark:block' />
      </div>
      <div className='relative z-10 mx-auto mt-4 w-full max-w-[80ch]'>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              var t;
              try{t=localStorage.getItem('theme')}catch(e){}
              var c=document.documentElement.classList;
              var s=window.matchMedia('(prefers-color-scheme:dark)').matches;
              if(t==='dark'||((t==='system'||!t)&&s)){
                c.add('dark');
              }else{
                c.remove('dark');
              }
            })()`,
          }}
        />
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
