# Environment Strategy

Public client values use `EXPO_PUBLIC_` or `NEXT_PUBLIC_`. Server-only values remain outside client bundles.

Optional Sentry DSNs may be empty and must safely disable monitoring. Remote database push requires an explicitly linked project, `ALLOW_REMOTE_DB_PUSH=true`, and green local gates.

## Environment Tiers

- Development: local machines, Supabase development project, EAS development builds, Vercel preview, Sentry development, and Google Maps development credentials.
- Preview: branch and pull-request validation with provider-managed variables only.
- Production: reserved for a later phase after account ownership, billing, signing, privacy, and release controls are approved.

## Variable Ownership

- Supabase owns publishable keys, project refs, database passwords, and service-role secrets.
- Expo/EAS owns mobile update channels, project IDs, and build-time public variables.
- Vercel owns web preview and production environment variables.
- Sentry owns DSNs and auth tokens.
- Google Cloud owns Maps API keys and server credentials.
- GitHub owns repository settings, Actions secrets, and branch protection.

## Client Versus Server

Only `EXPO_PUBLIC_` and `NEXT_PUBLIC_` values may be visible to mobile or browser clients. Database passwords, Supabase service-role keys, Sentry auth tokens, signing credentials, payment secrets, and server-side Google credentials must stay in provider-managed secret stores or untracked local files.

## Rotation

Rotate a value in its owning provider first, update dependent provider environments, then restart affected local or preview services. If a secret is exposed, revoke it immediately, rotate dependents, audit provider logs, and record the incident in the private security tracker.

## Local Setup

Copy `.env.example` or an app-specific `.env.example` to an ignored `.env.local` only when a command needs it. Keep real environment files out of Git.
