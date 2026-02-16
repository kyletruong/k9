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

## Local Reference Repos (`.context/`)

A `.context/` folder (git-ignored) at the repo root contains cloned source repos for core libraries in use. **Prefer `.context/` over remote tools** when the prompt relates to any repo cloned there — it's faster, more complete, and version-accurate.

Use `Read`, `Grep`, `glob`, and `finder` on local clones to:

- Look up API usage patterns and type signatures
- Find implementation examples and tests
- Understand framework internals
- Check documentation in the repo's `docs/` folder

### Currently Cloned

| Clone path        | Repo                                             | Covers                                     | Notes                                        |
| ----------------- | ------------------------------------------------ | ------------------------------------------ | -------------------------------------------- |
| `.context/effect` | [Effect-TS](https://github.com/Effect-TS/effect) | Effect, Schema, Platform, CLI, SQL, etc.   |                                              |
| `.context/router` | [TanStack](https://github.com/TanStack/router)   | TanStack Start, Router, React Router, etc. | Start lives here — look in `.context/router` |

### Remote Research (supplementary)

When a repo is **not** in `.context/`, or you need changelogs / recent releases, use these tools:

- **`librarian`** — explore any public (or approved private) GitHub repo
- **`web_search` + `read_web_page`** — docs sites, changelogs, recent releases
- **TanStack MCP tools** (`tanstack_doc`, `tanstack_search_docs`, `tanstack_ecosystem`, etc.) — TanStack-specific docs and ecosystem info

These are complementary, not replacements. Always check `.context/` first for repos listed above.

## Common Mistakes

- Editing wrong app (confirm which workspace owns the feature)
- Skipping `pnpm check` (changes that fail lint/types/format are broken)
- Duplicating UI (shared components belong in `packages/ui`, not copied into apps)
- Supressing errors instead of fixing (no `@ts-ignore` or lint disables unless explicitly required)
