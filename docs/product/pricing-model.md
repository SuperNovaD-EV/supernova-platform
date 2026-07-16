# Pricing Model

## Purpose

Define configurable pricing, fare estimate, final fare, and commission behavior without approving production values.

## Scope

Pricing covers rider fare estimates, final fare calculation principles, commission models, manual adjustments, and dispute handling. It does not select payment providers or implement calculations.

## Definitions

| Term               | Definition                                                                      |
| ------------------ | ------------------------------------------------------------------------------- |
| Pricing profile    | Versioned set of fare rules with effective dates and applicability.             |
| Fare estimate      | Time-limited pre-trip projection based on route, category, and pricing profile. |
| Final fare         | Server-calculated amount after trip completion and approved adjustments.        |
| Commission profile | Versioned platform commission configuration.                                    |

## Configurable Fare Components

Pricing must support base fare, distance rate, time rate, minimum fare, waiting rate, cancellation fee, booking fee, platform fee where applicable, zone surcharge, airport or special-zone surcharge, demand multiplier, promotions, taxes where applicable, toll handling, vehicle-category pricing, effective dates, pricing version, rounding rules, fare floors and ceilings, and manual adjustments with audit trail.

## Fare Estimate Requirements

Every fare estimate records:

- Estimate timestamp.
- Route source.
- Estimated distance.
- Estimated duration.
- Pricing version.
- Validity window.
- Assumptions.
- Allowed change conditions.

## Final Fare Rules

- Final fare is server-calculated.
- Client-calculated fare is not trusted.
- Pricing configuration changes during an active trip do not rewrite the trip's selected pricing version unless an audited corrective workflow applies.
- Route deviation, waiting time, tolls, early termination, destination changes, added stops, GPS gaps, and payment failure must have documented calculation or review paths before implementation.

## Commission Model

Commission is configurable and may support:

- Percentage commission.
- Fixed commission.
- Percentage plus fixed.
- Category-specific commission.
- Zone-specific commission.
- Driver-program commission.
- Effective date ranges.
- Promotional reduction.
- Minimum and maximum commission.
- Administrative approval.
- Audit history.

The initial business expectation is a small commission, but no exact production percentage is approved in Phase 1. Commission is calculated and recorded when ride financial settlement is created. Driver earnings views must show net earnings after commission before payout.

## Alternative Flow

Manual adjustments require authorized operator, reason code, calculation basis, effect preview, audit trail, and compensating ledger entry where financial records already exist.

## Failure Flow

| Scenario               | Expected behavior                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------- |
| Changed destination    | Re-estimate or final fare adjustment follows server policy and audit rules.           |
| Added stop             | Requires configured allowance and recalculation path.                                 |
| GPS gaps               | Use configured fallback or manual review; do not silently fabricate precise distance. |
| Incorrect fare dispute | Complaint workflow links estimate, route, final fare, payment, and Black Box events.  |
| Pricing profile error  | Correct through audited adjustment, not historical overwrite.                         |

## Security Rules

Only authorized roles may create, approve, activate, or retire pricing and commission profiles. Financial data follows [Financial Controls](../security/financial-controls.md).

## Audit Events

Pricing profile create/update/activate/retire, commission profile create/update/activate/retire, estimate creation, final fare settlement, manual adjustment, dispute outcome, and corrective ledger entry.

## Notifications

Riders receive fare estimate, fare change where required, receipt, refund, and dispute notifications. Drivers receive earnings, adjustment, deduction, and payout-related notifications.

## Open Decisions

Exact fare values, commission values, taxes, toll policy, demand controls, airport/special-zone rules, promotions, withdrawal fees, and compensation limits remain open.

## Out of Scope

No production pricing values, autonomous pricing, or payment provider integration are approved.

## Acceptance Criteria

- Pricing is configurable, versioned, effective-dated, and auditable.
- Commission is configurable without approved exact value.
- Money rules avoid floating-point arithmetic.
