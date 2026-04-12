# AGENTS.md

> For coding agents.

## Validation Commands

Run from repo root. Always run `vp check` before finishing.

```bash
vp check              # Lint + types + format (primary validation)
vp check --fix        # Auto-fix lint + format issues
```

## Common Mistakes

- Editing wrong app (confirm which workspace owns the feature)
- Skipping `vp check` (changes that fail lint/types/format are broken)
- Duplicating UI (shared components belong in `packages/ui`, not copied into apps)
- Suppressing errors instead of fixing — prefer the real fix, but use `@ts-ignore` or oxlint disables when the fix is disproportionately complex (e.g., fighting a third-party type). Always add a comment explaining why.
- Adding `baseUrl` to tsconfig: tsgolint silently disables type-aware lint + type-check when `baseUrl` is set. `paths` works without it under `moduleResolution: "bundler"`.
