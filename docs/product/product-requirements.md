# Product Requirements

## Purpose

Define SuperNova's approved Phase 1 product behavior before database domain implementation, user interface development, provider integration, or production operations.

## Scope

SuperNova is a premium safety-first mobility marketplace connecting riders with independent verified drivers who use their own eligible licensed private vehicles. SuperNova is not documented here as the driver's employer; legal classification remains an external compliance gate.

The product consists of:

- Rider mobile application.
- Driver mobile application.
- Admin and operations web application.
- Marketing and support website.

Initial operation is planned for Cairo and Giza, launching zone by zone rather than assuming full metropolitan coverage. The architecture must support additional cities, governorates, countries, currencies, timezones, languages, and configurable service zones.

## Definitions

| Term               | Definition                                                                                                                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Service zone       | Configurable operating area that controls pickup permission, destination permission, pricing, vehicle categories, hours, supply thresholds, restrictions, suspensions, effective dates, and audit history. |
| Rider              | Person requesting and paying for a ride.                                                                                                                                                                   |
| Driver             | Independent driver using an approved eligible private vehicle.                                                                                                                                             |
| Vehicle category   | Configurable class of legally eligible private vehicle with category-specific rules.                                                                                                                       |
| Trip Black Box     | Structured event and telemetry record used for safety, support, and audit; it is not continuous audio or video recording.                                                                                  |
| Canonical timezone | UTC for persisted timestamps.                                                                                                                                                                              |
| Launch timezone    | Africa/Cairo for operational scheduling and display defaults.                                                                                                                                              |

## Actors

Rider-side actors include Rider, Trusted Contact, and post-MVP Family Account Member. Driver-side actors include Driver Applicant, Approved Driver, Suspended Driver, Rejected Driver, and Driver Under Review.

Platform roles are defined in [Authorization Model](../security/authorization-model.md) and include Platform Owner, Super Admin, Operations Manager, Safety Investigator, Driver Verification Agent, Customer Resolution Agent, Finance Agent, Risk and Fraud Analyst, Analytics Viewer, and Content and Translation Manager.

## Preconditions

- Phase 0, Brand Gate, and Phase 0.5 are complete.
- Product behavior is documented before implementation.
- Legal, insurance, transport licensing, contractor classification, tax, data protection, payment, recording, and government verification requirements require professional review before launch.
- No payment provider, payout provider, emergency-service integration, insurance integration, or government registry integration is approved in Phase 1.

## Product Principles

- Safety-first operation for riders and drivers.
- Transparent configurable pricing with online-only MVP payments.
- Independent driver verification and vehicle approval before dispatch.
- Arabic-first Egyptian launch with English support and full RTL/LTR architecture.
- Server-authoritative state transitions, financial calculations, and sensitive workflow decisions.
- Auditable operations for verification, rides, payments, complaints, compensation, deductions, and account restrictions.
- Configurable operations instead of hardcoded city, currency, category, commission, fare, or service-zone assumptions.

## Rider Account States

| State                     | Meaning                                                                            | Notes                                                               |
| ------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `active`                  | Rider can request rides subject to payment and service availability.               | Default usable state.                                               |
| `restricted`              | Rider has limited capabilities due to payment, support, safety, or abuse controls. | Requires reason code and notification where appropriate.            |
| `under_review`            | Account is being reviewed by support, safety, or risk.                             | May limit ride requests.                                            |
| `suspended`               | Rider cannot request rides.                                                        | Requires reason code, audit, and appeal handling where appropriate. |
| `deletion_requested`      | Rider requested deletion or anonymization.                                         | Must respect legal holds, financial records, and safety evidence.   |
| `deleted` or `anonymized` | Account data removed or anonymized according to retention policy.                  | Exact retention rules remain TBD.                                   |

## Vehicle Eligibility Summary

Supported categories are configurable and may include Motorcycle, Scooter, Compact Car, Economy Car, Comfort Car, Premium Car, SUV, Van, Pickup where legally and operationally permitted, Accessible Vehicle, Pet-friendly Vehicle, and Other locally approved private vehicle category. See [ADR-002](../decisions/ADR-002-vehicle-eligibility.md) and [Vehicle State Machine](../architecture/vehicle-state-machine.md).

## Main Flow

1. Rider registers by phone, verifies OTP, provides name, accepts required consents, grants permissions where desired, adds a payment method, and may add a trusted contact.
2. Driver applies, verifies phone, submits personal details, identity documents, license, vehicle documentation, payout destination, agreements, and vehicle evidence for manual review.
3. Operations configures active launch zones, vehicle categories, pricing profiles, commission profiles, support reason codes, and operating policies.
4. Rider requests a ride, receives a fare estimate, selects a vehicle category and payment method, and confirms.
5. Dispatch searches eligible drivers, offers the ride, and atomically assigns one accepting driver.
6. Driver navigates to pickup, marks arrival, and rider verifies driver and vehicle.
7. Trip starts only after QR or PIN verification and server confirmation.
8. Trip progresses through server-validated ride states and Trip Black Box event capture.
9. Payment is captured or resolved according to the payment state machine.
10. Driver ledger records gross credit, commission, fees, and payout eligibility.
11. Rider and driver may rate, report, or open support cases.
12. Admin workflows handle verification, safety, support, finance, payout, and audit tasks.

## Alternative Flow

- If QR scanning fails, a one-time PIN remains available as fallback.
- If no driver is available, the ride expires as `expired_no_driver`.
- If documents expire, driver availability is restricted until renewal or reverification.
- If payment authorization fails, the request cannot continue into active dispatch unless a configured retry succeeds.
- If support evidence indicates financial or safety risk, the complaint moves to manual review.

## Failure Flow

Failure behavior is detailed in the domain documents:

- Rides: [Ride State Machine](../architecture/ride-state-machine.md).
- Payments: [Payment State Machine](../architecture/payment-state-machine.md).
- Payouts: [Payout State Machine](../architecture/payout-state-machine.md).
- Support: [Complaint State Machine](../architecture/complaint-state-machine.md).
- Safety telemetry: [Trip Black Box Events](../architecture/black-box-events.md).

## Business Rules

- Clients may request sensitive transitions but cannot directly set sensitive states.
- Final fares, commissions, ledger entries, payouts, compensation, and deductions are server-authoritative.
- Money is stored as integer minor units with currency on every record.
- Commission and pricing values are configurable and versioned; no production value is approved in Phase 1.
- A completed ride cannot return to an active state.
- Disputes do not rewrite historical ride events.
- Compensation is not automatic merely because a complaint was submitted.
- Driver deductions require legal basis, evidence, reason code, approval, audit record, notification, and appeal handling.
- Public trust labels must be understandable; serious restrictions require reason codes and human-review paths where appropriate.

## Security Rules

- Authentication secrets, OTP codes, tokens, payment credentials, identity images, license images, vehicle license images, payout credentials, precise active-trip coordinates, and sensitive evidence must not be logged to general analytics or Sentry.
- Detailed Trip Black Box telemetry is limited to authorized operational and safety roles.
- Sensitive admin actions require documented permissions, reasons, confirmations, audit events, and second approval where appropriate.
- Data classification rules are defined in [Data Classification](../security/data-classification.md).

## Audit Events

Audit is required for:

- Driver and vehicle verification decisions.
- Zone, category, pricing, commission, and translation changes.
- Ride state corrections and cancellation reason changes.
- Payment, refund, chargeback, payout, ledger, compensation, and deduction actions.
- Complaint classification, evidence access, reviewer assignment, decision, appeal, and closure.
- Account restrictions, suspensions, reactivations, and permanent blocks.
- Sensitive evidence access.

## Notifications

Notification events are cataloged in [Notification Events](../architecture/notification-events.md). Sensitive evidence must never be sent through push notification bodies.

## Data Considerations

- Initial currency is EGP.
- Canonical storage timezone is UTC.
- Initial display and operational timezone is Africa/Cairo.
- MVP interface languages are Arabic and English with RTL/LTR support.
- Mixed Arabic and English addresses must be supported.
- Interface text must use translation keys rather than hardcoded strings.

## Non-Functional Targets

These are provisional Phase 1 targets and are not final SLA commitments.

| Area              | Initial target or rule                                                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Security          | No secrets in source; sensitive data classified; role-limited access; audit sensitive actions.                                                        |
| Availability      | Product architecture should tolerate transient provider failures through retries, reconciliation, and graceful degradation.                           |
| Performance       | Ride and dispatch flows should be designed for low-latency server-authoritative decisions; exact SLOs TBD.                                            |
| Accessibility     | Mobile and web experiences should support Arabic/English, RTL/LTR, readable contrast, scalable text, and keyboard/screen-reader-friendly admin flows. |
| Scalability       | Domains must support multiple zones, cities, countries, currencies, and languages without schema redesign.                                            |
| Observability     | Operational events, state transitions, provider events, and errors must be observable without logging sensitive data.                                 |
| Offline tolerance | Clients may buffer permitted telemetry; sensitive transitions such as trip start require server confirmation.                                         |
| Idempotency       | Ride requests, payments, ledgers, payouts, notifications, and support financial actions require idempotency keys.                                     |
| Auditability      | Verification, ride, support, safety, financial, pricing, zone, and role changes require audit records.                                                |
| Localization      | Translation-key architecture with localized dates, times, currency, numbers, and mixed-address support.                                               |
| Data retention    | Retention classes are defined; exact periods remain TBD pending legal review.                                                                         |
| Recovery          | Provider and database transient failures should use retry/reconciliation instead of duplicate side effects.                                           |
| Backup            | Production backup policy is TBD before production operations.                                                                                         |
| Fraud resistance  | Risk signals support human review, reason codes, appeals, and protected-characteristic exclusions.                                                    |
| Cost controls     | Development budget controls exist; production thresholds remain TBD before production operations.                                                     |

## Failure Scenario Matrix

| Scenario                                    | Expected behavior                                                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Rider loses internet                        | Server state remains authoritative; app reconciles on reconnect; permitted Black Box events may upload later. |
| Driver loses internet                       | Dispatch and ride state use freshness rules; active trip remains server-authoritative.                        |
| Rider app closes                            | Current ride resumes from server state.                                                                       |
| Driver app closes                           | Driver availability or active ride reconciles on return; stale connectivity may affect eligibility.           |
| Stale GPS                                   | Dispatch and safety confidence degrade; eligibility may be restricted.                                        |
| Spoofed GPS indicator                       | Risk review flag; do not expose a public formula.                                                             |
| Map provider outage                         | No provider is selected in Phase 1; future implementation must degrade without fabricating route certainty.   |
| Route provider timeout                      | Fare estimate or completion moves to fallback/review path.                                                    |
| No driver available                         | Ride ends as `expired_no_driver`.                                                                             |
| Two drivers accept simultaneously           | Atomic acceptance assigns one driver only.                                                                    |
| Driver changes device                       | Device session security and eligibility checks apply.                                                         |
| Rider changes device                        | Account session security and current ride reconciliation apply.                                               |
| Authorization succeeds but webhook delayed  | Payment remains reconcilable and idempotent.                                                                  |
| Duplicate payment webhook                   | Duplicate is ignored by idempotency.                                                                          |
| Payment captured but ride fails             | Refund or manual review path with compensating entries.                                                       |
| Ride completes but capture fails            | Ride/payment workflow enters failure or support path before earnings availability.                            |
| Payout provider timeout                     | Payout remains queued, processing, failed, or under review according to state.                                |
| Duplicate payout request                    | Idempotency rejects duplicate request.                                                                        |
| Payout sent then reversed                   | Reversal ledger entry and notification.                                                                       |
| Driver document expires during availability | Dispatch eligibility removed until renewal/review.                                                            |
| Destination changes during trip             | Server-approved recalculation and audit path.                                                                 |
| Ride ends outside destination               | Manual review or configured policy before finalization.                                                       |
| Black Box batch upload fails                | Retry with ordering and duplicate prevention.                                                                 |
| Database transient failure                  | Retry idempotently or fail safely without duplicate money movement.                                           |
| Notification provider failure               | Retry until expiry; domain state remains source of truth.                                                     |
| Admin repeats compensation action           | Duplicate prevention blocks repeated financial action.                                                        |
| Disputed charge                             | Chargeback state and evidence workflow.                                                                       |
| Safety event during network loss            | Local permitted buffering and later upload; emergency-service integration remains TBD.                        |

## Open Decisions

Open decisions are tracked in [Open Decisions](open-decisions.md), including legal structure, payment provider, payout provider, commission values, fare values, insurance, emergency-service integration, and data retention periods.

## Out of Scope

Phase 1 does not implement product features, domain migrations, auth, maps, payments, screens, provider SDKs, production data, or external integrations.

## Acceptance Criteria

- Product behavior is documented across the Phase 1 docs.
- MVP and deferred scope are explicit in [MVP Scope](mvp-scope.md).
- Canonical state machines exist under `docs/architecture`.
- Open decisions have IDs, owners, impacts, safe defaults, statuses, and required-by phases.
- No approved requirement relies on unreviewed legal or provider capability.
