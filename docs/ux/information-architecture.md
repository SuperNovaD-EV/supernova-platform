# UX Information Architecture

## Canonical Decisions

SuperNova has four product surfaces: Rider mobile, Driver mobile, Admin web, and Marketing/support web. Product rules remain canonical in [Product Requirements](../product/product-requirements.md); this document defines prototype navigation only.

## Prototype-Only Behavior

All routes use local mock data and visual state. No backend, maps, payment, authentication, notification, or dispatch calls occur.

## Production Requirements

Production IA must preserve role boundaries, sensitive evidence access controls, and server-authoritative domain states from Phase 1.

## Surface Map

- Rider: onboarding, ride request, matching, verification, active trip, safety, payment, rating, history, settings.
- Driver: onboarding, verification, online/offline, offer, pickup, trip, earnings, ledger, payout, support, settings.
- Admin: dashboard, live operations, drivers, applications, rides, incidents, complaints, payments, payouts, pricing, service zones, analytics, settings.
- Marketing: home, ride, drive, safety, how it works, help, about.

## Accessibility And RTL

Every surface must support English LTR and Arabic RTL review, visible focus or large touch targets, semantic headings, non-color-only statuses, and resilient long Arabic copy.

## Deferred Decisions

Final navigation labels, analytics instrumentation, and production route guards are deferred to Phase 3+ implementation.
