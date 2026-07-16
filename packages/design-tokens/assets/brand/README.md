# SuperNova Brand Assets

This folder is the source of truth for Phase 0 brand SVG assets. Do not add alternate logo masters in app or package folders.

## Source Files

- `supernova-symbol.svg`: primary color symbol.
- `supernova-wordmark.svg`: path-based wordmark.
- `supernova-lockup-horizontal.svg`: default horizontal lockup.
- `supernova-lockup-stacked.svg`: stacked lockup for narrow spaces.
- `supernova-symbol-monochrome.svg`: one-color symbol using `currentColor`.
- `supernova-symbol-white.svg`: white symbol for dark backgrounds.
- `supernova-symbol-black.svg`: black symbol for light backgrounds.
- `supernova-app-icon.svg`: square app icon source.

## Export Pipeline

Use these SVGs as masters. `pnpm brand:export-raster` generates the current Expo icon and splash PNG exports from these files. Additional platform PNG, ICO, and store exports should use the same source files after target sizes are confirmed. Do not hand-maintain exported raster files in Phase 0.
