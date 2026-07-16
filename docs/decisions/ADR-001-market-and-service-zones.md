# ADR-001: Market and Service Zones

## Status

Accepted

## Context

SuperNova launches first in Cairo and Giza but must not assume full coverage on day one. Operations need zone-by-zone control for availability, pricing, supply, demand, safety, compliance, and temporary suspensions.

## Decision

Use configurable service zones as the operational unit for launch, dispatch eligibility, pickup permission, destination permission, vehicle-category availability, pricing profiles, operating hours, minimum supply thresholds, demand controls, safety or compliance restrictions, temporary suspension, effective dates, and audit history.

Initial examples such as Nasr City, Heliopolis, New Cairo, Maadi, Downtown Cairo, Dokki, Mohandessin, Agouza, Haram, Faisal, 6th of October, and Sheikh Zayed are planning examples, not hardcoded requirements.

## Consequences

- Cairo and Giza can launch gradually.
- Future cities, governorates, countries, currencies, timezones, languages, and zones remain architecture-ready.
- Later schema must model effective-dated zone configuration and audit history.

## Open Decisions

Final launch zones, operating hours, demand controls, and compliance restrictions remain TBD.
