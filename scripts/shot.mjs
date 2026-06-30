/**
 * Screenshot verification helper for the visual-fidelity work.
 * Renders a URL (or a local .html file) in headless Chromium and writes a PNG.
 *
 * Usage:
 *   node scripts/shot.mjs <target> <out.png> [width=1440] [height=1200]
 *
 * Env options (for verifying detail + interactions the full-page shot can't show):
 *   HOVER="<css selector>"  hover this element before shooting (verify hover effects)
 *   CLIP="<css selector>"   clip the screenshot to this element's box (legible detail)
 *   FULL=0                  disable full-page (default full-page unless CLIP is set)
 *
 * Examples:
 *   node scripts/shot.mjs "http://localhost:3100/products" shots/p.png 1280
 *   CLIP="[data-prodcard]" node scripts/shot.mjs "http://localhost:3100/products" shots/card.png 1280
 *   HOVER="a.og-btn" CLIP="a.og-btn" node scripts/shot.mjs "http://localhost:3100/design-system" shots/btn-hover.png 1280
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
const hoverSel = process.env.HOVER || "";
const clipSel = process.env.CLIP || "";
const fullPage = process.env.FULL !== "0" && !clipSel;

mkdirSync(dirname(out), { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  // networkidle is unreliable with Next streaming/RSC; domcontentloaded + a
  // settle wait (past the 1800ms reveal safety) is robust for hydration + JS effects.
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(Number(process.env.SETTLE || 2200));

  if (hoverSel) {
    const el = page.locator(hoverSel).first();
    await el.scrollIntoViewIfNeeded();
    await el.hover();
    await page.waitForTimeout(500); // let the hover transition finish
  }

  if (clipSel) {
    const clipEl = page.locator(clipSel).first();
    await clipEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800); // let scroll-reveal finish
    const box = await clipEl.boundingBox();
    if (box) {
      const pad = 12;
      await page.screenshot({
        path: out,
        clip: {
          x: Math.max(0, box.x - pad),
          y: Math.max(0, box.y - pad),
          width: box.width + pad * 2,
          height: box.height + pad * 2,
        },
      });
    } else {
      await page.screenshot({ path: out });
    }
  } else {
    await page.screenshot({ path: out, fullPage });
  }
  console.log(`shot -> ${out} (${width}x${height}${hoverSel ? ` hover:${hoverSel}` : ""}${clipSel ? ` clip:${clipSel}` : ""})`);
} finally {
  await browser.close();
}
