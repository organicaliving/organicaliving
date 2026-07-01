# Full Mobile-Responsiveness Pass — Design

**Date:** 2026-07-01
**Branch:** feat/phase-V-visual-fidelity
**Goal:** Genuine mobile-perfect responsiveness across every page, section, and component.

## Bar

For each route, guarantee at 320 / 375 / 768 px:
- No horizontal overflow (`scrollWidth <= clientWidth`).
- Text legible, not clipped or overlapping.
- Interactive targets ~44px tappable.
- Sensible stacking / reflow (multi-column collapses to single, nav collapses to burger).

This is **"genuine mobile-perfect,"** not mere mockup parity: we port every responsive rule the
source `.dc.html` mockup defines, and additionally fix mobile breakage where the mockup is silent or
itself breaks — deviating from the mockup when it isn't mobile-sound, staying in the site's voice.

## Mechanism (fixed by architecture)

Components are inline-styled (`style={{}}`) to mirror the desktop-first mockups. Inline styles cannot
carry media queries, so all responsive behavior lives in `src/app/globals.css` through the two channels
the mockups themselves use:

1. **`data-*` attribute hooks** — e.g. `data-rgrid4`, `data-rcol2`, `data-pdp-hero`, `data-co-grid`,
   burger nav (`data-burger` / `data-mobile-menu`).
2. **`[style*="…"]` inline-style substring overrides** — e.g.
   `[style*="padding: 15px 40px"]{ padding-left:20px !important }`. **These are currently unported**
   and are a primary cause of cramped/overflowing sections on mobile.

Where a component lacks the hook it needs, add the `data-*` attribute to the JSX and the rule to
globals.css. Do **not** rewrite components into Tailwind responsive utilities — that diverges from the
mockup-replication pattern.

## Scope — all 18 routes + shared chrome

Shared chrome first (renders on every page): Header, mobile nav (MobileMenu / NavMenus / AccountMenu /
SignInMenu), AnnouncementBar, Footer.

Then: home (Hero, StoryMarquee, MoreThanHuman, Formula, DailyEssentials, Transformations, ClosingCta,
Products), products list, PDP (`[slug]`), cart, checkout, checkout/success, blog, blog/[slug], login,
signup, forgot-password, reset-password, auth/confirmed, account, orders, subscriptions, refer,
design-system.

## Verification (per page — evidence, not assertion)

Build + `next start`, then for each route:
1. **grep rendered HTML** for responsive `data-*` hooks and real content (proves structure present).
2. **Playwright** at 320/375/768/1024: assert `scrollWidth <= clientWidth`; report offending elements.
3. **Spot screenshot** at 375px for legibility.

Every claim is tied to its command output. No "looks good" without evidence (per CLAUDE.md mandate).

## Process

1. Build app; start `next start`.
2. Author one Playwright audit script that visits all routes at all widths and reports overflow +
   offending elements → objective per-page defect list.
3. Fix shared chrome, then page-by-page (port mockup rules + add site-voice fixes).
4. Re-run audit until clean at every route × width.
5. Grep + spot-screenshot confirmation per page.

Work on the current working tree as-is; do not touch the in-flight auth-route move.
