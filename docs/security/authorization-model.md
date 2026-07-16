# Authorization Model

## Purpose

Define role permissions, prohibited actions, approval boundaries, segregation of duties, financial confirmations, audit requirements, and sensitive evidence access rules.

## Scope

This is a product and architecture authorization model, not database policy implementation.

## Platform Roles

| Role                            | Allowed responsibilities                                                                | Prohibited actions                                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Platform Owner                  | Own external compliance gates, approve highest-risk policies, review audit escalations. | Bypass audit logging or directly mutate financial records without workflow.                              |
| Super Admin                     | Manage platform configuration and role assignment within documented boundaries.         | Unlimited implicit evidence, document, or financial access.                                              |
| Operations Manager              | Manage service zones, supply thresholds, live operations, pricing change requests.      | Approve own high-risk financial corrections without required second approval.                            |
| Safety Investigator             | Review safety cases, access safety evidence, recommend restrictions.                    | Issue unsupported financial deductions without finance/legal basis.                                      |
| Driver Verification Agent       | Review driver and vehicle documents, request information, approve/reject within policy. | Approve own driver account or alter payout ledger.                                                       |
| Customer Resolution Agent       | Triage complaints, request evidence, resolve basic cases, recommend compensation.       | Finalize high-value compensation or deductions without approval.                                         |
| Finance Agent                   | Reconcile payments, refunds, ledger, payouts, chargebacks, financial adjustments.       | Change safety findings or verification decisions without owning role.                                    |
| Risk and Fraud Analyst          | Review abuse indicators, collusion, duplicate accounts, spoofing, payment abuse.        | Use protected personal characteristics as risk signals.                                                  |
| Analytics Viewer                | View aggregated reporting.                                                              | Access sensitive evidence, identity documents, raw payout credentials, or exact active-trip coordinates. |
| Content and Translation Manager | Manage localized templates and support content.                                         | Access user evidence or financial operations.                                                            |

## Approval Boundaries

| Action                     | Required boundary                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| Driver approval/rejection  | Driver Verification Agent, audited reason.                                                      |
| Vehicle approval/rejection | Driver Verification Agent, category policy, audited reason.                                     |
| Account suspension         | Safety Investigator, Risk and Fraud Analyst, or authorized Operations Manager with reason code. |
| Permanent block            | High-severity approval by authorized safety/risk role, second approval where configured.        |
| Compensation approval      | Customer Resolution Agent within limit; Finance Agent or second approval above threshold.       |
| Driver deduction           | Finance Agent plus legal basis, evidence, reason, and second approval where configured.         |
| Manual ledger adjustment   | Finance Agent with effect preview and audit; second approval above threshold.                   |
| Payout reversal handling   | Finance Agent with provider reference and audit.                                                |
| Pricing activation         | Operations Manager with financial review and effective date.                                    |
| Zone suspension            | Operations Manager or Safety Investigator with reason and audit.                                |
| Sensitive evidence export  | Authorized safety/legal/owner workflow with audit.                                              |

## Segregation of Duties

- A reviewer should not approve their own driver, vehicle, payout, complaint, deduction, or appeal.
- A compensation or deduction decision should separate support finding from financial execution where risk warrants.
- Appeal review should be performed by a reviewer not conflicted with the original decision where possible.
- Role assignment and financial action execution should be separately auditable.

## Sensitive Evidence Access

Sensitive evidence access requires:

- Authorized role.
- Workflow context.
- Purpose.
- Access timestamp.
- Case or ride reference.
- Export prohibition unless separately approved.

## Financial Action Confirmation

Financial actions require effect preview, amount in minor units, currency, reason code, linked event, idempotency key, confirmation, audit event, and reversal or compensating-entry path.

## Audit Requirements

Audit events include actor, role, action, target, timestamp, reason, before/after summary, evidence references where applicable, approval chain, and notification effects.

## Acceptance Criteria

- No admin role has unlimited implicit access.
- Permissions, prohibited actions, approvals, financial confirmation, and evidence access rules are documented.
