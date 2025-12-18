# UI Package AGENTS.md

> **Guidance for working with the `@repo/ui` component library.**

## Package Purpose

Shared UI component library using **@base-ui/react** primitives with **Tailwind CSS** styling.

## Adding Components

1. Use `pnpm dlx shadcn@latest add <component>` from repo root (configures via `components.json`)
2. Or manually create in `src/components/`

## Component Patterns

Every component should:

- Import from `@base-ui/react/*` for primitives
- Use `cva` from `class-variance-authority` for variants
- Use `cn()` from `../lib/utils` for class merging
- Add `data-slot` attribute on root element
- Export both component and variants (e.g., `Button`, `buttonVariants`)

### Standard Structure

```tsx
import { Primitive } from '@base-ui/react/primitive'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const variants = cva('base-classes', {
  defaultVariants: { variant: 'default', size: 'default' },
  variants: {
    variant: { default: '...', destructive: '...', ghost: '...' },
    size: { default: '...', sm: '...', lg: '...' },
  },
})

function Component({ className, variant, size, ...props }: Props & VariantProps<typeof variants>) {
  return (
    <Primitive
      className={cn(variants({ variant, size, className }))}
      data-slot='component'
      {...props}
    />
  )
}

export { Component, variants }
```

## Styling Conventions

- **Tailwind**: Use classes with theme CSS variables (e.g., `bg-primary`, `text-muted-foreground`)
- **Boxy Style**: Use `rounded-none` (Lyra style)
- **State**: Use data attributes: `data-[state=open]:...`
- **SVG Sizing**: `[&_svg:not([class*='size-'])]:size-4`

## Theme System

- **Variables**: `src/styles/theme.css`
- **Colors**: OKLCH color space
- **Modes**: Light/dark via `.dark` class
- **Fonts**: Geist Mono (default), Geist (via `font-sans`)

## Exports

Package uses wildcard exports in `package.json`:

- `@repo/ui/components/*` → `./src/components/*.tsx`
- `@repo/ui/hooks/*` → `./src/hooks/*.ts`
- `@repo/ui/lib/*` → `./src/lib/*.ts`
- `@repo/ui/styles/*` → `./src/styles/*`
