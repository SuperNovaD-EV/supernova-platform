# Financial Controls

## Purpose

Define controls for money, ledger, commission, refunds, compensation, deductions, payouts, reconciliation, and idempotency.

## Scope

This document covers product architecture controls only. It does not implement financial systems or select providers.

## Money Handling

- Store money as integer minor units.
- Never use floating-point arithmetic for money.
- Include currency on every money record.
- Initial currency is EGP.
- Historical commission and pricing values are not overwritten after settlement.
- Financial records are immutable; corrections use compensating ledger entries.

## Ledger Controls

Driver balances are derived from immutable ledger entries. Required balance views are pending, available, reserved, payout_pending, and paid.

Ledger event types are defined in [Payments and Payouts](../product/payments-and-payouts.md).

## Idempotency Controls

Required idempotency keys:

- Ride request.
- Payment intent.
- Authorization/capture/refund webhook.
- Settlement creation.
- Ledger entry creation.
- Compensation action.
- Deduction action.
- Payout request.
- Provider payout submission.
- Payout webhook.
- Payout reversal.

## Compensation Controls

Compensation requires linked complaint or financial event, authorized reviewer, reason code, source, amount calculation, financial impact preview, notification, audit, and duplicate prevention.

Sources may include platform-funded, driver-responsible, payment-provider recovery, promotional credit, and insurance or third-party recovery where available.

## Driver Deduction Controls

Driver deduction requires valid contract and legal basis, linked complaint or financial event, evidence, approved reason code, authorized reviewer, amount calculation, financial impact preview, audit record, driver notification, appeal eligibility, duplicate prevention, and ledger entry.

Maximum deduction, installment recovery, protected minimum payout behavior, reversal, and shared-responsibility rules are configurable and require approval.

## Payout Controls

Payouts must respect available balance, reserves, minimums, limits, holds, destination confirmation, step-up verification where appropriate, provider status, retry policy, and duplicate prevention.

## Reconciliation Controls

Provider references, webhooks, exports, chargebacks, refunds, payout statuses, reversals, and manual adjustments must reconcile to internal immutable records. Mismatches move to review rather than silent overwrite.

## Audit Events

Financial audit events include pricing activation, commission activation, payment intent, capture, refund, chargeback, settlement, ledger entry, compensation, deduction, payout request, payout provider event, reversal, manual adjustment, and reconciliation correction.

## Sentry and Logging Rules

Never log payment credentials, complete payout account credentials, authentication secrets, provider tokens, or raw webhook secrets. Sentry events must use sanitized references only.

## Acceptance Criteria

- Financial operations are immutable, auditable, idempotent, and currency-aware.
- Compensation and deduction controls are explicit.
