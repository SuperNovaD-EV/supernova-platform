# Remote Provisioning

Phase 0.5 connects the validated foundation to remote development services. Do not create production resources, store real secrets in Git, or begin product features during this phase.

## GitHub

Required repository: private `supernova-platform`.

Manual bootstrap when `gh` is installed and authenticated:

```sh
gh auth login
gh repo create "$SUPERNOVA_GITHUB_OWNER/supernova-platform" --private --source . --remote origin
git push -u origin main
gh repo view "$SUPERNOVA_GITHUB_OWNER/supernova-platform" --json defaultBranchRef,visibility
```

Enable squash merges, disable merge commits and rebase merges, delete head branches after merge, enable Dependabot alerts/security updates, and enable secret scanning/push protection where available. Configure branch protection after the first Actions run confirms the exact check names.

## Supabase Development

Remote creation is blocked until owner, region, and billing posture are explicitly approved. Do not link an unrelated project. After approval:

```sh
supabase link --project-ref "$SUPABASE_PROJECT_REF"
supabase migration list --linked
supabase db push
supabase gen types typescript --linked --schema public,app_private > packages/types/src/generated/database.remote.types.ts
```

Compare remote generated types with committed local types before replacing anything. Migrations remain the source of truth.

## Expo And EAS

Rider and Driver must be separate EAS projects. `eas.json` defines development, preview, and production profiles, but project linking is blocked until Expo authentication and final app identifiers are approved.

```sh
eas login
eas project:init --id <approved-rider-project-id>
eas project:init --id <approved-driver-project-id>
```

Do not create store submissions or commit signing credentials.

## Vercel

Admin and Marketing must be separate Vercel projects with app-specific roots:

- Admin root: `apps/admin-web`
- Marketing root: `apps/marketing-web`
- Install command: `corepack pnpm install --frozen-lockfile`
- Build command: `corepack pnpm --filter <app-name> build`

Only public Supabase and Sentry DSN values may be exposed to browser bundles.

## Sentry

Create separate projects for `rider-mobile`, `driver-mobile`, `admin-web`, and `marketing-web`. Store DSNs and auth tokens in provider-managed environments or untracked local env files. Do not send exact trip coordinates, identity documents, tokens, payment details, passwords, or unapproved PII.

## Google Cloud And Maps

Google Cloud provisioning is blocked until a development project owner and billing budget are approved. Required APIs are Maps SDK for Android, Maps SDK for iOS, Places API New, Routes API, and Geocoding API. Create separate restricted credentials for Rider Android, Rider iOS, Driver Android, Driver iOS, server-side requests, and web development only if required.

Phase 0.5 development credentials must not be consumed by applications until application restrictions are complete. Rider Android and Driver Android keys require their real SHA-1 fingerprints, and server-side credentials require real runtime IP restrictions. The maps implementation phase has a hard preflight gate for these restrictions before any map feature or provider SDK consumption begins.
