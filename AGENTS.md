# AGENTS.md

> For coding agents.

## Validation Commands

Run from repo root. Always run `pnpm check` before finishing.

```bash
pnpm check            # Lint + types + format (primary validation)
pnpm format:fix:repo  # Auto-fix formatting
pnpm lint:fix:repo    # Auto-fix lint issues
```

## Repo Layout

Personal monorepo housing multiple projects that share config, UI, and tooling.

| Workspace     | Purpose                                 | Dev Command                   |
| ------------- | --------------------------------------- | ----------------------------- |
| `apps/dotdev` | Personal website (social links, resume) | `pnpm dev:dotdev` (port 3001) |
| `packages/ui` | Shared UI library (`@repo/ui`)          | n/a                           |

## Common Mistakes

- Editing wrong app (confirm which workspace owns the feature)
- Skipping `pnpm check` (changes that fail lint/types/format are broken)
- Duplicating UI (shared components belong in `packages/ui`, not copied into apps)
- Suppressing errors instead of fixing — prefer the real fix, but use `@ts-ignore` or oxlint disables when the fix is disproportionately complex (e.g., fighting a third-party type). Always add a comment explaining why.
