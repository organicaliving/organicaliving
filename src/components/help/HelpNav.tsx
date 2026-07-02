import Link from "next/link";
import type { HelpCategory } from "@/lib/help/content";
import { ArrowRight } from "@/components/ui/ArrowRight";

/* ------------------------------------------------------------------ */
/* Search form — visual affordance only (non-JS, plain <form>)          */
/* ------------------------------------------------------------------ */

function HelpSearch() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        maxWidth: "480px",
        border: "1px solid #d5d9c8",
        borderRadius: "40px",
        padding: "5px 6px 5px 20px",
        background: "#fcfcf7",
      }}
    >
      <input
        type="search"
        placeholder="Search the help center…"
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          color: "#1a1a1a",
          fontSize: "15px",
          fontFamily: "inherit",
          outline: "none",
        }}
      />
      <button
        type="button"
        aria-label="Search"
        style={{
          flexShrink: 0,
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background: "#1c3a13",
          border: "none",
          color: "#fcfcf7",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArrowRight size={16} strokeWidth={2.1} />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Category tile — CrossLinks visual language                           */
/* ------------------------------------------------------------------ */

function CategoryTile({ category }: { category: HelpCategory }) {
  return (
    <Link
      href={`/help/${category.slug}`}
      style={{
        display: "block",
        background: "#fcfcf7",
        borderRadius: "18px",
        padding: "30px 26px",
        textDecoration: "none",
        border: "1px solid #d5d9c8",
      }}
    >
      {category.icon && (
        <div style={{ fontSize: "28px", marginBottom: "12px" }}>{category.icon}</div>
      )}
      <h3 style={{ fontSize: "20px", fontWeight: 500, color: "#1a1a1a" }}>
        {category.title}
      </h3>
      <p
        style={{
          fontSize: "16px",
          lineHeight: 1.55,
          color: "#5e5e5e",
          marginTop: "10px",
        }}
      >
        {category.blurb}
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
        Browse <ArrowRight size={14} />
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Public component                                                      */
/* ------------------------------------------------------------------ */

export function HelpNav({ categories }: { categories: HelpCategory[] }) {
  return (
    <div>
      {/* Search affordance */}
      <div style={{ marginBottom: "40px" }}>
        <HelpSearch />
      </div>

      {/* Category grid */}
      <div
        data-brand-cards
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "18px",
        }}
      >
        {categories.map((c) => (
          <CategoryTile key={c.slug} category={c} />
        ))}
      </div>
    </div>
  );
}
