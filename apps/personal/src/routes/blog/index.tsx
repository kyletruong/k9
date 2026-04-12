import { createFileRoute, Link } from '@tanstack/react-router'

import { TerminalPanel } from '@repo/ui/components/terminal-panel'
import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { formatLsDate } from '../../lib/ls'
import { getVisiblePosts, isDraft } from '../../lib/posts'
import { PromptTitle } from '../../lib/prompt-title'

const META_TITLE = 'Blog | k9.dev'
const META_DESCRIPTION = '$ ls /blog'
const META_IMAGE = 'https://k9.dev/api/og/blog'

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
  const sortedPosts = getVisiblePosts().toSorted((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <TerminalPanel
      className='w-full'
      headerActions={<ThemeSwitcher />}
      showCursor
      promptTitle={<PromptTitle command='ls -lt' mobileCommand='ls' path='/blog' />}
    >
      <div className='text-base'>
        <div className='mb-1 text-muted-foreground'>total {sortedPosts.length}</div>
        <div className='gap-1 flex flex-col'>
          {sortedPosts.map((post) => (
            <div key={post.slug} className='sm:block flex flex-col-reverse'>
              <span className='sm:mr-[1ch] sm:inline sm:text-base text-xs block leading-none text-muted-foreground'>
                {formatLsDate(post.date)}
              </span>
              <Link to='/blog/$slug' params={{ slug: post.slug }} className='hover:underline'>
                {post.slug}.md
              </Link>
              {import.meta.env.DEV && isDraft(post) ? (
                <span className='sm:text-xs ml-[1ch] text-[10px] text-muted-foreground uppercase'>
                  draft
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </TerminalPanel>
  )
}

export { Route }
