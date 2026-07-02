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

      {/* ── Article content ────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 780,
          margin: "0 auto",
          padding: "48px 40px 80px",
        }}
      >
        <HelpArticle article={art} />
      </section>

      {/* ── Closing band ───────────────────────────────────────────── */}
      <ClosingBand
        title="Still need help?"
        body="Our care team is happy to answer anything not covered here. Drop us a line and we will get back to you within one to two business days."
        cta={{ href: "/contact", label: "Get in touch" }}
      />
    </main>
  );
}
