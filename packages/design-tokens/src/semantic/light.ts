import type { SemanticTheme } from "../types";
import { primitiveColors } from "../primitives/colors";
import { chartTokens } from "./charts";
import { mapTokens } from "./maps";

export const lightTheme: SemanticTheme = {
  color: {
    background: {
      canvas: primitiveColors.neutral.pearl,
      surface: primitiveColors.neutral.white,
      elevated: primitiveColors.neutral.white,
      inset: primitiveColors.neutral.mist,
    },
    text: {
      primary: primitiveColors.neutral.ink,
      secondary: primitiveColors.space.slate,
      muted: primitiveColors.neutral.muted,
      inverse: primitiveColors.neutral.white,
      danger: primitiveColors.status.red,
    },
    border: {
      default: primitiveColors.neutral.line,
      strong: "#B8C1D1",
      focus: primitiveColors.nova.indigo,
    },
    brand: {
      primary: primitiveColors.nova.indigo,
      secondary: primitiveColors.nova.cosmicViolet,
      accent: primitiveColors.motion.cyan,
    },
    status: {
      success: primitiveColors.status.emerald,
      warning: primitiveColors.status.amber,
      danger: primitiveColors.status.red,
      info: primitiveColors.status.blue,
    },
    safety: {
      protected: primitiveColors.status.emerald,
      attention: primitiveColors.status.amber,
      emergency: primitiveColors.status.red,
    },
    map: mapTokens,
    chart: {
      grid: chartTokens.gridLight,
      tooltip: primitiveColors.neutral.white,
      series: chartTokens.series,
      areaFrom: chartTokens.areaFrom,
      areaTo: chartTokens.areaTo,
    },
  },
};
