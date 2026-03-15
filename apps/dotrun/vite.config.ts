import { cloudflare } from '@cloudflare/vite-plugin'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import oxlintPlugin from 'vite-plugin-oxlint'

export default defineConfig({
  plugins: [
    devtools(),
    oxlintPlugin({
      params: '--type-aware',
    }),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    babel({
      overrides: [
        {
          parserOpts: { plugins: ['jsx'] },
          // @ts-expect-error -- Babel `overrides.test` is documented by `@rolldown/plugin-babel`, but omitted from its published type.
          test: /\.[cm]?jsx(?:$|\?)/,
        },
        {
          parserOpts: { plugins: ['typescript'] },
          // @ts-expect-error -- Babel `overrides.test` is documented by `@rolldown/plugin-babel`, but omitted from its published type.
          test: /\.[cm]?ts(?:$|\?)/,
        },
        {
          parserOpts: { plugins: ['typescript', 'jsx'] },
          // @ts-expect-error -- Babel `overrides.test` is documented by `@rolldown/plugin-babel`, but omitted from its published type.
          test: /\.[cm]?tsx(?:$|\?)/,
        },
      ],
      presets: [reactCompilerPreset()],
    }),
  ],
})
