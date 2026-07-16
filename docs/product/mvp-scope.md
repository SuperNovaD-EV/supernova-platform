# MVP Scope

## Purpose

Separate the Phase 1 MVP concept from deferred capabilities so implementation phases can build only approved product behavior.

## Scope

This document defines what belongs in the SuperNova MVP concept and what is explicitly deferred. It does not authorize implementation during Phase 1.

## Definitions

| Term               | Definition                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------------- |
| MVP                | First production-intended product scope after compliance and provider decisions are approved. |
| Deferred           | Accepted as outside MVP scope or blocked on future external approval.                         |
| Architecture-ready | Documented so later implementation can avoid schema or boundary redesign.                     |

## MVP Inclusions

| Area              | Included MVP capability                                                                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accounts          | Rider registration, phone OTP, optional email, consent, account status, trusted contact option, device session security.                                                    |
| Driver onboarding | Driver application, phone verification, personal details, national ID, driver license, vehicle documents, payout destination, agreements, manual review, expiry monitoring. |
| Vehicle approval  | Configurable category rules, minimum default model year of 2006 as configurable default, photos, inspection evidence, approval states.                                      |
| Localization      | Arabic and English, RTL/LTR, localized dates, times, currencies, numbers, and mixed Arabic/English addresses.                                                               |
| Market launch     | Cairo and Giza service zones launched zone by zone with configurable active/paused controls.                                                                                |
| Ride request      | Current ride request, pickup, destination, route preview, category selection, fare estimate, payment method, confirmation.                                                  |
| Dispatch          | Driver eligibility filtering, offer expiration, atomic acceptance, reassignment, no-driver outcome, stale-location handling.                                                |
| Ride operations   | Live ride states, driver arrival, PIN and QR start verification architecture, destination changes, ride completion.                                                         |
| Safety            | Safety center, trusted contacts, trip sharing, route deviation indicators, unexpected stop indicators, SOS concept, safety reporting.                                       |
| Trip Black Box    | Structured ride events, telemetry, batching, ordering, integrity, access control, retention principles, investigation usage.                                                |
| Payments          | Online-only payment architecture, provider capability checklist, authorization/capture/refund/chargeback state model.                                                       |
| Driver finance    | Configurable commission, driver ledger, daily payout architecture, on-demand withdrawal architecture, payout states.                                                        |
| Support           | Guided complaint intake, evidence attachment, preliminary classification, manual review, appeal model, compensation controls.                                               |
| Admin operations  | Driver review, vehicle review, document renewal, live operations, investigations, finance, payout, compensation, deduction, pricing, zones, translations, audit review.     |
| Analytics         | Basic operational analytics using minimized, classified data.                                                                                                               |
| Marketing         | Marketing and support website.                                                                                                                                              |

## Explicit Deferrals

| Deferred item                                      | Reason                                                                                          |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Scheduled rides                                    | Adds scheduling, availability, pricing, and cancellation complexity.                            |
| Family accounts                                    | Post-MVP account model and permissions.                                                         |
| Rider bidding                                      | Conflicts with transparent MVP pricing model.                                                   |
| Delivery marketplace and package logistics         | Separate product, compliance, and dispatch model.                                               |
| Continuous audio recording                         | Not included in MVP and requires separate privacy/legal review.                                 |
| Continuous video recording and dashcam integration | Not included in MVP and requires separate privacy/legal/provider review.                        |
| AI-only complaint judgments                        | Serious disciplinary and financial decisions require configured rule authority or human review. |
| Autonomous pricing                                 | Pricing must be configured, versioned, and auditable.                                           |
| Loyalty program and subscriptions                  | Not required for first mobility marketplace launch.                                             |
| Advanced driver gamification                       | Deferred to avoid distorting safety and fairness incentives.                                    |
| Cross-country operation                            | Architecture-ready only; operational launch is Cairo and Giza.                                  |
| Multi-currency production operation                | Architecture-ready only; initial currency is EGP.                                               |
| Fully automated government verification            | Depends on lawful integration or agreement.                                                     |
| Insurance integrations                             | External compliance and provider decision.                                                      |
| Production payment provider implementation         | No provider approved in Phase 1.                                                                |
| Production emergency-service integration           | External operational and legal decision.                                                        |

## Preconditions

- Compliance gates documented in [Open Decisions](open-decisions.md) are resolved before production operation.
- Provider selections are approved before integration.
- Domain migrations are created only in later implementation phases.

## Business Rules

- MVP scope must not hardcode fare values, commission values, country assumptions, service-zone lists, payout fees, or provider-specific capabilities.
- Deferred items must not be partially implemented under MVP names.
- Architecture may prepare for future configuration without implementing future product features.

## Security Rules

MVP features must follow [Data Classification](../security/data-classification.md), [Authorization Model](../security/authorization-model.md), and [Financial Controls](../security/financial-controls.md).

## Audit Events

MVP audit requirements include all sensitive admin actions, financial actions, support decisions, verification decisions, and evidence access.

## Notifications

MVP notification coverage is defined in [Notification Events](../architecture/notification-events.md).

## Data Considerations

MVP stores timestamps in UTC, displays Africa/Cairo by default, uses EGP, and supports Arabic and English. Multi-country, multi-currency, and additional languages are configuration-ready but not production-operational in MVP.

## Open Decisions

See [Open Decisions](open-decisions.md). MVP can continue through documentation while non-critical external decisions remain TBD, but production launch cannot.

## Acceptance Criteria

- MVP inclusions are explicit.
- Deferred scope is explicit.
- No deferred capability is presented as approved production behavior.
