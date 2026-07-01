/**
 * Fetch brand-page imagery from Pexels and re-encode to WebP.
 *
 * Usage:
 *   PEXELS_API_KEY=xxxx node scripts/fetch-pexels.mjs           # fetch missing
 *   PEXELS_API_KEY=xxxx node scripts/fetch-pexels.mjs --force   # re-fetch all
 *
 * The API key is read from the environment — never hard-coded/committed.
 * sharp is resolved from the pnpm store (it is not hoisted to node_modules/sharp).
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { mkdir, writeFile, access, readFile } from "node:fs/promises";
import { constants } from "node:fs";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// Resolve sharp: try the normal name first, then the pnpm store path.
let sharp;
try {
  sharp = require("sharp");
} catch {
  sharp = require(
    join(ROOT, "node_modules/.pnpm/sharp@0.34.5/node_modules/sharp")
  );
}

const API_KEY = process.env.PEXELS_API_KEY;
if (!API_KEY) {
  console.error("Missing PEXELS_API_KEY environment variable.");
  process.exit(1);
}
const FORCE = process.argv.includes("--force");

/**
 * Image manifest. `id` pins a specific Pexels photo for reproducibility; when
 * omitted, the top result for `query` is used. `w` is the target WebP width.
 */
const MANIFEST = [
  // ── /science ──────────────────────────────────────────────
  { out: "science/science-hero.webp",        w: 1600, query: "green laboratory plants science research", orientation: "landscape" },
  { out: "science/science-formulation.webp", w: 1000, query: "vitamin capsules supplements macro",       orientation: "landscape" },
  { out: "science/science-testing.webp",     w: 1000, query: "laboratory pipette test tube sample",       orientation: "landscape" },

  // ── /sustainability ───────────────────────────────────────
  { out: "sustainability/sustainability-hero.webp",  w: 1600, query: "aerial green forest canopy nature", orientation: "landscape" },
  { out: "sustainability/sustainability-ocean.webp", w: 1000, query: "clear ocean sea water sunlight",     orientation: "landscape" },
  { out: "sustainability/sustainability-plants.webp",w: 1000, query: "fresh green botanical leaves plants", orientation: "landscape" },

  // ── /labs ─────────────────────────────────────────────────
  { out: "labs/labs-hero.webp",        w: 1600, query: "scientist microscope laboratory research", orientation: "landscape" },
  { out: "labs/labs-formulate.webp",   w: 1000, query: "natural supplement powder ingredients bowl", orientation: "landscape" },
  { out: "labs/labs-ingredients.webp", w: 1000, query: "fresh berries botanical ingredients flatlay", orientation: "landscape" },

  // ── /approach ─────────────────────────────────────────────
  { out: "approach/approach-hero.webp",    w: 1600, query: "hands holding soil green seedling plant", orientation: "landscape" },
  { out: "approach/approach-journey.webp", w: 1000, query: "natural whole food ingredients wooden table", orientation: "landscape" },

  // ── /nutrition-101 ────────────────────────────────────────
  { out: "nutrition-101/nutrition-hero.webp",  w: 1600, query: "colorful fresh fruits vegetables flatlay", orientation: "landscape" },
  { out: "nutrition-101/nutrition-plate.webp", w: 1000, query: "healthy balanced meal bowl salmon greens", orientation: "landscape" },

  // ── /vitamins-101 ─────────────────────────────────────────
  { out: "vitamins-101/vitamins-hero.webp",  w: 1600, query: "sliced citrus fruit oranges lemon vitamin", orientation: "landscape" },
  { out: "vitamins-101/vitamins-foods.webp", w: 1000, query: "leafy greens nuts seeds healthy food", orientation: "landscape" },
];

const IMAGES_DIR = join(ROOT, "public", "images");

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function searchPhoto(query, orientation) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query
  )}&per_page=1&orientation=${orientation}`;
  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (!res.ok) throw new Error(`Pexels search failed (${res.status}) for "${query}"`);
  const data = await res.json();
  const photo = data.photos?.[0];
  if (!photo) throw new Error(`No Pexels result for "${query}"`);
  return photo;
}

async function download(u) {
  const res = await fetch(u);
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${u}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const creditsPath = join(IMAGES_DIR, "pexels-credits.json");
  const credits = (await exists(creditsPath))
    ? JSON.parse(await readFile(creditsPath, "utf8"))
    : {};

  for (const item of MANIFEST) {
    const outPath = join(IMAGES_DIR, item.out);
    if (!FORCE && (await exists(outPath))) {
      console.log(`skip   ${item.out} (exists)`);
      continue;
    }
    await mkdir(dirname(outPath), { recursive: true });

    const photo = await searchPhoto(item.query, item.orientation);
    const srcUrl = photo.src.original;
    const raw = await download(srcUrl);

    await sharp(raw)
      .resize({ width: item.w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outPath);

    credits[item.out] = {
      photographer: photo.photographer,
      photographer_url: photo.photographer_url,
      pexels_url: photo.url,
      query: item.query,
    };
    console.log(`ok     ${item.out}  ← ${photo.photographer} (Pexels #${photo.id})`);
  }

  await writeFile(creditsPath, JSON.stringify(credits, null, 2) + "\n");
  console.log(`\nCredits written to ${creditsPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
