import type { Post as GeneratedPost } from 'content-collections'

type RequireSlug<T> = T & {
  slug: string
}

export type Post = RequireSlug<GeneratedPost>
