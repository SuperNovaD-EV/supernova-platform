import { primitiveColors } from "../primitives/colors";

export const statusTokens = {
  success: primitiveColors.status.emerald,
  warning: primitiveColors.status.amber,
  danger: primitiveColors.status.red,
  info: primitiveColors.status.blue,
  protected: primitiveColors.status.emerald,
} as const;
