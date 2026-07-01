/**
 * Regenerate brand image assets from the high-res source art in
 * design-reference/uploads/. Run: `node scripts/build-brand-assets.mjs`.
 *
 * Produces:
 *   public/organica-living-logo.webp   header/footer wordmark (lossless, alpha)
 *   public/og-image.png                1200x630 social share image
 *   src/app/icon.png                   512x512 favicon (Next icon convention)
 *   src/app/apple-icon.png             180x180 Apple touch icon
 *   src/app/favicon.ico                16/32/48 PNG-in-ICO classic favicon
 *
 * sharp is resolved from the pnpm store (not hoisted). See CLAUDE.md.
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { writeFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
let sharp;
try {
  sharp = require("sharp");
} catch {
  sharp = require(join(ROOT, "node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"));
}

const LOGO_SRC = join(ROOT, "design-reference/uploads/organica-living-logo.png");
const FAVICON_SRC = join(ROOT, "design-reference/uploads/organicaliving-favicon.png");
const CREAM = { r: 252, g: 252, b: 247, alpha: 1 };

/** Assemble a multi-size PNG-in-ICO buffer. */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;
  entries.forEach((e, i) => {
    const b = i * 16;
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, b + 0); // width (0 = 256)
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, b + 1); // height
    dir.writeUInt8(0, b + 2); // palette
    dir.writeUInt8(0, b + 3); // reserved
    dir.writeUInt16LE(1, b + 4); // color planes
    dir.writeUInt16LE(32, b + 6); // bits per pixel
    dir.writeUInt32LE(e.buffer.length, b + 8); // bytes
    dir.writeUInt32LE(offset, b + 12); // offset
    offset += e.buffer.length;
  });

  return Buffer.concat([header, dir, ...entries.map((e) => e.buffer)]);
}

async function main() {
  // 1) Header/footer wordmark — native 890x410, lossless WebP, alpha preserved.
  await sharp(LOGO_SRC)
    .webp({ lossless: true })
    .toFile(join(ROOT, "public/organica-living-logo.webp"));

  // 2) OG share image — logo centered on a cream field, 1200x630.
  const OG_W = 1200,
    OG_H = 630,
    LOGO_W = 620;
  const logoForOg = await sharp(LOGO_SRC).resize({ width: LOGO_W }).png().toBuffer();
  const logoMeta = await sharp(logoForOg).metadata();
  await sharp({ create: { width: OG_W, height: OG_H, channels: 4, background: CREAM } })
    .composite([
      {
        input: logoForOg,
        left: Math.round((OG_W - LOGO_W) / 2),
        top: Math.round((OG_H - logoMeta.height) / 2),
      },
    ])
    .png()
    .toFile(join(ROOT, "public/og-image.png"));

  // 3) Favicons from the square leaf mark.
  await sharp(FAVICON_SRC).resize(512, 512).png().toFile(join(ROOT, "src/app/icon.png"));
  await sharp(FAVICON_SRC).resize(180, 180).png().toFile(join(ROOT, "src/app/apple-icon.png"));

  const icoSizes = [16, 32, 48];
  const icoEntries = await Promise.all(
    icoSizes.map(async (size) => ({
      size,
      buffer: await sharp(FAVICON_SRC).resize(size, size).png().toBuffer(),
    })),
  );
  await writeFile(join(ROOT, "src/app/favicon.ico"), buildIco(icoEntries));

  console.log("Brand assets rebuilt:");
  console.log("  public/organica-living-logo.webp");
  console.log("  public/og-image.png");
  console.log("  src/app/icon.png, apple-icon.png, favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
