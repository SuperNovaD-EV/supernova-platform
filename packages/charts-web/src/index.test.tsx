import { describe, expect, test } from "vitest";
import { createChartSummary } from ".";

describe("SuperNovaChart", () => {
  test("creates an accessible chart summary", () => {
    expect(
      createChartSummary([
        { label: "Mon", value: 1 },
        { label: "Tue", value: 2 },
      ]),
    ).toBe("Mon: 1, Tue: 2");
  });
});
