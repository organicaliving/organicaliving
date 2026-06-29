import { formatPrice } from "@/lib/format";

type Props = {
  priceCents: number;
  subscriptionPriceCents?: number | null;
  compareAtCents?: number | null;
  currency?: string;
};

export function PriceDisplay({
  priceCents,
  subscriptionPriceCents,
  compareAtCents,
  currency = "USD",
}: Props) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-baseline gap-2">
        <span className="text-lg text-ink">{formatPrice(priceCents, currency)}</span>
        {compareAtCents ? (
          <span className="text-sm text-muted line-through">
            {formatPrice(compareAtCents, currency)}
          </span>
        ) : null}
      </div>
      {subscriptionPriceCents ? (
        <span className="font-mono text-[11px] text-muted">
          {formatPrice(subscriptionPriceCents, currency)} subscribe &amp; save
        </span>
      ) : null}
    </div>
  );
}
