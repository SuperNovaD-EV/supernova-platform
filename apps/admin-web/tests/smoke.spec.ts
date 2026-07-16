import { expect, test } from "@playwright/test";

test("admin shell renders", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Admin foundation" }),
  ).toBeVisible();
});
