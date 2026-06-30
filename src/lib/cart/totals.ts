import type { Discount } from "@/lib/cart/types";

export function computeDiscountCents(subtotalCents: number, discount: Discount | null): number {
  if (!discount) return 0;
  const raw = discount.type === "percent"
    ? Math.floor((subtotalCents * discount.value) / 100)
    : discount.value;
  return Math.max(0, Math.min(raw, subtotalCents));
}

export function computeTotals(
  lines: { unitCents: number; quantity: number }[],
  discount: Discount | null,
): { subtotalCents: number; discountCents: number; totalCents: number; itemCount: number } {
  const subtotalCents = lines.reduce((s, l) => s + l.unitCents * l.quantity, 0);
  const itemCount = lines.reduce((s, l) => s + l.quantity, 0);
  const discountCents = computeDiscountCents(subtotalCents, discount);
  return { subtotalCents, discountCents, totalCents: subtotalCents - discountCents, itemCount };
}
