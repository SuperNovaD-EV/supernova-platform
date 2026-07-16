import type { SemanticTheme } from "../types";
import { primitiveColors } from "../primitives/colors";
import { chartTokens } from "./charts";
import { mapTokens } from "./maps";

export const darkTheme: SemanticTheme = {
  color: {
    background: {
      canvas: primitiveColors.space.midnight,
      surface: primitiveColors.space.deep,
      elevated: primitiveColors.space.graphite,
      inset: "#0A0E13",
    },
    text: {
      primary: primitiveColors.neutral.white,
      secondary: "#D2D8E2",
      muted: "#A7AFBA",
      inverse: primitiveColors.neutral.ink,
      danger: "#FF8D92",
    },
    border: {
      default: "#293241",
      strong: "#3D4858",
      focus: primitiveColors.motion.cyan,
    },
    brand: {
      primary: primitiveColors.nova.cosmicViolet,
      secondary: primitiveColors.nova.indigo,
      accent: primitiveColors.motion.cyan,
    },
    status: {
      success: "#3BD489",
      warning: "#FFC766",
      danger: "#FF7A80",
      info: "#76A9FF",
    },
    safety: {
      protected: "#3BD489",
      attention: "#FFC766",
      emergency: "#FF7A80",
    },
    map: mapTokens,
    chart: {
      grid: chartTokens.gridDark,
      tooltip: primitiveColors.space.graphite,
      series: chartTokens.series,
      areaFrom: "rgba(122, 92, 255, 0.28)",
      areaTo: "rgba(37, 198, 218, 0.02)",
    },
  },
};
