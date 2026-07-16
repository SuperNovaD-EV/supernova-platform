import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const brandDir = join(root, "packages", "design-tokens", "assets", "brand");
const requiredFiles = [
  "supernova-symbol.svg",
  "supernova-wordmark.svg",
  "supernova-lockup-horizontal.svg",
  "supernova-lockup-stacked.svg",
  "supernova-symbol-monochrome.svg",
  "supernova-symbol-white.svg",
  "supernova-symbol-black.svg",
  "supernova-app-icon.svg",
  "README.md",
];
const ignoredDirs = new Set([
  ".git",
  ".next",
  ".turbo",
  ".expo",
  "dist",
  "build",
  "coverage",
  "node_modules",
  "test-results",
]);

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      return ignoredDirs.has(entry) ? [] : walk(fullPath);
    }
    return [fullPath];
  });
}

const failures = [];
const required = new Set(requiredFiles);
const actualBrandFiles = readdirSync(brandDir);

for (const file of required) {
  if (!actualBrandFiles.includes(file)) {
    failures.push(`Missing required brand asset: ${file}`);
  }
}

for (const file of actualBrandFiles) {
  if (!required.has(file)) {
    failures.push(`Unexpected brand source asset: ${file}`);
  }
}

for (const file of walk(root)) {
  const repoPath = relative(root, file).split(sep).join("/");
  const content = readFileSync(file, "utf8");

  if (repoPath.endsWith(".svg")) {
    if (
      !content.trimStart().startsWith("<svg") ||
      !content.includes("</svg>")
    ) {
      failures.push(`SVG does not parse structurally: ${repoPath}`);
    }
    if (/<image\b|data:image\//i.test(content)) {
      failures.push(`SVG embeds raster data: ${repoPath}`);
    }
    if (/<text\b|font-family|@font-face/i.test(content)) {
      failures.push(`SVG depends on text or external fonts: ${repoPath}`);
    }
    if (!repoPath.startsWith("packages/design-tokens/assets/brand/")) {
      failures.push(
        `Duplicate source-of-truth SVG outside brand folder: ${repoPath}`,
      );
    }
  }

  if (
    /packages\/brand\/assets\/supernova-|supernova-mark|wordmark-horizontal/i.test(
      repoPath,
    )
  ) {
    failures.push(`Rejected legacy asset remains: ${repoPath}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Brand gate passed");
