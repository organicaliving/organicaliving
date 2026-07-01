"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * SiteInteractions — global JS hover wiring, ported faithfully from the
 * mockup's wireInteractions() method in design-reference/Organica Home.dc.html.
 *
 * Wires:
 *  - Pill buttons (a, button with border-radius ≥ 30px or 50%):
 *      transparent → fill (cream/forest swap) + shadow on hover; scale(.96) on press.
 *      filled → translateY(-2px) + brightness(1.1) + warm shadow on hover; scale(.96) on press.
 *      If the button contains [data-arrow] → no lift/fill; only arrow moves.
 *  - [data-arrow] inside any hovered a/button/[data-arrow-host]: translateX(5px).
 *  - [data-prodcard]: translateY(-6px) + shadow on hover; [data-prodimg] or [data-jar] → scale(1.08).
 *  - [data-navrow]: background rgba(0,0,0,0.05) on hover.
 *
 * Idempotent — each element is guarded by a dataset flag so re-runs never
 * double-bind. Listeners are removed on cleanup (route change or unmount).
 */

// Pill radius test — matches the mockup's inline style regex
const PILL_RADIUS_RE = /border-radius:\s*(30px|40px|50%|99px|100%)/;

// We store cleanup fns per element via a WeakMap so we can remove them cleanly
const cleanupMap = new WeakMap<Element, (() => void)[]>();

function removeListeners(el: Element) {
  const fns = cleanupMap.get(el);
  if (fns) {
    fns.forEach((fn) => fn());
    cleanupMap.delete(el);
  }
}

function on<K extends keyof HTMLElementEventMap>(
  el: HTMLElement,
  event: K,
  handler: (e: HTMLElementEventMap[K]) => void,
  cleanups: (() => void)[]
) {
  el.addEventListener(event, handler as EventListener);
  cleanups.push(() => el.removeEventListener(event, handler as EventListener));
}

function isPillButton(el: HTMLElement): boolean {
  // Check inline style first (fast path, matches mockup approach)
  const inlineStyle = el.getAttribute("style") || "";
  if (PILL_RADIUS_RE.test(inlineStyle)) return true;
  // Also check computed border-radius for Tailwind-classed buttons (rounded-pill etc.)
  const cs = getComputedStyle(el);
  const br = cs.borderRadius;
  // Parse first value — handles "40px", "50%", "20px 20px 20px 20px", etc.
  const firstVal = br.split(" ")[0];
  const px = parseFloat(firstVal);
  if (firstVal.endsWith("%")) {
    // 50% circle or any high % counts as pill
    return true;
  }
  return px >= 30;
}

function isTransparent(cs: CSSStyleDeclaration): boolean {
  const bg = cs.backgroundColor;
  return bg === "rgba(0, 0, 0, 0)" || bg === "transparent";
}

function isLightText(cs: CSSStyleDeclaration): boolean {
  const col = cs.color;
  const m = (col.match(/\d+/g) || ["255", "255", "255"]).map(Number);
  return 0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2] > 140;
}

// Checked at event time (not wire time) so the guard tracks dynamic disabled
// state, e.g. a button that toggles between enabled/disabled as a form changes.
function isDisabled(el: HTMLElement): boolean {
  return (
    (el as HTMLButtonElement | HTMLInputElement).disabled === true ||
    el.getAttribute("aria-disabled") === "true"
  );
}

function wirePillButton(btn: HTMLElement) {
  if (btn.dataset.siteHovered) return;
  if (!isPillButton(btn)) return;
  btn.dataset.siteHovered = "1";

  const cleanups: (() => void)[] = [];
  const cs = getComputedStyle(btn);
  const transparent = isTransparent(cs);
  const lightText = isLightText(cs);
  const origColor = cs.color;
  const arrow = btn.querySelector<HTMLElement>("[data-arrow]");

  // Set transition (matches mockup exactly)
  btn.style.transition =
    "background 0.25s cubic-bezier(0.75,0,0.25,1), color 0.25s ease, transform 0.22s cubic-bezier(0.75,0,0.25,1), box-shadow 0.25s ease, filter 0.25s ease";

  const enter = () => {
    if (isDisabled(btn)) return;
    if (arrow) {
      // Arrow button: no lift/fill — only arrow moves
      arrow.style.transform = "translateX(5px)";
    } else {
      btn.style.transform = "translateY(-2px)";
      if (transparent) {
        if (lightText) {
          btn.style.background = "#fcfcf7";
          btn.style.color = "#1c3a13";
        } else {
          btn.style.background = "#1c3a13";
          btn.style.color = "#fcfcf7";
        }
        btn.style.boxShadow = "0 10px 26px rgba(28,58,19,0.16)";
      } else {
        btn.style.filter = "brightness(1.1)";
        btn.style.boxShadow = "0 12px 28px rgba(28,58,19,0.22)";
      }
    }
  };

  const leave = () => {
    btn.style.transform = "translateY(0)";
    btn.style.filter = "none";
    btn.style.boxShadow = "none";
    if (transparent) {
      btn.style.background = "transparent";
      btn.style.color = origColor;
    }
    if (arrow) arrow.style.transform = "translateX(0)";
  };

  const press = () => {
    if (isDisabled(btn)) return;
    btn.style.transform = "translateY(0) scale(0.96)";
  };

  on(btn, "mouseenter", enter, cleanups);
  on(btn, "mouseleave", leave, cleanups);
  on(btn, "mousedown", press, cleanups);
  on(btn, "mouseup", enter, cleanups);
  on(btn, "blur", leave, cleanups);
  cleanupMap.set(btn, cleanups);
}

function wireArrow(arrow: HTMLElement) {
  // Wire [data-arrow] spans that are NOT already inside a pill button we wired
  const host =
    arrow.closest<HTMLElement>("a,button,[data-arrow-host]");
  if (!host) return;
  if (host.dataset.siteHovered) return; // pill button already owns this arrow
  if (host.dataset.siteArrowWired) return;
  host.dataset.siteArrowWired = "1";

  const cleanups: (() => void)[] = [];
  on(host, "mouseenter", () => { arrow.style.transform = "translateX(5px)"; }, cleanups);
  on(host, "mouseleave", () => { arrow.style.transform = "translateX(0)"; }, cleanups);
  cleanupMap.set(host, cleanups);
}

function wireProdCard(card: HTMLElement) {
  if (card.dataset.siteHovered) return;
  card.dataset.siteHovered = "1";

  const img =
    card.querySelector<HTMLElement>("[data-prodimg]") ||
    card.querySelector<HTMLElement>("[data-jar]");

  // Optional background swap on hover (the dark home grid brightens its tint).
  const hoverBg = card.dataset.hoverBg;
  const restBg = card.dataset.restBg;

  card.style.transition =
    "transform 0.3s cubic-bezier(0.75,0,0.25,1), box-shadow 0.3s ease, background 0.3s ease";
  if (img) {
    img.style.transition = "transform 0.3s cubic-bezier(0.75,0,0.25,1)";
  }

  const cleanups: (() => void)[] = [];

  const enter = () => {
    card.style.transform = "translateY(-6px)";
    card.style.boxShadow = "0 22px 50px rgba(28,58,19,0.3)";
    if (hoverBg) card.style.background = hoverBg;
    if (img) img.style.transform = "scale(1.08)";
  };
  const leave = () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "none";
    if (restBg) card.style.background = restBg;
    if (img) img.style.transform = "scale(1)";
  };
  const press = () => {
    card.style.transform = "translateY(-2px) scale(0.985)";
  };

  on(card, "mouseenter", enter, cleanups);
  on(card, "mouseleave", leave, cleanups);
  on(card, "mousedown", press, cleanups);
  on(card, "mouseup", enter, cleanups);
  cleanupMap.set(card, cleanups);
}

// Bare article cards ([data-zoomcard]): zoom the inner [data-prodimg] only,
// contained within its rounded frame — no card lift (the mockup's grid hover).
function wireZoomCard(card: HTMLElement) {
  if (card.dataset.siteZoomWired) return;
  card.dataset.siteZoomWired = "1";

  const img = card.querySelector<HTMLElement>("[data-prodimg]");
  if (img) img.style.transition = "transform 0.35s cubic-bezier(0.75,0,0.25,1)";

  const cleanups: (() => void)[] = [];
  on(card, "mouseenter", () => { if (img) img.style.transform = "scale(1.05)"; }, cleanups);
  on(card, "mouseleave", () => { if (img) img.style.transform = "scale(1)"; }, cleanups);
  cleanupMap.set(card, cleanups);
}

function wireNavRow(row: HTMLElement) {
  if (row.dataset.siteNavWired) return;
  row.dataset.siteNavWired = "1";

  const cleanups: (() => void)[] = [];
  on(row, "mouseenter", () => { row.style.background = "rgba(0,0,0,0.05)"; }, cleanups);
  on(row, "mouseleave", () => { row.style.background = ""; }, cleanups);
  cleanupMap.set(row, cleanups);
}

function wire() {
  // Pill buttons
  document.querySelectorAll<HTMLElement>("a,button").forEach(wirePillButton);

  // Arrows that are NOT already inside a pill button we wired
  document.querySelectorAll<HTMLElement>("[data-arrow]").forEach(wireArrow);

  // Product cards
  document.querySelectorAll<HTMLElement>("[data-prodcard]").forEach(wireProdCard);

  // Bare article cards (image-only zoom)
  document.querySelectorAll<HTMLElement>("[data-zoomcard]").forEach(wireZoomCard);

  // Nav rows
  document.querySelectorAll<HTMLElement>("[data-navrow]").forEach(wireNavRow);
}

function unwireAll(selector: string, flagAttr: string) {
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    removeListeners(el);
    delete el.dataset[flagAttr];
  });
}

function cleanup() {
  unwireAll("a[data-site-hovered],button[data-site-hovered]", "siteHovered");
  unwireAll("[data-site-arrow-wired]", "siteArrowWired");
  unwireAll("[data-prodcard][data-site-hovered]", "siteHovered");
  unwireAll("[data-zoomcard][data-site-zoom-wired]", "siteZoomWired");
  unwireAll("[data-navrow][data-site-nav-wired]", "siteNavWired");
}

/**
 * Scroll-reveal: [data-reveal] elements fade up (opacity 0→1, translateY
 * 24px→0) as they enter the viewport — the mockup's signature section motion.
 * Content is visible in the initial SSR HTML; we "arm" (hide) on mount then
 * reveal, so the page degrades gracefully if JS never runs. Respects
 * prefers-reduced-motion. Returns a teardown for route changes / unmount.
 */
function setupReveals(): () => void {
  const els = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]")
  );
  if (!els.length) return () => {};

  // Accessibility: skip the motion entirely, leave content visible.
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  const reveal = (el: HTMLElement) => {
    if (el.dataset.shown) return;
    el.dataset.shown = "1";
    el.style.transition = "none";
    const dur = 720;
    const startY = 24;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = ease(t);
      el.style.opacity = String(e);
      el.style.transform = `translateY(${(startY * (1 - e)).toFixed(2)}px)`;
      if (t < 1) requestAnimationFrame(step);
      else {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    };
    requestAnimationFrame(step);
  };

  const check = () => {
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.dataset.shown) return;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) reveal(el);
    });
  };

  // Arm: hide and offset every reveal element.
  els.forEach((el) => {
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
  });
  check();
  window.addEventListener("scroll", check, { passive: true });
  window.addEventListener("resize", check, { passive: true });

  // Safety: never leave content hidden if something goes wrong.
  const safety = window.setTimeout(() => {
    els.forEach((el) => {
      if (el.dataset.shown) return;
      el.dataset.shown = "1";
      el.style.transition = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }, 1800);

  return () => {
    window.removeEventListener("scroll", check);
    window.removeEventListener("resize", check);
    window.clearTimeout(safety);
  };
}

/**
 * Table-of-contents scroll-spy ([data-toc]) — ported from the mockup's
 * componentDidMount. The floating contents rail fades in while the article
 * body ([data-articlebody]) is in view and highlights the [data-toclink] whose
 * target heading is currently focused. Hidden below 1100px (no room for the
 * rail). No-op on pages without a [data-toc]. Returns a teardown.
 */
function setupToc(): () => void {
  const toc = document.querySelector<HTMLElement>("[data-toc]");
  const bodySec = document.querySelector<HTMLElement>("[data-articlebody]");
  if (!toc || !bodySec) return () => {};

  const links = Array.from(toc.querySelectorAll<HTMLAnchorElement>("[data-toclink]"));
  const secs = links.map((l) =>
    document.querySelector<HTMLElement>(l.getAttribute("href") || "")
  );

  const onToc = () => {
    const vh = window.innerHeight;
    if (window.innerWidth < 1100) {
      toc.style.opacity = "0";
      toc.style.pointerEvents = "none";
      return;
    }
    const b = bodySec.getBoundingClientRect();
    const show = b.top < vh * 0.55 && b.bottom > vh * 0.35;
    toc.style.opacity = show ? "1" : "0";
    toc.style.pointerEvents = show ? "auto" : "none";
    let active = 0;
    secs.forEach((s, i) => {
      if (s && s.getBoundingClientRect().top < vh * 0.32) active = i;
    });
    links.forEach((l, i) => {
      l.style.color = i === active && show ? "#1c3a13" : "#9a9a8e";
    });
  };

  window.addEventListener("scroll", onToc, { passive: true });
  window.addEventListener("resize", onToc, { passive: true });
  onToc();

  return () => {
    window.removeEventListener("scroll", onToc);
    window.removeEventListener("resize", onToc);
  };
}

export function SiteInteractions() {
  const pathname = usePathname();

  useEffect(() => {
    wire();
    const teardownReveals = setupReveals();
    const teardownToc = setupToc();
    return () => {
      cleanup();
      teardownReveals();
      teardownToc();
    };
  // Re-wire on every route change so newly rendered pages get wired
  }, [pathname]);

  return null;
}
