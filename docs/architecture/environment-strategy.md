# Environment Strategy

Public client values use `EXPO_PUBLIC_` or `NEXT_PUBLIC_`. Server-only values remain outside client bundles.

Optional Sentry DSNs may be empty and must safely disable monitoring. Remote database push requires an explicitly linked project, `ALLOW_REMOTE_DB_PUSH=true`, and green local gates.
