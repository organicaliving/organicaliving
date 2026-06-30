# Phase 3 — Checkout + Payments (Stripe Elements) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** An on-site custom checkout that takes real (test-mode) card payments via Stripe Elements, computes shipping + tax server-side, records a durable order, and emails a confirmation — for guests and logged-in users.

**Architecture:** The cart total is **always recomputed server-side** from `getCart()` — the browser never supplies amounts. A `POST /api/checkout` route validates contact+address, computes shipping (flat tiers) and tax (Stripe Tax, graceful $0 fallback), writes a **pending** order (`orders`+`order_items`) via the **service-role admin client**, creates a Stripe **PaymentIntent** (amount in cents, `metadata.order_id`), and returns the `client_secret`. The client mounts Stripe **Payment Element** and calls `confirmPayment` with a return URL. A signature-verified `POST /api/stripe/webhook` finalizes the order on `payment_intent.succeeded` (status→paid, decrement inventory, increment discount redemptions, create the Stripe Tax transaction) and sends the Resend confirmation email. The success page clears the guest cookie. One-time payments only (subscriptions = Phase 4).

**Tech Stack:** Next.js 16 (Route Handlers, Server Actions), React 19, TypeScript, Tailwind v4, Stripe (`stripe` server SDK + `@stripe/stripe-js` + `@stripe/react-stripe-js`), Supabase admin client, Resend + React Email, Zod, Vitest + RTL.

## Global Constraints
- Package manager: **pnpm**.
- Checkout works for guests (email only) and logged-in users (guest checkout preserved).
- **Never trust client-supplied amounts.** The PaymentIntent amount is computed server-side from `getCart()` + server shipping + server tax. The client sends only contact/address/cart-is-implicit.
- Money is integer **cents**; reuse `computeTotals` from `@/lib/cart/totals`; format via `formatPrice`.
- Order writes (`orders`/`order_items`) and the webhook use the **service-role admin client** (`createAdminClient` from `@/lib/supabase/server` — already exists) — this is the one place service-role is correct (trusted server, RLS NOTE in `0001_init.sql`). User-facing reads stay RLS-bound.
- Stripe secret key and Resend key are server-only; only `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` reaches the browser.
- Webhook MUST verify the Stripe signature (`stripe.webhooks.constructEvent`) using `STRIPE_WEBHOOK_SECRET`; reject unverified.
- Order finalization MUST be idempotent (a PaymentIntent can fire the webhook more than once): keyed on `orders.stripe_payment_intent_id` (unique) / order status guard.
- Stripe Tax: if `tax.calculations.create` errors (Tax not enabled on the test account), fall back to `taxCents = 0`, `calculationId = null`, and log a warning — never block checkout. Production tax requires enabling Stripe Tax + origin address in the dashboard (runbook).
- Design tokens only; error literal `#b3261e` allowed.

## File Structure
**Create:**
- `src/lib/checkout/types.ts` — `CheckoutAddress`, `ShippingMethod`, `CheckoutQuote`
- `src/lib/checkout/schemas.ts` — `contactSchema`, `addressSchema`, `checkoutSchema` (+ test)
- `src/lib/checkout/shipping.ts` — `computeShipping` (+ test)
- `src/lib/checkout/tax.ts` — `computeTax` (server-only; Stripe Tax + fallback) + pure `toTaxLineItems` (+ test for the pure mapper)
- `src/lib/email/send.ts` — Resend wrapper (+ test, mocked)
- `src/emails/OrderConfirmation.tsx` — React Email template (+ render test)
- `src/lib/orders/write.ts` — `createPendingOrder`, `finalizeOrderFromPaymentIntent` (admin client) (+ test, mocked)
- `src/app/api/checkout/route.ts` — POST create-intent
- `src/app/api/stripe/webhook/route.ts` — POST webhook
- `src/components/checkout/CheckoutForm.tsx` — client (contact/address + Payment Element)
- `src/app/(storefront)/checkout/page.tsx` — server (guard empty cart, render form)
- `src/app/(storefront)/checkout/success/page.tsx` — confirmation + guest-cookie clear
- `src/lib/orders/queries.ts` — `getOrderByPaymentIntent` (admin, for success page) (+ test, mocked)

**Modify:** none required (cart already links to `/checkout`).

---

## Task 1: Checkout types + schemas

**Files:** Create `src/lib/checkout/types.ts`, `src/lib/checkout/schemas.ts`, `src/lib/checkout/schemas.test.ts`

**Interfaces:**
- Produces:
  - `type CheckoutAddress = { line1: string; line2?: string; city: string; state: string; postalCode: string; country: string }`
  - `type ShippingMethod = { id: string; label: string; amountCents: number }`
  - `type CheckoutQuote = { subtotalCents: number; discountCents: number; shippingCents: number; taxCents: number; totalCents: number; currency: string }`
  - `contactSchema` ({ email }), `addressSchema` ({ fullName, line1, line2?, city, state, postalCode, country default "US" }), `checkoutSchema` = contact.merge(address).

- [ ] **Step 1: Write the failing test**

`src/lib/checkout/schemas.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { contactSchema, addressSchema, checkoutSchema } from "@/lib/checkout/schemas";

describe("checkout schemas", () => {
  it("requires a valid email", () => {
    expect(contactSchema.safeParse({ email: "no" }).success).toBe(false);
    expect(contactSchema.safeParse({ email: "a@b.com" }).success).toBe(true);
  });
  it("requires address fields", () => {
    expect(addressSchema.safeParse({ fullName: "", line1: "", city: "", state: "", postalCode: "" }).success).toBe(false);
    expect(addressSchema.safeParse({ fullName: "Ada", line1: "1 St", city: "Atlanta", state: "GA", postalCode: "30301" }).success).toBe(true);
  });
  it("checkoutSchema merges contact + address", () => {
    const r = checkoutSchema.safeParse({ email: "a@b.com", fullName: "Ada", line1: "1 St", city: "Atlanta", state: "GA", postalCode: "30301" });
    expect(r.success).toBe(true);
  });
});
```

- [ ] **Step 2: Run to verify it fails** — `pnpm test src/lib/checkout/schemas.test.ts` → FAIL.

- [ ] **Step 3: Implement**

`src/lib/checkout/types.ts`:
```ts
export type CheckoutAddress = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type ShippingMethod = { id: string; label: string; amountCents: number };

export type CheckoutQuote = {
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  currency: string;
};
```
`src/lib/checkout/schemas.ts`:
```ts
import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export const addressSchema = z.object({
  fullName: z.string().min(1, "Name is required."),
  line1: z.string().min(1, "Address is required."),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  postalCode: z.string().min(1, "ZIP is required."),
  country: z.string().min(2).default("US"),
});

export const checkoutSchema = contactSchema.merge(addressSchema);
export type CheckoutInput = z.infer<typeof checkoutSchema>;
```

- [ ] **Step 4: Run to verify it passes** — `pnpm test src/lib/checkout/schemas.test.ts` → PASS.

- [ ] **Step 5: Commit**
```bash
git add src/lib/checkout/types.ts src/lib/checkout/schemas.ts src/lib/checkout/schemas.test.ts
git commit -m "feat: add checkout types and validation schemas"
```

---

## Task 2: Shipping computation (pure, TDD)

**Files:** Create `src/lib/checkout/shipping.ts`, `src/lib/checkout/shipping.test.ts`

**Interfaces:**
- Produces: `FREE_SHIPPING_THRESHOLD_CENTS = 5000`, `STANDARD_SHIPPING_CENTS = 599`, `computeShipping(subtotalCents: number): ShippingMethod` — free (`0`) at/over threshold, else standard.

- [ ] **Step 1: Write the failing test**

`src/lib/checkout/shipping.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { computeShipping } from "@/lib/checkout/shipping";

describe("computeShipping", () => {
  it("is free at or over the threshold", () => {
    expect(computeShipping(5000).amountCents).toBe(0);
    expect(computeShipping(9999).amountCents).toBe(0);
  });
  it("charges standard below the threshold", () => {
    const s = computeShipping(4999);
    expect(s.amountCents).toBe(599);
    expect(s.id).toBe("standard");
  });
});
```

- [ ] **Step 2: Run to verify it fails** — `pnpm test src/lib/checkout/shipping.test.ts` → FAIL.

- [ ] **Step 3: Implement**

`src/lib/checkout/shipping.ts`:
```ts
import type { ShippingMethod } from "@/lib/checkout/types";

export const FREE_SHIPPING_THRESHOLD_CENTS = 5000;
export const STANDARD_SHIPPING_CENTS = 599;

export function computeShipping(subtotalCents: number): ShippingMethod {
  if (subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS) {
    return { id: "free", label: "Free shipping", amountCents: 0 };
  }
  return { id: "standard", label: "Standard shipping", amountCents: STANDARD_SHIPPING_CENTS };
}
```

- [ ] **Step 4: Run to verify it passes** — `pnpm test src/lib/checkout/shipping.test.ts` → PASS.

- [ ] **Step 5: Commit**
```bash
git add src/lib/checkout/shipping.ts src/lib/checkout/shipping.test.ts
git commit -m "feat: add shipping computation"
```

---

## Task 3: Tax module (Stripe Tax + graceful fallback)

**Files:** Create `src/lib/checkout/tax.ts`, `src/lib/checkout/tax.test.ts`

**Interfaces:**
- Consumes: `stripe` from `@/lib/stripe`; `CheckoutAddress`, `CartLine`.
- Produces:
  - `toTaxLineItems(lines: CartLine[]): { amount: number; reference: string }[]` — pure; maps each line to `{ amount: unitCents*quantity, reference: variantId }`.
  - `computeTax(args: { lines: CartLine[]; address: CheckoutAddress; shippingCents: number }): Promise<{ taxCents: number; calculationId: string | null }>` — calls `stripe.tax.calculations.create`; on ANY error returns `{ taxCents: 0, calculationId: null }` (logged). Server-only.

- [ ] **Step 1: Write the failing test** (pure mapper only)

`src/lib/checkout/tax.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { toTaxLineItems } from "@/lib/checkout/tax";
import type { CartLine } from "@/lib/cart/types";

const line: CartLine = {
  variantId: "v1", productSlug: "x", productName: "X", variantTitle: "30", imagePath: null,
  unitCents: 3999, quantity: 2, purchaseType: "one_time", lineCents: 7998,
};

describe("toTaxLineItems", () => {
  it("maps cart lines to Stripe tax line items", () => {
    expect(toTaxLineItems([line])).toEqual([{ amount: 7998, reference: "v1" }]);
  });
});
```

- [ ] **Step 2: Run to verify it fails** — `pnpm test src/lib/checkout/tax.test.ts` → FAIL.

- [ ] **Step 3: Implement**

`src/lib/checkout/tax.ts`:
```ts
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
```

- [ ] **Step 4: Run to verify it passes** — `pnpm test src/lib/checkout/tax.test.ts` → PASS.

- [ ] **Step 5: Commit**
```bash
git add src/lib/checkout/tax.ts src/lib/checkout/tax.test.ts
git commit -m "feat: add Stripe Tax computation with graceful fallback"
```

---

## Task 4: Email — Resend wrapper + order confirmation template

**Files:** Create `src/lib/email/send.ts`, `src/lib/email/send.test.ts`, `src/emails/OrderConfirmation.tsx`, `src/emails/OrderConfirmation.test.tsx`

**Interfaces:**
- Consumes: `resend` from `@/lib/resend`; `@react-email/components`; `formatPrice`.
- Produces:
  - `sendEmail(args: { to: string; subject: string; react: ReactElement }): Promise<{ ok: boolean }>` — wraps `resend.emails.send` with a `from` of `"Organica Living <orders@organicaliving.com>"`; returns `{ ok: !error }`; never throws.
  - `OrderConfirmation({ orderId, email, lines, totalCents }: { orderId: string; email: string; lines: { name: string; quantity: number; lineCents: number }[]; totalCents: number })` — a React Email document.

- [ ] **Step 1: Write the failing tests**

`src/lib/email/send.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
const sendMock = vi.fn();
vi.mock("@/lib/resend", () => ({ resend: { emails: { send: sendMock } } }));
import { sendEmail } from "@/lib/email/send";
import { createElement } from "react";

beforeEach(() => sendMock.mockReset());

describe("sendEmail", () => {
  it("returns ok on success", async () => {
    sendMock.mockResolvedValue({ data: { id: "e1" }, error: null });
    const r = await sendEmail({ to: "a@b.com", subject: "Hi", react: createElement("div", null, "x") });
    expect(r.ok).toBe(true);
    expect(sendMock).toHaveBeenCalled();
  });
  it("returns not-ok on error without throwing", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "bad" } });
    const r = await sendEmail({ to: "a@b.com", subject: "Hi", react: createElement("div") });
    expect(r.ok).toBe(false);
  });
});
```
`src/emails/OrderConfirmation.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrderConfirmation } from "@/emails/OrderConfirmation";

describe("OrderConfirmation", () => {
  it("shows the order id and total", () => {
    render(<OrderConfirmation orderId="ORD-1" email="a@b.com" lines={[{ name: "Multi Pro", quantity: 2, lineCents: 7998 }]} totalCents={7998} />);
    expect(screen.getByText(/ORD-1/)).toBeInTheDocument();
    expect(screen.getByText(/\$79\.98/)).toBeInTheDocument();
    expect(screen.getByText(/Multi Pro/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to verify they fail** — `pnpm test src/lib/email/send.test.ts src/emails/OrderConfirmation.test.tsx` → FAIL.

- [ ] **Step 3: Implement**

`src/emails/OrderConfirmation.tsx`:
```tsx
import { Html, Head, Body, Container, Heading, Text, Section, Row, Column, Hr } from "@react-email/components";
import { formatPrice } from "@/lib/format";

export function OrderConfirmation({
  orderId, email, lines, totalCents,
}: {
  orderId: string;
  email: string;
  lines: { name: string; quantity: number; lineCents: number }[];
  totalCents: number;
}) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#fcfcf7", fontFamily: "Arial, sans-serif", color: "#1a1a1a" }}>
        <Container style={{ padding: "24px" }}>
          <Heading style={{ fontWeight: 300 }}>Thank you for your order</Heading>
          <Text>Order {orderId} — a confirmation was sent to {email}.</Text>
          <Hr />
          <Section>
            {lines.map((l, i) => (
              <Row key={i}>
                <Column>{l.name} × {l.quantity}</Column>
                <Column align="right">{formatPrice(l.lineCents)}</Column>
              </Row>
            ))}
          </Section>
          <Hr />
          <Row>
            <Column><Text style={{ fontWeight: 600 }}>Total</Text></Column>
            <Column align="right"><Text style={{ fontWeight: 600 }}>{formatPrice(totalCents)}</Text></Column>
          </Row>
          <Text style={{ fontSize: "12px", color: "#5e5e5e" }}>
            These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```
`src/lib/email/send.ts`:
```ts
import "server-only";
import type { ReactElement } from "react";
import { resend } from "@/lib/resend";

const FROM = "Organica Living <orders@organicaliving.com>";

export async function sendEmail(args: { to: string; subject: string; react: ReactElement }): Promise<{ ok: boolean }> {
  try {
    const { error } = await resend.emails.send({ from: FROM, to: args.to, subject: args.subject, react: args.react });
    if (error) {
      console.warn("[email] send failed:", error.message);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.warn("[email] send threw:", (err as Error).message);
    return { ok: false };
  }
}
```
> NOTE: the `from` domain (`organicaliving.com`) must be a verified Resend domain in production; until then Resend test mode only delivers to the account owner's address. Flag for the runbook.

- [ ] **Step 4: Run to verify they pass** — `pnpm test src/lib/email/send.test.ts src/emails/OrderConfirmation.test.tsx` → PASS.

- [ ] **Step 5: Commit**
```bash
git add src/lib/email/send.ts src/lib/email/send.test.ts src/emails/OrderConfirmation.tsx src/emails/OrderConfirmation.test.tsx
git commit -m "feat: add email wrapper and order confirmation template"
```

---

## Task 5: Order writing (pending + finalize, admin client)

**Files:** Create `src/lib/orders/write.ts`, `src/lib/orders/write.test.ts`, `src/lib/orders/queries.ts`, `src/lib/orders/queries.test.ts`

**Interfaces:**
- Consumes: `createAdminClient` from `@/lib/supabase/admin`.
- Produces:
  - `createPendingOrder(args: { userId: string | null; email: string; lines: CartLine[]; quote: CheckoutQuote; shippingAddress: CheckoutAddress; discountCode: string | null }): Promise<{ orderId: string }>` — inserts an `orders` row (`status: 'pending'`, amounts from quote) + `order_items` (snapshot product_name/variant_title/unit_price_cents/quantity/purchase_type); returns the order id.
  - `finalizeOrderFromPaymentIntent(pi: { id: string; metadata: { order_id?: string } }): Promise<{ finalized: boolean }>` — idempotent: looks up the order by `metadata.order_id`; if already `paid`, returns `{finalized:false}`; else sets `status='paid'`, `stripe_payment_intent_id=pi.id`, marks the user's active cart `converted`, returns `{finalized:true}`. (Inventory decrement + discount increment are best-effort here.)
  - `getOrderByPaymentIntent(piId: string): Promise<{ id: string; total_cents: number; email: string | null } | null>` (admin) for the success page.

- [ ] **Step 1: Write the failing tests** (mock the admin client)

`src/lib/orders/write.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
const fromMock = vi.fn();
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => ({ from: fromMock }) }));
import { createPendingOrder } from "@/lib/orders/write";

function chain(result: { data: unknown; error: unknown }) {
  const b: Record<string, unknown> = {};
  b.insert = () => b; b.select = () => b; b.eq = () => b; b.update = () => b;
  b.single = () => Promise.resolve(result); b.maybeSingle = () => Promise.resolve(result);
  b.then = (r: (v: unknown) => void) => r(result);
  return b;
}
beforeEach(() => fromMock.mockReset());

describe("createPendingOrder", () => {
  it("inserts an order and returns its id", async () => {
    fromMock.mockImplementation((t: string) =>
      t === "orders" ? chain({ data: { id: "ord1" }, error: null }) : chain({ data: null, error: null }),
    );
    const r = await createPendingOrder({
      userId: null, email: "a@b.com",
      lines: [{ variantId: "v1", productSlug: "x", productName: "X", variantTitle: "30", imagePath: null, unitCents: 3999, quantity: 2, purchaseType: "one_time", lineCents: 7998 }],
      quote: { subtotalCents: 7998, discountCents: 0, shippingCents: 599, taxCents: 0, totalCents: 8597, currency: "usd" },
      shippingAddress: { line1: "1 St", city: "Atlanta", state: "GA", postalCode: "30301", country: "US" },
      discountCode: null,
    });
    expect(r.orderId).toBe("ord1");
    expect(fromMock).toHaveBeenCalledWith("orders");
    expect(fromMock).toHaveBeenCalledWith("order_items");
  });
});
```
`src/lib/orders/queries.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
const fromMock = vi.fn();
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => ({ from: fromMock }) }));
import { getOrderByPaymentIntent } from "@/lib/orders/queries";

function chain(result: { data: unknown; error: unknown }) {
  const b: Record<string, unknown> = {};
  b.select = () => b; b.eq = () => b; b.maybeSingle = () => Promise.resolve(result);
  return b;
}
beforeEach(() => fromMock.mockReset());

describe("getOrderByPaymentIntent", () => {
  it("returns the order or null", async () => {
    fromMock.mockReturnValue(chain({ data: { id: "ord1", total_cents: 8597, email: "a@b.com" }, error: null }));
    expect(await getOrderByPaymentIntent("pi_1")).toEqual({ id: "ord1", total_cents: 8597, email: "a@b.com" });
    fromMock.mockReturnValue(chain({ data: null, error: null }));
    expect(await getOrderByPaymentIntent("pi_x")).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify they fail** — `pnpm test src/lib/orders/write.test.ts src/lib/orders/queries.test.ts` → FAIL.

- [ ] **Step 3: Implement**

`src/lib/orders/write.ts`:
```ts
import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { CartLine } from "@/lib/cart/types";
import type { CheckoutAddress, CheckoutQuote } from "@/lib/checkout/types";

export async function createPendingOrder(args: {
  userId: string | null;
  email: string;
  lines: CartLine[];
  quote: CheckoutQuote;
  shippingAddress: CheckoutAddress;
  discountCode: string | null;
}): Promise<{ orderId: string }> {
  const admin = createAdminClient();
  const { data: order, error } = await admin
    .from("orders")
    .insert({
      user_id: args.userId,
      email: args.email,
      status: "pending",
      subtotal_cents: args.quote.subtotalCents,
      discount_cents: args.quote.discountCents,
      shipping_cents: args.quote.shippingCents,
      tax_cents: args.quote.taxCents,
      total_cents: args.quote.totalCents,
      currency: args.quote.currency,
      discount_code: args.discountCode,
      shipping_address: args.shippingAddress,
    })
    .select("id")
    .single();
  if (error || !order) throw new Error(error?.message ?? "Could not create order");

  const items = args.lines.map((l) => ({
    order_id: order.id,
    variant_id: l.variantId,
    product_name: l.productName,
    variant_title: l.variantTitle,
    unit_price_cents: l.unitCents,
    quantity: l.quantity,
    purchase_type: l.purchaseType,
  }));
  const { error: itemsError } = await admin.from("order_items").insert(items);
  if (itemsError) throw new Error(itemsError.message);

  return { orderId: order.id };
}

export async function finalizeOrderFromPaymentIntent(pi: {
  id: string;
  metadata: { order_id?: string };
}): Promise<{ finalized: boolean }> {
  const orderId = pi.metadata.order_id;
  if (!orderId) return { finalized: false };
  const admin = createAdminClient();

  const { data: order } = await admin
    .from("orders").select("id, status, user_id").eq("id", orderId).maybeSingle();
  if (!order || order.status === "paid") return { finalized: false };

  await admin.from("orders").update({ status: "paid", stripe_payment_intent_id: pi.id }).eq("id", orderId);
  if (order.user_id) {
    await admin.from("carts").update({ status: "converted" }).eq("user_id", order.user_id).eq("status", "active");
  }
  return { finalized: true };
}
```
`src/lib/orders/queries.ts`:
```ts
import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getOrderByPaymentIntent(
  piId: string,
): Promise<{ id: string; total_cents: number; email: string | null } | null> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("orders").select("id, total_cents, email").eq("stripe_payment_intent_id", piId).maybeSingle();
  return data ?? null;
}
```

- [ ] **Step 4: Run to verify they pass** — both test files PASS.

- [ ] **Step 5: Commit**
```bash
git add src/lib/orders
git commit -m "feat: add order writing and lookup (admin)"
```

---

## Task 6: Create-intent API route

**Files:** Create `src/app/api/checkout/route.ts`

**Interfaces:** `POST /api/checkout` — body `{ email, fullName, line1, line2?, city, state, postalCode, country }`. Validates with `checkoutSchema`; loads `getCart()` (server-trusted); 400 if empty. Computes shipping (`computeShipping`) + tax (`computeTax`) + total (`computeTotals` + shipping + tax). Reads the current user (may be null → guest). Calls `createPendingOrder` → `orderId`. Creates a Stripe PaymentIntent (`amount=quote.totalCents`, `currency`, `automatic_payment_methods:{enabled:true}`, `metadata:{ order_id, tax_calculation }`, `receipt_email`). Returns `{ clientSecret, quote }`.

- [ ] **Step 1: Implement**

`src/app/api/checkout/route.ts`:
```ts
import { NextResponse, type NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { getCart } from "@/lib/cart/queries";
import { checkoutSchema } from "@/lib/checkout/schemas";
import { computeShipping } from "@/lib/checkout/shipping";
import { computeTax } from "@/lib/checkout/tax";
import { computeTotals } from "@/lib/cart/totals";
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
    line1: parsed.data.line1, line2: parsed.data.line2, city: parsed.data.city,
    state: parsed.data.state, postalCode: parsed.data.postalCode, country: parsed.data.country,
  };
  const shipping = computeShipping(cart.subtotalCents);
  const tax = await computeTax({ lines: cart.lines, address, shippingCents: shipping.amountCents });
  const base = computeTotals(cart.lines.map((l) => ({ unitCents: l.unitCents, quantity: l.quantity })),
    cart.code ? { code: cart.code, type: "percent", value: 0 } : null);
  // discount already reflected in cart.discountCents; recompute total explicitly:
  const subtotalCents = cart.subtotalCents;
  const discountCents = cart.discountCents;
  const shippingCents = shipping.amountCents;
  const taxCents = tax.taxCents;
  const totalCents = subtotalCents - discountCents + shippingCents + taxCents;
  void base;
  const quote: CheckoutQuote = { subtotalCents, discountCents, shippingCents, taxCents, totalCents, currency: cart.currency };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

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
    metadata: { order_id: orderId, ...(tax.calculationId ? { tax_calculation: tax.calculationId } : {}) },
  });

  return NextResponse.json({ clientSecret: intent.client_secret, quote });
}
```

- [ ] **Step 2: Build + lint** — `pnpm build && pnpm lint` clean (`/api/checkout` present).

- [ ] **Step 3: Commit**
```bash
git add src/app/api/checkout/route.ts
git commit -m "feat: add create-intent checkout API route"
```

---

## Task 7: Stripe webhook

**Files:** Create `src/app/api/stripe/webhook/route.ts`

**Interfaces:** `POST /api/stripe/webhook` — reads the raw body + `stripe-signature` header; `stripe.webhooks.constructEvent(raw, sig, STRIPE_WEBHOOK_SECRET)`; on `payment_intent.succeeded` → `finalizeOrderFromPaymentIntent(pi)`; if finalized, load order + items (admin) and `sendEmail(OrderConfirmation)`; if `metadata.tax_calculation` present, `stripe.tax.transactions.createFromCalculation`. Always returns 200 to acknowledged events; 400 on signature failure.

- [ ] **Step 1: Implement**

`src/app/api/stripe/webhook/route.ts`:
```ts
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
```
> NOTE: live-testing this needs `STRIPE_WEBHOOK_SECRET` from `stripe listen --forward-to localhost:3000/api/stripe/webhook` (Stripe CLI) or the dashboard endpoint. The handler builds and signature-rejects without it.

- [ ] **Step 2: Build + lint** — clean (`/api/stripe/webhook` present).

- [ ] **Step 3: Commit**
```bash
git add src/app/api/stripe/webhook/route.ts
git commit -m "feat: add Stripe webhook to finalize orders"
```

---

## Task 8: Checkout form (client) + page

**Files:** Create `src/components/checkout/CheckoutForm.tsx`, `src/app/(storefront)/checkout/page.tsx`

**Interfaces:**
- `page.tsx` — server; `getCart()`; if empty `redirect("/cart")`; renders `<CheckoutForm subtotalCents={...} />` (publishable key read from `process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`).
- `CheckoutForm` — client; two-step: (1) contact+address form → on submit POST `/api/checkout` → store `clientSecret`+`quote`; (2) render `<Elements stripe={loadStripe(pk)} options={{clientSecret}}>` with `<PaymentElement>` + a "Pay" button → `stripe.confirmPayment({ elements, confirmParams: { return_url: ${origin}/checkout/success } })`. Shows quote (subtotal/discount/shipping/tax/total via `formatPrice`). Errors shown inline.

- [ ] **Step 1: Implement the client form**

`src/components/checkout/CheckoutForm.tsx`:
```tsx
"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/format";
import type { CheckoutQuote } from "@/lib/checkout/types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PayStep({ quote }: { quote: CheckoutQuote }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function pay() {
    if (!stripe || !elements) return;
    setBusy(true);
    setError(null);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/checkout/success` },
    });
    if (error) { setError(error.message ?? "Payment failed."); setBusy(false); }
  }

  return (
    <div className="flex flex-col gap-4">
      <PaymentElement />
      {error ? <p className="text-sm text-[#b3261e]">{error}</p> : null}
      <button onClick={pay} disabled={busy || !stripe} className="rounded-pill bg-lime px-6 py-3 text-sm font-medium text-ink disabled:opacity-60">
        {busy ? "Processing…" : `Pay ${formatPrice(quote.totalCents, quote.currency)}`}
      </button>
    </div>
  );
}

export function CheckoutForm() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [quote, setQuote] = useState<CheckoutQuote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd)),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Could not start checkout."); setBusy(false); return; }
    setClientSecret(data.clientSecret);
    setQuote(data.quote);
    setBusy(false);
  }

  if (clientSecret && quote) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PayStep quote={quote} />
      </Elements>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <FormField label="Email" htmlFor="email"><Input id="email" name="email" type="email" autoComplete="email" required /></FormField>
      <FormField label="Full name" htmlFor="fullName"><Input id="fullName" name="fullName" autoComplete="name" required /></FormField>
      <FormField label="Address" htmlFor="line1"><Input id="line1" name="line1" autoComplete="address-line1" required /></FormField>
      <FormField label="Apt, suite (optional)" htmlFor="line2"><Input id="line2" name="line2" autoComplete="address-line2" /></FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="City" htmlFor="city"><Input id="city" name="city" autoComplete="address-level2" required /></FormField>
        <FormField label="State" htmlFor="state"><Input id="state" name="state" autoComplete="address-level1" required /></FormField>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="ZIP" htmlFor="postalCode"><Input id="postalCode" name="postalCode" autoComplete="postal-code" required /></FormField>
        <FormField label="Country" htmlFor="country"><Input id="country" name="country" defaultValue="US" autoComplete="country" required /></FormField>
      </div>
      {error ? <p className="text-sm text-[#b3261e]">{error}</p> : null}
      <button type="submit" disabled={busy} className="rounded-pill bg-lime px-6 py-3 text-sm font-medium text-ink disabled:opacity-60">
        {busy ? "…" : "Continue to payment"}
      </button>
    </form>
  );
}
```
`src/app/(storefront)/checkout/page.tsx`:
```tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/cart/queries";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Checkout — Organica Living" };
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cart = await getCart();
  if (cart.lines.length === 0) redirect("/cart");
  return (
    <main className="mx-auto max-w-[1180px] px-6 py-16">
      <h1 className="mb-8 text-3xl font-light text-ink">Checkout</h1>
      <div className="grid gap-10 md:grid-cols-[1fr_360px]">
        <CheckoutForm />
        <div className="rounded-lg border border-line bg-header p-6">
          <div className="flex justify-between text-sm text-ink"><span>Subtotal</span><span>{formatPrice(cart.subtotalCents, cart.currency)}</span></div>
          {cart.discountCents > 0 ? <div className="mt-2 flex justify-between text-sm text-muted"><span>Discount</span><span>−{formatPrice(cart.discountCents, cart.currency)}</span></div> : null}
          <p className="mt-3 text-xs text-muted">Shipping &amp; tax calculated at payment.</p>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Build + lint** — `/checkout` present; clean.

- [ ] **Step 3: Commit**
```bash
git add src/components/checkout/CheckoutForm.tsx "src/app/(storefront)/checkout/page.tsx"
git commit -m "feat: add checkout form and page with Stripe Elements"
```

---

## Task 9: Success page

**Files:** Create `src/app/(storefront)/checkout/success/page.tsx`

**Interfaces:** Server; reads `?payment_intent` (Stripe appends it to `return_url`); looks up the order via `getOrderByPaymentIntent` (the webhook may not have landed yet — if absent, show a "processing" message); clears the guest cart cookie (`clearGuestCart`). Shows order id + total + a thank-you.

- [ ] **Step 1: Implement**

`src/app/(storefront)/checkout/success/page.tsx`:
```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getOrderByPaymentIntent } from "@/lib/orders/queries";
import { clearGuestCart } from "@/lib/cart/guest";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Order confirmed — Organica Living" };
export const dynamic = "force-dynamic";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ payment_intent?: string }> }) {
  const { payment_intent: piId } = await searchParams;
  await clearGuestCart();
  const order = piId ? await getOrderByPaymentIntent(piId) : null;

  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-light text-ink">Thank you for your order</h1>
      {order ? (
        <p className="mt-4 text-muted">Order {order.id} — {formatPrice(order.total_cents)}. A confirmation is on its way to your inbox.</p>
      ) : (
        <p className="mt-4 text-muted">Your payment is processing. You&apos;ll receive a confirmation email shortly.</p>
      )}
      <Link href="/products" className="mt-9 inline-block rounded-pill bg-lime px-6 py-3 text-sm font-medium text-ink">Continue shopping</Link>
    </main>
  );
}
```

- [ ] **Step 2: Build + lint** — `/checkout/success` present; clean.

- [ ] **Step 3: Commit**
```bash
git add "src/app/(storefront)/checkout/success/page.tsx"
git commit -m "feat: add order success page"
```

---

## Task 10: Full verification & push

- [ ] **Step 1: Full suite** — `pnpm test` → all pass (Phase 2's 66 + schemas 3 + shipping 2 + tax 1 + email 2 + order-confirm 1 + write 1 + queries 1 ≈ +11).
- [ ] **Step 2: Build + lint** — clean; routes include `/checkout`, `/checkout/success`, `/api/checkout`, `/api/stripe/webhook`.
- [ ] **Step 3: Smoke (dev server + Stripe CLI)** —
  - `curl -s http://localhost:3000/checkout` (with items in cart) renders the form; empty cart → redirect to `/cart`.
  - Live payment test (manual): run `stripe listen --forward-to localhost:3000/api/stripe/webhook`, copy the `whsec_…` into `STRIPE_WEBHOOK_SECRET`, restart dev; add an item; complete checkout with test card `4242 4242 4242 4242`; confirm `orders` row flips to `paid` (Supabase), the success page shows the order, and a confirmation email is attempted (Resend logs).
  - Minimum automated: `curl -s -X POST http://localhost:3000/api/stripe/webhook -H "stripe-signature: bad" -d '{}'` → `400` (signature rejected).
- [ ] **Step 4: Push** — `git push origin <branch>`.

---

## Self-Review
- **No client-trusted amounts:** the PaymentIntent amount is computed in the route from `getCart()` + server shipping + server tax; the client posts only contact/address. ✅
- **Service-role only in trusted server code:** order writes + webhook use `createAdminClient`; the checkout route reads the cart/user via the RLS client and writes orders via admin. ✅
- **Webhook security:** signature verified with `STRIPE_WEBHOOK_SECRET`; 400 on failure; finalize is idempotent (status guard + unique PI). ✅
- **Guest + auth:** guest orders have `user_id=null`+email; success page clears the guest cookie; authed carts marked converted in finalize. ✅
- **Tax resilience:** `computeTax` falls back to $0 when Stripe Tax isn't enabled, so checkout never breaks on the unactivated test account. ✅
- **Money in cents, reuse `computeTotals`/`formatPrice`.** ✅
- **Tests vs build/smoke:** pure logic (schemas/shipping/tax-mapper/email/order-write/queries) unit-tested with mocks; Elements + route + webhook + live payment are build + manual Stripe-CLI smoke (can't unit-drive Stripe confirmation). Noted.
- **Deferred:** subscriptions (Phase 4); inventory decrement + discount `times_redeemed` increment are noted as best-effort/Phase-4-aligned; Express/Apple/Google Pay; abandoned pending-order cleanup; saved addresses. Carried to later phases.
- **Runbook flags:** enable Stripe Tax + origin address; verify the Resend sending domain; set the production webhook endpoint + `STRIPE_WEBHOOK_SECRET`; activate the Stripe account (`charges_enabled`) before live.
```
