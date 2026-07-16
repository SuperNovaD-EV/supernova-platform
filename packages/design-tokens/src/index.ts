import { motion } from "./primitives/motion";
import { radii } from "./primitives/radii";
import { shadows } from "./primitives/shadows";
import { sizing } from "./primitives/sizing";
import { spacing } from "./primitives/spacing";
import { typography } from "./primitives/typography";
import { chartTokens } from "./semantic/charts";
import { darkTheme } from "./semantic/dark";
import { lightTheme } from "./semantic/light";
import { mapTokens } from "./semantic/maps";
import { statusTokens } from "./semantic/status";

export { primitiveColors as palette } from "./primitives/colors";
export { spacing } from "./primitives/spacing";
export { sizing } from "./primitives/sizing";
export { radii } from "./primitives/radii";
export { typography } from "./primitives/typography";
export { shadows } from "./primitives/shadows";
export { motion } from "./primitives/motion";
export { lightTheme } from "./semantic/light";
export { darkTheme } from "./semantic/dark";
export { chartTokens } from "./semantic/charts";
export { mapTokens } from "./semantic/maps";
export { statusTokens } from "./semantic/status";
export {
  createCssVariables,
  createCssVariableText,
  getTheme,
} from "./adapters/css-variables";
export { createReactNativeTheme } from "./adapters/react-native";
export type { LocaleDirection, SemanticTheme, ThemeMode } from "./types";

export const tokens = {
  light: lightTheme.color,
  dark: darkTheme.color,
  spacing,
  sizing,
  radii,
  shadows,
  typography,
  motion,
  chart: chartTokens,
  map: mapTokens,
  status: statusTokens,
  touch: sizing.touch,
} as const;
