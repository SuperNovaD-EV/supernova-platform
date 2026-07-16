# Design Tokens

All apps consume `@supernova/design-tokens`. Do not hardcode palette values in app shells. Product accents are Rider indigo/cyan, Driver indigo/emerald, Admin indigo/graphite with amber warnings, Safety emerald, and Emergency red only.

Latin typography uses Manrope with safe fallbacks. Arabic typography uses Alexandria with safe fallbacks. No font files are committed in Phase 0.

## Brand Palette

- Nova Indigo: `#635BFF`
- Cosmic Violet: `#7A5CFF`
- Motion Cyan: `#25C6DA`
- Midnight: `#0D1117`
- Deep Space: `#151B23`
- Pearl: `#F7F8FA`

Primary logo recognition cannot depend on gradients. Gradients may be used only in optional marketing artwork.

## Asset Tokens

Brand SVG masters live in `packages/design-tokens/assets/brand/`. App and web integrations reference these masters directly or use package metadata derived from them. Do not add duplicate logo source files to public folders.
