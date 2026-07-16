# ADR-007: Support and Compensation

## Status

Accepted

## Context

Complaints, compensation, deductions, and appeals affect safety, trust, legal fairness, and financial records. Automation must not make unsupported serious decisions.

## Decision

Use guided self-service, automatic evidence attachment, rules-based preliminary classification, and manual review for financial, safety, or ambiguous cases. Compensation is not automatic merely because a complaint is submitted.

Driver deductions require legal basis, linked event, evidence, approved reason code, authorized reviewer, amount calculation, impact preview, audit, notification, appeal eligibility, duplicate prevention, and ledger entry.

## Consequences

- AI-only final serious disciplinary or financial decisions are not approved.
- Compensation may be platform-funded, driver-responsible where lawful/fair, payment-provider recovery, promotional credit, or third-party recovery where available.
- Appeals and evidence retention require configuration and compliance review.

## Open Decisions

Support staffing, investigation SLAs, compensation limits, deduction limits, appeal windows, insurance recovery, and legal deduction basis remain TBD.
