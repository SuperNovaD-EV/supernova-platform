# Safety Model

## Purpose

Define SuperNova's safety principles and MVP safety capabilities for riders and drivers.

## Scope

Safety covers verification, trip start verification, trusted contacts, trip sharing, route and stop indicators, reporting, emergency escalation, evidence collection, risk flags, and protection for both riders and drivers.

## Definitions

| Term           | Definition                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| Safety event   | Event that may indicate elevated risk during onboarding, dispatch, trip, support, or account use.                |
| SOS            | Emergency interaction that can escalate a safety concern according to configured policy.                         |
| Trip Black Box | Structured event and telemetry record described in [Trip Black Box Events](../architecture/black-box-events.md). |

## Safety Features

- Verified driver identity.
- Vehicle verification.
- Rider trip PIN or QR start verification.
- Live trip sharing.
- Trusted contacts.
- Route deviation detection.
- Unexpected stop detection.
- Vehicle mismatch reporting.
- Unsafe driving reporting.
- Harassment reporting.
- Emergency escalation.
- Account risk flags.
- Trip termination procedures.
- Safety event evidence collection.
- Protection for both rider and driver.

SuperNova must not claim that the product is "100% safe."

## SOS Behavior

SOS should use accidental-trigger protection such as press-and-hold or explicit confirmation unless immediate emergency behavior requires otherwise. Production emergency-service integration is TBD and requires external operational and legal approval.

## Main Flow

1. Rider and driver pass verification and eligibility checks.
2. Rider receives assigned driver and vehicle details.
3. Driver arrival and QR/PIN verification prevent unauthorized trip start.
4. Trip Black Box captures structured safety telemetry.
5. Rider can share live trip status with trusted contacts.
6. Rider or driver can report safety concerns.
7. Safety Investigator reviews evidence where authorized.
8. Account restrictions, compensation, or support outcomes follow reason-code and appeal rules where appropriate.

## Alternative Flow

- QR camera fails and PIN fallback is used.
- Weak network limits live upload; buffered events upload when connection returns.
- Driver or rider reports mismatch or unsafe behavior before trip start.
- Safety event during network loss is captured locally where allowed and uploaded later with ordering metadata.

## Failure Flow

| Scenario                               | Expected behavior                                                                |
| -------------------------------------- | -------------------------------------------------------------------------------- |
| Damaged rider screen or low brightness | PIN fallback remains available.                                                  |
| No camera permission                   | PIN fallback remains available.                                                  |
| GPS loss                               | State and safety views show degraded confidence; event logged.                   |
| Route provider timeout                 | Safety logic uses available server state and does not fabricate route certainty. |
| Safety termination                     | Ride moves to `safety_terminated` with audit and support escalation.             |

## Business Rules

- Verification codes are server-generated, ride-scoped, single-use, short-lived, unavailable before driver arrival, rotated after driver reassignment, rate-limited, and confirmed by server before trip start.
- Invalid attempts are logged for abuse detection.
- Offline trip start is restricted; server confirmation is required.
- Serious restrictions require reason codes and human review paths where appropriate.

## Security Rules

Detailed telemetry and evidence access is limited to authorized operational and safety roles. Sensitive evidence must not be exposed in push notifications, Sentry, general analytics, or broad exports.

## Audit Events

Driver verification decisions, vehicle verification decisions, QR/PIN generation and attempts, safety center open, SOS trigger/cancel/escalation, route deviation flag, unexpected stop flag, vehicle mismatch report, unsafe driving report, harassment report, safety termination, evidence access, account restriction, and appeal.

## Notifications

Safety notifications include trip sharing updates, trusted contact alerts, safety case status, account restriction, appeal status, and operational alerts. Push bodies must be privacy-minimized.

## Open Decisions

Emergency-service integration, insurance model, safety staffing, retention periods, and legal review for recording/telemetry remain open.

## Out of Scope

Continuous audio recording, continuous video recording, dashcam integration, and production emergency-service integration.

## Acceptance Criteria

- Safety features protect both rider and driver.
- QR/PIN security rules are explicit.
- Trip Black Box is defined as structured telemetry, not video or audio.
