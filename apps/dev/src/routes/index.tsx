import { TerminalPanel } from '@repo/ui/components/terminal-panel'
import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { createFileRoute } from '@tanstack/react-router'

import { SocialLinks } from '../components/social-links'

const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: 'Kyle Truong | K9.dev',
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
        <img
          src='/pfp-019b8864-ccbe-7f55-a659-cb665252e594.webp'
          alt='Kyle Truong'
          className='shrink-0 self-center sm:self-start size-32 object-cover'
        />

        <div className='flex flex-col gap-2'>
          <h1 className='text-xl font-bold uppercase tracking-wider'>Kyle Truong</h1>
          <p className='text-muted-foreground'>Senior Software Engineer</p>
        </div>
      </div>
    </TerminalPanel>
  )
}

export { Route }
