# Admin Operations

## Purpose

Define SuperNova's operational workflows, sensitive action controls, and audit expectations.

## Scope

Admin operations cover driver review, vehicle review, document renewal, live operations, investigations, financial review, payout review, compensation, deductions, account restrictions, appeals, pricing, zones, categories, translations, and audit review.

## Definitions

| Term             | Definition                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| Sensitive action | Operation that affects safety, money, account access, evidence, pricing, or legal status.                      |
| Second approval  | Additional approval by another authorized role before high-impact action becomes effective.                    |
| Effect preview   | Operator-visible summary of the action's user, financial, notification, and audit effects before confirmation. |

## Actors

Platform Owner, Super Admin, Operations Manager, Safety Investigator, Driver Verification Agent, Customer Resolution Agent, Finance Agent, Risk and Fraud Analyst, Analytics Viewer, Content and Translation Manager.

## Preconditions

- Operator has an assigned role with documented permissions.
- Sensitive data access is justified by workflow context.
- Reason codes and audit logging are available before sensitive actions.

## Main Workflows

| Workflow                       | Primary role                                                             | Controls                                                                        |
| ------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Driver review                  | Driver Verification Agent                                                | Evidence review, reason code, manual decision, audit event.                     |
| Vehicle review                 | Driver Verification Agent                                                | Category rules, inspection evidence, photo review, decision audit.              |
| Document renewal               | Driver Verification Agent                                                | Expiry detection, information request, dispatch eligibility update.             |
| Live operations                | Operations Manager                                                       | Zone state, supply thresholds, demand controls, temporary suspension.           |
| Ride investigation             | Safety Investigator                                                      | Trip Black Box access, evidence minimization, audit logging.                    |
| Complaint investigation        | Customer Resolution Agent                                                | Evidence collection, classification, manual decision, appeal handling.          |
| Safety escalation              | Safety Investigator                                                      | Emergency workflow, account risk controls, notification discipline.             |
| Payment reconciliation         | Finance Agent                                                            | Provider references, duplicate webhook detection, refund/chargeback review.     |
| Payout review                  | Finance Agent                                                            | Balance eligibility, provider state, retry, reversal, holds.                    |
| Compensation approval          | Customer Resolution Agent plus Finance Agent where configured            | Financial preview, source, reason, ledger entry, notification, appeal.          |
| Driver deduction               | Finance Agent plus second approval where configured                      | Legal basis, evidence, calculation, appeal, ledger entry.                       |
| Account suspension             | Safety Investigator or Risk and Fraud Analyst                            | Reason code, duration, appeal eligibility, notification, audit.                 |
| Appeal review                  | Authorized reviewer not conflicted with original decision where possible | Prior evidence, new evidence, outcome audit.                                    |
| Pricing changes                | Operations Manager with financial approval                               | Effective dates, versioning, simulation preview, audit.                         |
| Zone changes                   | Operations Manager                                                       | Effective dates, pickup/destination controls, category and safety restrictions. |
| Vehicle-category configuration | Operations Manager with verification input                               | Eligibility, documents, pricing, zones, inspection rules.                       |
| Translation management         | Content and Translation Manager                                          | Translation keys, locale review, no hardcoded strings.                          |
| Audit review                   | Platform Owner or authorized auditor                                     | Access logging, export controls, breach response support.                       |

## Alternative Flow

Actions exceeding a role boundary are escalated to a role with approval authority. If second approval is configured, the first operator's action remains pending until approved or rejected.

## Failure Flow

- Missing reason code blocks sensitive action.
- Missing evidence blocks financial or disciplinary action.
- Conflicted reviewer is prevented where segregation rules apply.
- Provider outage leaves financial action in review or retry state rather than duplicating money movement.

## Business Rules

- No admin role has unlimited implicit access.
- Financial action confirmation is required for refunds, compensation, deductions, payout reversals, manual adjustments, and chargeback outcomes.
- Pricing, commission, zone, and vehicle-category changes must have effective dates and audit history.
- Sensitive evidence access requires workflow context and access logging.

## Security Rules

Admin permissions are canonical in [Authorization Model](../security/authorization-model.md). Financial controls are canonical in [Financial Controls](../security/financial-controls.md).

## Audit Events

Record operator ID, role, action, target entity, before/after summary, reason code, evidence references, approval chain, timestamp, source IP or session identifier where appropriate, and notification outcomes.

## Notifications

Sensitive actions notify affected users unless law, safety, or abuse controls require delayed or limited disclosure.

## Data Considerations

Operational views must show the minimum data needed for the workflow. Export and evidence access follow [Data Classification](../security/data-classification.md).

## Open Decisions

Second-approval thresholds, support staffing, escalation rota, compensation limits, appeal windows, and retention periods remain in [Open Decisions](open-decisions.md).

## Out of Scope

This document does not implement admin screens, database policies, or provider integrations.

## Acceptance Criteria

- Each sensitive workflow has permission, confirmation, reason, audit, notification, and reversal or appeal handling where appropriate.
