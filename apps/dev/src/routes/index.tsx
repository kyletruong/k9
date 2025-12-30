import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { createFileRoute } from '@tanstack/react-router'
import { User } from 'lucide-react'

import { CrtCanvas } from '../components/crt-canvas'
import { SocialLinks } from '../components/social-links'
import { TerminalCard } from '../components/terminal-card'

const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: 'Kyle Truong | k9.dev',
      },
    ],
  }),
})

function HomePage() {
  return (
    <main className='relative min-h-screen overflow-hidden px-8 pt-[20vh] sm:px-4'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute top-[20vh] right-0 left-0 border-t-2 border-dashed border-foreground/20'
      />

      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 left-1/2 w-[calc(100%-2rem)] max-w-[calc(80ch+2rem)] -translate-x-1/2'
      >
        <div className='absolute top-0 bottom-0 left-0 border-l-2 border-dashed border-foreground/20' />
        <div className='absolute top-0 bottom-0 right-0 border-r-2 border-dashed border-foreground/20' />

        <CrtCanvas className='absolute top-0 right-0 left-0 hidden h-[20vh] dark:block' />
      </div>

      {/* Main content */}
      <div className='relative z-10 mx-auto mt-4 w-full max-w-[80ch]'>
        <TerminalCard
          className='w-full bg-background'
          footer={<SocialLinks />}
          headerRight={<ThemeSwitcher />}
          showCursor
          title='K9.DEV'
        >
          <div className='flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8'>
            {/* TODO: Add pic of me */}
            <div className='flex shrink-0 items-center justify-center self-center border-2 border-foreground bg-muted sm:self-start size-32'>
              <User className='size-16 text-muted-foreground' />
            </div>

            {/* TODO: Add about me blurb */}
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl font-bold uppercase tracking-wider'>Kyle Truong</h1>
              <p className='text-muted-foreground'>Senior Software Engineer</p>
            </div>
          </div>
        </TerminalCard>
      </div>
    </main>
  )
}

export { Route }
