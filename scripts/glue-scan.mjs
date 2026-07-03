/**
 * Rendered-HTML "glued words" scanner. Fetches each route, strips tags/scripts,
 * decodes entities, and flags likely missing-space bugs in visible copy.
 * Usage: node scripts/glue-scan.mjs http://localhost:3105
 */
const base = process.argv[2] || "http://localhost:3105";
const routes = [
  "/terms", "/privacy", "/accessibility", "/consent",
  "/practitioners", "/press", "/careers",
  "/help", "/help/orders-shipping", "/help/subscriptions",
  "/help/returns-refunds", "/help/products-usage", "/help/account-payments",
  "/help/about-contact",
  "/help/subscriptions/how-subscribe-and-save-works",
  "/help/returns-refunds/how-to-start-a-return",
  "/help/products-usage/allergens-and-certifications",
  "/help/orders-shipping/placing-an-order",
];

// Known-safe tokens that legitimately contain the patterns below.
const SAFE = [
  "e.g.", "i.e.", "U.S.", "U.K.", "D3", "K2", "5-HTP", "L-Theanine", "CoQ10",
  "cGMP", "GDPR", "CCPA", "COPPA", "SCCs", "L-5", "DS-", "IExplore",
];

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    // React separator comments render as ZERO width in the browser — strip them
    // to nothing (not a space) so glued words become detectable, matching what a
    // user actually sees. This is the key to catching {expr}word glue bugs.
    .replace(/<!--\s*-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&mdash;/g, "—").replace(/&ndash;/g, "–")
    .replace(/&ldquo;|&rdquo;/g, '"').replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&nbsp;/g, " ").replace(/&#x27;|&#39;/g, "'")
    .replace(/&bull;/g, "•").replace(/&hellip;/g, "…")
    .replace(/&gt;/g, ">").replace(/&lt;/g, "<")
    .replace(/\s+/g, " ")
    .trim();
}

const patterns = [
  // a period/letter directly followed by an uppercase letter (sentence glue),
  // e.g. "Co.operates" would be lower — so also catch period+lowercase.
  { name: "period-glue", re: /\b[A-Za-z]{2,}\.[A-Za-z][a-z]{2,}/g },
  // lowercase letter immediately followed by uppercase (word glue) e.g. "checkoutRead"
  { name: "camel-glue", re: /\b[a-z]{3,}[A-Z][a-z]{2,}/g },
  // doubled word: "the the"
  { name: "doubled-word", re: /\b(\w+)\s+\1\b/gi },
  // stray marker leftovers
  { name: "marker", re: /\[\[[A-Z]/g },
];

function isSafe(match) {
  return SAFE.some((s) => match.includes(s) || s.includes(match));
}

const results = [];
for (const route of routes) {
  let html;
  try {
    const res = await fetch(base + route);
    html = await res.text();
  } catch (e) {
    results.push(`FETCH FAIL ${route}: ${e.message}`);
    continue;
  }
  const text = visibleText(html);
  for (const { name, re } of patterns) {
    const hits = [...text.matchAll(re)].map((m) => m[0]);
    for (const h of new Set(hits)) {
      if (isSafe(h)) continue;
      // context
      const idx = text.indexOf(h);
      const ctx = text.slice(Math.max(0, idx - 30), idx + h.length + 30);
      results.push(`${route} [${name}] «${h}»  …${ctx}…`);
    }
  }
}
if (results.length === 0) console.log("NO GLUE ISSUES FOUND");
else console.log(results.join("\n"));
