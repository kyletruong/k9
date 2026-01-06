import { v } from 'convex/values'

import { mutation, query } from './_generated/server'

const list = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query('todos').withIndex('by_creation_time').order('desc').collect()
  },
})

const add = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    return ctx.db.insert('todos', {
      completed: false,
      text: args.text,
    })
  },
})

const toggle = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id)
    if (!todo) {
      throw new Error('Todo not found')
    }
    await ctx.db.patch(args.id, {
      completed: !todo.completed,
    })
  },
})

const remove = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

export { list, add, toggle, remove }
