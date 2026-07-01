import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/lib/format";
import { defaultVariant, type ProductWithVariants } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { ArrowRight } from "@/components/ui/ArrowRight";

type Props = { products: ProductWithVariants[] };

type HomeGridItem = {
  slug: string;
  badge: string;
  badgeColor: string;
  badgeBg: string;
};

// Home dark-grid is a curated marketing selection (matches the mockup), with
// home-specific badges that are independent of the catalog `badge` column.
const HOME_GRID: HomeGridItem[] = [
  { slug: "multi-pro", badge: "Bestseller", badgeColor: "#1a1a1a", badgeBg: "#62e104" },
  { slug: "optimus-d3", badge: "New", badgeColor: "#62e104", badgeBg: "transparent" },
  { slug: "omega-1000", badge: "New", badgeColor: "#62e104", badgeBg: "transparent" },
  { slug: "sleep-pro", badge: "New", badgeColor: "#62e104", badgeBg: "transparent" },
];

export function ProductsSection({ products }: Props) {
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const display = HOME_GRID.map((g) => {
    const product = bySlug.get(g.slug);
    return product ? { ...g, product } : null;
  }).filter((x): x is HomeGridItem & { product: ProductWithVariants } => x !== null);

  return (
    <section
      style={{ background: "#1c3a13", color: "#fcfcf7", padding: "96px 0" }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
        {/* Header row */}
        <div
          data-reveal
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 40,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(26px,3vw,40px)",
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: 360,
            }}
          >
            Whole body health starts with the right nutrients.
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 48,
              flexWrap: "wrap",
              paddingTop: 4,
            }}
          >
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.5,
                color: "#B9C7B5",
                maxWidth: 380,
              }}
            >
              Clinically formulated vitamins &amp; supplements with key
              scientifically studied ingredients for sustained daily support.
            </p>
            <Link
              href="/products"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#fcfcf7",
                textDecoration: "none",
                whiteSpace: "nowrap",
                borderBottom: "1px solid rgba(243,240,232,.4)",
                paddingBottom: 3,
              }}
            >
              Shop All&nbsp;<ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Product cards grid */}
        <div
          data-reveal
          data-rgrid4-1up
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 16,
          }}
        >
          {display.map(({ product: p, badge, badgeColor, badgeBg }) => {
            const variant = defaultVariant(p);
            const img = imageUrl(p.image_path);
            return (
              <div
                key={p.id}
                data-prodcard
                data-rest-bg="rgba(255,255,255,0.05)"
                data-hover-bg="rgba(255,255,255,0.09)"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 14,
                  padding: "18px 18px 22px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                  transition:
                    "transform 0.3s cubic-bezier(0.75,0,0.25,1), background 0.3s ease",
                }}
              >
                {/* Full-card link → product detail */}
                <Link
                  href={`/products/${p.slug}`}
                  aria-label={`View ${p.name}`}
                  style={{ position: "absolute", inset: 0, zIndex: 1, borderRadius: 14 }}
                />
                {/* Badge + code row */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      lineHeight: 1,
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: ".5px",
                      textTransform: "uppercase",
                      color: badgeColor,
                      background: badgeBg,
                      padding: "4px 9px",
                      borderRadius: 30,
                    }}
                  >
                    {badge}
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      lineHeight: 1,
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#B9C7B5",
                      border: "1px solid rgba(185,199,181,.4)",
                      padding: "4px 9px",
                      borderRadius: 30,
                    }}
                  >
                    {p.category}
                  </span>
                </div>

                {/* Product image — sits directly on the card, no panel/tint
                    behind it (matches the mockup's jar = image-only background). */}
                <div
                  data-jar
                  style={{
                    width: "97%",
                    aspectRatio: "3/4",
                    borderRadius: 8,
                    margin: "6px 0 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    transition: "transform 0.3s cubic-bezier(0.75,0,0.25,1)",
                  }}
                >
                  {img ? (
                    <Image
                      src={img.replace(".webp", "-hd.webp")}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 90vw, 700px"
                      className="object-contain p-1"
                      style={{ transform: "scale(1.25)" }}
                    />
                  ) : null}
                </div>

                {/* Name */}
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.name}
                </div>

                {/* CTA */}
                <Link
                  href={`/products/${p.slug}`}
                  style={{
                    position: "relative",
                    zIndex: 2,
                    lineHeight: 1,
                    display: "block",
                    width: "100%",
                    marginTop: 16,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#fcfcf7",
                    border: "1.5px solid rgba(243,240,232,.5)",
                    padding: "11px 0",
                    borderRadius: 40,
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  Shop Now
                </Link>

                {/* Price */}
                {variant ? (
                  <div
                    style={{ fontSize: 15, color: "#92A48E", marginTop: 12 }}
                  >
                    Starting at{" "}
                    {formatPrice(variant.price_cents, variant.currency)} per
                    month
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
