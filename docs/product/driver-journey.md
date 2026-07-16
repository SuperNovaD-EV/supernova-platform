# Driver Journey

## Purpose

Define the MVP driver experience from application through dispatch, ride completion, support, and payout visibility.

## Scope

This document covers behavior only. It does not implement onboarding screens, dispatch algorithms, navigation, payments, payouts, or maps.

## Definitions

| Term                  | Definition                                                                                               |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| Driver applicant      | Person applying to drive with SuperNova.                                                                 |
| Approved driver       | Driver with verified identity, approved vehicle, accepted agreements, valid documents, and payout setup. |
| Eligible for dispatch | Online driver satisfying vehicle, zone, document, risk, GPS, and connectivity requirements.              |

## Actors

Driver Applicant, Approved Driver, Driver Verification Agent, Operations Manager, Finance Agent, Safety Investigator, Rider.

## Preconditions

- Driver account is not suspended, rejected, expired, or blocked.
- Required documents and vehicle approvals are valid.
- Payout destination is present before earnings payout.
- Driver consents and agreements are recorded.

## Application Flow

1. Driver creates account and verifies phone.
2. Driver submits personal details and current residential address.
3. Driver submits national ID and national ID validity details.
4. Driver submits driver license and license eligibility for vehicle type.
5. Driver completes selfie or liveness verification where available.
6. Driver submits vehicle documents, ownership or authorization, vehicle photos, and required equipment evidence.
7. Driver submits payout destination.
8. Driver accepts legal agreements and consent.
9. Automated document and format checks run where possible.
10. Manual platform review makes the approval decision.
11. Official authority verification is used only when a lawful integration or agreement becomes available.

## Ride Flow

1. Driver goes online.
2. System verifies dispatch eligibility.
3. Driver receives offer with permitted trip information.
4. Driver accepts or declines before offer expiration.
5. Accepted offer is atomically assigned if still available.
6. Driver navigates to pickup.
7. Driver marks arrival.
8. Driver waits for rider under configured wait rules.
9. Driver verifies rider using QR or PIN.
10. Server confirms trip start.
11. Driver navigates to destination.
12. Driver handles destination or stop changes only when server-approved.
13. Driver ends trip.
14. Driver receives earnings record.
15. Driver rates or reports rider.
16. Driver returns online or goes offline.

## Alternative Flow

- Driver must provide additional information after review.
- Driver vehicle requires reinspection.
- Driver disconnects during offer or active trip.
- Driver changes device and must satisfy session security.
- Driver document expires and dispatch eligibility is removed.

## Failure Flow

| Scenario                          | Expected behavior                                                               |
| --------------------------------- | ------------------------------------------------------------------------------- |
| Two drivers accept simultaneously | Server accepts one atomically and rejects the other idempotently.               |
| Driver loses internet             | Server uses last known state, stale GPS rules, and reconnection reconciliation. |
| Rider does not arrive             | Wait/no-show rules apply; support evidence is attached.                         |
| Vehicle mismatch report           | Driver may be restricted pending investigation.                                 |
| Payout provider timeout           | Payout state remains controlled by idempotency and provider reconciliation.     |

## Business Rules

- A vehicle being model year 2006 or newer does not guarantee approval.
- Driver cannot approve their own documents, vehicle, payout, complaints, deductions, or appeals.
- Driver net earnings after commission must be visible before payout.
- Commission is recorded when ride financial settlement is created, not only at withdrawal.
- Driver deductions require evidence, legal basis, reason code, approval, notification, and appeal handling.

## Security Rules

- Identity documents, license images, vehicle license images, and payout credentials are highly restricted.
- Government registry checks are not assumed available.
- Residency at the national-ID address is not claimed as verified without lawful source.

## Audit Events

Phone verification, application submission, document upload metadata, automated checks, manual decisions, vehicle decisions, information requests, suspension, appeal, online/offline state, offer decision, arrival, PIN/QR attempts, trip start/end, reports, ledger entries, payout requests.

## Notifications

Driver notifications include verification status, document expiration, ride offer, assignment, rider no-show, completion, earnings, payout, support, complaint, deduction, appeal, suspension, and maintenance events.

## Data Considerations

Driver personal, identity, legal, payout, location, and safety evidence data follows [Data Classification](../security/data-classification.md).

## Open Decisions

Vehicle categories permitted by law, insurance model, payout provider, withdrawal fees, support staffing, and official verification access remain open.

## Out of Scope

Production provider integration, driver gamification, automated government verification, insurance integration, and final legal classification.

## Acceptance Criteria

- Driver onboarding, dispatch, trip, reporting, ledger, and payout behavior are documented.
- Verification levels and limitations are explicit.
