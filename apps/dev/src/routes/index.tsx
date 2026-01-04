import { TerminalPanel } from '@repo/ui/components/terminal-panel'
import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { createFileRoute } from '@tanstack/react-router'
import { User } from 'lucide-react'

import { SocialLinks } from '../components/social-links'

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
    <TerminalPanel
      className='w-full'
      footer={<SocialLinks />}
      headerActions={<ThemeSwitcher />}
      showCursor
      title='K9.DEV'
    >
      <div className='flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8'>
        {/* TODO: Add pic of me */}
        <div className='flex shrink-0 items-center justify-center self-center border-2 border-foreground bg-muted sm:self-start size-32'>
          <User className='size-16 text-muted-foreground' />
        </div>

        <div className='flex flex-col gap-2'>
          <h1 className='text-xl font-bold uppercase tracking-wider'>Kyle Truong</h1>
          <p className='text-muted-foreground'>Senior Software Engineer</p>
        </div>
      </div>
    </TerminalPanel>
  )
}

export { Route }
