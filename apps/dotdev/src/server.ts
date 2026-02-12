import handler from '@tanstack/react-start/server-entry'

declare module '@tanstack/react-start' {
  interface Register {
    server: {
      requestContext: {
        ctx: ExecutionContext
      }
    }
  }
}

export default {
  async fetch(request: Request, _env: Env, ctx: ExecutionContext) {
    return handler.fetch(request, { context: { ctx } })
  },
}
