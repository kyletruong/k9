import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  products: defineTable({
    imageId: v.string(),
    price: v.number(),
    title: v.string(),
  }),
  todos: defineTable({
    completed: v.boolean(),
    text: v.string(),
  }),
})
