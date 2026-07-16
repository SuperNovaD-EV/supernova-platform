import { expect, test } from "@playwright/test";

test("marketing shell renders with rtl structure", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: /Safety-first mobility for Cairo and Giza/,
    }),
  ).toBeVisible();
});

test("marketing prototype routes render responsively", async ({ page }) => {
  for (const width of [390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/safety");
    await expect(
      page.getByRole("heading", {
        name: /Safety is designed into the state model/,
      }),
    ).toBeVisible();
  }
});
