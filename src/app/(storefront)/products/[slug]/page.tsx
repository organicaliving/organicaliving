import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getProductSlugs } from "@/lib/catalog";
import { defaultVariant, type FactRow } from "@/lib/products";
import { imageUrl } from "@/lib/format";
import { PriceDisplay } from "@/components/catalog/PriceDisplay";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Disclaimer } from "@/components/site/Disclaimer";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found — Organica Living" };
  return {
    title: `${product.name} — Organica Living`,
    description: product.description ?? product.subtitle ?? undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const variant = defaultVariant(product);
  const img = imageUrl(product.image_path);
  const facts = product.facts[0];
  const factRows = (facts?.rows as FactRow[] | undefined) ?? [];
  const benefits = (product.benefits as string[] | undefined) ?? [];

  return (
    <main className="mx-auto max-w-[1180px] px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="relative aspect-square w-full rounded-lg bg-header">
          {img ? (
            <Image
              src={img}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-8"
              priority
            />
          ) : null}
        </div>

        <div>
          {product.badge ? <Badge label={product.badge} /> : null}
          <p className="mt-3 font-mono text-xs uppercase tracking-wide text-muted">
            {product.category}
          </p>
          <h1 className="mt-1 text-4xl font-light tracking-tight text-ink">{product.name}</h1>
          {product.subtitle ? (
            <p className="mt-2 text-lg text-muted">{product.subtitle}</p>
          ) : null}
          {product.description ? (
            <p className="mt-4 text-ink/80">{product.description}</p>
          ) : null}

          {variant ? (
            <div className="mt-6">
              <PriceDisplay
                priceCents={variant.price_cents}
                subscriptionPriceCents={variant.subscription_price_cents}
                compareAtCents={variant.compare_at_cents}
                currency={variant.currency}
              />
            </div>
          ) : null}

          {/* Add to Cart is wired up in the cart/checkout plan. */}
          <div className="mt-6">
            <Button>Add to Cart</Button>
          </div>

          {benefits.length > 0 ? (
            <ul className="mt-8 space-y-2">
              {benefits.map((b) => (
                <li key={b} className="text-sm text-ink/80">
                  • {b}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {factRows.length > 0 ? (
        <section className="mt-16 max-w-md rounded-md border border-line bg-header p-6">
          <h2 className="text-lg font-medium text-ink">Supplement Facts</h2>
          {facts?.serving_size ? (
            <p className="mt-1 font-mono text-xs text-muted">
              Serving size: {facts.serving_size}
            </p>
          ) : null}
          <table className="mt-4 w-full text-sm">
            <tbody>
              {factRows.map((row, i) => (
                <tr key={`${row.name}-${i}`} className="border-t border-line">
                  <td className="py-2 text-ink">{row.name}</td>
                  <td className="py-2 text-right text-ink">{row.amount ?? ""}</td>
                  <td className="py-2 text-right text-muted">{row.dv ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {facts?.warnings ? (
            <p className="mt-4 text-xs text-muted">{facts.warnings}</p>
          ) : null}
        </section>
      ) : null}

      <div className="mt-12">
        <Disclaimer />
      </div>
    </main>
  );
}
