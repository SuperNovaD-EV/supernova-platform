# SuperNova Platform

Private Phase 0 foundation for SuperNova, a premium safety-first mobility platform.

Brand source assets live in `packages/design-tokens/assets/brand/`; usage rules live in `docs/branding/logo-usage.md`.

Remote provisioning instructions live in `docs/operations/remote-provisioning.md`; local setup instructions live in `docs/operations/development-setup.md`.

## Commands

- `pnpm validate` runs the local quality gate.
- `pnpm dev:rider`, `pnpm dev:driver`, `pnpm dev:admin`, `pnpm dev:marketing` start shells.
- `pnpm supabase:start`, `pnpm supabase:reset`, `pnpm supabase:lint`, `pnpm supabase:test`, `pnpm supabase:types` manage local Supabase.

Phase 0 intentionally contains no auth, maps, trips, payments, dashboards, or business entities.
