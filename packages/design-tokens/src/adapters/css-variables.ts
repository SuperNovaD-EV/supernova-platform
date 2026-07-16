import type { SemanticTheme, ThemeMode } from "../types";
import { lightTheme } from "../semantic/light";
import { darkTheme } from "../semantic/dark";
import { motion } from "../primitives/motion";
import { radii } from "../primitives/radii";
import { shadows } from "../primitives/shadows";
import { spacing } from "../primitives/spacing";
import { typography } from "../primitives/typography";

const flatten = (
  value: Record<string, unknown>,
  prefix: string,
): Record<string, string> =>
  Object.entries(value).reduce<Record<string, string>>((acc, [key, item]) => {
    const nextKey = `${prefix}-${key}`;
    if (typeof item === "object" && item !== null && !Array.isArray(item)) {
      return { ...acc, ...flatten(item as Record<string, unknown>, nextKey) };
    }
    acc[`--sn-${nextKey}`] = String(item);
    return acc;
  }, {});

export function getTheme(mode: ThemeMode): SemanticTheme {
  return mode === "dark" ? darkTheme : lightTheme;
}

export function createCssVariables(mode: ThemeMode): Record<string, string> {
  const theme = getTheme(mode);
  return {
    ...flatten(theme, "theme"),
    ...flatten({ spacing, radii, shadows, motion, typography }, "sys"),
  };
}

export function createCssVariableText(mode: ThemeMode): string {
  return Object.entries(createCssVariables(mode))
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");
}
