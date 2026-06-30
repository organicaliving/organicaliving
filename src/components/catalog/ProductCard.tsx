import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/lib/format";
import { formatPrice } from "@/lib/format";
import { defaultVariant, type ProductWithVariants } from "@/lib/products";

/**
 * ProductCard — horizontal layout matching Products.dc.html.
 * Sand bg, image left (0.85fr), content right (1.15fr).
 * Hover: card lifts -4px + shadow; image scales 1.04.
 */
export function ProductCard({ product }: { product: ProductWithVariants }) {
  const variant = defaultVariant(product);
  const img = imageUrl(product.image_path);
  const href = `/products/${product.slug}`;

  const isBestseller =
    product.badge?.toLowerCase() === "bestseller";
  const isNew =
    product.badge?.toLowerCase() === "new";

  return (
    <div
      className="group relative cursor-pointer rounded-[18px] bg-[#f4f1e6] p-6 transition-[transform,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.75,0,0.25,1)] hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(0,0,0,0.10)]"
      style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "20px", alignItems: "center" }}
    >
      {/* overlay link — full card clickable */}
      <Link
        href={href}
        aria-label={`View ${product.name}`}
        className="absolute inset-0 z-[1] rounded-[18px]"
      />

      {/* badge (New / Bestseller) — top-left */}
      {(isBestseller || isNew) && (
        <span className="absolute left-3.5 top-3.5 z-[2] inline-block rounded-[30px] bg-lime px-[11px] py-1 text-[11px] font-semibold leading-none text-ink">
          {product.badge}
        </span>
      )}

      {/* product image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl transition-transform duration-300 [transition-timing-function:cubic-bezier(0.75,0,0.25,1)] group-hover:scale-[1.04]">
        {img ? (
          <Image
            src={img}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 40vw, 20vw"
            className="object-contain p-2"
          />
        ) : (
          <div className="absolute inset-0 rounded-xl bg-panel" />
        )}
      </div>

      {/* content */}
      <div>
        {/* category pill */}
        <span className="mb-2.5 inline-block rounded-[30px] border border-[#cfd3c4] px-2.5 py-1 text-[11px] font-medium leading-none text-forest">
          {product.category}
        </span>

        <h3 className="text-[21px] font-light leading-[1.1] tracking-[-0.01em] text-ink">
          {product.name}
        </h3>

        {product.subtitle && (
          <p className="mt-2.5 text-[13px] leading-[1.5] text-[#3a3a36]">
            {product.subtitle}
          </p>
        )}

        {variant && (
          <div className="mt-3.5 flex items-baseline gap-2">
            <span className="text-[17px] font-normal text-ink">
              {formatPrice(variant.price_cents, variant.currency)}
            </span>
            {variant.compare_at_cents ? (
              <span className="text-sm text-muted line-through">
                {formatPrice(variant.compare_at_cents, variant.currency)}
              </span>
            ) : null}
          </div>
        )}

        <div className="relative z-[2] mt-[18px] flex items-center gap-[18px]">
          <Link
            href={href}
            className="inline-block rounded-[40px] bg-forest px-[26px] py-[11px] text-[13px] font-medium leading-none text-cream transition-[filter,box-shadow] duration-[250ms] [transition-timing-function:cubic-bezier(0.75,0,0.25,1)] hover:brightness-110 hover:shadow-card"
          >
            Learn More
          </Link>
          <Link
            href={href}
            className="text-[13px] font-medium text-ink underline"
          >
            Add To Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
