# Personas

## Purpose

Define the people and operational roles SuperNova must serve before user journeys, authorization, and support workflows are implemented.

## Scope

This document covers rider, driver, trusted contact, and platform personas. Detailed permissions are canonical in [Authorization Model](../security/authorization-model.md).

## Definitions

| Term    | Definition                                                             |
| ------- | ---------------------------------------------------------------------- |
| Persona | Product-facing description of a user or operator need.                 |
| Role    | Permission-bearing platform identity.                                  |
| Status  | Domain state such as approved, suspended, under review, or restricted. |

## Rider Personas

| Persona               | Needs                                                                                                                                      | Prohibited assumptions                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Rider                 | Reliable trip request, clear fare estimate, verified driver/vehicle, online payment, trip sharing, Arabic-first usability, support access. | Rider cannot directly set ride states or bypass payment. |
| Trusted Contact       | Receives shared trip status and safety signals with minimal private data.                                                                  | Trusted contact is not a platform administrator.         |
| Family Account Member | Post-MVP shared account participant.                                                                                                       | Not included in MVP implementation.                      |

## Driver Personas

| Persona             | Needs                                                                                                           | Prohibited assumptions                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Driver Applicant    | Clear application, document upload, vehicle requirements, payout setup, status visibility.                      | Application submission does not guarantee approval.             |
| Approved Driver     | Online availability, fair dispatch offers, clear earnings, payout visibility, support access, safety reporting. | Driver cannot self-approve vehicles or force assignment.        |
| Driver Under Review | Clear reason, evidence request, appeal path where eligible.                                                     | Under-review status cannot be hidden from operational controls. |
| Suspended Driver    | Notification, reason code, appeal eligibility where appropriate, payout handling.                               | Suspension is not proof of misconduct without review.           |
| Rejected Driver     | Decision reason, reapplication or appeal eligibility if configured.                                             | Rejection does not delete audit history.                        |

## Platform Personas

| Persona                         | Primary work                                                                       |
| ------------------------------- | ---------------------------------------------------------------------------------- |
| Platform Owner                  | Final business accountability, sensitive policy approval, external gate ownership. |
| Super Admin                     | Controlled system administration with documented boundaries.                       |
| Operations Manager              | Service zones, live operations, supply thresholds, workflow coordination.          |
| Safety Investigator             | Safety cases, Trip Black Box review, emergency escalation, evidence handling.      |
| Driver Verification Agent       | Driver and vehicle document review.                                                |
| Customer Resolution Agent       | Complaint triage, rider/driver communication, evidence gathering.                  |
| Finance Agent                   | Reconciliation, refunds, payouts, ledger review, provider references.              |
| Risk and Fraud Analyst          | Abuse patterns, suspicious activity, collusion indicators, risk review.            |
| Analytics Viewer                | Aggregated operational reporting without sensitive evidence access.                |
| Content and Translation Manager | Localized content and template management.                                         |

## Main Flow

Each persona interacts through role-limited product surfaces. Sensitive actions move through server-side authorization, reason codes, audit events, and notification rules.

## Alternative Flow

Operators may escalate to another role when an action exceeds their permission boundary, such as compensation approval, driver deduction, permanent block, or evidence access.

## Failure Flow

If a user or operator lacks permission, the system denies the action, records an authorization event where appropriate, and does not reveal sensitive data beyond the actor's role.

## Business Rules

- No admin role has unlimited implicit access without documentation.
- Financial actions require confirmation and segregation of duties where risk warrants.
- Sensitive evidence access is limited by role and logged.
- Serious user-impacting decisions require reason codes and review/appeal paths where appropriate.

## Security Rules

Role boundaries are defined in [Authorization Model](../security/authorization-model.md). Evidence and personal data follow [Data Classification](../security/data-classification.md).

## Audit Events

Record role assignment, role removal, permission escalation, sensitive evidence access, financial approval, account restriction, and policy changes.

## Notifications

Notify users when decisions affect account status, verification, payout, support case status, compensation, deduction, or safety handling.

## Open Decisions

Support staffing levels and final escalation rota are tracked in [Open Decisions](open-decisions.md).

## Out of Scope

This document does not define UI layouts, database roles, or implementation permissions.

## Acceptance Criteria

- Rider, driver, trusted contact, and platform personas are documented.
- Prohibited actions and approval boundaries are linked to security docs.
