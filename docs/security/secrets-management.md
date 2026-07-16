# Secrets Management

Never commit real credentials. Server secrets must not be placed in `EXPO_PUBLIC_` or `NEXT_PUBLIC_` variables because those values are visible to mobile or browser clients.

## Storage Rules

- Local development: untracked `.env.local` files.
- GitHub Actions: GitHub Actions secrets and environment protection.
- Supabase: Supabase dashboard or CLI-managed project secrets.
- Expo/EAS: EAS environment variables and credentials store.
- Vercel: Vercel project environment variables.
- Sentry: Sentry project settings and provider-managed auth tokens.
- Google Cloud: restricted API keys, service accounts, and Secret Manager where approved.

## Redaction

Sentry must redact tokens, passwords, payment details, identity documents, exact trip coordinates, and any unapproved PII. Logs should prefer stable request IDs and coarse operational metadata.

## Response

If a secret is exposed, revoke it, rotate dependent values, audit provider activity, remove the exposure from any history that can still be controlled, and document the incident privately before restoring service.
