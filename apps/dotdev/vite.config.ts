import { cloudflare } from '@cloudflare/vite-plugin'
import contentCollections from '@content-collections/vite'
import mdx from '@mdx-js/rollup'
import rehypeShiki from '@shikijs/rehype'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import oxlintPlugin from 'vite-plugin-oxlint'

import pierreDark from './src/lib/themes/pierre-dark.json'
import pierreLight from './src/lib/themes/pierre-light.json'

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
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
})
