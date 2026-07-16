# Contributing

Use Node 24 and pnpm through Corepack. Install with `pnpm install --frozen-lockfile` after the lockfile exists.

Commits follow Conventional Commits. Run `pnpm validate` before opening a PR. DB changes require migrations, pgTAP tests, Supabase lint, and generated type drift checks.
