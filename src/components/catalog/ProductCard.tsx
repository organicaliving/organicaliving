import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { PriceDisplay } from "@/components/catalog/PriceDisplay";
import { defaultVariant, type ProductWithVariants } from "@/lib/products";

export function ProductCard({ product }: { product: ProductWithVariants }) {
  const variant = defaultVariant(product);
  const img = imageUrl(product.image_path);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col rounded-lg border border-line bg-header p-4 transition hover:shadow-lg"
    >
      {product.badge ? (
        <span className="absolute right-4 top-4 z-10">
          <Badge label={product.badge} />
        </span>
      ) : null}

      <div className="relative aspect-[4/5] w-full">
        {img ? (
          <Image
            src={img}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-2 transition group-hover:scale-105"
          />
        ) : null}
      </div>

      <div className="mt-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
          {product.category}
        </p>
        <h3 className="mt-1 text-lg font-medium text-ink">{product.name}</h3>
        {product.subtitle ? (
          <p className="text-sm text-muted">{product.subtitle}</p>
        ) : null}
        {variant ? (
          <div className="mt-3">
            <PriceDisplay
              priceCents={variant.price_cents}
              subscriptionPriceCents={variant.subscription_price_cents}
              compareAtCents={variant.compare_at_cents}
              currency={variant.currency}
            />
          </div>
        ) : null}
      </div>
    </Link>
  );
}
