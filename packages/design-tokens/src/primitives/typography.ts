export const typography = {
  family: {
    latin: "Manrope, Inter, system-ui, sans-serif",
    arabic: "Alexandria, Tahoma, Arial, sans-serif",
    numeric: "Manrope, ui-sans-serif, system-ui, sans-serif",
    code: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  },
  roles: {
    display: { size: 56, lineHeight: 64, weight: "800" },
    hero: { size: 44, lineHeight: 52, weight: "800" },
    pageTitle: { size: 34, lineHeight: 42, weight: "800" },
    sectionTitle: { size: 24, lineHeight: 32, weight: "750" },
    cardTitle: { size: 18, lineHeight: 26, weight: "750" },
    body: { size: 16, lineHeight: 24, weight: "500" },
    bodySecondary: { size: 14, lineHeight: 22, weight: "500" },
    label: { size: 13, lineHeight: 18, weight: "700" },
    caption: { size: 12, lineHeight: 16, weight: "600" },
    button: { size: 15, lineHeight: 20, weight: "800" },
    numericLarge: { size: 32, lineHeight: 38, weight: "800" },
    numericMedium: { size: 20, lineHeight: 28, weight: "800" },
    code: { size: 13, lineHeight: 18, weight: "600" },
  },
  arabicLineHeightMultiplier: 1.18,
} as const;
