export const brand = {
  name: "SuperNova",
  tagline: "Trust. Transparency. Every trip.",
  meaning: [
    "trust",
    "movement",
    "safety",
    "intelligence",
    "premium quality",
    "calm confidence",
  ],
  assets: {
    symbol: "packages/design-tokens/assets/brand/supernova-symbol.svg",
    wordmark: "packages/design-tokens/assets/brand/supernova-wordmark.svg",
    lockupHorizontal:
      "packages/design-tokens/assets/brand/supernova-lockup-horizontal.svg",
    lockupStacked:
      "packages/design-tokens/assets/brand/supernova-lockup-stacked.svg",
    symbolMonochrome:
      "packages/design-tokens/assets/brand/supernova-symbol-monochrome.svg",
    symbolWhite:
      "packages/design-tokens/assets/brand/supernova-symbol-white.svg",
    symbolBlack:
      "packages/design-tokens/assets/brand/supernova-symbol-black.svg",
    appIcon: "packages/design-tokens/assets/brand/supernova-app-icon.svg",
  },
} as const;

const faviconSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#0D1117"/><path fill="#635BFF" d="M73 12C42 15 20 39 17 69c9-12 24-21 42-24 7-12 17-23 14-33Z"/><path fill="#25C6DA" d="M111 58c-6 31-31 52-62 54 13-8 22-21 27-39 12-5 25-10 35-15Z"/><path fill="#151B23" d="M37 76c13 19 46 17 56-8C79 79 54 77 46 58c-5 5-8 11-9 18Z"/><path fill="#F7F8FA" d="M64 37c4 17 10 23 27 27-17 4-23 10-27 27-4-17-10-23-27-27 17-4 23-10 27-27Z"/></svg>';

export const brandFaviconDataUri = `data:image/svg+xml,${encodeURIComponent(
  faviconSvg,
)}`;
