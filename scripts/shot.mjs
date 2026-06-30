/**
 * Screenshot verification helper for the visual-fidelity work.
 * Renders a URL (or a local .html file) in headless Chromium and writes a
 * full-page PNG, so a rendered page can be visually compared to its mockup.
 *
 * Usage:
 *   node scripts/shot.mjs <target> <out.png> [width=1440] [height=1200]
 *     <target>  an http(s)/file URL, or a local filesystem path (auto file://)
 *
 * Examples:
 *   node scripts/shot.mjs "http://localhost:3100/" shots/home-actual.png 1440
 *   node scripts/shot.mjs "design-reference/Organica Home.dc.html" shots/home-mockup.png 1440
 *   node scripts/shot.mjs "http://localhost:3100/" shots/home-mobile.png 390
 */
import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const [, , target, out, widthArg, heightArg] = process.argv;
if (!target || !out) {
  console.error("usage: node scripts/shot.mjs <target> <out.png> [width] [height]");
  process.exit(2);
}
const width = parseInt(widthArg || "1440", 10);
const height = parseInt(heightArg || "1200", 10);
const url = /^(https?|file):/.test(target) ? target : pathToFileURL(target).href;

mkdirSync(dirname(out), { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(1200); // let fonts + entrance transitions settle
  await page.screenshot({ path: out, fullPage: true });
  console.log(`shot -> ${out}  (${width}x${height})  ${url}`);
} finally {
  await browser.close();
}
