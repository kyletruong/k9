import { TerminalPanel } from '@repo/ui/components/terminal-panel'
import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { createFileRoute, Link } from '@tanstack/react-router'
import { allPosts } from 'content-collections'

import { formatLsDate } from '../../lib/ls'
import { PromptTitle } from '../../lib/prompt-title'

const Route = createFileRoute('/blog/')({
  component: RouteComponent,
})

function RouteComponent() {
  const sortedPosts = [...allPosts].toSorted((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <TerminalPanel
      className='w-full'
      headerActions={<ThemeSwitcher />}
      showCursor
      promptTitle={<PromptTitle command='ls -lt' mobileCommand='ls' path='/blog' />}
    >
      <div className='whitespace-pre'>
        <div className='hidden sm:block'>total {sortedPosts.length}</div>
        {sortedPosts.map((post) => (
          <div key={post.slug}>
            <span className='mr-2 hidden text-muted-foreground sm:inline'>
              {formatLsDate(post.date)}
            </span>
            <Link
              to='/blog/$slug'
              params={{ slug: post.slug }}
              className='text-sm hover:underline sm:text-base'
            >
              {post.slug}.md
            </Link>
          </div>
        ))}
      </div>
    </TerminalPanel>
  )
}

export { Route }
