/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONVEX_URL?: string
  readonly VITE_WORKOS_CLIENT_ID?: string
  readonly VITE_WORKOS_API_HOSTNAME?: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_SENTRY_ENV?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
