import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import appCss from '../app.css?url'

const Route = createRootRoute({
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

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
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
      <body className='min-h-screen bg-background text-foreground'>
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
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

export { Route }
