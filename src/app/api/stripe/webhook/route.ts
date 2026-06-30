import { NextResponse, type NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { serverEnv } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";
import { finalizeOrderFromPaymentIntent } from "@/lib/orders/write";
import { sendEmail } from "@/lib/email/send";
import { OrderConfirmation } from "@/emails/OrderConfirmation";

export async function POST(request: NextRequest) {
  const raw = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, serverEnv.stripeWebhookSecret);
  } catch (err) {
    return NextResponse.json({ error: `Invalid signature: ${(err as Error).message}` }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as { id: string; metadata: { order_id?: string; tax_calculation?: string } };
    const { finalized } = await finalizeOrderFromPaymentIntent(pi);
    if (finalized) {
      const admin = createAdminClient();
      const { data: order } = await admin
        .from("orders").select("id, email, total_cents").eq("id", pi.metadata.order_id!).maybeSingle();
      const { data: items } = await admin
        .from("order_items").select("product_name, quantity, unit_price_cents").eq("order_id", pi.metadata.order_id!);
      if (order?.email) {
        await sendEmail({
          to: order.email,
          subject: "Your Organica Living order",
          react: OrderConfirmation({
            orderId: order.id,
            email: order.email,
            totalCents: order.total_cents,
            lines: (items ?? []).map((i) => ({ name: i.product_name, quantity: i.quantity, lineCents: i.unit_price_cents * i.quantity })),
          }),
        });
      }
      if (pi.metadata.tax_calculation) {
        try {
          await stripe.tax.transactions.createFromCalculation({ calculation: pi.metadata.tax_calculation, reference: pi.metadata.order_id! });
        } catch (err) {
          console.warn("[webhook] tax transaction failed:", (err as Error).message);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
