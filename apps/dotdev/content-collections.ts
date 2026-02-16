import { defineCollection, defineConfig } from '@content-collections/core'
import { Schema } from 'effect'

const posts = defineCollection({
  directory: 'src/content/blog',
  include: '**/*.mdx',
  name: 'posts',
  schema: Schema.standardSchemaV1(
    Schema.Struct({
      content: Schema.optional(Schema.String),
      date: Schema.String,
      description: Schema.optional(Schema.String),
      title: Schema.String,
    }),
  ),
  transform: (document) => {
    return {
      ...document,
      date: new Date(document.date),
      slug: document._meta.path.replace(/\.mdx$/, ''),
    }
  },
})

export default defineConfig({
  content: [posts],
})
