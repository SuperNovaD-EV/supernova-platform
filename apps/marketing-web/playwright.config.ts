import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: { command: "pnpm dev", port: 3002, reuseExistingServer: true },
  testDir: "./tests",
});
