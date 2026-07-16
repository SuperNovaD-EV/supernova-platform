# Database Conventions

Use migrations for all schema changes and pgTAP tests for database behavior. Generated TypeScript types live in `packages/types/src/generated` and are never hand-edited after generation.

Money values must use integer minor units only. Never store or calculate money with floating point. Commission is configurable server-side and never client-hardcoded.
