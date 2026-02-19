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

| Workspace      | Purpose                                                | Dev Command                   |
| -------------- | ------------------------------------------------------ | ----------------------------- |
| `apps/dotrun`  | Web app for running agent CLIs on Cloudflare sandboxes | `pnpm dev:dotrun` (port 3000) |
| `apps/dotdev`  | Personal website (social links, resume)                | `pnpm dev:dotdev` (port 3001) |
| `apps/sandbox` | Worker that runs the sandbox execution logic           | `pnpm dev:sandbox`            |
| `packages/ui`  | Shared UI library (`@repo/ui`)                         | n/a                           |

## Research Workflow

When answering questions about libraries, frameworks, or external repos, follow this pattern: **retrieve first, reason second, supplement if needed.**

### 1. Check `.context/` first

A `.context/` folder (git-ignored) contains cloned source repos for core libraries in use. Local clones are faster, version-accurate, and work offline.

| Clone path        | Repo             | Covers                                     | Notes                                        |
| ----------------- | ---------------- | ------------------------------------------ | -------------------------------------------- |
| `.context/effect` | Effect-TS/effect | Effect, Schema, Platform, CLI, SQL, etc.   |                                              |
| `.context/router` | TanStack/router  | TanStack Start, Router, React Router, etc. | Start lives here — look in `.context/router` |

### 2. Retrieve → Synthesize → Supplement

**If the repo is in `.context/` (offline path):**

1. **`finder`** on `.context/` — locate relevant code, tests, and docs.
2. **`oracle`** with found files attached — synthesize understanding.
3. Supplement with any relevant tools if gaps remain (MCP servers, skills, `web_search`).

**If the repo is NOT in `.context/` (online path):**

1. **`librarian`** — retrieve code and structure from GitHub.
2. **`oracle`** with librarian results as context — synthesize understanding.
3. Supplement with any relevant tools if gaps remain (MCP servers, skills, `web_search`).

### Tool roles

| Tool                              | Role                            | Reads from                       |
| --------------------------------- | ------------------------------- | -------------------------------- |
| `finder`                          | Locate code (local)             | Local filesystem                 |
| `librarian`                       | Locate code (remote)            | GitHub API                       |
| `oracle`                          | Synthesize and reason           | Files you attach + its own tools |
| MCP servers, skills, `web_search` | Domain-specific supplementation | Varies                           |

## Common Mistakes

- Editing wrong app (confirm which workspace owns the feature)
- Skipping `pnpm check` (changes that fail lint/types/format are broken)
- Duplicating UI (shared components belong in `packages/ui`, not copied into apps)
- Suppressing errors instead of fixing — prefer the real fix, but use `@ts-ignore` or oxlint disables when the fix is disproportionately complex (e.g., fighting a third-party type). Always add a comment explaining why.
