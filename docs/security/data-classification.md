# Data Classification

## Purpose

Define SuperNova data classes, storage expectations, logging restrictions, analytics restrictions, Sentry restrictions, export rules, retention principles, deletion handling, access logging, breach response, and production support access.

## Scope

This document covers major product, operational, financial, identity, location, safety, authentication, and evidence data. Exact retention periods remain open pending legal review.

## Classifications

| Classification               | Description                                                                             | Examples                                                                                  | Default controls                                                    |
| ---------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Public                       | Safe for public release.                                                                | Marketing copy, published support content.                                                | Normal integrity controls.                                          |
| Internal                     | Operational data not intended for public release.                                       | Aggregated non-sensitive metrics, internal configuration labels.                          | Role-limited internal access.                                       |
| Confidential                 | Personal or operational data requiring access control.                                  | Names, phone metadata, support summaries, ride metadata without exact active coordinates. | Need-to-know access, audit for sensitive workflows.                 |
| Highly Sensitive             | Data that can cause significant harm if exposed.                                        | Sensitive support evidence, risk flags, harassment details.                               | Strict role access, access logging, export approval.                |
| Financial                    | Payment, refund, ledger, payout, fee, commission, and chargeback data.                  | Payment intent metadata, ledger entries, payout status.                                   | Finance role access, immutable audit, no credential logging.        |
| Identity and Legal Documents | Government IDs, driver licenses, vehicle licenses, ownership or authorization evidence. | National ID images, driver license images, vehicle license images.                        | Highly restricted storage, access logging, retention controls.      |
| Precise Location             | Exact or high-precision rider/driver/trip coordinates.                                  | Active-trip GPS points, pickup coordinates, route telemetry.                              | Purpose-limited use, minimized analytics, no broad export.          |
| Safety Evidence              | Evidence connected to safety cases.                                                     | SOS events, route deviation evidence, unsafe driving evidence, harassment evidence.       | Safety role access, retention lock where required, export approval. |
| Authentication Secret        | Credentials or secrets used to authenticate users, systems, or providers.               | Passwords, OTP codes, auth tokens, API keys, session secrets.                             | Never log, never expose, secure secret storage only.                |

## Major Entity Classification

| Entity or field group                                   | Classification                                                               |
| ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Marketing content                                       | Public                                                                       |
| Translation keys and non-sensitive templates            | Internal                                                                     |
| Rider name, phone, optional email                       | Confidential                                                                 |
| Trusted contact details                                 | Confidential                                                                 |
| Driver personal details and current residential address | Confidential                                                                 |
| National ID and driver license images/details           | Identity and Legal Documents                                                 |
| Vehicle license, ownership/authorization documents      | Identity and Legal Documents                                                 |
| Vehicle photos                                          | Confidential, or Safety Evidence when attached to investigation              |
| Ride state history                                      | Confidential                                                                 |
| Active-trip exact coordinates and telemetry             | Precise Location                                                             |
| Trip Black Box safety indicators                        | Safety Evidence                                                              |
| Payment intent metadata                                 | Financial                                                                    |
| Payment credentials                                     | Authentication Secret or provider-tokenized Financial data; never stored raw |
| Driver ledger entries                                   | Financial                                                                    |
| Payout destination token/reference                      | Financial                                                                    |
| Complete payout account credentials                     | Authentication Secret; must not be logged                                    |
| Complaint narrative                                     | Confidential or Highly Sensitive depending on category                       |
| Complaint evidence                                      | Highly Sensitive or Safety Evidence                                          |
| Audit logs                                              | Internal, Confidential, Financial, or Safety Evidence according to target    |
| Admin role assignments                                  | Internal or Confidential                                                     |

## Logging Prohibitions

Explicitly prohibit logging:

- Passwords.
- OTP codes.
- Authentication tokens.
- Payment credentials.
- National ID images.
- Driver license images.
- Vehicle license images.
- Complete payout account credentials.
- Exact active-trip coordinates in general analytics.
- Sentry events containing sensitive evidence.

## Sentry Restrictions

Sentry must not receive passwords, authentication tokens, identity documents, payment data, exact trip coordinates, safety evidence, or full complaint narratives. Errors should include sanitized identifiers and coarse operational context only.

## Analytics Restrictions

Analytics may use aggregated and minimized data. Exact active-trip coordinates, sensitive evidence, identity document data, and payment credentials are prohibited from general analytics.

## Export Restrictions

Exports require role authorization, purpose, classification review, audit event, and retention handling. Safety evidence, identity documents, precise location, and financial data require heightened approval.

## Retention and Deletion

Exact periods are TBD in [Open Decisions](../product/open-decisions.md). Deletion and anonymization must respect legal holds, financial records, safety evidence retention, chargeback windows, tax obligations, and audit integrity.

## Breach Response

Potential exposure of Authentication Secret, Identity and Legal Documents, Financial, Precise Location, or Safety Evidence data requires escalation, containment, audit review, notification assessment, and professional compliance review.

## Production Support Access

Production support access must be time-bound, role-scoped, logged, and justified by support or safety workflow. Broad database browsing is prohibited.

## Acceptance Criteria

- Major entities and field groups are classified.
- Logging, Sentry, analytics, export, retention, deletion, and support access restrictions are explicit.
