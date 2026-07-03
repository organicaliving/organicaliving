import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, allArticleParams } from "@/lib/help/content";
import { HelpArticle } from "@/components/help/HelpArticle";
import { ClosingBand } from "@/components/brand/BrandSections";

export function generateStaticParams() {
  return allArticleParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; article: string }>;
}): Promise<Metadata> {
  const { category, article } = await params;
  const found = getArticle(category, article);
  if (!found)
    return { title: "Article Not Found — Help — Organica Living" };
  return {
    title: `${found.article.title} — Help — Organica Living`,
    description: found.article.summary,
  };
}

export default async function HelpArticlePage({
  params,
}: {
  params: Promise<{ category: string; article: string }>;
}) {
  const { category, article } = await params;
  const found = getArticle(category, article);
  if (!found) notFound();

  const { category: cat, article: art } = found;

  return (
    <main style={{ background: "#fcfcf7" }}>
      {/* ── Breadcrumb ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "22px 40px 0" }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: ".5px",
            color: "#8a8a80",
            fontFamily: "var(--font-mono)",
          }}
        >
          <Link href="/help" style={{ color: "#8a8a80", textDecoration: "none" }}>
            Help
          </Link>
          {" / "}
          <Link
            href={`/help/${cat.slug}`}
            style={{ color: "#8a8a80", textDecoration: "none" }}
          >
            {cat.title}
          </Link>
          {" / "}
          <span style={{ color: "#1a1a1a" }}>{art.title}</span>
        </div>
      </div>

      {/* ── Article + sibling sidebar ──────────────────────────────────
          Two-column layout (article beside a sticky "more in this topic"
          sidebar), centered as a pair so the page fills the width like the
          rest of the site. Collapses to one column ≤900px via data-rcol2. */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "40px 40px 80px" }}>
        <div
          data-rcol2
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 760px) 280px",
            justifyContent: "center",
            columnGap: 64,
            rowGap: 48,
            alignItems: "start",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <HelpArticle article={art} />
          </div>

          {/* Sticky sidebar — other articles in this category */}
          <aside style={{ position: "sticky", top: 24, alignSelf: "start" }}>
            <div
              style={{
                background: "#f4f1e6",
                border: "1px solid #d5d9c8",
                borderRadius: 14,
                padding: "24px 24px 26px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#2c4a35",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 16,
                }}
              >
                More in {cat.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {cat.articles
                  .filter((a) => a.slug !== art.slug)
                  .map((a) => (
                    <Link
                      key={a.slug}
                      href={`/help/${cat.slug}/${a.slug}`}
                      style={{
                        fontSize: 14.5,
                        lineHeight: 1.4,
                        color: "#1c3a13",
                        textDecoration: "none",
                      }}
                    >
                      {a.title}
                    </Link>
                  ))}
              </div>
              <Link
                href={`/help/${cat.slug}`}
                style={{
                  display: "inline-block",
                  marginTop: 20,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#8a8a80",
                  textDecoration: "none",
                }}
              >
                View all {cat.title} →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Closing band ───────────────────────────────────────────── */}
      <ClosingBand
        title="Still need help?"
        body="Our care team is happy to answer anything not covered here. Drop us a line and we will get back to you within one to two business days."
        cta={{ href: "/contact", label: "Get in touch" }}
      />
    </main>
  );
}
