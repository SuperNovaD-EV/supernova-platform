# Logo Usage

## Concept Rationale

The SuperNova symbol represents a controlled nova core moving through a precise navigation aperture. The negative space creates subtle forward direction while the central core remains stable, expressing trust, movement, transparency, and technical precision.

## Clear Space

Use the symbol core width as the minimum clear-space unit. Keep at least one core width around the standalone symbol and one symbol width around lockups. Do not place text, UI controls, edges, or partner marks inside this space.

## Minimum Sizes

- Favicon: 16px, symbol only.
- Compact UI: 24px, symbol only.
- Standard navigation: 32px symbol or 128px horizontal lockup.
- Marketing lockup: 48px symbol or larger.
- App icon source: 1024px SVG viewBox, exported by release tooling as required.

## Approved Color Variants

- Primary color symbol: Nova Indigo `#635BFF` and Motion Cyan `#25C6DA`.
- Monochrome: `currentColor` symbol for controlled UI contexts.
- White: pure white symbol for dark backgrounds.
- Black: pure black symbol for light backgrounds.

The logo must remain recognizable without gradients. Gradients are allowed only in optional marketing artwork and must never be required for recognition.

## Dark And Light Usage

Use the primary color symbol on Pearl or Midnight when contrast is sufficient. Use the black symbol on light low-contrast surfaces and the white symbol on dark low-contrast surfaces. Avoid placing the primary symbol over busy photography unless a calm overlay preserves contrast and shape clarity.

## Prohibited Usage

Do not distort, rotate, outline, add glows, add shadows, recolor individual parts outside the approved palette, place the symbol in a map pin or car silhouette, add decorative orbits, or combine it with generic star, route, vehicle, crypto, browser, VPN, or AI motifs.

## App Icon Safe Zone

Keep the symbol inside the central 72% of the icon field. The rounded-square background owns the platform crop; the symbol should not touch mask edges or rely on edge details for recognition.

## Favicon Behavior

Favicons use the symbol only. At 16px, the central nova and two motion fields must remain readable; do not use the wordmark or lockups for favicon output.

## Wordmark Alignment

In horizontal lockups, align the wordmark optical center to the symbol core. In stacked lockups, center the wordmark under the symbol and keep at least half a symbol height between them.

## Export Naming Rules

Generated outputs must preserve the source filename stem and append platform size or target, for example `supernova-app-icon-ios-1024.png` or `supernova-favicon-32.png`. Current Expo PNG exports are generated with `pnpm brand:export-raster`. Do not rename generated exports as new masters.
