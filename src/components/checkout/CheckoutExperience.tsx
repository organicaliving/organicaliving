"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  ExpressCheckoutElement,
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

type Payload = {
  email: string;
  fullName: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
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

/* Lucide icons (lucide.dev, ISC) rendered inline to avoid a new dependency. */
function LucideIcon({ size = 16, children }: { size?: number; children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
const TagIcon = ({ size = 13 }: { size?: number }) => (
  <LucideIcon size={size}>
    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
    <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
  </LucideIcon>
);
const TagsIcon = ({ size = 13 }: { size?: number }) => (
  <LucideIcon size={size}>
    <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
    <path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z" />
    <circle cx="6.5" cy="9.5" r=".5" fill="currentColor" />
  </LucideIcon>
);
const ShieldCheckIcon = ({ size = 16 }: { size?: number }) => (
  <LucideIcon size={size}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </LucideIcon>
);
const RotateCcwIcon = ({ size = 16 }: { size?: number }) => (
  <LucideIcon size={size}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </LucideIcon>
);
const TruckIcon = ({ size = 16 }: { size?: number }) => (
  <LucideIcon size={size}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </LucideIcon>
);

export function CheckoutExperience({ summary }: { summary: CheckoutSummary }) {
  const options: StripeElementsOptions = {
    mode: "payment",
    amount: Math.max(1, summary.amountCents),
    currency: summary.currency,
    // Load our brand font (League Spartan) INTO the Stripe iframe — "inherit"
    // can't cross the iframe boundary, so the font must be declared here.
    fonts: [
      {
        cssSrc:
          "https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500;600;700&display=swap",
      },
    ],
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#1c3a13",
        colorText: "#1a1a1a",
        colorBackground: "#ffffff",
        fontFamily: "'League Spartan', sans-serif",
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
  const [expressReady, setExpressReady] = useState(false);

  const hasSubscription = summary.lines.some((l) => l.isSubscription);

  function buildPayload(): Payload | null {
    const form = formRef.current;
    if (!form) return null;
    const fd = new FormData(form);
    const first = String(fd.get("firstName") ?? "").trim();
    const last = String(fd.get("lastName") ?? "").trim();
    const payload: Payload = {
      email: String(fd.get("email") ?? "").trim(),
      fullName: `${first} ${last}`.trim(),
      line1: String(fd.get("line1") ?? "").trim(),
      line2: String(fd.get("line2") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
      state: String(fd.get("state") ?? "").trim(),
      postalCode: String(fd.get("postalCode") ?? "").trim(),
      country: "US",
    };
    const required: (keyof Payload)[] = ["email", "fullName", "line1", "city", "state", "postalCode"];
    for (const k of required) if (!payload[k]) return null;
    return payload;
  }

  /** Shared deferred-intent confirm: validate element → create PI → confirm. */
  async function confirmWithPayload(payload: Payload) {
    if (!stripe || !elements) return;
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Please check your payment details.");
      setBusy(false);
      return;
    }
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
    const address = {
      line1: payload.line1,
      line2: payload.line2 || undefined,
      city: payload.city,
      state: payload.state,
      postal_code: payload.postalCode,
      country: payload.country,
    };
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret: data.clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        payment_method_data: { billing_details: { name: payload.fullName, email: payload.email, address } },
        shipping: { name: payload.fullName, address },
      },
    });
    if (confirmError) {
      setError(confirmError.message ?? "Payment could not be completed.");
      setBusy(false);
    }
  }

  async function payWithCard() {
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
    await confirmWithPayload(payload);
  }

  return (
    <div
      data-co-grid
      style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 0.82fr", gap: 0 }}
    >
      {/* form column */}
      <div data-co-form style={{ padding: "40px 56px 60px 40px" }}>
        {/* express checkout (real Stripe wallets — Shop Pay / Apple Pay / Google Pay).
            Renders only on browsers/domains where a wallet is available. */}
        <div style={{ display: expressReady ? "block" : "none", marginBottom: 24 }}>
          <div style={{ textAlign: "center", fontSize: 13, color: "#6d6d6d", marginBottom: 12 }}>Express checkout</div>
          <ExpressCheckoutElement
            options={{ buttonHeight: 48, emailRequired: true, billingAddressRequired: true }}
            onReady={(e) => setExpressReady(Boolean(e.availablePaymentMethods))}
            onConfirm={async (event) => {
              setError(null);
              setBusy(true);
              const b = event.billingDetails;
              const addr = b?.address;
              const payload: Payload = {
                email: b?.email ?? "",
                fullName: b?.name ?? "",
                line1: addr?.line1 ?? "",
                line2: addr?.line2 ?? "",
                city: addr?.city ?? "",
                state: addr?.state ?? "",
                postalCode: addr?.postal_code ?? "",
                country: addr?.country ?? "US",
              };
              await confirmWithPayload(payload);
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "24px 0", color: "#6d6d6d", fontSize: 12 }}>
            <div style={{ flex: 1, height: 1, background: "#e4e1d6" }} />
            OR
            <div style={{ flex: 1, height: 1, background: "#e4e1d6" }} />
          </div>
        </div>

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
          {/* The Stripe Payment Element renders the real, licensed card-brand
              icons and accepted methods — no fabricated badges. */}
          <div style={{ marginTop: 14, border: "1px solid #c9c5b8", borderRadius: 10, overflow: "hidden" }}>
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
            onClick={payWithCard}
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
                    ? `url('${l.imageUrl}') center/125% no-repeat #fff`
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
                <div style={{ fontSize: 12, color: "#6d6d6d", marginTop: 2 }}>{l.intervalLabel}</div>
              ) : null}
              {l.savingsCents > 0 ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#1c3a13", background: "#e7f0c8", padding: "4px 10px", borderRadius: 30, marginTop: 8 }}>
                  <TagIcon />
                  Save {formatPrice(l.savingsCents, summary.currency)}
                </span>
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
            <TagsIcon />
            TOTAL SAVINGS {formatPrice(summary.totalSavingsCents, summary.currency)}
          </div>
        ) : null}
        {hasSubscription ? (
          <p style={{ fontSize: 12, color: "#6d6d6d", marginTop: 18 }}>This order has a recurring charge for subscription items.</p>
        ) : null}

        <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid #e4e1d6" }}>
          {[
            { t: "30-day money-back guarantee", icon: <ShieldCheckIcon /> },
            { t: "Cancel anytime, no strings attached", icon: <RotateCcwIcon /> },
            { t: "Free US shipping included on every order", icon: <TruckIcon /> },
          ].map((m) => (
            <div key={m.t} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
              <span style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #d7d3c6", display: "flex", alignItems: "center", justifyContent: "center", color: "#1c3a13", flex: "none" }}>
                {m.icon}
              </span>
              <span style={{ fontSize: 13, color: "#1a1a1a" }}>{m.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
