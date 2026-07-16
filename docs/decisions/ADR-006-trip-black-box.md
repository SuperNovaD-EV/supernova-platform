# ADR-006: Trip Black Box

## Status

Accepted

## Context

Safety and support workflows need structured evidence for ride events, location confidence, route behavior, connectivity, and support events without introducing privacy-heavy recording.

## Decision

Define the Trip Black Box as structured event and telemetry capture, not continuous video or audio recording. It may include ride state events, GPS point, accuracy, speed, heading, route progress, deviations, sudden braking/acceleration indicators, unusual stops, connectivity loss/restoration, GPS loss/restoration, app foreground/background, destination changes, stop additions, SOS, cancellations, payment state events, support events, device session identifier, and ordered sequence.

## Consequences

- Safety investigations have structured telemetry.
- Normal users see simplified timeline and safety status.
- Detailed telemetry access is limited to authorized safety and operational roles with audit logging.

## Open Decisions

Exact retention, tamper indicators, sampling policy, and legal review for telemetry remain TBD.
