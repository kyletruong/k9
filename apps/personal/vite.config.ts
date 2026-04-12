import { cloudflare } from '@cloudflare/vite-plugin'
import contentCollections from '@content-collections/vite'
import mdx from '@mdx-js/rollup'
import babel from '@rolldown/plugin-babel'
import rehypeShiki from '@shikijs/rehype'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import oxlintPlugin from 'vite-plugin-oxlint'

import pierreDark from './src/lib/themes/pierre-dark.json' with { type: 'json' }
import pierreLight from './src/lib/themes/pierre-light.json' with { type: 'json' }

export default defineConfig({
  plugins: [
    devtools(),
    oxlintPlugin({
      params: '--type-aware',
    }),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    contentCollections(),
    mdx({
      rehypePlugins: [
        [
          rehypeShiki,
          {
            themes: {
              dark: pierreDark,
              light: pierreLight,
            },
          },
        ],
      ],
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    tanstackStart({
      prerender: {
        enabled: true,
      },
      sitemap: {
        enabled: true,
        host: 'https://k9.dev',
      },
    }),
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
