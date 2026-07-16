# Payments and Payouts

## Purpose

Define the MVP online payment architecture, driver ledger principles, payout behavior, and provider selection checklist.

## Scope

This document covers conceptual payments, refunds, chargebacks, driver ledger, daily payouts, on-demand withdrawals, payout states, and provider capability requirements. No provider is selected in Phase 1.

## Definitions

| Term           | Definition                                                        |
| -------------- | ----------------------------------------------------------------- |
| Payment intent | Provider-facing or internal payment attempt for a ride.           |
| Capture        | Final collection of authorized payment.                           |
| Driver ledger  | Immutable auditable record of driver financial events.            |
| Payout request | Request to move available driver balance to a payout destination. |

## Payment Model

MVP payment is online-only. Potential methods may include cards, mobile wallets, approved bank-linked methods, and approved instant-transfer integrations. Manual screenshot-based transfers are not treated as reliable automated payment.

Payment states are canonical in [Payment State Machine](../architecture/payment-state-machine.md).

## Provider Capability Checklist

Future provider selection must review Egypt availability, legal merchant onboarding, cards, mobile wallets, instant bank methods, marketplace or payout support, beneficiary onboarding, KYC, refunds, partial refunds, payouts, payout webhooks, chargebacks, reconciliation exports, idempotency, sandbox, API documentation, pricing, and settlement timing.

## Money Rules

- Store money as integer minor units.
- Never use floating-point arithmetic.
- Use EGP as initial currency.
- Include currency on every money record.
- Financial records are immutable.
- Corrections use compensating ledger entries.
- Financial operations are idempotent.
- Duplicate provider webhooks must not duplicate money movements.
- Never overwrite historical commission after trip settlement.

## Driver Ledger

The ledger must be immutable and double-entry-compatible or otherwise auditable. Balances are derived from ledger entries, not trusted as unexplained mutable values.

Required ledger event types:

- `ride_gross_credit`
- `platform_commission_debit`
- `payment_processing_fee_debit`
- `bonus_credit`
- `promotion_credit`
- `manual_adjustment_credit`
- `manual_adjustment_debit`
- `compensation_deduction`
- `refund_debit`
- `chargeback_debit`
- `payout_debit`
- `payout_reversal_credit`
- `reserve_hold_debit`
- `reserve_release_credit`
- `tax_withholding`

Balance views include pending, available, reserved, payout_pending, and paid.

## Daily Automatic Payout

Daily payout is scheduled according to Africa/Cairo, uses configurable payout time, aggregates eligible available balance, creates one payout request where possible, skips balances under configured thresholds, records provider reference, handles provider delays, handles weekends and banking availability, supports automatic retry policy, and never duplicates payout.

## On-Demand Withdrawal

Driver selects available balance, sees fees and net amount, confirms destination, completes step-up verification where appropriate, respects minimum amount, daily limits, payout holds, and provider capabilities. Withdrawal may be instant, same-day, or delayed depending on selected provider; instant transfer is not promised in Phase 1.

Payout states are canonical in [Payout State Machine](../architecture/payout-state-machine.md).

## Failure Flow

| Scenario                                   | Expected behavior                                                     |
| ------------------------------------------ | --------------------------------------------------------------------- |
| Authorization succeeds but webhook delayed | Internal state waits or reconciles without duplicate capture.         |
| Duplicate payment webhook                  | Idempotency key prevents duplicate ledger movement.                   |
| Payment captured but ride fails            | Refund or manual review path uses compensating entries.               |
| Ride completes but capture fails           | Payment failure workflow blocks earnings availability until resolved. |
| Payout provider timeout                    | Payout remains queued or processing according to retry policy.        |
| Duplicate payout request                   | Idempotency rejects duplicate request.                                |
| Payout marked sent then reversed           | Reversal credit and notification are recorded.                        |

## Security Rules

Payment credentials and complete payout account credentials must never be logged or stored outside approved provider tokenization and secure storage. Financial access follows [Financial Controls](../security/financial-controls.md).

## Audit Events

Payment intent created, authorization, capture, webhook received, reconciliation, refund, partial refund, chargeback, ledger entry, payout requested, payout sent, payout completed, payout failed, payout reversed, manual adjustment, and provider reference updates.

## Notifications

Notify riders for payment authorization, capture, failure, refund, partial refund, and chargeback-relevant communication. Notify drivers for earnings, adjustments, payout status, holds, reversals, and deductions.

## Open Decisions

Payment provider, payout provider, fees, payout time, reserve policy, instant transfer support, KYC model, and reconciliation processes remain open.

## Out of Scope

No production provider implementation, API credential creation, payment SDK use, or payout integration is approved in Phase 1.

## Acceptance Criteria

- Online-only payment architecture is documented.
- Provider capability checklist is explicit.
- Ledger and payout behavior is auditable and idempotent.
