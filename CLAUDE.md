@AGENTS.md

# Mockup replication — verification rule (MANDATORY)

When replicating the `design-reference/*.dc.html` mockups (any page, component, copy, or effect), you MUST verify with **precise evidence — grep of the actual rendered HTML, not screenshots.**

- Build and serve the app (e.g. `next start`), then `curl` the route and **grep the served HTML** for the exact expected content: specific copy/blurbs, element counts (e.g. exactly one announcement bar), the presence/absence of elements (e.g. the cart link is absent when the cart is empty), real product data, etc. The grep result is the proof.
- **Do NOT claim a page "matches the mockup" based on full-page screenshots.** Downscaled full-page screenshots cannot render small text (blurbs), cannot show hover/interaction effects (they are static), and have repeatedly produced false "it matches" claims.
- Screenshots are only acceptable as a *supplement*, and only when targeted: **element-clipped** screenshots for legible detail and **hover-state** screenshots (Playwright `.hover()` then capture) for effects. They never replace the rendered-HTML grep.
- State each claim as a checked fact tied to its evidence (the grep command + its output, or the specific clipped/hover capture). No "looks good / faithful replica" without that evidence.

# Content citations (MANDATORY)

Educational / "101" and brand-content pages that state facts drawn from outside sources MUST cite them with links **in the body copy**, not just a footnote:

- Internal references → Next `<Link>` (e.g. to a product page, `/science`, `/approach`).
- External references → the `ExtLink` component in `src/components/brand/BrandSections.tsx` (renders `target="_blank" rel="noopener noreferrer"`).
- Cite only authoritative primary sources — e.g. NIH Office of Dietary Supplements factsheets (`ods.od.nih.gov`), WHO, AHA, NCCIH, NEI. No blogs, no competitor/marketing sites, and **no AI-recalled URLs**.
- **Verify every external URL returns HTTP 200 before shipping:** `curl -s -o /dev/null -L -w "%{http_code}" <url>`. Never ship a citation you have not fetched. If a URL will not verify from here, drop or replace it — do not guess a "probably-right" path.
- End the page with a `ReferencesList` of the sources used.
- Health/product claims stay grounded in the product labels (`design-reference/uploads/product-details/`) and always carry the FDA "has not been evaluated…" disclaimer.

# Images: WebP only, fetched + re-encoded via sharp (MANDATORY)

All raster imagery the site serves is WebP. To add imagery:

- Add an entry to the manifest in `scripts/fetch-pexels.mjs` (`{ out, w, query, orientation }`), then run `PEXELS_API_KEY=… node scripts/fetch-pexels.mjs` (append `--force` to re-fetch existing). It pulls the top Pexels result, downloads the high-res source, and re-encodes to WebP.
- **Re-encode with `sharp`, never ImageMagick.** `sharp` is not hoisted to `node_modules/sharp` — resolve it from the pnpm store (`node_modules/.pnpm/sharp@<ver>/node_modules/sharp`). ⚠️ `convert` on the Windows PATH is the NTFS `convert.exe`, **not** ImageMagick — do not use it.
- Encoding defaults: hero ≈1600w, card/section ≈900–1000w, `.webp({ quality: 80 })`, `resize({ withoutEnlargement: true })`.
- **Never commit the Pexels API key.** Pass it via the `PEXELS_API_KEY` env var only. Photographer credits are recorded in `public/images/pexels-credits.json`.
- Output lands under `public/images/<page>/`; render it with `next/image`.

# Brand voice & content canon

- `src/lib/brand-content.ts` is the single source of truth for Organica Living's brand voice (tagline "nature is our thing", provenance, certifications, sourcing ethics, formulation philosophy), distilled from the product labels. **Extend it** rather than hard-coding brand copy in components.
- The voice is **vitamin / supplement**, not microbiome / probiotic. Strip competitor (Seed) framing on sight — "you are more than human", "complex ecosystem", "DS-01®", etc.
- Brand/learn pages (`/science`, `/sustainability`, `/labs`, `/approach`, `/nutrition-101`, `/vitamins-101`) compose the shared primitives in `src/components/brand/BrandSections.tsx`. `ClosingBand` uses cream (`#fcfcf7`, the same field as the pillar sections), never forest, so it stays visually distinct from the forest footer.

# Responsive layout for inline-styled pages (MANDATORY)

- Home/brand pages use inline styles + `data-*` hooks wired to media queries in `src/app/globals.css` — **not** Tailwind. Reuse existing hooks (`data-rcol2`, `data-rgrid3/6`, `data-brand-cards`) instead of inventing per-page CSS. `data-brand-cards` = N-up desktop → 2-up ≤768 → 1-up ≤520 for text-heavy card grids.
- After adding/altering any page or section, run `npm run audit:responsive` (add the new route to `STATIC_ROUTES` in `scripts/responsive-audit.mjs`). It only catches **horizontal overflow** — for card grids, also confirm columns actually stack (measure computed `grid-template-columns` in Playwright), because a cramped-but-not-overflowing grid still passes the audit.

# Forms & server actions

Follow the established pattern (see `src/lib/auth/actions.ts`, `src/lib/contact/`) — do not invent a new one:

- **Server action** in a `"use server"` file: `(prev: ActionResult | null, formData: FormData) => Promise<ActionResult>`. Validate input with a **zod** schema (colocated `schema.ts`); return `{ ok: false, error, fieldErrors }` on failure or `{ ok: true }` / `redirect()` on success. `ActionResult` + `fieldError()` live in `src/lib/forms.ts`.
- **Client form** (`"use client"`): `useActionState(action, null)`, `<form action={action}>`, inline errors via `fieldError(state, name)`, and a `pending` submit state. Public-facing forms get a hidden **honeypot** field that the action silently short-circuits on.
- Verify auth/authorization **inside** every action — actions are reachable by direct POST, not just via the UI.
- Per AGENTS.md, read `node_modules/next/dist/docs/.../mutating-data.md` before writing a new action.

# Transactional email (Resend)

- Send through `sendEmail({ to, subject, react, replyTo? })` in `src/lib/email/send.ts` — never call the Resend client directly from a page/action. It fails soft (returns `{ ok: false }`, never throws), so handle both outcomes.
- Compose emails as React components with `@react-email/components` under `src/emails/`.
- `RESEND_API_KEY` is required for delivery; without it, actions must degrade gracefully (e.g. the contact form tells the user to email directly).

# Brand assets: logo, favicon, OG image

- Regenerate from the high-res sources in `design-reference/uploads/` via `node scripts/build-brand-assets.mjs` — do not hand-edit the outputs.
- **Logo:** re-encode to **lossless** WebP at native resolution with alpha (`public/organica-living-logo.webp`). In `next/image`, set an intrinsic `width`/`height` at the *true* aspect ratio (890:410) and ~2× the display size so retina stays crisp; scale down with CSS (`height: …; width: auto`).
- **Favicons** use the app-router file conventions (read `.../file-conventions/01-metadata/app-icons.md` first): `src/app/favicon.ico` (multi-size PNG-in-ICO), `src/app/icon.png` (512²), `src/app/apple-icon.png` (180²). Next injects the `<link>` tags automatically — do **not** hand-add icon links in metadata.
- **OG image** is `public/og-image.png` at 1200×630.

# SEO & page metadata

- Global metadata lives in `src/app/layout.tsx`: `metadataBase: new URL(publicEnv.siteUrl)`, a tagline-bearing default `title` ("Organica Living — Nature is our thing"), `description`, `keywords`, `robots`, `alternates.canonical`, and `openGraph` + `twitter` (both referencing `/og-image.png`).
- **Do not add a title `template`** — sub-pages already export full `title: "X — Organica Living"` strings, so a template would double the suffix. Every new page should `export const metadata` (or `generateMetadata`) with its own full-suffixed title + description.
- The tagline is **"Nature is our thing."** Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical/OG URLs are absolute.

# Environment variables & secrets

- Access env through `src/lib/env.ts`: browser-safe values on `publicEnv` (statically inlined `NEXT_PUBLIC_*`), server secrets as **lazy getters** on `serverEnv` (validated on first access; never imported into client components).
- **Never commit secrets or API keys** (Pexels, Resend, Stripe, Supabase service role). Document new vars in `.env.example`.

# Next.js 16 image optimizer & caching (gotchas — cost us real time)

- **`next build` does NOT clear `.next/cache/images`.** Overwriting a `public/` image with the **same filename** leaves Next serving the OLD optimized variant forever. To make an image update actually show: clear the cache (`Remove-Item -Recurse -Force .next` — note `rm -rf` is **denied** by `.claude/settings.local.json`, use PowerShell) **or** rename the file to bust every cache layer.
- **Cache-bust product images by renaming, not a query string.** A `?v=…` query on a Next `<Image>` *local* src is rejected by this optimizer (**HTTP 400**, breaks the image). We version by filename — product mains have an `-hd.webp` copy and the `<Image>` does `src.replace(".webp", "-hd.webp")`.
- **Two render paths behave differently on the same overwrite.** Next `<Image>` surfaces (homepage grid, listing `ProductCard`, listing featured) are optimized + cached → stale until the cache is cleared. Raw CSS `background-image` surfaces (PDP `ProductGallery`, nav thumbnails, cart line items, footer "nature is our thing" band) are **not** optimized → they refresh on a hard reload. This asymmetry is why "it updated on the PDP but not the homepage."
- **A CSS `transform: scale()` on hover does NOT fetch a higher-res image.** Next picks the variant from `sizes` (the REST footprint), so a zoomed image upscales/blurs. Set `sizes` big enough for the enlarged size — product cards that zoom to ~1.875× use `sizes="(max-width:768px) 90vw, 700px"`. Source product photos are 1400×1400. **Verify true served resolution by fetching the exact `/_next/image?url=…&w=…&q=…` URL and measuring it** — Playwright's `img.naturalWidth` under an emulated `deviceScaleFactor` is unreliable (reports a bogus small number).

# Navigation scroll-to-top (Next 16)

Next 16 **no longer overrides** a global `html { scroll-behavior: smooth }` during route changes (this changed from prior versions), so navigations smooth-scroll while the page hydrates and land **shy of the true top**. `<html>` in `layout.tsx` MUST keep **`data-scroll-behavior="smooth"`** — it restores instant scroll-to-top on navigation while keeping smooth in-page anchor scrolling (blog TOC, `#` links). Don't remove it. (See `node_modules/next/dist/docs/.../upgrading/version-16.md` → "Scroll Behavior Override".)

# Product-card hover & click wiring

- Product-card hover is wired **globally** by `SiteInteractions.tsx` (`wireProdCard` binds to `[data-prodcard]` and zooms the inner `<img>` / `[data-prodimg]` / `[data-jar]`). A new product-card surface gets **no** hover unless it has those hooks. Current unified effect: **card stays put** (no lift/shadow — z-index only), inner **product image scales ×1.5 relative to its base transform and spills** outside the tile.
- **Inline `style={{ transform }}` beats a CSS `:hover` transform** (specificity). Product photos carry a base `scale(1.25)` inline, so hover scaling is done in JS (which reads the base and multiplies) — a CSS `:hover` rule would be ignored. Keep this in mind before reaching for CSS hover on these.
- **Overlay-link click pattern:** cards are made fully clickable with `<Link className="absolute inset-0 z-[1]">` and real buttons lifted to `z-[2]`. Raising an *inner* element (e.g. the zoomed image) above the overlay **breaks the card click**. On overlay cards, raise the **card's** z-index on hover; only on single-`<Link>` cards (PDP "Complete your routine.") do you raise the image.
- **To let an image spill out of its tile:** remove `overflow:hidden`, and keep the tile's gradient on a **separate, fixed** element — never layer gradient + image on the one div that scales, or the gradient scales/"raises" too.

# Desktop vs mobile nav are separate lists

`NavMenus.tsx` (desktop dropdowns) and `MobileMenu.tsx` (mobile drawer) are **independent, hardcoded** menu definitions. Menu items, thumbnails (`/images/nav/*`), and hrefs must be edited in **both** to stay in sync — changing one does not update the other. The top-level tabs (Shop/Science/Learn) are real `<Link>`s on desktop (→ `/products`, `/science`, `/blog`) but pane-switchers on mobile.

# Windows / tooling notes

- `rm -rf` / `rm -fr` are **denied** by `.claude/settings.local.json` — clear directories with PowerShell `Remove-Item -Recurse -Force`.
- `sharp` is only in the pnpm store, not hoisted — require it from `node_modules/.pnpm/sharp@<ver>/node_modules/sharp`.
- **`/tmp/...` paths do not resolve for Node/sharp** on this Windows setup (Git Bash mapping) — write temp scripts/files into the project dir and clean them up, don't rely on `/tmp`.

# Definition of done (verification before "it works")

Before claiming any change is complete: **`npx next build`** passes, **`npx eslint <changed files>`** is clean, **`npm run test`** passes if you touched tested code, the **rendered-HTML grep** confirms the expected output (per the mockup rule above), and **`npm run audit:responsive`** is clean for any page you added/changed. State each as a checked fact tied to its evidence.
