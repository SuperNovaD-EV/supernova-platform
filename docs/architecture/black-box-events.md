# Trip Black Box Events

## Purpose

Define the Trip Black Box as a structured event and telemetry system for ride safety, support, and audit.

## Scope

The Trip Black Box may include ride state events, timestamp, GPS point, GPS accuracy, speed, heading, route progress, route deviation, sudden braking indicator, sudden acceleration indicator, unusual stop, internet loss/restoration, GPS loss/restoration, app foreground/background state, destination change, stop addition, SOS event, cancellation event, payment state event, support event, device session identifier, and ordered event sequence.

It does not include continuous audio or video recording in the MVP.

## Event Schema Principles

| Principle      | Requirement                                                               |
| -------------- | ------------------------------------------------------------------------- |
| Ordering       | Each ride event stream uses monotonic sequence numbers per producer.      |
| Timestamps     | Include device observed time and server received time where applicable.   |
| Accuracy       | Location events include accuracy and freshness metadata.                  |
| Minimization   | Capture only data needed for safety, support, audit, and operations.      |
| Integrity      | Include batch identifiers, hashes or tamper indicators where appropriate. |
| Idempotency    | Event IDs prevent duplicate ingestion.                                    |
| Classification | Each event type maps to data classification.                              |

## Event Families

| Family                     | Examples                                                                 | Classification            |
| -------------------------- | ------------------------------------------------------------------------ | ------------------------- |
| Ride state                 | requested, assigned, arrived, started, completed, cancelled.             | Confidential              |
| Location telemetry         | GPS point, accuracy, speed, heading, route progress.                     | Precise Location          |
| Safety indicators          | route deviation, unusual stop, sudden braking, sudden acceleration, SOS. | Safety Evidence           |
| Connectivity               | internet loss/restoration, GPS loss/restoration.                         | Confidential              |
| App state                  | foreground/background, session identifier.                               | Confidential              |
| Route changes              | destination change, stop addition, route timeout.                        | Precise Location          |
| Payment/support references | payment state event, support event.                                      | Financial or Confidential |

## Batching and Offline Behavior

- Events may be batched to reduce network overhead.
- Offline buffering is allowed only for permitted event types.
- Upload retry must preserve ordering metadata.
- Duplicate prevention uses event IDs and batch IDs.
- Failed batch upload creates retry state and operational visibility.
- Offline behavior must not allow offline trip start; server confirmation remains required.

## Access Control

Normal users see simplified safety status and timeline. Detailed telemetry is limited to explicitly authorized operational and safety roles. Access is logged and subject to retention rules.

## Investigation Usage

Trip Black Box data may support route concerns, no-show review, unsafe driving reports, harassment reports, accidents, vehicle mismatch, payment disputes, and support evidence. It does not automatically prove misconduct without review.

## Privacy Boundaries

Do not send exact active-trip coordinates to general analytics. Do not send sensitive evidence to Sentry. Exports require authorization, classification, purpose, and audit.

## Audit Events

Event ingestion, batch retry, integrity warning, evidence attachment, investigator access, export, retention lock, deletion restriction, and support case linkage.

## Acceptance Criteria

- Trip Black Box is structured telemetry, not video or audio.
- Ordering, retry, integrity, access control, retention, and privacy boundaries are documented.
