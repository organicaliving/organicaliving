import type { ShippingMethod } from "@/lib/checkout/types";

export const FREE_SHIPPING_THRESHOLD_CENTS = 5000;
export const STANDARD_SHIPPING_CENTS = 599;

export function computeShipping(subtotalCents: number): ShippingMethod {
  if (subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS) {
    return { id: "free", label: "Free shipping", amountCents: 0 };
  }
  return { id: "standard", label: "Standard shipping", amountCents: STANDARD_SHIPPING_CENTS };
}
