# Supabase Provisioning

Use local Supabase for Phase 0. For `supernova-dev`, choose the explicit owner, region, and billing posture before linking.

Remote DB push is forbidden unless the project is intentionally linked, `ALLOW_REMOTE_DB_PUSH=true`, and local format, lint, typecheck, tests, builds, Supabase reset, lint, pgTAP, and type drift checks are green. Create `supernova-prod` only after production controls are approved.
