"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { addItemAction } from "@/lib/cart/actions";
import { formatPrice } from "@/lib/format";

type Props = {
  variantId: string;
  priceCents: number;
  subscriptionPriceCents: number | null;
  currency: string;
  form: string; // e.g. "60 Capsules"
};

type Choice = "subscription" | "one_time";

function CartSubmit({ priceLabel }: { priceLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        flex: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        fontWeight: 500,
        color: "#fcfcf7",
        background: "#1c3a13",
        padding: "17px 26px",
        borderRadius: 40,
        border: "none",
        cursor: pending ? "default" : "pointer",
        lineHeight: 1,
        opacity: pending ? 0.7 : 1,
      }}
    >
      {pending ? "Adding…" : `Add To Cart · ${priceLabel}`}
    </button>
  );
}

export function BuyBox({ variantId, priceCents, subscriptionPriceCents, currency, form }: Props) {
  const hasSub = subscriptionPriceCents != null && subscriptionPriceCents < priceCents;
  const [choice, setChoice] = useState<Choice>(hasSub ? "subscription" : "one_time");
  const [state, action] = useActionState(addItemAction, null);

  const subCents = subscriptionPriceCents ?? priceCents;
  const savePct = hasSub
    ? Math.round((1 - subCents / priceCents) * 100)
    : 0;
  const selectedCents = choice === "subscription" ? subCents : priceCents;

  const radio = (active: boolean) => ({
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: `1.5px solid ${active ? "#1c3a13" : "#c2c2b6"}`,
    flex: "none" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  const dot = (active: boolean) => ({
    width: 9,
    height: 9,
    borderRadius: "50%",
    background: active ? "#1c3a13" : "transparent",
  });
  const optStyle = (active: boolean) => ({
    display: "flex",
    alignItems: "center",
    gap: 14,
    border: `1.5px solid ${active ? "#1c3a13" : "#e4e1d6"}`,
    borderRadius: 14,
    padding: "15px 16px",
    cursor: "pointer",
    transition: "border-color .2s ease",
    width: "100%",
    background: "transparent",
    textAlign: "left" as const,
  });

  return (
    <>
      {/* purchase card */}
      <div
        style={{
          marginTop: 26,
          border: "1px solid #e4e1d6",
          borderRadius: 18,
          padding: 8,
          background: "#fff",
        }}
      >
        {hasSub ? (
          <button
            type="button"
            data-buyopt="sub"
            aria-pressed={choice === "subscription"}
            onClick={() => setChoice("subscription")}
            style={optStyle(choice === "subscription")}
          >
            <span style={radio(choice === "subscription")}>
              <span style={dot(choice === "subscription")} />
            </span>
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: 15, fontWeight: 500 }}>Subscribe &amp; Save</span>
              <span style={{ display: "block", fontSize: 12, color: "#6d6d6d" }}>
                Delivered monthly · cancel anytime · free shipping
              </span>
            </span>
            <span style={{ textAlign: "right" }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>
                {formatPrice(subCents, currency)}
              </span>
              <span style={{ display: "block", fontSize: 11, color: "#1c3a13" }}>
                Save {savePct}%
              </span>
            </span>
          </button>
        ) : null}
        <button
          type="button"
          data-buyopt="one"
          aria-pressed={choice === "one_time"}
          onClick={() => setChoice("one_time")}
          style={{ ...optStyle(choice === "one_time"), marginTop: hasSub ? 8 : 0 }}
        >
          <span style={radio(choice === "one_time")}>
            <span style={dot(choice === "one_time")} />
          </span>
          <span style={{ flex: 1 }}>
            <span style={{ fontSize: 15, fontWeight: 500 }}>One-Time Purchase</span>
            <span style={{ display: "block", fontSize: 12, color: "#6d6d6d" }}>{form}</span>
          </span>
          <span style={{ fontSize: 15, fontWeight: 600 }}>{formatPrice(priceCents, currency)}</span>
        </button>
      </div>

      {/* add to cart */}
      <form action={action} style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <input type="hidden" name="variantId" value={variantId} />
        <input type="hidden" name="purchaseType" value={choice} />
        <input type="hidden" name="quantity" value="1" />
        <CartSubmit priceLabel={formatPrice(selectedCents, currency)} />
        <button
          type="button"
          aria-label="Save for later"
          title="Save for later"
          style={{
            flex: "none",
            width: 54,
            height: 54,
            borderRadius: "50%",
            border: "1.5px solid #1c3a13",
            color: "#1c3a13",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </form>
      <div aria-live="polite" style={{ minHeight: 18, marginTop: 8 }}>
        {state?.ok ? (
          <span style={{ fontSize: 13, color: "#1c3a13" }}>Added to cart ✓</span>
        ) : state && !state.ok ? (
          <span style={{ fontSize: 13, color: "#b3261e" }}>{state.error}</span>
        ) : null}
      </div>
    </>
  );
}
