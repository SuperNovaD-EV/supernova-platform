import { primitiveColors } from "../primitives/colors";

export const chartTokens = {
  series: [
    primitiveColors.nova.indigo,
    primitiveColors.motion.cyan,
    primitiveColors.status.emerald,
    primitiveColors.status.amber,
    primitiveColors.nova.cosmicViolet,
  ],
  gridLight: "#E4E9F2",
  gridDark: "#2A3441",
  areaFrom: "rgba(99, 91, 255, 0.32)",
  areaTo: "rgba(37, 198, 218, 0.04)",
} as const;
