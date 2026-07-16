import { expect, test } from "@playwright/test";

test("admin shell renders", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(
    page.getByRole("heading", { name: "Operations command center" }),
  ).toBeVisible();
});

test("admin prototype routes render", async ({ page }) => {
  for (const route of [
    "/live-operations",
    "/drivers/applications/demo-application-17",
    "/rides/demo-ride-2048",
    "/complaints/demo-complaint-1",
    "/payments",
    "/pricing",
    "/service-zones",
    "/design-system",
  ]) {
    await page.goto(route);
    await expect(page.getByText("Export review pack")).toBeVisible();
  }
});
