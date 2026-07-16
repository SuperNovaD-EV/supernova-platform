# Support Resolution

## Purpose

Define complaint, evidence, compensation, deduction, appeal, and resolution principles.

## Scope

Support covers guided self-service, evidence attachment, rules-based preliminary classification, manual review for financial/safety/ambiguous cases, compensation, driver deductions, appeals, and audit.

## Definitions

| Term         | Definition                                                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Complaint    | User-submitted or operator-created case about a ride, account, document, payment, payout, or safety event.                                             |
| Compensation | Rider or driver remedy funded by platform, driver-responsible recovery, payment-provider recovery, promotional credit, or third party where available. |
| Deduction    | Driver ledger debit linked to an approved responsibility finding and legal basis.                                                                      |

## Complaint Categories

Complaint categories include driver requested extra payment, driver did not arrive, rider did not arrive, driver cancellation, rider cancellation, vehicle mismatch, unsafe driving, harassment, route concern, incorrect fare, duplicate payment, payment failure, lost item, accident, rider misconduct, driver misconduct, property damage, payout issue, and document issue.

Complaint states are canonical in [Complaint State Machine](../architecture/complaint-state-machine.md).

## Main Flow

1. User starts guided support.
2. System attaches relevant ride, payment, payout, account, and Trip Black Box references according to data minimization.
3. Rules classify the complaint preliminarily.
4. Low-risk informational cases may resolve through self-service.
5. Financial, safety, evidence-heavy, or ambiguous cases move to manual review.
6. Reviewer evaluates evidence and reason codes.
7. Outcome may reject, uphold, approve compensation, reject compensation, require appeal review, or close.
8. Financial outcomes create immutable ledger or payment records.
9. Affected users receive notifications.

## Compensation Rules

Compensation must never be issued automatically merely because a complaint was submitted. Sources may include platform-funded compensation, driver-responsible recovery, payment-provider recovery, promotional credit, and insurance or third-party recovery where available.

## Driver Deduction Rules

A driver deduction requires valid contract and legal basis, linked complaint or financial event, evidence, approved reason code, authorized reviewer, amount calculation, financial impact preview, audit record, driver notification, appeal eligibility, duplicate-deduction prevention, and ledger entry.

Do not assume every customer compensation can legally or fairly be deducted from the driver.

## Alternative Flow

- Duplicate complaint is linked to existing case.
- User submits additional evidence during response window.
- Appeal is opened within configured window.
- Ambiguous shared-responsibility cases may split platform liability and driver responsibility according to policy.

## Failure Flow

| Scenario                   | Expected behavior                                                                             |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| Evidence missing           | Case requests information or moves to manual review.                                          |
| Abusive complaint pattern  | Risk review may restrict complaint automation, with reason code and appeal where appropriate. |
| Admin repeats compensation | Duplicate prevention blocks repeated financial action.                                        |
| Deduction appeal upheld    | Deduction reversal ledger entry is created.                                                   |

## Business Rules

- AI must not issue final serious disciplinary or financial decisions without configured rule authority or human review.
- Investigation SLA is configurable.
- Appeal windows are configurable.
- Maximum deduction, installment recovery, protected minimum payout, reversal behavior, and liability treatment are configurable and legally reviewed before launch.

## Security Rules

Evidence access is role-limited and logged. Sensitive evidence is not sent in push bodies or general analytics.

## Audit Events

Complaint submission, evidence attachment, automated classification, reviewer assignment, evidence access, user response request, decision, compensation approval, deduction approval, appeal submission, appeal decision, closure, and financial ledger references.

## Notifications

Complaint submitted, evidence requested, case status changed, decision issued, compensation approved/rejected, deduction notice, appeal opened, appeal decision, and closure.

## Open Decisions

Support staffing, investigation SLAs, compensation limits, appeal windows, deduction limits, insurance recovery, and legal deduction basis remain open.

## Out of Scope

AI-only final judgments, unsupported legal deductions, production insurance integrations, and automated provider recovery.

## Acceptance Criteria

- Complaint categories and states are explicit.
- Compensation and deduction safeguards are documented.
- Appeal and evidence handling are defined.
