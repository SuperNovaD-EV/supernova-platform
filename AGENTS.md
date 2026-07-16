# SuperNova Agent Guide

- Work one phase at a time. Do not start Phase 1 from this repository state.
- Keep Phase 0 to foundation: tooling, shells, brand primitives, docs, CI, and local Supabase only.
- Do not add auth, maps, trips, payments, dashboards, provider SDKs, or business tables.
- Update `docs/architecture/dependency-catalog.md` before adding or deferring packages.
- All DB changes need a migration, pgTAP coverage, regenerated types, and no hand edits in `packages/types/src/generated`.
- Never commit secrets, certificates, signing files, real env files, logs, or provider credentials.
- Use strict TypeScript. Do not use `any`, `@ts-ignore`, fake APIs, fake metrics, or hidden check bypasses.
- Keep apps consuming `@supernova/design-tokens`, `@supernova/brand`, and `@supernova/localization`.
- Run relevant gates before reporting completion; `pnpm validate` is the full local gate.
- Stop on unexplained dirty state, Docker/Supabase failure, generated type drift, package conflicts, or secret findings.
- Final reports stay concise and name exact failures plus the safest next action.

Docs map:

- Product principles: `docs/product/`
- Architecture and package policy: `docs/architecture/`
- Brand and tokens: `docs/branding/`
- Database rules: `docs/database/database-conventions.md`
- Security and env boundaries: `docs/security/`
- Provisioning: `docs/operations/`
- Decisions: `docs/decisions/`
