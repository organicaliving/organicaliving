import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getActiveProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/ProductCard";
import { defaultVariant } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { imageUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: "Shop All — Organica Living",
  description: "Browse the full Organica Living supplement range — clinical-grade nutrition for every stage of life.",
};

export default async function ProductsPage() {
  const products = await getActiveProducts();

  // First product is the featured bestseller (sort_order = 1)
  const [featured, ...rest] = products;
  const featuredVariant = featured ? defaultVariant(featured) : undefined;
  const featuredImg = featured ? imageUrl(featured.image_path) : null;

  return (
    <>
      {/* ── Products Hero ──────────────────────────────────── */}
      <section className="relative flex min-h-[190px] items-center overflow-hidden py-8">
        {/* gradient background */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(120deg,#8a9a5f,#4a5f33 60%,#6b7a45)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,30,15,.25), rgba(20,30,15,.05))" }}
        />
        <div className="relative mx-auto w-full max-w-[1440px] px-10">
          <span className="mb-3.5 inline-block font-mono text-[11px] uppercase tracking-[1.5px] text-white/70">
            The Collection · 9 Formulas
          </span>
          <h1
            className="max-w-[600px] font-light leading-[1.1] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(28px,3.2vw,42px)" }}
          >
            Clinical-grade nutrition for every stage of life.
          </h1>
        </div>
      </section>

      {/* ── Featured Bestseller + Quiz CTA ─────────────────── */}
      <section className="bg-forest pb-[60px] pt-10">
        <div
          className="mx-auto max-w-[1440px] px-10"
          style={{ display: "grid", gridTemplateColumns: "1.62fr 1fr", gap: "18px" }}
        >
          {/* Featured product card */}
          {featured && (
            <div
              className="relative rounded-[18px] bg-[#22401a] p-10"
              style={{
                display: "grid",
                gridTemplateColumns: "0.9fr 1.1fr",
                gap: "24px",
                alignItems: "center",
              }}
            >
              {/* Full-card link → product detail */}
              <Link
                href={`/products/${featured.slug}`}
                aria-label={`View ${featured.name}`}
                className="absolute inset-0 z-[1] rounded-[18px]"
              />

              {/* Bestseller badge */}
              <span className="absolute left-[18px] top-[18px] z-[2] inline-block rounded-[30px] bg-lime px-3 py-1 text-[11px] font-semibold leading-none text-ink">
                Bestseller
              </span>

              {/* product image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px]">
                {featuredImg ? (
                  <Image
                    src={featuredImg.replace(".webp", "-hd.webp")}
                    alt={featured.name}
                    fill
                    sizes="(max-width: 1024px) 90vw, 700px"
                    className="object-contain p-3"
                    style={{ transform: "scale(1.25)" }}
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 rounded-[14px] bg-pine/30" />
                )}
              </div>

              {/* content */}
              <div className="text-cream">
                {/* category pill */}
                <span className="mb-3 inline-block rounded-[30px] border border-white/35 px-[11px] py-1 text-[11px] font-medium leading-none text-cream">
                  {featured.category}
                </span>

                <h2
                  className="font-light leading-[1.1] tracking-[-0.01em] text-white"
                  style={{ fontSize: "clamp(24px,2.4vw,32px)" }}
                >
                  {featured.name}
                </h2>

                {featured.description && (
                  <p className="mt-3 max-w-[440px] text-[16px] font-light leading-[1.55] text-moss">
                    {featured.description}
                  </p>
                )}

                {featuredVariant && (
                  <div className="mt-[18px] text-[18px]">
                    {formatPrice(featuredVariant.price_cents, featuredVariant.currency)}
                  </div>
                )}

                <div className="relative z-[2] mt-[18px] flex items-center gap-[18px]">
                  <Link
                    href={`/products/${featured.slug}`}
                    className="inline-block rounded-[40px] bg-cream px-[30px] py-3 text-[13px] font-medium leading-none text-forest transition-[filter] duration-[250ms] hover:brightness-105"
                  >
                    Learn More
                  </Link>
                  <Link
                    href={`/products/${featured.slug}`}
                    className="text-[13px] font-medium text-cream underline"
                  >
                    Add To Cart
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Quiz CTA */}
          <div
            className="relative flex min-h-[300px] items-end overflow-hidden rounded-[18px] p-6"
            style={{
              background:
                "linear-gradient(to top, rgba(18,28,12,.78) 0%, rgba(18,28,12,.25) 45%, rgba(18,28,12,.05) 100%), url(/images/take-the-quiz.webp) center/cover no-repeat",
              backgroundColor: "#2c4a35",
            }}
          >
            <div className="text-cream">
              <p className="max-w-[280px] text-[19px] leading-[1.3]">
                Not sure where to start? Find your formula in 60 seconds.
              </p>
              <Link
                href="/products"
                className="mt-2 inline-block text-[14px] font-medium text-cream underline"
              >
                Take the Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Products Grid ───────────────────────────────── */}
      <section className="bg-cream">
        <div
          className="relative -mt-[26px] rounded-[26px_26px_0_0] bg-cream px-0 pb-[90px] pt-12"
        >
          <div className="mx-auto max-w-[1440px] px-10">
            {/* section header */}
            <div className="mb-7 flex flex-wrap items-baseline justify-between gap-4">
              <h2
                className="font-light tracking-[-0.01em] text-ink"
                style={{ fontSize: "clamp(22px,2.2vw,30px)" }}
              >
                All Products
              </h2>
              <span className="font-mono text-[11px] uppercase tracking-[1px] text-soft">
                9 formulas · vegan &amp; non-GMO
              </span>
            </div>

            {/* 2-column product grid */}
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: "1fr 1fr" }}
            >
              {rest.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
