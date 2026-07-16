# ADR-003: Configurable Pricing and Commission

## Status

Accepted

## Context

SuperNova needs transparent pricing and driver earnings while avoiding hardcoded fare or commission values before operations and compliance approval.

## Decision

Pricing and commission are configurable, versioned, effective-dated, auditable, and server-authoritative. Fare estimates record timestamp, route source, distance, duration, pricing version, validity window, assumptions, and allowed change conditions.

Commission supports percentage, fixed, percentage plus fixed, category-specific, zone-specific, driver-program, promotional reduction, minimum, and maximum structures. No exact production commission or fare value is approved in Phase 1.

## Consequences

- Fare values and commission can be approved later without code rewrites.
- Active trip settlement uses the selected pricing/commission versions.
- Drivers see net earnings after commission before payout.

## Open Decisions

Exact fare values, commission values, taxes, toll handling, demand controls, fees, and compensation limits remain TBD.
