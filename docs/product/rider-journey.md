# Rider Journey

## Purpose

Define the MVP rider experience from registration through ride completion and support.

## Scope

This journey describes product behavior only. It does not implement screens, authentication, maps, payments, or notifications.

## Definitions

| Term            | Definition                                                                  |
| --------------- | --------------------------------------------------------------------------- |
| OTP             | One-time password used for phone verification.                              |
| Fare estimate   | Server-calculated, versioned, time-limited pre-trip fare projection.        |
| PIN or QR start | Server-validated ride start verification between assigned rider and driver. |

## Actors

Rider, Trusted Contact, Assigned Driver, Dispatch Domain, Payment Domain, Support Agent, Safety Investigator.

## Preconditions

- Rider has a secure device session or completes phone registration.
- Current service zone allows pickup and destination.
- A supported online payment method is available before request confirmation.

## Main Flow

1. Rider opens the app.
2. App resolves current location with permission or manual pickup adjustment.
3. Rider searches for destination and confirms pickup.
4. System previews route using an approved future route provider.
5. Rider selects vehicle category.
6. System displays fare estimate with timestamp, route source, distance, duration, pricing version, validity window, assumptions, and allowed change conditions.
7. Rider selects payment method.
8. Rider confirms request.
9. Server authorizes payment where required and moves ride into matching.
10. Rider sees driver assignment, driver identity, vehicle details, and arrival progress.
11. Rider verifies driver and vehicle before trip start.
12. At pickup, rider uses QR or PIN verification.
13. Rider tracks the active trip and may share trip status with trusted contacts.
14. Rider reaches destination.
15. Server processes completion, final fare, payment capture, receipt, and ledger events.
16. Rider rates trip and may submit a support issue.

## Alternative Flow

- Rider denies location permission and manually sets pickup.
- QR scan fails and PIN fallback is used.
- Rider updates destination or adds a stop where policy permits.
- Rider loses network and app resumes from server state when reconnected.
- Payment retry is offered only within configured limits.

## Failure Flow

| Scenario                    | Expected behavior                                                                |
| --------------------------- | -------------------------------------------------------------------------------- |
| No driver available         | Ride expires as `expired_no_driver`; rider is notified.                          |
| Driver does not arrive      | Rider can cancel or report; state may become `driver_no_show` after validation.  |
| Rider no-show               | Driver wait rules apply; state may become `rider_no_show`.                       |
| Payment authorization fails | Ride cannot proceed to active dispatch unless retry succeeds.                    |
| Safety event                | Rider can use safety center or SOS; evidence capture and escalation rules apply. |
| App closes                  | Server state remains authoritative; app resumes current ride on return.          |

## Business Rules

- Rider cannot start a trip before driver assignment, driver arrival, and verification availability.
- Rider cannot directly set ride state.
- Cancellation reasons must use configured reason codes.
- Fare estimate is not final fare and is not calculated by the client.
- Completed ride history is immutable except through audited corrective workflows.

## Security Rules

- OTP and authentication tokens are never logged.
- Exact active-trip coordinates are not sent to general analytics.
- Trusted contact sharing uses minimized data.
- Sensitive evidence is never included in push notification body text.

## Audit Events

Registration consent, payment method selection token reference, ride request, cancellation request, verification attempts, destination changes, support submission, safety event, and rating/report submission.

## Notifications

Rider notification events are cataloged in [Notification Events](../architecture/notification-events.md).

## Data Considerations

Arabic and English copy must use translation keys. Dates, times, currency, and numbers are localized. Addresses may contain mixed Arabic and English.

## Open Decisions

Payment provider, support staffing, emergency-service integration, appeal windows, and exact retention periods remain in [Open Decisions](open-decisions.md).

## Out of Scope

Scheduled rides, family accounts, rider bidding, delivery, loyalty, subscriptions, and production provider integrations.

## Acceptance Criteria

- Rider journey covers registration, ride request, trip start verification, completion, payment, rating, and support.
- Failure behavior links to canonical state machines.
