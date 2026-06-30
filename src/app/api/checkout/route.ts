import { NextResponse, type NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { getCart } from "@/lib/cart/queries";
import { checkoutSchema } from "@/lib/checkout/schemas";
import { computeShipping } from "@/lib/checkout/shipping";
import { computeTax } from "@/lib/checkout/tax";
import { createPendingOrder } from "@/lib/orders/write";
import type { CheckoutQuote } from "@/lib/checkout/types";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout details." }, { status: 400 });
  }
  const cart = await getCart();
  if (cart.lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const address = {
    line1: parsed.data.line1,
    line2: parsed.data.line2,
    city: parsed.data.city,
    state: parsed.data.state,
    postalCode: parsed.data.postalCode,
    country: parsed.data.country,
  };

  const shipping = computeShipping(cart.subtotalCents);
  const tax = await computeTax({ lines: cart.lines, address, shippingCents: shipping.amountCents });

  // Total is computed server-side from trusted cart values; discount is already in cart.discountCents.
  const subtotalCents = cart.subtotalCents;
  const discountCents = cart.discountCents;
  const shippingCents = shipping.amountCents;
  const taxCents = tax.taxCents;
  const totalCents = subtotalCents - discountCents + shippingCents + taxCents;

  const quote: CheckoutQuote = {
    subtotalCents,
    discountCents,
    shippingCents,
    taxCents,
    totalCents,
    currency: cart.currency,
  };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { orderId } = await createPendingOrder({
    userId: user?.id ?? null,
    email: parsed.data.email,
    lines: cart.lines,
    quote,
    shippingAddress: address,
    discountCode: cart.code,
  });

  const intent = await stripe.paymentIntents.create({
    amount: quote.totalCents,
    currency: quote.currency,
    automatic_payment_methods: { enabled: true },
    receipt_email: parsed.data.email,
    metadata: {
      order_id: orderId,
      ...(tax.calculationId ? { tax_calculation: tax.calculationId } : {}),
    },
  });

  return NextResponse.json({ clientSecret: intent.client_secret, quote });
}
