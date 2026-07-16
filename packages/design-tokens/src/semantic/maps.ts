import { primitiveColors } from "../primitives/colors";

export const mapTokens = {
  route: primitiveColors.nova.indigo,
  pickup: primitiveColors.status.emerald,
  destination: primitiveColors.motion.cyan,
  driver: primitiveColors.nova.cosmicViolet,
  demand: "rgba(245, 165, 36, 0.28)",
  accuracy: "rgba(37, 198, 218, 0.22)",
} as const;
