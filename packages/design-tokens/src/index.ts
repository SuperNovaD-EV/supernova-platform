export const palette = {
  nova: { indigo: "#635BFF", violet: "#7A5CFF" },
  motion: { cyan: "#25C6DA" },
  space: { midnight: "#0D1117", deep: "#151B23" },
  surface: { pearl: "#F7F8FA", white: "#FFFFFF" },
  success: "#16A36A",
  warning: "#F5A524",
  emergency: "#E5484D",
  text: { dark: "#101318", muted: "#68707D" },
  border: { light: "#E6E9EF" },
} as const;

export const tokens = {
  light: {
    surface: {
      canvas: palette.surface.pearl,
      panel: palette.surface.white,
      elevated: palette.surface.white,
    },
    text: {
      primary: palette.text.dark,
      muted: palette.text.muted,
      inverse: palette.surface.white,
    },
    border: { subtle: palette.border.light, focus: palette.nova.indigo },
    action: { primary: palette.nova.indigo, secondary: palette.motion.cyan },
    safety: {
      ok: palette.success,
      warning: palette.warning,
      emergency: palette.emergency,
    },
    chart: {
      area: palette.motion.cyan,
      line: palette.nova.indigo,
      grid: palette.border.light,
    },
  },
  dark: {
    surface: {
      canvas: palette.space.midnight,
      panel: palette.space.deep,
      elevated: "#1D2630",
    },
    text: {
      primary: palette.surface.white,
      muted: "#A7AFBA",
      inverse: palette.text.dark,
    },
    border: { subtle: "#2A3441", focus: palette.motion.cyan },
    action: { primary: palette.nova.violet, secondary: palette.motion.cyan },
    safety: {
      ok: palette.success,
      warning: palette.warning,
      emergency: palette.emergency,
    },
    chart: {
      area: palette.motion.cyan,
      line: palette.nova.violet,
      grid: "#2A3441",
    },
  },
  product: {
    rider: { primary: palette.nova.indigo, accent: palette.motion.cyan },
    driver: { primary: palette.nova.indigo, accent: palette.success },
    admin: {
      primary: palette.nova.indigo,
      accent: palette.space.deep,
      warning: palette.warning,
    },
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, "2xl": 48 },
  radii: { sm: 4, md: 8, lg: 12, round: 999 },
  shadows: {
    focus: "0 0 0 3px rgba(99, 91, 255, 0.32)",
    panel: "0 12px 32px rgba(13, 17, 23, 0.08)",
  },
  typography: {
    latin: "Manrope, Inter, system-ui, sans-serif",
    arabic: "Alexandria, Tahoma, Arial, sans-serif",
  },
  motion: { fast: 120, normal: 180, slow: 260 },
  touch: { minimum: 44 },
} as const;

export type ThemeMode = "light" | "dark";
