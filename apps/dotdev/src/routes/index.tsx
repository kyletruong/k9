import { TerminalPanel } from '@repo/ui/components/terminal-panel'
import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { createFileRoute, Link } from '@tanstack/react-router'

import { Math } from '../components/math'
import { PromptTitle } from '../lib/prompt-title'

const SYMLINKS = [
  { href: 'https://github.com/kyletruong', name: 'github', target: 'github.com/kyletruong' },
  {
    href: 'https://www.linkedin.com/in/kyletruong/',
    name: 'linkedin',
    target: 'linkedin.com/in/kyletruong',
  },
  { href: 'https://x.com/kyletruong', name: 'x', target: 'x.com/kyletruong' },
] as const

const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <TerminalPanel
        className='w-full'
        headerActions={<ThemeSwitcher />}
        promptTitle={<PromptTitle command='whoami' />}
        showCursor
      >
        <div className='flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8'>
          <img
            src='/pfp-019b8864-ccbe-7f55-a659-cb665252e594.webp'
            alt='Kyle Truong'
            className='border shrink-0 self-center sm:self-start size-32 object-cover'
          />
          <div className='flex flex-col gap-2 self-stretch'>
            <h1 className='text-xl font-bold uppercase tracking-wider'>Kyle Truong</h1>
            <p className='text-muted-foreground'>Senior Software Engineer</p>
            <Math className='mt-4'>{'X_t = X_{t-1} + \\mu + \\epsilon_t'}</Math>
          </div>
        </div>
      </TerminalPanel>

      <TerminalPanel className='w-full' promptTitle={<PromptTitle command='ls' />}>
        <div className='flex flex-col'>
          <Link to='/blog' className='w-fit hover:underline'>
            blog/
          </Link>
          {SYMLINKS.map(({ href, name, target }) => (
            <div key={name}>
              <a href={href} target='_blank' rel='noopener noreferrer' className='hover:underline'>
                {name}
              </a>
              <span className='hidden text-muted-foreground sm:inline whitespace-pre'>
                {' -> '}
                {target}
              </span>
            </div>
          ))}
        </div>
      </TerminalPanel>
    </div>
  )
}

export { Route }
