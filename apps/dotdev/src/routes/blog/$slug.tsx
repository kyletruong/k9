import { TerminalPanel } from '@repo/ui/components/terminal-panel'
import { ThemeSwitcher } from '@repo/ui/components/theme-switcher'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import type { ComponentType } from 'react'

import { mdxComponents } from '../../components/mdx-components'
import { PromptTitle } from '../../lib/prompt-title'

type MdxModule = {
  default: ComponentType<{ components?: typeof mdxComponents }>
}

const postModules = import.meta.glob<MdxModule>('../../content/blog/**/*.mdx', {
  eager: true,
})

const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
  loader: ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug)
    if (!post) {
      throw notFound()
    }
    return post
  },
})

function BlogPost() {
  const post = Route.useLoaderData()
  const moduleKey = `../../content/blog/${post.slug}.mdx`
  const mod = postModules[moduleKey]

  if (!mod) {
    throw notFound()
  }

  const MDXComponent = mod.default

  return (
    <TerminalPanel
      className='w-full'
      headerActions={<ThemeSwitcher />}
      promptTitle={<PromptTitle command={`cat ${post.slug}.md`} path='/blog' allPathsClickable />}
      showCursor
    >
      <article className='prose prose-sm dark:prose-invert max-w-none'>
        <MDXComponent components={mdxComponents} />
      </article>
    </TerminalPanel>
  )
}

export { Route }
