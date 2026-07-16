import type { ThemeMode } from "../types";
import { getTheme } from "./css-variables";
import { motion } from "../primitives/motion";
import { radii } from "../primitives/radii";
import { shadows } from "../primitives/shadows";
import { sizing } from "../primitives/sizing";
import { spacing } from "../primitives/spacing";
import { typography } from "../primitives/typography";

export function createReactNativeTheme(mode: ThemeMode) {
  return {
    mode,
    semantic: getTheme(mode),
    spacing,
    sizing,
    radii,
    shadows,
    typography,
    motion,
  } as const;
}
