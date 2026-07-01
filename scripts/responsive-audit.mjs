/**
 * Responsive regression audit.
 *
 * Drives every storefront route in headless Chromium at a set of real device
 * widths and asserts there is NO horizontal overflow (documentElement
 * scrollWidth <= clientWidth). When a route overflows it prints the elements
 * sitting at the true overflow edge so the culprit is obvious.
 *
 * Why this exists: responsiveness here is bolted onto inline-styled components
 * via `data-*` hooks + media queries in globals.css. A new section that forgets
 * its hook silently overflows on mobile — static-HTML grep can't catch that, but
 * this can. Run it after adding/altering any page or section.
 *
 * Usage:
 *   node scripts/responsive-audit.mjs                 # audits BASE (default :3000)
 *   node scripts/responsive-audit.mjs http://localhost:3009
 *   node scripts/responsive-audit.mjs :3009 home pdp  # only named routes
 *
 * Env:
 *   BASE="http://localhost:3009"   base URL (overridden by a URL/:port arg)
 *   WIDTHS="320,375,768,1024"       comma-separated viewport widths
 *
 * Exit code: 0 if all audited routes are clean, 1 if any overflow / error / 4xx-5xx.
 * Note: /checkout renders its two-column grid only with a populated cart, and
 *       /checkout/success needs Stripe redirect params — both are still checked
 *       for overflow in whatever state they render.
 */
import { chromium } from "playwright";

// ---- config ----
const arg0 = process.argv[2] || "";
const isBaseArg = /^(https?:\/\/|:)/.test(arg0);
let BASE = process.env.BASE || "http://localhost:3000";
if (isBaseArg) BASE = arg0.startsWith(":") ? `http://localhost${arg0}` : arg0;
BASE = BASE.replace(/\/$/, "");
const nameFilter = process.argv.slice(isBaseArg ? 3 : 2);
const WIDTHS = (process.env.WIDTHS || "320,360,375,414,768,1024")
  .split(",")
  .map((n) => parseInt(n, 10))
  .filter(Boolean);

// Static routes. Dynamic ones (pdp, blog-article) resolve a real slug at runtime.
const STATIC_ROUTES = [
  ["/", "home"],
  ["/products", "products"],
  ["/cart", "cart"],
  ["/checkout", "checkout"],
  ["/checkout/success?payment_intent=pi_x&payment_intent_client_secret=s_x", "checkout-success"],
  ["/blog", "blog"],
  ["/science", "science"],
  ["/sustainability", "sustainability"],
  ["/labs", "labs"],
  ["/approach", "approach"],
  ["/nutrition-101", "nutrition-101"],
  ["/vitamins-101", "vitamins-101"],
  ["/contact", "contact"],
  ["/login", "login"],
  ["/signup", "signup"],
  ["/forgot-password", "forgot-password"],
  ["/reset-password", "reset-password"],
  ["/auth/confirmed", "auth-confirmed"],
  ["/account", "account"],
  ["/orders", "orders"],
  ["/subscriptions", "subscriptions"],
  ["/refer", "refer"],
  ["/design-system", "design-system"],
];

const browser = await chromium.launch();

async function firstHref(path, selector) {
  const page = await browser.newPage();
  try {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle", timeout: 30000 });
    return await page.evaluate((sel) => {
      const a = document.querySelector(sel);
      return a ? a.getAttribute("href") : null;
    }, selector);
  } catch {
    return null;
  } finally {
    await page.close();
  }
}

// resolve dynamic routes
const routes = [...STATIC_ROUTES];
const pdp = await firstHref("/products", 'a[href^="/products/"]');
if (pdp) routes.splice(2, 0, [pdp, "pdp"]);
const article = await firstHref("/blog", 'a[href^="/blog/"]');
if (article) routes.push([article, "blog-article"]);

const active = nameFilter.length ? routes.filter(([, n]) => nameFilter.includes(n)) : routes;

const results = [];
for (const [path, name] of active) {
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      isMobile: width < 768,
    });
    const page = await ctx.newPage();
    try {
      const resp = await page.goto(`${BASE}${path}`, { waitUntil: "networkidle", timeout: 30000 });
      const status = resp ? resp.status() : 0;
      await page.waitForTimeout(400);
      const data = await page.evaluate((vw) => {
        const de = document.documentElement;
        const sw = de.scrollWidth;
        const overflowX = sw > de.clientWidth + 1;
        const offenders = [];
        if (overflowX) {
          for (const el of document.querySelectorAll("*")) {
            const r = el.getBoundingClientRect();
            // elements at the true overflow edge (ignore clipped-far elements)
            if (r.right > vw + 1 && r.right <= sw + 2 && r.width > 0) {
              offenders.push({
                tag: el.tagName.toLowerCase(),
                data: [...el.attributes].filter((a) => a.name.startsWith("data-")).map((a) => a.name).join(","),
                right: Math.round(r.right),
                width: Math.round(r.width),
                text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 34),
              });
            }
          }
          offenders.sort((a, b) => b.right - a.right);
        }
        return { scrollWidth: sw, clientWidth: de.clientWidth, overflowX, offenders: offenders.slice(0, 3) };
      }, width);
      results.push({ name, path, width, status, ...data });
    } catch (e) {
      results.push({ name, path, width, status: 0, error: String(e).slice(0, 120) });
    }
    await ctx.close();
  }
}
await browser.close();

// ---- report ----
console.log(`\nResponsive audit  base=${BASE}  widths=[${WIDTHS.join(",")}]\n`);
let anyFail = false;
for (const [path, name] of active) {
  const rows = results.filter((r) => r.name === name);
  const bad = rows.filter((r) => r.overflowX || r.error || (r.status && r.status >= 400));
  if (bad.length) anyFail = true;
  console.log(`[${bad.length ? "FAIL" : " ok "}] ${name}  (${path})`);
  for (const r of rows) {
    if (!r.overflowX && !r.error && r.status < 400) continue;
    const flag = r.overflowX
      ? `OVERFLOW scrollWidth=${r.scrollWidth} > clientWidth=${r.clientWidth}`
      : r.error
        ? `ERROR ${r.error}`
        : `HTTP ${r.status}`;
    console.log(`        ${String(r.width).padStart(4)}px  ${flag}`);
    for (const o of r.offenders || []) {
      console.log(`             > <${o.tag}> right=${o.right} w=${o.width} data=[${o.data}] "${o.text}"`);
    }
  }
}
console.log(`\n${anyFail ? "==== DEFECTS FOUND ====" : "==== ALL CLEAN ===="}\n`);
process.exit(anyFail ? 1 : 0);
