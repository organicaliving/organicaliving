@AGENTS.md

# Mockup replication — verification rule (MANDATORY)

When replicating the `design-reference/*.dc.html` mockups (any page, component, copy, or effect), you MUST verify with **precise evidence — grep of the actual rendered HTML, not screenshots.**

- Build and serve the app (e.g. `next start`), then `curl` the route and **grep the served HTML** for the exact expected content: specific copy/blurbs, element counts (e.g. exactly one announcement bar), the presence/absence of elements (e.g. the cart link is absent when the cart is empty), real product data, etc. The grep result is the proof.
- **Do NOT claim a page "matches the mockup" based on full-page screenshots.** Downscaled full-page screenshots cannot render small text (blurbs), cannot show hover/interaction effects (they are static), and have repeatedly produced false "it matches" claims.
- Screenshots are only acceptable as a *supplement*, and only when targeted: **element-clipped** screenshots for legible detail and **hover-state** screenshots (Playwright `.hover()` then capture) for effects. They never replace the rendered-HTML grep.
- State each claim as a checked fact tied to its evidence (the grep command + its output, or the specific clipped/hover capture). No "looks good / faithful replica" without that evidence.
