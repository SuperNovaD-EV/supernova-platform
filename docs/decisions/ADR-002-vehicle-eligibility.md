# ADR-002: Vehicle Eligibility

## Status

Accepted

## Context

SuperNova needs configurable support for legally eligible licensed private vehicle types without hardcoding assumptions that may differ by category, zone, or legal review.

## Decision

Vehicle eligibility is category-specific and configurable. Initial conceptual categories include Motorcycle, Scooter, Compact Car, Economy Car, Comfort Car, Premium Car, SUV, Van, Pickup where legally and operationally permitted, Accessible Vehicle, Pet-friendly Vehicle, and Other locally approved private vehicle category.

The default minimum model year is 2006, but this value is configurable and does not guarantee approval. Approval also considers valid vehicle license, ownership or authorization, exterior and interior condition, seat condition, seat belts, windows, lighting, visible tire condition, cleanliness, passenger capacity, required equipment, document expiration, and periodic reinspection.

## Consequences

- Category-specific minimum years, capacity, luggage, safety features, air-conditioning, inspections, photos, zone availability, and pricing can evolve without redesign.
- Vehicle approval requires manual review and audit.
- Legal category approval remains an external gate.

## Open Decisions

Final permitted categories, legal requirements, inspection process, and insurance model remain TBD.
