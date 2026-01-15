import * as Sentry from '@sentry/tanstackstart-react'

// TODO(kyle): Migrate to using the vite plugin:
// https://docs.sentry.io/platforms/javascript/sourcemaps/uploading/vite/
// Right now the dev server is broken because the --import ./instrument.server.mjs preload doesn't
// work with the oxlint vite plugin.
Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.VITE_SENTRY_ENV ?? 'development',
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
})
