import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/lib/format";
import { defaultVariant, type ProductWithVariants } from "@/lib/products";
import { formatPrice } from "@/lib/format";

type Props = { products: ProductWithVariants[] };

export function ProductsSection({ products }: Props) {
  const display = products.slice(0, 4);

  return (
    <section
      style={{ background: "#1c3a13", color: "#fcfcf7", padding: "96px 0" }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
        {/* Header row */}
        <div
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
                fontSize: 14,
                lineHeight: 1.5,
                color: "#B9C7B5",
                maxWidth: 340,
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
              Shop All &nbsp;→
            </Link>
          </div>
        </div>

        {/* Product cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 16,
          }}
        >
          {display.map((p) => {
            const variant = defaultVariant(p);
            const img = imageUrl(p.image_path);
            return (
              <div
                key={p.id}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 14,
                  padding: "18px 18px 22px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition:
                    "transform 0.3s cubic-bezier(0.75,0,0.25,1), background 0.3s ease",
                }}
              >
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
                  {p.badge ? (
                    <span
                      style={{
                        display: "inline-block",
                        lineHeight: 1,
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: ".5px",
                        textTransform: "uppercase",
                        color: "#1a1a1a",
                        background: "#62e104",
                        padding: "4px 9px",
                        borderRadius: 30,
                      }}
                    >
                      {p.badge}
                    </span>
                  ) : (
                    <span />
                  )}
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

                {/* Product image */}
                <div
                  style={{
                    width: "78%",
                    aspectRatio: "3/4",
                    borderRadius: 8,
                    margin: "6px 0 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.04)",
                    transition: "transform 0.3s cubic-bezier(0.75,0,0.25,1)",
                  }}
                >
                  {img ? (
                    <Image
                      src={img}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-contain p-2"
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
                    style={{ fontSize: 12, color: "#92A48E", marginTop: 12 }}
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
