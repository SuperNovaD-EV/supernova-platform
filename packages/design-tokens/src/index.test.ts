import { describe, expect, test } from "vitest";
import { createCssVariables, darkTheme, lightTheme, tokens } from ".";

describe("design tokens", () => {
  test("exports required light and dark semantic values", () => {
    expect(lightTheme.color.background.canvas).toBe("#F7F8FA");
    expect(darkTheme.color.background.canvas).toBe("#0D1117");
    expect(tokens.touch.minimum).toBeGreaterThanOrEqual(44);
  });

  test("css variable export has unique keys", () => {
    const variables = createCssVariables("light");
    const keys = Object.keys(variables);
    expect(new Set(keys).size).toBe(keys.length);
    expect(keys).toContain("--sn-theme-color-background-canvas");
  });
});
