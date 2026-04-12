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
import { defineConfig } from 'vite-plus'

import pierreDark from './src/lib/themes/pierre-dark.json' with { type: 'json' }
import pierreLight from './src/lib/themes/pierre-light.json' with { type: 'json' }

export default defineConfig({
  plugins: [
    devtools(),
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
  run: {
    tasks: {
      build: {
        command: 'vp build',
        dependsOn: ['types:gen'],
        env: ['VITE_*', 'NODE_ENV'],
        input: [
          { auto: true },
          '!dist/**',
          '!.wrangler/**',
          '!.content-collections/**',
          '!worker-configuration.d.ts',
          '!**/*.tsbuildinfo',
        ],
      },
      'build:resume': {
        command: 'vp exec typst compile --format pdf ../resume/main.typ public/resume.pdf',
      },
      deploy: {
        cache: false,
        command: 'wrangler deploy',
        dependsOn: ['build'],
      },
      dev: {
        cache: false,
        command: 'vp dev',
        dependsOn: ['types:gen'],
      },
      'types:gen': {
        command: 'wrangler types && content-collections build',
        input: [
          { auto: true },
          '!**/*.tsbuildinfo',
          '!worker-configuration.d.ts',
          '!.content-collections/**',
        ],
      },
    },
  },
})
