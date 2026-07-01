import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/ArrowRight";

export const metadata: Metadata = {
  title: "Cultured — Organica Living",
  description:
    "Science-backed, rigorously sourced reads on vitamins, nutrition, and whole-body health.",
};

/* ------------------------------------------------------------------ */
/* Blogs ("Cultured") — faithful port of design-reference/Blogs.dc.html.  */
/* A public storefront page: the announcement bar, header (with all nav   */
/* dropdowns, sign-in + mobile menus), footer and "nature is our thing"   */
/* band are owned by the (storefront) layout chrome, so this file renders  */
/* only the page body. Probiotic/microbiome mockup copy is converted to    */
/* the site's vitamin/supplement voice, matching NavMenus + Footer.        */
/* Hover/scroll motion (data-reveal, data-prodcard, data-zoomcard,         */
/* data-arrow) is wired globally by SiteInteractions.                      */
/* ------------------------------------------------------------------ */

const MONO = "var(--font-mono), monospace";

// Category filter pills (hero). "All" is the active/selected state.
const FILTERS = [
  "All",
  "Nutrition",
  "Vitamins & Minerals",
  "Science",
  "Sustainability",
] as const;

// Article grid — Pexels photos (re-encoded to WebP, see public/images/blog/),
// layered over the mockup gradient as a fallback. Titles and categories carry
// the vitamin-voice conversion used across the site.
const ARTICLES: Array<{
  category: string;
  title: string;
  read: string;
  img: string;
  bg: string;
}> = [
  {
    category: "Nutrition",
    title: "How to Decipher a Supplement Facts Label",
    read: "6 min read",
    img: "/images/blog/decipher-supplement-facts-label.webp",
    bg: "linear-gradient(160deg,#cdbfae,#8a7a64)",
  },
  {
    category: "Vitamins & Minerals",
    title: "Your Top Multivitamin Questions, Answered",
    read: "9 min read",
    img: "/images/blog/multivitamin-questions.webp",
    bg: "linear-gradient(160deg,#3a4733,#1d2618)",
  },
  {
    category: "Science",
    title: "Your Definitive Guide to the Essential Vitamins",
    read: "7 min read",
    img: "/images/blog/essential-vitamins-guide.webp",
    bg: "linear-gradient(160deg,#7d8a52,#48571f)",
  },
  {
    category: "Nutrition",
    title: "Should We All Be Taking Vitamin D?",
    read: "5 min read",
    img: "/images/blog/taking-vitamin-d.webp",
    bg: "linear-gradient(160deg,#9aae86,#4d6b3e)",
  },
  {
    category: "Sustainability",
    title: "Inside the Sourcing of Our Clinically-Studied Ingredients",
    read: "8 min read",
    img: "/images/blog/sourcing-ingredients.webp",
    bg: "linear-gradient(160deg,#5a6b7a,#2f3f47)",
  },
  {
    category: "Vitamins & Minerals",
    title: "Exploring the Vitamins Your Body Needs",
    read: "12 min read",
    img: "/images/blog/exploring-vitamins.webp",
    bg: "linear-gradient(160deg,#6f9a6a,#3a5a35)",
  },
  {
    category: "Science",
    title: "Nutrition 101: The Essential Nutrients Powering Your Health",
    read: "6 min read",
    img: "/images/blog/nutrition-101.webp",
    bg: "linear-gradient(160deg,#a9d6c0,#4d8a72)",
  },
  {
    category: "Science",
    title: "Vitamins 101: How Key Nutrients Shape Your Health",
    read: "7 min read",
    img: "/images/blog/vitamins-101.webp",
    bg: "linear-gradient(160deg,#7fa56a,#3f5a30)",
  },
];

export default function BlogPage() {
  return (
    <main>
      {/* ── Blogs hero ─────────────────────────────────────── */}
      <section style={{ background: "#fcfcf7", padding: "56px 0 40px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          <div data-reveal style={{ maxWidth: "760px" }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: "12px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#1c3a13",
              }}
            >
              Cultured
            </div>
            <h1
              style={{
                fontSize: "clamp(34px,4.4vw,60px)",
                fontWeight: 300,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
                marginTop: "18px",
              }}
            >
              Stories from the frontier of nutritional science.
            </h1>
            <p
              style={{
                marginTop: "20px",
                fontSize: "16px",
                lineHeight: 1.55,
                color: "#3a3a36",
                maxWidth: "520px",
              }}
            >
              Science-backed, rigorously sourced reads on vitamins, nutrition,
              and whole-body health.
            </p>
          </div>

          <div
            data-reveal
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "36px",
            }}
          >
            {FILTERS.map((label, i) => {
              const active = i === 0;
              return (
                <span
                  key={label}
                  style={{
                    display: "inline-block",
                    lineHeight: 1,
                    fontSize: "13px",
                    fontWeight: 500,
                    color: active ? "#fcfcf7" : "#1a1a1a",
                    background: active ? "#1c3a13" : "transparent",
                    border: `1px solid ${active ? "#1c3a13" : "#d7d3c6"}`,
                    borderRadius: "30px",
                    padding: "9px 20px",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured article ───────────────────────────────── */}
      <section style={{ background: "#fcfcf7", padding: "24px 0 56px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          <Link
            href="/blog/setting-a-new-standard-for-supplement-quality"
            data-prodcard
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 1fr",
              gap: "36px",
              alignItems: "center",
              background: "#f4f1e6",
              borderRadius: "22px",
              padding: "24px",
              textDecoration: "none",
              transition:
                "transform .3s cubic-bezier(0.75,0,0.25,1), box-shadow .3s ease",
            }}
          >
            <div
              style={{
                aspectRatio: "16 / 10",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <div
                data-prodimg
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "url(/images/blog/setting-a-new-standard.webp) center / cover no-repeat, linear-gradient(150deg,#cfd6c8,#7d8f6a)",
                  transition: "transform .35s cubic-bezier(0.75,0,0.25,1)",
                }}
              />
            </div>
            <div style={{ padding: "12px 24px 12px 0" }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "11px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "#1c3a13",
                }}
              >
                Featured · Science
              </div>
              <h2
                style={{
                  fontSize: "clamp(24px,2.6vw,34px)",
                  fontWeight: 300,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.12,
                  marginTop: "14px",
                  color: "#1a1a1a",
                }}
              >
                How Organica Living Is Setting a New Standard for Supplement
                Quality
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.55,
                  color: "#3a3a36",
                  marginTop: "14px",
                  maxWidth: "440px",
                }}
              >
                Double-blind, randomized, placebo-controlled trials are the gold
                standard of medicine. Here&apos;s how Organica Living brings that
                rigor to the supplement space.
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "18px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#1c3a13",
                }}
              >
                Read article{" "}
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Article grid ───────────────────────────────────── */}
      <section style={{ background: "#fcfcf7", padding: "0 0 96px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          <div
            data-reveal
            data-rgrid4
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "28px 24px",
            }}
          >
            {ARTICLES.map((a) => (
              <Link
                key={a.title}
                href="#"
                data-zoomcard
                style={{
                  textDecoration: "none",
                  transition: "transform .3s cubic-bezier(0.75,0,0.25,1)",
                }}
              >
                <div
                  style={{
                    aspectRatio: "4 / 3",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
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
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: "11px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#6d6d6d",
                    marginTop: "16px",
                  }}
                >
                  {a.category}
                </div>
                <div
                  style={{
                    fontSize: "19px",
                    fontWeight: 300,
                    color: "#1a1a1a",
                    lineHeight: 1.25,
                    marginTop: "8px",
                  }}
                >
                  {a.title}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#6d6d6d",
                    marginTop: "10px",
                  }}
                >
                  {a.read}
                </div>
              </Link>
            ))}
          </div>

          <div
            data-reveal
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "56px",
            }}
          >
            <Link
              href="#"
              style={{
                display: "inline-block",
                lineHeight: 1,
                fontSize: "14px",
                fontWeight: 500,
                color: "#1a1a1a",
                border: "1.5px solid #1a1a1a",
                padding: "14px 32px",
                borderRadius: "40px",
                textDecoration: "none",
              }}
            >
              Load more articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
