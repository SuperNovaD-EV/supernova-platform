# ADR-005: Ride Start Verification

## Status

Accepted

## Context

SuperNova must reduce vehicle/rider mismatch risk and prevent trips from starting before the assigned rider and driver are ready.

## Decision

Support both QR verification and one-time PIN verification. QR may be the preferred fast method, while PIN is always available as fallback.

Verification credentials are generated server-side, ride-scoped, assigned-rider-and-driver-scoped, single-use, short-lived, rotated after reassignment, unavailable before driver arrival, rate-limited, logged on invalid attempts, and require server confirmation before trip start.

## Consequences

- Camera failure, damaged screen, low brightness, denied camera permission, weak network, and QR scanning issues can fall back to PIN.
- Offline trip start is restricted.
- Invalid attempts support abuse detection.

## Open Decisions

Exact token lifetime, retry limits, and UX timing are deferred to implementation design.
