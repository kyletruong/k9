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
      <div className='whitespace-pre text-sm sm:text-base'>
        <div className='mb-1 text-muted-foreground'>total {sortedPosts.length}</div>
        {sortedPosts.map((post) => (
          <div key={post.slug} className='flex flex-col-reverse sm:block'>
            <span className='block text-[10px] leading-none text-muted-foreground sm:mr-[1ch] sm:inline sm:text-base sm:leading-normal'>
              {formatLsDate(post.date)}
            </span>
            <Link to='/blog/$slug' params={{ slug: post.slug }} className='hover:underline'>
              {post.slug}.md
            </Link>
          </div>
        ))}
      </div>
    </TerminalPanel>
  )
}

export { Route }
