# AGENTS.md

> For coding agents. What to edit, how to validate.

## Validation Commands

Run from repo root. Always run `pnpm check` before finishing.

```bash
pnpm check            # Lint + types + format (primary validation)
pnpm format:fix:repo  # Auto-fix formatting
pnpm lint:fix:repo    # Auto-fix lint issues
```

## Repo Layout

Personal monorepo housing multiple projects that share config, UI, and tooling.

| Workspace      | Purpose                                                | Dev Command                   |
| -------------- | ------------------------------------------------------ | ----------------------------- |
| `apps/dotrun`  | Web app for running agent CLIs on Cloudflare sandboxes | `pnpm dev:dotrun` (port 3000) |
| `apps/dotdev`  | Personal website (social links, resume)                | `pnpm dev:dotdev` (port 3001) |
| `apps/sandbox` | Worker that runs the sandbox execution logic           | `pnpm dev:sandbox`            |
| `packages/ui`  | Shared UI library (`@repo/ui`)                         | n/a                           |

## Common Mistakes

- Editing wrong app (confirm which workspace owns the feature)
- Skipping `pnpm check` (changes that fail lint/types/format are broken)
- Duplicating UI (shared components belong in `packages/ui`, not copied into apps)
- Supressing errors instead of fixing (no `@ts-ignore` or lint disables unless explicitly required)
