import { allPosts } from 'content-collections'

type Post = (typeof allPosts)[number]

function isDraft(post: Post): boolean {
  return post.draft ?? false
}

function isVisiblePost(post: Post): boolean {
  return import.meta.env.DEV || !isDraft(post)
}

function getAllPosts(): Array<Post> {
  return [...allPosts]
}

function getVisiblePosts(): Array<Post> {
  return getAllPosts().filter(isVisiblePost)
}

function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug)
}

function getVisiblePostBySlug(slug: string): Post | undefined {
  const post = getPostBySlug(slug)
  if (!post || !isVisiblePost(post)) {
    return undefined
  }
  return post
}

export { getAllPosts, getPostBySlug, getVisiblePostBySlug, getVisiblePosts, isDraft }
