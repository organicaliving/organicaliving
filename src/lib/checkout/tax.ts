import "server-only";
import { stripe } from "@/lib/stripe";
import type { CartLine } from "@/lib/cart/types";
import type { CheckoutAddress } from "@/lib/checkout/types";

export function toTaxLineItems(lines: CartLine[]): { amount: number; reference: string }[] {
  return lines.map((l) => ({ amount: l.unitCents * l.quantity, reference: l.variantId }));
}

export async function computeTax(args: {
  lines: CartLine[];
  address: CheckoutAddress;
  shippingCents: number;
}): Promise<{ taxCents: number; calculationId: string | null }> {
  try {
    const calc = await stripe.tax.calculations.create({
      currency: "usd",
      line_items: toTaxLineItems(args.lines).map((li) => ({
        amount: li.amount,
        reference: li.reference,
        tax_behavior: "exclusive",
      })),
      shipping_cost: { amount: args.shippingCents },
      customer_details: {
        address: {
          line1: args.address.line1,
          line2: args.address.line2,
          city: args.address.city,
          state: args.address.state,
          postal_code: args.address.postalCode,
          country: args.address.country,
        },
        address_source: "shipping",
      },
    });
    return { taxCents: calc.tax_amount_exclusive, calculationId: calc.id };
  } catch (err) {
    console.warn("[tax] Stripe Tax unavailable; defaulting to $0.", (err as Error).message);
    return { taxCents: 0, calculationId: null };
  }
}
