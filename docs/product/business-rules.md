# Business Rules

## Purpose

Collect cross-domain business rules that must be respected by later implementation phases.

## Scope

Rules cover markets, zones, localization, riders, drivers, vehicles, rides, dispatch, pricing, finance, support, safety, risk, and operations.

## Core Rules

| Domain              | Rule                                                                                                                                                                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Market              | Initial operation is Cairo and Giza, launched service-zone by service-zone.                                                                                                                                                 |
| Geography           | Architecture supports multiple cities, governorates, countries, timezones, currencies, languages, and service zones.                                                                                                        |
| Time                | Persist canonical timestamps in UTC; default operational display uses Africa/Cairo.                                                                                                                                         |
| Currency            | Initial currency is EGP; every money record includes currency.                                                                                                                                                              |
| Localization        | MVP supports Arabic and English, RTL/LTR, localized dates, times, currencies, numbers, and mixed Arabic/English addresses.                                                                                                  |
| Service zones       | Each zone supports active/paused state, pickup and destination permissions, categories, pricing profile, hours, supply thresholds, demand controls, restrictions, temporary suspension, effective dates, and audit history. |
| Vehicle eligibility | Minimum default model year is 2006 but configurable; model year alone never guarantees approval.                                                                                                                            |
| Verification        | Government registry checks require lawful integration or agreement and are not assumed available.                                                                                                                           |
| Ride states         | Clients request transitions; server-side domain logic validates and records sensitive states.                                                                                                                               |
| Dispatch            | A ride cannot be accepted by two drivers.                                                                                                                                                                                   |
| Trip start          | A ride cannot start before driver assignment and rider verification.                                                                                                                                                        |
| Completion          | Completed rides cannot return to active states.                                                                                                                                                                             |
| Disputes            | Disputes do not rewrite historical ride events.                                                                                                                                                                             |
| Pricing             | Pricing and commission are configurable, versioned, effective-dated, and audited.                                                                                                                                           |
| Money               | Store money as integer minor units; never use floating-point arithmetic.                                                                                                                                                    |
| Ledger              | Financial records are immutable; corrections use compensating entries.                                                                                                                                                      |
| Payments            | MVP concept is online-only payment; final fare is not calculated by the client.                                                                                                                                             |
| Payouts             | Payout operations are idempotent and must never duplicate payout.                                                                                                                                                           |
| Support             | Compensation is not automatic from complaint submission.                                                                                                                                                                    |
| Deductions          | Driver deduction requires legal basis, linked event, evidence, reason, approval, preview, audit, notification, appeal, and duplicate prevention.                                                                            |
| Risk                | Serious risk decisions require reason codes and human review paths where appropriate.                                                                                                                                       |
| Evidence            | Sensitive evidence access is role-limited and logged.                                                                                                                                                                       |

## Dispatch Rules

Candidate filtering must conceptually consider online status, active driver eligibility, approved vehicle, category, service zone, distance, predicted pickup ETA, current assignment, document validity, risk restrictions, GPS freshness, connectivity freshness, and category eligibility.

Candidate ranking may later consider pickup ETA, driver idle time, acceptance behavior, cancellation behavior, trust and safety score, service fairness, and zone balancing. Opaque AI must not be authoritative.

## Failure Rules

| Failure                        | Rule                                                                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Rider or driver loses internet | Server state remains authoritative; client reconciles on reconnect.                                                          |
| Stale GPS                      | Dispatch and safety domains treat stale location as degraded or ineligible according to configuration.                       |
| Map or route provider outage   | Ride request and fare estimate behavior degrades according to configured failure policy; no provider is selected in Phase 1. |
| Duplicate webhook              | Idempotency prevents duplicate money movement.                                                                               |
| Admin repeats compensation     | Idempotency and linked complaint/financial event prevent duplicates.                                                         |
| Driver document expires        | Dispatch eligibility is removed until renewal or approved exception.                                                         |

## Security Rules

See [Data Classification](../security/data-classification.md), [Authorization Model](../security/authorization-model.md), and [Financial Controls](../security/financial-controls.md).

## Audit Events

All rule exceptions require reason, actor, timestamp, target, evidence reference where applicable, before/after summary, and reversal or correction path.

## Notifications

Notify affected users for ride, payment, payout, support, verification, safety, and account status changes using [Notification Events](../architecture/notification-events.md).

## Open Decisions

Exact fares, commission, fees, limits, retention periods, legal structure, and provider capabilities remain TBD in [Open Decisions](open-decisions.md).

## Acceptance Criteria

- Cross-domain rules are explicit.
- No exact commission or fare value is approved here.
- Legal and provider capabilities are not represented as confirmed.
