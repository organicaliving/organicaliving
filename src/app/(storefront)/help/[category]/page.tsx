import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HELP_CATEGORIES, getCategory } from "@/lib/help/content";
import { SectionIntro, ClosingBand } from "@/components/brand/BrandSections";
import { HelpNav } from "@/components/help/HelpNav";
import { ArrowRight } from "@/components/ui/ArrowRight";

export function generateStaticParams() {
  return HELP_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "Help — Organica Living" };
  return {
    title: `${cat.title} — Help — Organica Living`,
    description: cat.blurb,
  };
}

export default async function HelpCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

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
          <Link href="/" style={{ color: "#8a8a80", textDecoration: "none" }}>
            Home
          </Link>
          {" / "}
          <Link
            href="/help"
            style={{ color: "#8a8a80", textDecoration: "none" }}
          >
            Help Center
          </Link>
          {" / "}
          <span style={{ color: "#1a1a1a" }}>{cat.title}</span>
        </div>
      </div>

      {/* ── Category header ────────────────────────────────────────── */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "48px 40px 56px" }}>
        {cat.icon && (
          <div style={{ fontSize: 36, marginBottom: 20 }}>{cat.icon}</div>
        )}
        <SectionIntro eyebrow="Help Center" title={cat.title} lede={cat.blurb} />
      </section>

      {/* ── Article grid ───────────────────────────────────────────── */}
      <section
        style={{
          background: "#f3f0e8",
          padding: "64px 40px",
        }}
      >
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div
            data-brand-cards
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "18px",
            }}
          >
            {cat.articles.map((article) => (
              <Link
                key={article.slug}
                href={`/help/${cat.slug}/${article.slug}`}
                style={{
                  display: "block",
                  background: "#fcfcf7",
                  borderRadius: "18px",
                  padding: "28px 26px",
                  textDecoration: "none",
                  border: "1px solid #d5d9c8",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "#1a1a1a",
                    lineHeight: 1.3,
                  }}
                >
                  {article.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "#5e5e5e",
                    marginTop: "10px",
                  }}
                >
                  {article.summary}
                </p>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    marginTop: "16px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#1c3a13",
                  }}
                >
                  Read article <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other categories ───────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "72px 40px",
        }}
      >
        <SectionIntro
          eyebrow="All topics"
          title="Browse other topics."
          lede="Find answers across every part of the help center."
        />
        <div style={{ marginTop: "40px" }}>
          <HelpNav categories={HELP_CATEGORIES} />
        </div>
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
