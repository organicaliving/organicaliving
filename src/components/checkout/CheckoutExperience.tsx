"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { applyPromoAction, removePromoAction } from "@/lib/cart/actions";
import { formatPrice } from "@/lib/format";

export type CheckoutLine = {
  key: string;
  name: string;
  quantity: number;
  lineCents: number;
  regularLineCents: number;
  isSubscription: boolean;
  intervalLabel: string | null; // e.g. "Monthly subscription"
  savingsCents: number;
  imageUrl: string | null;
};

export type CheckoutSummary = {
  lines: CheckoutLine[];
  itemCount: number;
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  amountCents: number; // subtotal - discount + shipping (tax added at PI time; $0 fallback)
  totalSavingsCents: number;
  code: string | null;
  currency: string;
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #c9c5b8",
  borderRadius: 8,
  padding: "14px 16px",
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
  background: "#fff",
  color: "#1a1a1a",
};

const h2Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 32 };

const boundApply = applyPromoAction.bind(null, null) as unknown as (fd: FormData) => Promise<void>;
const boundRemove = removePromoAction as unknown as () => Promise<void>;

export function CheckoutExperience({ summary }: { summary: CheckoutSummary }) {
  const options: StripeElementsOptions = {
    mode: "payment",
    amount: Math.max(1, summary.amountCents),
    currency: summary.currency,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#1c3a13",
        colorText: "#1a1a1a",
        colorBackground: "#ffffff",
        fontFamily: "inherit",
        borderRadius: "8px",
        fontSizeBase: "14px",
      },
      rules: {
        ".Input": { border: "1px solid #c9c5b8", padding: "14px 16px" },
        ".Input:focus": { border: "1px solid #1c3a13", boxShadow: "none" },
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutInner summary={summary} />
    </Elements>
  );
}

function CheckoutInner({ summary }: { summary: CheckoutSummary }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function buildPayload(): Record<string, string> | null {
    const form = formRef.current;
    if (!form) return null;
    const fd = new FormData(form);
    const first = String(fd.get("firstName") ?? "").trim();
    const last = String(fd.get("lastName") ?? "").trim();
    const payload = {
      email: String(fd.get("email") ?? "").trim(),
      fullName: `${first} ${last}`.trim(),
      line1: String(fd.get("line1") ?? "").trim(),
      line2: String(fd.get("line2") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
      state: String(fd.get("state") ?? "").trim(),
      postalCode: String(fd.get("postalCode") ?? "").trim(),
      country: "US",
    };
    const required: (keyof typeof payload)[] = ["email", "fullName", "line1", "city", "state", "postalCode"];
    for (const k of required) if (!payload[k]) return null;
    return payload;
  }

  async function pay() {
    if (!stripe || !elements) return;
    setError(null);
    if (!agree) {
      setError("Please agree to the Subscription Terms and Privacy Policy to continue.");
      return;
    }
    const payload = buildPayload();
    if (!payload) {
      setError("Please complete your contact and delivery details.");
      return;
    }
    setBusy(true);

    // Validate the Payment Element (deferred flow).
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Please check your payment details.");
      setBusy(false);
      return;
    }

    // Create the PaymentIntent + pending order from the real cart (existing wiring).
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data.clientSecret) {
      setError(data.error ?? "Could not start checkout.");
      setBusy(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret: data.clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        payment_method_data: {
          billing_details: {
            name: payload.fullName,
            email: payload.email,
            address: {
              line1: payload.line1,
              line2: payload.line2 || undefined,
              city: payload.city,
              state: payload.state,
              postal_code: payload.postalCode,
              country: payload.country,
            },
          },
        },
        shipping: {
          name: payload.fullName,
          address: {
            line1: payload.line1,
            line2: payload.line2 || undefined,
            city: payload.city,
            state: payload.state,
            postal_code: payload.postalCode,
            country: payload.country,
          },
        },
      },
    });
    // On success Stripe redirects to return_url; only errors return here.
    if (confirmError) {
      setError(confirmError.message ?? "Payment could not be completed.");
      setBusy(false);
    }
  }

  return (
    <div
      data-co-grid
      style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 0.82fr", gap: 0 }}
    >
      {/* form column */}
      <div data-co-form style={{ padding: "40px 56px 60px 40px" }}>
        <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 18, fontWeight: 600 }}>Contact</h2>
            <a href="/login" style={{ fontSize: 13, color: "#1a1a1a", textDecoration: "underline" }}>Sign In</a>
          </div>
          <div style={{ marginTop: 14 }}>
            <input name="email" type="email" autoComplete="email" placeholder="Email" style={inputStyle} required />
          </div>

          <h2 style={h2Style}>Delivery</h2>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
            <input name="country" readOnly value="United States" aria-label="Country/Region" style={{ ...inputStyle, color: "#6d6d6d" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <input name="firstName" autoComplete="given-name" placeholder="First name" style={inputStyle} />
              <input name="lastName" autoComplete="family-name" placeholder="Last name" style={inputStyle} />
            </div>
            <input name="line1" autoComplete="address-line1" placeholder="Address" style={inputStyle} />
            <input name="line2" autoComplete="address-line2" placeholder="Apartment, suite, etc. (optional)" style={inputStyle} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <input name="city" autoComplete="address-level2" placeholder="City" style={inputStyle} />
              <input name="state" autoComplete="address-level1" placeholder="State" style={inputStyle} />
              <input name="postalCode" autoComplete="postal-code" placeholder="ZIP code" style={inputStyle} />
            </div>
            <input name="phone" autoComplete="tel" placeholder="Phone" style={inputStyle} />
            <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#1a1a1a", cursor: "pointer" }}>
              <input type="checkbox" name="smsOptIn" style={{ width: 16, height: 16, accentColor: "#1c3a13" }} />
              Text me with news and offers
            </label>
          </div>

          <h2 style={h2Style}>Shipping method</h2>
          <div style={{ marginTop: 14, background: "#f4f3ec", borderRadius: 10, padding: "18px 20px", fontSize: 14, color: "#6d6d6d" }}>
            {summary.shippingCents === 0
              ? "Free standard shipping included on every order."
              : `Standard shipping — ${formatPrice(summary.shippingCents, summary.currency)}.`}
          </div>

          <h2 style={h2Style}>Payment</h2>
          <div style={{ fontSize: 13, color: "#6d6d6d", marginTop: 4 }}>All transactions are secure and encrypted.</div>
          <div style={{ marginTop: 14, border: "1px solid #c9c5b8", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px", borderBottom: "1px solid #e4e1d6", background: "#f4f3ec" }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>Card &amp; secure payment</span>
              <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 22, padding: "0 6px", borderRadius: 4, background: "#1a1f71", color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: ".5px" }}>VISA</span>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 22, padding: "0 6px", borderRadius: 4, background: "#eb001b", color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: ".5px" }}>MC</span>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 22, padding: "0 6px", borderRadius: 4, background: "#2e77bc", color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: ".5px" }}>AMEX</span>
                <span style={{ fontSize: 11, color: "#6d6d6d" }}>+5</span>
              </span>
            </div>
            <div style={{ padding: 18, background: "#fff" }}>
              <PaymentElement options={{ layout: "tabs" }} />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 30 }}>
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ width: 16, height: 16, marginTop: 2, accentColor: "#1c3a13" }} />
            <span style={{ fontSize: 13, lineHeight: 1.5, color: "#1a1a1a" }}>
              I agree to the <a href="#" style={{ color: "#1c3a13" }}>Subscription Terms and Conditions</a> (including Section 6, the Cancellation Policy) and the <a href="#" style={{ color: "#1c3a13" }}>Privacy Policy</a>. My subscription renews automatically at the price and frequency shown in my order summary until I cancel.
            </span>
          </div>

          {error ? <p style={{ fontSize: 13, color: "#b3261e", marginTop: 14 }}>{error}</p> : null}

          <button
            type="button"
            onClick={pay}
            disabled={busy || !stripe}
            style={{
              lineHeight: 1,
              display: "inline-block",
              textAlign: "center",
              width: "100%",
              padding: "21px 0",
              marginTop: 24,
              fontSize: 15,
              fontWeight: 500,
              color: "#fcfcf7",
              background: "#1c3a13",
              borderRadius: 40,
              border: "none",
              cursor: busy ? "default" : "pointer",
              opacity: busy ? 0.7 : 1,
            }}
          >
            {busy ? "Processing…" : `Pay now · ${formatPrice(summary.amountCents, summary.currency)}`}
          </button>
          <p style={{ fontSize: 11, lineHeight: 1.6, color: "#6d6d6d", marginTop: 18 }}>
            By completing this purchase, your payment method will be charged at the price and frequency listed above until you cancel. Cancel anytime by logging into your account or emailing care@organicaliving.com.
          </p>
        </form>
      </div>

      {/* summary column */}
      <div data-co-summary style={{ background: "#f6f6f1", padding: "40px 40px 60px 48px", borderLeft: "1px solid #ece9de" }}>
        {summary.lines.map((l) => (
          <div key={l.key} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "14px 0" }}>
            <div style={{ position: "relative", width: 56, height: 56, flex: "none" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 10,
                  border: "1px solid #e4e1d6",
                  background: l.imageUrl
                    ? `url('${l.imageUrl}') center/contain no-repeat #fff`
                    : "linear-gradient(160deg,#2f3f2a,#14201a)",
                }}
              />
              <span style={{ position: "absolute", top: -7, right: -7, width: 20, height: 20, borderRadius: "50%", background: "#3a3a36", color: "#fff", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {l.quantity}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{l.name}</div>
              {l.intervalLabel ? (
                <div style={{ fontSize: 12, color: "#6d6d6d", marginTop: 2 }}>
                  {l.intervalLabel}
                  {l.savingsCents > 0 ? ` · Save ${formatPrice(l.savingsCents, summary.currency)}` : ""}
                </div>
              ) : null}
            </div>
            <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
              {l.isSubscription && l.savingsCents > 0 ? (
                <div style={{ fontSize: 12, color: "#9a9a8e", textDecoration: "line-through" }}>{formatPrice(l.regularLineCents, summary.currency)}</div>
              ) : null}
              <div style={{ fontSize: 14, fontWeight: 500 }}>{formatPrice(l.lineCents, summary.currency)}</div>
            </div>
          </div>
        ))}

        {/* discount code */}
        {summary.code ? (
          <div style={{ display: "flex", gap: 10, marginTop: 20, alignItems: "center", justifyContent: "space-between", background: "#fff", border: "1px solid #c9c5b8", borderRadius: 8, padding: "12px 14px" }}>
            <span style={{ fontSize: 13, color: "#1c3a13", background: "#e7f0c8", padding: "4px 10px", borderRadius: 6 }}>{summary.code} applied</span>
            <form action={async () => { await boundRemove(); router.refresh(); }}>
              <button type="submit" style={{ fontSize: 13, color: "#1a1a1a", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Remove</button>
            </form>
          </div>
        ) : (
          <form
            action={async (fd) => { await boundApply(fd); router.refresh(); }}
            style={{ display: "flex", gap: 10, marginTop: 20 }}
          >
            <input name="code" placeholder="Discount code or gift card" style={{ flex: 1, border: "1px solid #c9c5b8", borderRadius: 8, padding: "12px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", background: "#fff" }} />
            <button type="submit" style={{ border: "none", background: "#e4e2da", color: "#1a1a1a", borderRadius: 8, padding: "0 22px", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Apply</button>
          </form>
        )}

        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10, paddingBottom: 18, borderBottom: "1px solid #e4e1d6" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#1a1a1a" }}>
            <span>Subtotal · {summary.itemCount} {summary.itemCount === 1 ? "item" : "items"}</span>
            <span>{formatPrice(summary.subtotalCents, summary.currency)}</span>
          </div>
          {summary.discountCents > 0 ? (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#1a1a1a" }}>
              <span>Discount{summary.code ? ` · ${summary.code}` : ""}</span>
              <span>−{formatPrice(summary.discountCents, summary.currency)}</span>
            </div>
          ) : null}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#1a1a1a" }}>
            <span>Shipping</span>
            <span style={{ color: "#6d6d6d" }}>{summary.shippingCents === 0 ? "Free" : formatPrice(summary.shippingCents, summary.currency)}</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 18 }}>
          <span style={{ fontSize: 18, fontWeight: 600 }}>Total</span>
          <span style={{ fontSize: 18, fontWeight: 600 }}>
            <span style={{ fontSize: 12, color: "#6d6d6d", fontWeight: 400, marginRight: 6 }}>USD</span>
            {formatPrice(summary.amountCents, summary.currency)}
          </span>
        </div>
        {summary.totalSavingsCents > 0 ? (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 12, color: "#1c3a13", background: "#e7f0c8", padding: "5px 12px", borderRadius: 30 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12l7-9 11 4-4 11-9-7-5 1z" /></svg>
            TOTAL SAVINGS {formatPrice(summary.totalSavingsCents, summary.currency)}
          </div>
        ) : null}

        <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid #e4e1d6" }}>
          {["30-day money-back guarantee", "Cancel anytime, no strings attached", "Free US shipping included on every order"].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
              <span style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid #d7d3c6", display: "flex", alignItems: "center", justifyContent: "center", color: "#1c3a13" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9" /></svg>
              </span>
              <span style={{ fontSize: 13, color: "#1a1a1a" }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
