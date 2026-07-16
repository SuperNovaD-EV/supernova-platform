import { expect, test } from "@playwright/test";

test("marketing shell renders with rtl structure", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main")).toHaveCSS("direction", "rtl");
});
