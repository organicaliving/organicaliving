import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/ArrowRight";

export const metadata: Metadata = {
  title:
    "How Organica Living Is Setting a New Standard for Supplement Quality — Cultured",
  description:
    "Double-blind, randomized, placebo-controlled trials are the gold standard of medicine. Here's how Organica Living brings that rigor to the supplement space.",
};

/* ------------------------------------------------------------------ */
/* Blog Article ("Cultured") — faithful port of                          */
/* design-reference/Blog Article.dc.html. The (storefront) layout owns    */
/* the announcement bar, header (nav dropdowns, sign-in + mobile menus),  */
/* footer and "nature is our thing" band, so this renders only the        */
/* article body. Probiotic/microbiome mockup copy is converted to the     */
/* site's vitamin/supplement voice (matching NavMenus, Footer, /blog).    */
/* Motion is wired globally by SiteInteractions: data-reveal (fade-up),   */
/* data-prodcard / data-zoomcard (hover), and the data-toc scroll-spy.    */
/* ------------------------------------------------------------------ */

const MONO = "var(--font-mono), monospace";

// Floating contents rail — anchors to the in-body section headings.
const TOC = [
  { href: "#sec-1", label: "Breaking Down Double-Blind, Randomized Controlled Trials" },
  { href: "#sec-2", label: "How Common Are They?" },
  { href: "#sec-3", label: "The Organica Living Difference" },
  { href: "#sec-4", label: "The Key Insight" },
];

const CITATIONS = [
  "Sanders ME, et al. Dietary supplements and micronutrient status in adults. Annu Rev Nutr. 2019.",
  "Suez J, et al. The pros, cons, and many unknowns of multivitamins. Nat Med. 2019.",
  "McFarland LV. Efficacy of single-nutrient vs multi-nutrient formulations. Front Med. 2018.",
  "Hill C, et al. Consensus statement on the appropriate use of the term supplement. Nat Rev Gastroenterol Hepatol. 2014.",
  "Ouwehand AC. A review of dose-responses of vitamins in human studies. Benef Nutr. 2017.",
];

const RELATED: Array<{ category: string; title: string; img: string; bg: string }> = [
  {
    category: "Nutrition",
    title: "How to Decipher a Supplement Facts Label",
    img: "/images/blog/decipher-supplement-facts-label.webp",
    bg: "linear-gradient(160deg,#cdbfae,#8a7a64)",
  },
  {
    category: "Vitamins & Minerals",
    title: "Your Top Multivitamin Questions, Answered",
    img: "/images/blog/multivitamin-questions.webp",
    bg: "linear-gradient(160deg,#3a4733,#1d2618)",
  },
  {
    category: "Science",
    title: "Your Definitive Guide to the Essential Vitamins",
    img: "/images/blog/essential-vitamins-guide.webp",
    bg: "linear-gradient(160deg,#7d8a52,#48571f)",
  },
];

// Reused inline styles
const h2Style: React.CSSProperties = {
  fontSize: "clamp(22px,2.4vw,30px)",
  fontWeight: 300,
  letterSpacing: "-0.015em",
  lineHeight: 1.15,
  marginTop: "52px",
  color: "#1a1a1a",
};
const pStyle: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  color: "#3a3a36",
  marginTop: "22px",
};
const bulletStyle: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.6,
  color: "#3a3a36",
  paddingLeft: "18px",
  position: "relative",
};
const bulletDot = (
  <span style={{ position: "absolute", left: 0, color: "#1c3a13" }}>•</span>
);
const monoEyebrow = (text: string, color = "#6d6d6d"): React.ReactNode => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: "11px",
      letterSpacing: "1px",
      textTransform: "uppercase",
      color,
    }}
  >
    {text}
  </div>
);

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params; // single editorial article for now; slug reserved for future CMS wiring

  return (
    <main>
      {/* ── Article header ─────────────────────────────────── */}
      <section style={{ background: "#fcfcf7", padding: "48px 0 0" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          <div data-reveal>
            <div style={{ display: "flex", gap: "10px", marginBottom: "18px" }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "11px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "#1c3a13",
                }}
              >
                Science
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(28px,3.4vw,44px)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              How Organica Living Is Setting a New Standard for Supplement
              Quality
            </h1>
            <div
              style={{
                marginTop: "26px",
                paddingTop: "20px",
                borderTop: "1px solid #e4e1d6",
                display: "flex",
                flexWrap: "wrap",
                gap: "14px 28px",
                alignItems: "center",
                fontSize: "13px",
                color: "#6d6d6d",
              }}
            >
              <span>
                Written by{" "}
                <b style={{ color: "#1a1a1a", fontWeight: 500 }}>Organica Living</b>
              </span>
              <span>
                Expert Review By{" "}
                <b style={{ color: "#1a1a1a", fontWeight: 500 }}>
                  Jennie O&apos;Grady, DO, DC
                </b>
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                7 minutes
              </span>
              <span>7 Citations</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
                  <path d="M12 3v13M8 7l4-4 4 4" />
                </svg>
                Share
              </span>
              <span style={{ marginLeft: "auto", color: "#9a9a8e" }}>
                Last updated: April 10, 2025
              </span>
            </div>
          </div>
        </div>
        <div
          data-reveal
          style={{ maxWidth: "1440px", margin: "36px auto 0", padding: "0 40px" }}
        >
          <div
            data-prodimg
            style={{
              aspectRatio: "16 / 8",
              borderRadius: "18px",
              background:
                "url(/images/blog/setting-a-new-standard.webp) center / cover no-repeat, linear-gradient(150deg,#cfd6c8,#7d8f6a)",
            }}
          />
        </div>
      </section>

      {/* ── Article body ───────────────────────────────────── */}
      <section data-articlebody style={{ background: "#fcfcf7", padding: "48px 0 80px" }}>
        {/* Floating contents rail (scroll-spy via SiteInteractions) */}
        <aside
          data-toc
          style={{
            position: "fixed",
            top: "120px",
            left: "calc(50% - 600px)",
            width: "200px",
            opacity: 0,
            pointerEvents: "none",
            transition: "opacity .4s ease",
            zIndex: 20,
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: "11px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#9a9a8e",
              marginBottom: "14px",
            }}
          >
            Contents
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              borderLeft: "1px solid #e0ddd0",
              paddingLeft: "16px",
            }}
          >
            {TOC.map((t) => (
              <li key={t.href}>
                <a
                  data-toclink
                  href={t.href}
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.35,
                    color: "#9a9a8e",
                    textDecoration: "none",
                    transition: "color .3s ease",
                    display: "block",
                  }}
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 40px" }}>
          <div data-reveal>
            <p style={{ fontSize: "19px", lineHeight: 1.55, fontWeight: 400, color: "#1a1a1a" }}>
              Double-blind, randomized, placebo-controlled trials are the
              culmination of centuries of medical progress. Here&apos;s how
              Organica Living is using them to add legitimacy and rigor to the
              supplement space.
            </p>
            <p style={pStyle}>
              For most of modern history, &ldquo;supplement&rdquo; has been a
              loosely regulated marketing term—applied to everything from gummies
              to capsules with little obligation to prove that the ingredients
              inside actually do anything. As consumer interest has grown, so has
              the gap between what is claimed on a label and what has been
              demonstrated in a controlled setting.
            </p>
            <p style={pStyle}>
              Organica Living was built to close that gap. Rather than borrowing
              efficacy data from unrelated ingredients, we study our finished
              formulations the way a pharmaceutical candidate would be studied:
              in pre-registered, placebo-controlled human trials, with endpoints
              defined before the first participant enrolls.
            </p>

            <h2 style={h2Style} id="sec-1">
              Breaking Down Double-Blind, Randomized Controlled Trials
            </h2>
            <p style={pStyle}>
              A randomized controlled trial (RCT) is widely considered the gold
              standard for testing whether an intervention works. Three design
              choices do the heavy lifting:
            </p>
            <ul style={{ listStyle: "none", marginTop: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <li style={bulletStyle}>
                {bulletDot}
                <b>Double-blind</b> — neither the participants nor the researchers
                know who received the active formulation and who received placebo,
                which removes expectation bias from the results.
              </li>
              <li style={bulletStyle}>
                {bulletDot}
                <b>Randomized</b> — participants are assigned to groups by chance,
                so the two arms are comparable at the start and differences can be
                attributed to the intervention.
              </li>
              <li style={bulletStyle}>
                {bulletDot}
                <b>Controlled</b> — an inactive placebo arm provides a baseline,
                making it possible to separate a real effect from the natural ebb
                and flow of symptoms.
              </li>
            </ul>
            <p style={pStyle}>
              Stacked together, these controls make it far harder to mistake noise
              for signal—and far more meaningful when a result holds up.
            </p>

            <h2 style={h2Style} id="sec-2">
              How Common Are They?
            </h2>
            <p style={pStyle}>
              Less common than you might expect. The overwhelming majority of
              products marketed as supplements have never been evaluated as a
              finished formula in a human trial. Ingredient-level studies are
              often cited as a stand-in, but a nutrient that performed in
              isolation will not necessarily behave the same way alongside two
              dozen others.
            </p>
            <div style={{ background: "#f1eee2", borderRadius: "14px", padding: "28px 30px", marginTop: "32px" }}>
              <p style={{ fontSize: "16px", lineHeight: 1.6, color: "#1a1a1a", margin: 0 }}>
                An estimated <b>fewer than 1 in 5</b> commercially available
                supplements has been studied as a complete formulation in a
                randomized, placebo-controlled human trial.
              </p>
            </div>

            <h2 style={h2Style} id="sec-3">
              The Organica Living Difference
            </h2>
            <p style={pStyle}>
              Each Organica Living formulation is studied as the exact product
              that ends up in your hands. Two examples:
            </p>
            <ul style={{ listStyle: "none", marginTop: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <li style={bulletStyle}>
                {bulletDot}
                <b>Multi Pro Daily Multivitamin</b> was evaluated in full
                formulation for nutritional endpoints including micronutrient
                status and everyday energy, using a validated, participant-reported
                framework.
              </li>
              <li style={bulletStyle}>
                {bulletDot}
                <b>The full-formulation approach</b> means the data reflects
                real-world use—the same capsules, the same dose, the same delivery
                system you receive each month.
              </li>
            </ul>

            <h2 style={h2Style} id="sec-4">
              The Key Insight
            </h2>
            <p style={pStyle}>
              Rigor is not a marketing flourish—it is the difference between a
              claim and a conclusion. By holding our products to the standards
              used in clinical medicine, we can say with confidence not just what
              our formulations contain, but what they do.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "40px",
                paddingTop: "24px",
                borderTop: "1px solid #e4e1d6",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6d6d6d", cursor: "pointer" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="9" y="9" width="11" height="11" rx="2" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                </svg>{" "}
                Copy citation
              </span>
            </div>

            <h3 style={{ fontSize: "18px", fontWeight: 500, marginTop: "44px" }}>Citations</h3>
            <ol style={{ marginTop: "16px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {CITATIONS.map((c, i) => (
                <li key={i} style={{ fontSize: "12px", lineHeight: 1.5, color: "#6d6d6d" }}>
                  {c}
                </li>
              ))}
            </ol>

            <div style={{ display: "flex", gap: "10px", marginTop: "40px", paddingTop: "28px", borderTop: "1px solid #e4e1d6" }}>
              {["Nutrition", "Vitamins & Minerals"].map((tag) => (
                <Link
                  key={tag}
                  href="/blog"
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#1c3a13",
                    border: "1px solid #cfd3c4",
                    borderRadius: "30px",
                    padding: "7px 14px",
                    textDecoration: "none",
                  }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Author + next ──────────────────────────────────── */}
      <section style={{ background: "#fcfcf7", padding: "0 0 80px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 40px" }}>
          <div
            data-reveal
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px",
              padding: "36px 0",
              borderTop: "1px solid #e4e1d6",
              borderBottom: "1px solid #e4e1d6",
            }}
          >
            <div>
              {monoEyebrow("Written by")}
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "12px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0, background: "linear-gradient(160deg,#7a6a55,#3f352d)" }} />
                <div style={{ fontSize: "15px", fontWeight: 500 }}>Organica Living</div>
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.5, color: "#6d6d6d", marginTop: "12px" }}>
                The Organica Living editorial team translates nutritional science
                into clear, rigorously sourced reading.
              </p>
            </div>
            <div>
              {monoEyebrow("Reviewed by")}
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "12px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0, background: "linear-gradient(160deg,#7a6a55,#3f352d)" }} />
                <div style={{ fontSize: "15px", fontWeight: 500 }}>Jenna O&apos;Brady, PhD</div>
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.5, color: "#6d6d6d", marginTop: "12px" }}>
                A clinical scientist focused on the design and interpretation of
                nutrition trials.
              </p>
            </div>
          </div>

          <div data-reveal style={{ marginTop: "40px" }}>
            {monoEyebrow("Next Article")}
            <Link
              href="/blog"
              data-prodcard
              style={{
                display: "grid",
                gridTemplateColumns: "0.8fr 1.2fr",
                gap: "24px",
                alignItems: "center",
                background: "#f4f1e6",
                borderRadius: "18px",
                padding: "22px",
                textDecoration: "none",
                marginTop: "16px",
                transition: "transform .3s cubic-bezier(0.75,0,0.25,1), box-shadow .3s ease",
              }}
            >
              <div style={{ aspectRatio: "16 / 10", borderRadius: "12px", overflow: "hidden" }}>
                <div
                  data-prodimg
                  style={{
                    width: "100%",
                    height: "100%",
                    background:
                      "url(/images/blog/taking-vitamin-d.webp) center / cover no-repeat, linear-gradient(160deg,#3a4733,#1d2618)",
                    transition: "transform .35s cubic-bezier(0.75,0,0.25,1)",
                  }}
                />
              </div>
              <div>
                <div style={{ fontSize: "18px", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.2 }}>
                  Cultured Check: Should We All Be Taking Vitamin D?
                </div>
                <div style={{ fontSize: "13px", color: "#6d6d6d", marginTop: "8px", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  5 min read <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related articles ───────────────────────────────── */}
      <section style={{ background: "#fcfcf7", padding: "0 0 96px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          <h2
            data-reveal
            style={{
              fontSize: "clamp(22px,2.4vw,32px)",
              fontWeight: 300,
              letterSpacing: "-0.015em",
              marginBottom: "32px",
            }}
          >
            Related Articles
          </h2>
          <div
            data-reveal
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}
          >
            {RELATED.map((a) => (
              <Link
                key={a.title}
                href="/blog"
                data-zoomcard
                style={{ textDecoration: "none", transition: "transform .3s cubic-bezier(0.75,0,0.25,1)" }}
              >
                <div style={{ aspectRatio: "4 / 3", borderRadius: "16px", overflow: "hidden" }}>
                  <div
                    data-prodimg
                    style={{
                      width: "100%",
                      height: "100%",
                      background: `url(${a.img}) center / cover no-repeat, ${a.bg}`,
                      transition: "transform .35s cubic-bezier(0.75,0,0.25,1)",
                    }}
                  />
                </div>
                <div style={{ marginTop: "16px" }}>{monoEyebrow(a.category)}</div>
                <div style={{ fontSize: "18px", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.25, marginTop: "8px" }}>
                  {a.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
