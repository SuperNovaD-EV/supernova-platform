import { describe, expect, test } from "vitest";
import { formatCurrency, formatNumber, getDirection, t } from ".";

describe("localization helpers", () => {
  test("supports LTR and RTL directions", () => {
    expect(getDirection("en")).toBe("ltr");
    expect(getDirection("ar")).toBe("rtl");
  });

  test("formats EGP and Arabic numbers", () => {
    expect(formatCurrency("en", 11200)).toContain("EGP");
    expect(formatNumber("ar", 123)).not.toBe("123");
    expect(t("ar", "primaryDestination")).toContain("؟");
  });
});
