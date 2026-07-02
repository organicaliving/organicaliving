import type { Metadata } from "next";
import Link from "next/link";
import {
  BrandHero,
  SectionIntro,
  ClosingBand,
} from "@/components/brand/BrandSections";
import { HelpNav } from "@/components/help/HelpNav";
import { HELP_CATEGORIES } from "@/lib/help/content";

export const metadata: Metadata = {
  title: "Help Center — Organica Living",
  description:
    "Answers to your questions about orders, subscriptions, returns, product usage, and more — from the Organica Living team.",
};

/**
 * Derive popular articles from real slugs: first article of each of the first
 * five categories, so links are guaranteed valid.
 */
const popularArticles = HELP_CATEGORIES.slice(0, 5).map((cat) => ({
  href: `/help/${cat.slug}/${cat.articles[0].slug}`,
  title: cat.articles[0].title,
  category: cat.title,
}));

export default function HelpPage() {
  return (
    <main style={{ background: "#fcfcf7" }}>
      {/* 1 — Hero */}
      <BrandHero
        eyebrow="Help Center"
        title="How can we help?"
        subtitle="Browse topics below or search for a specific question. Our team is always a short email away if you need a hand."
        image="/images/nutrition-101/nutrition-hero.webp"
        alt="Colourful arrangement of whole fruits and vegetables on a light surface"
        cta={{ href: "/contact", label: "Contact us" }}
      />

      {/* 2 — Search + category tiles */}
      <section
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "72px 40px",
        }}
      >
        <HelpNav categories={HELP_CATEGORIES} />
      </section>

      {/* 3 — Popular articles */}
      <section
        style={{
          background: "#f3f0e8",
          padding: "72px 40px",
        }}
      >
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <SectionIntro
            eyebrow="Quick answers"
            title="Popular articles."
            lede="The questions we hear most often — answered in one place."
          />
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "40px 0 0",
              display: "flex",
              flexDirection: "column",
              gap: "0",
              borderTop: "1px solid #d5d9c8",
            }}
          >
            {popularArticles.map((article) => (
              <li
                key={article.href}
                style={{ borderBottom: "1px solid #d5d9c8" }}
              >
                <Link
                  href={article.href}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "16px",
                    padding: "22px 4px",
                    textDecoration: "none",
                    color: "#1a1a1a",
                  }}
                >
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: 400,
                      lineHeight: 1.45,
                    }}
                  >
                    {article.title}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: "13px",
                      color: "#5e5e5e",
                      fontWeight: 500,
                    }}
                  >
                    {article.category}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 — Closing band */}
      <ClosingBand
        title="Still need help?"
        body="Our care team is happy to answer anything not covered here. Drop us a line and we will get back to you within one to two business days."
        cta={{ href: "/contact", label: "Get in touch" }}
      />
    </main>
  );
}
