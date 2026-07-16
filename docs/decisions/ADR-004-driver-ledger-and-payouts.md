# ADR-004: Driver Ledger and Payouts

## Status

Accepted

## Context

Driver earnings, deductions, bonuses, refunds, chargebacks, reserves, and payouts must be auditable and resistant to duplicate provider events.

## Decision

Use an immutable double-entry-compatible or auditable driver ledger. Balances are derived from ledger entries rather than trusted as unexplained mutable values. Financial corrections use compensating entries.

Support daily automatic payout scheduled in Africa/Cairo and on-demand withdrawal with configurable limits, fees, holds, destination confirmation, and step-up verification where appropriate. No instant transfer is promised before provider support is approved.

## Consequences

- Financial records remain historically reliable.
- Duplicate webhooks and payout requests are handled with idempotency.
- Provider selection can happen later without changing the core ledger principle.

## Open Decisions

Payout provider, payout time, fees, reserve policy, KYC, settlement timing, and reversal behavior remain TBD.
