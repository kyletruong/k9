# AGENTS.md

> For coding agents. What to edit, how to validate.

## Validation Commands

Run from repo root. **Always run `pnpm check` before finishing.**

```bash
pnpm check         # Lint + types + format (primary validation)
pnpm format:repo:fix    # Auto-fix formatting
pnpm lint:repo:fix      # Auto-fix lint issues
```

## Repo Layout

Personal monorepo housing multiple projects that share config, UI, and tooling.

| Workspace      | Purpose                                                | Dev Command                   |
| -------------- | ------------------------------------------------------ | ----------------------------- |
| `apps/dotrun`  | Web app for running agent CLIs on Cloudflare sandboxes | `pnpm dev:dotrun` (port 3000) |
| `apps/dotdev`  | Personal website (social links, resume)                | `pnpm dev:dotdev` (port 3001) |
| `apps/sandbox` | Worker that runs the sandbox execution logic           | `pnpm dev:sandbox`            |
| `packages/ui`  | Shared UI library (`@repo/ui`)                         | n/a                           |

## Where to Edit

- **Main app features** → `dotrun`
- **Personal website** → `dotdev`
- **Worker experiments** → `sandbox`
- **Shared UI components** → `@repo/ui` (see `packages/ui/AGENTS.md`)

## Key Conventions

1. **Use pnpm** – Not npm or yarn
2. **Don't duplicate UI** – Shared components belong in `@repo/ui`, not copied into apps
3. **Import UI correctly** – `import { Button } from '@repo/ui/components/button'`
4. **Fix errors, don't suppress** – No `@ts-ignore` or lint disables unless explicitly required

## Common Mistakes

- Editing wrong app (confirm which workspace owns the feature)
- Skipping `pnpm check` (changes that fail lint/types/format are broken)
- Duplicating components instead of using `@repo/ui`
- Running npm/yarn instead of pnpm
