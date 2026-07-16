# Notification Events

## Purpose

Define a provider-neutral notification event catalog with localization, privacy, deduplication, and retry expectations.

## Scope

Channels may include in-app, push, email, SMS where necessary, and operations alert. Sensitive evidence must never be sent through push notification bodies.

## Event Catalog

| Event                                | Producer        | Audience                       | Channel             | Urgency  | Template variables                | Localization                          | Dedupe key               | Retry                 | Expiry          | Deep link           | Privacy                      |
| ------------------------------------ | --------------- | ------------------------------ | ------------------- | -------- | --------------------------------- | ------------------------------------- | ------------------------ | --------------------- | --------------- | ------------------- | ---------------------------- |
| `auth.otp_requested`                 | Accounts        | Rider/driver                   | SMS                 | High     | masked_phone                      | Locale-neutral digits where supported | phone+purpose            | Provider retry policy | Minutes         | None                | Authentication Secret        |
| `driver.verification_status_changed` | Verification    | Driver                         | In-app, push        | Medium   | status, reason_label              | AR/EN                                 | driver+status            | Standard              | Days            | Driver verification | Confidential                 |
| `document.expiring`                  | Verification    | Driver                         | In-app, push, email | Medium   | document_type, expiry_date        | AR/EN date                            | driver+document+date     | Standard              | Expiry date     | Documents           | Identity and Legal Documents |
| `ride.requested`                     | Rides           | Rider                          | In-app              | High     | category, pickup_label            | AR/EN                                 | ride+state               | Standard              | Ride active     | Ride                | Precise Location             |
| `driver.offer_created`               | Dispatch        | Driver                         | In-app, push        | High     | pickup_area, category, estimate   | AR/EN                                 | offer_id                 | Until offer expiry    | Offer expiry    | Offer               | Confidential                 |
| `ride.driver_assigned`               | Rides           | Rider, driver                  | In-app, push        | High     | driver_name, vehicle_summary, eta | AR/EN                                 | ride+assigned            | Standard              | Ride active     | Ride                | Confidential                 |
| `ride.driver_arrived`                | Rides           | Rider                          | In-app, push        | High     | pickup_label, wait_policy         | AR/EN                                 | ride+arrived             | Standard              | Wait expiry     | Ride                | Precise Location             |
| `ride.waiting`                       | Rides           | Rider, driver                  | In-app, push        | Medium   | wait_minutes                      | AR/EN number                          | ride+waiting+bucket      | Limited               | Ride active     | Ride                | Confidential                 |
| `ride.started`                       | Rides           | Rider, driver, trusted contact | In-app, push        | High     | start_time, destination_area      | AR/EN time                            | ride+started             | Standard              | Ride active     | Ride                | Precise Location             |
| `ride.destination_changed`           | Rides           | Rider, driver                  | In-app, push        | High     | destination_area                  | AR/EN                                 | ride+destination_version | Standard              | Ride active     | Ride                | Precise Location             |
| `ride.completed`                     | Rides/payments  | Rider, driver                  | In-app, push, email | Medium   | amount, currency, receipt_id      | AR/EN currency                        | ride+completed           | Standard              | Days            | Receipt             | Financial                    |
| `payment.failed`                     | Payments        | Rider                          | In-app, push, email | High     | reason_label, action              | AR/EN                                 | payment+failure          | Standard              | Days            | Payment             | Financial                    |
| `refund.updated`                     | Payments        | Rider                          | In-app, email       | Medium   | amount, status                    | AR/EN currency                        | refund+status            | Standard              | Days            | Support case        | Financial                    |
| `payout.updated`                     | Payouts         | Driver                         | In-app, push, email | Medium   | amount, status                    | AR/EN currency                        | payout+status            | Standard              | Days            | Payout              | Financial                    |
| `safety.sos_received`                | Safety          | Operations                     | Operations alert    | Critical | ride_id, coarse_area              | AR/EN internal                        | safety_event             | Escalating            | Active incident | Safety case         | Safety Evidence              |
| `complaint.submitted`                | Support         | Submitter                      | In-app, email       | Medium   | case_id, category                 | AR/EN                                 | complaint+submitted      | Standard              | Days            | Complaint           | Confidential                 |
| `compensation.decided`               | Support/finance | Affected user                  | In-app, email       | Medium   | outcome, amount_if_any            | AR/EN currency                        | complaint+compensation   | Standard              | Days            | Complaint           | Financial                    |
| `appeal.updated`                     | Support         | Appellant                      | In-app, email       | Medium   | status, deadline                  | AR/EN date                            | appeal+status            | Standard              | Deadline        | Appeal              | Confidential                 |
| `account.restricted`                 | Risk/safety     | User                           | In-app, email       | High     | reason_label, appeal_action       | AR/EN                                 | account+restriction      | Standard              | Until resolved  | Account status      | Confidential                 |
| `system.maintenance`                 | Operations      | Affected users                 | In-app, push, email | Medium   | window_start, window_end          | AR/EN time                            | maintenance+window       | Standard              | Window end      | Status              | Public                       |

## Business Rules

- Notification producers emit events; notification delivery does not own domain truth.
- Deep links must respect authorization.
- Dedupe keys prevent repeated messages for the same state change.
- Expired ride offers and time-sensitive safety events must not be delivered as actionable after expiry.

## Security Rules

Do not send passwords, OTP codes after initial secure delivery, auth tokens, payment credentials, identity document images, complete payout credentials, exact active-trip coordinates, or sensitive evidence in push bodies.

## Acceptance Criteria

- Catalog covers authentication, verification, ride, payment, payout, safety, complaint, compensation, appeal, account restriction, and maintenance.
