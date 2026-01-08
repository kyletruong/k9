import { TerminalPanel } from '@repo/ui/components/terminal-panel'
import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { createFileRoute } from '@tanstack/react-router'

import { formatLsDate } from '../../lib/ls'
import { PromptTitle } from '../../lib/prompt-title'

const POSTS = [
  { date: new Date('2026-01-08T00:47:00Z'), filename: 'how-postgres-writes.md' },
] as const

const Route = createFileRoute('/blog/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <TerminalPanel
      className='w-full'
      headerActions={<ThemeSwitcher />}
      showCursor
      promptTitle={<PromptTitle command='ls -lt' mobileCommand='ls' path='/blog' />}
    >
      <div className='whitespace-pre'>
        <div className='hidden sm:block'>total {POSTS.length}</div>
        {POSTS.map((post) => (
          <div key={post.filename}>
            <span className='mr-2 hidden text-muted-foreground sm:inline'>
              {formatLsDate(post.date)}
            </span>
            <span className='cursor-not-allowed text-sm sm:text-base line-through'>
              {post.filename}
            </span>
          </div>
        ))}
      </div>
    </TerminalPanel>
  )
}

export { Route }
