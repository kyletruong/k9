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

function getBlogPostHead({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p.slug === params.slug)
  if (!post) return {}
  const title = `${post.title} | k9.dev`
  const description = post.description ?? ''
  const image = `https://k9.dev/api/og/blog/${post.slug}`
  return {
    meta: [
      { title },
      { content: description, name: 'description' },
      { content: title, property: 'og:title' },
      { content: description, property: 'og:description' },
      { content: image, property: 'og:image' },
      { content: `https://k9.dev/blog/${post.slug}`, property: 'og:url' },
      { content: 'article', property: 'og:type' },
      { content: title, name: 'twitter:title' },
      { content: description, name: 'twitter:description' },
      { content: image, name: 'twitter:image' },
    ],
  }
}

const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
  head: getBlogPostHead,
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
  const fullCommand = `cat ${post.slug}.md`
  const mobileCommand = fullCommand.length > 24 ? `${fullCommand.slice(0, 23)}…` : fullCommand

  return (
    <TerminalPanel
      className='w-full'
      headerActions={<ThemeSwitcher />}
      promptTitle={
        <PromptTitle
          command={fullCommand}
          mobileCommand={mobileCommand}
          path='/blog'
          allPathsClickable
        />
      }
      showCursor
    >
      <article className='prose prose-sm dark:prose-invert max-w-none'>
        <MDXComponent components={mdxComponents} />
      </article>
    </TerminalPanel>
  )
}

export { Route }
