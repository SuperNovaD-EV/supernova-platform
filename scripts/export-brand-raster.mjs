import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { chromium } from "@playwright/test";

const root = process.cwd();
const appIconSvg = await readFile(
  join(root, "packages/design-tokens/assets/brand/supernova-app-icon.svg"),
  "utf8",
);
const symbolSvg = await readFile(
  join(root, "packages/design-tokens/assets/brand/supernova-symbol.svg"),
  "utf8",
);
const iconTargets = [
  "apps/rider-mobile/assets/brand/supernova-app-icon.png",
  "apps/driver-mobile/assets/brand/supernova-app-icon.png",
];
const splashTargets = [
  "apps/rider-mobile/assets/brand/supernova-splash.png",
  "apps/driver-mobile/assets/brand/supernova-splash.png",
];

async function renderPng(html, outputPath) {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1024, height: 1024 },
  });
  await page.setContent(html);
  const buffer = await page.screenshot({ type: "png" });
  await browser.close();
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, buffer);
}

const iconHtml = `<body style="margin:0">${appIconSvg}</body>`;
const splashHtml = `<body style="align-items:center;background:#0D1117;display:flex;height:1024px;justify-content:center;margin:0;width:1024px"><div style="width:520px">${symbolSvg}</div></body>`;

for (const target of iconTargets) {
  await renderPng(iconHtml, join(root, target));
}

for (const target of splashTargets) {
  await renderPng(splashHtml, join(root, target));
}

console.log("Brand raster exports generated");
