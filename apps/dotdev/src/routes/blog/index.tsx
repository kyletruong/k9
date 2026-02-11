import { TerminalPanel } from '@repo/ui/components/terminal-panel'
import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { cn } from '@repo/ui/lib/utils'
import { createFileRoute, Link } from '@tanstack/react-router'
import { allPosts } from 'content-collections'

import { formatLsDate } from '../../lib/ls'
import { PromptTitle } from '../../lib/prompt-title'

const META_TITLE = 'Blog | k9.dev'
const META_DESCRIPTION = '$ ls /blog'
const META_IMAGE = 'https://k9.dev/og/blog'

const Route = createFileRoute('/blog/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: META_TITLE },
      { content: META_DESCRIPTION, name: 'description' },
      { content: META_TITLE, property: 'og:title' },
      { content: META_DESCRIPTION, property: 'og:description' },
      { content: META_IMAGE, property: 'og:image' },
      { content: 'https://k9.dev/blog', property: 'og:url' },
      { content: META_TITLE, name: 'twitter:title' },
      { content: META_DESCRIPTION, name: 'twitter:description' },
      { content: META_IMAGE, name: 'twitter:image' },
    ],
  }),
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
      <div className='text-sm sm:text-base whitespace-pre'>
        <div className='mb-1 text-muted-foreground'>total {sortedPosts.length}</div>
        {sortedPosts.map((post) => (
          <div key={post.slug} className='sm:block flex flex-col-reverse'>
            <span className='sm:mr-[1ch] sm:inline sm:text-base sm:leading-normal block text-[10px] leading-none text-muted-foreground'>
              {formatLsDate(post.date)}
            </span>
            <Link
              to='/blog/$slug'
              params={{ slug: post.slug }}
              className={cn(
                import.meta.env.DEV
                  ? 'hover:underline'
                  : 'pointer-events-none text-muted-foreground line-through decoration-foreground',
              )}
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
