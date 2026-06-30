import { setDeliveryIntervalAction } from "@/lib/cart/actions";
import type { DeliveryInterval } from "@/lib/cart/types";

const boundSetInterval = setDeliveryIntervalAction.bind(null, null) as unknown as (
  formData: FormData
) => Promise<void>;

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1c3a13" strokeWidth="1.5">
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />
  </svg>
);

/**
 * "Save 10% on 3-Month Delivery" upsell box on subscription lines. Wired to
 * setDeliveryIntervalAction: Upgrade switches the line to quarterly (extra 10%
 * off), and the active state offers a switch back to monthly.
 */
export function CartDeliveryUpgrade({
  variantId,
  interval,
}: {
  variantId: string;
  interval: DeliveryInterval;
}) {
  const isQuarterly = interval === "quarterly";
  const next: DeliveryInterval = isQuarterly ? "monthly" : "quarterly";
  const label = isQuarterly ? "3-Month Delivery · Save 10%" : "Save 10% on 3 Month Delivery";
  const cta = isQuarterly ? "Switch to monthly" : "Upgrade";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        background: isQuarterly ? "#e7f0c8" : "#f4f1e6",
        borderRadius: 12,
        padding: "12px 16px",
        marginTop: 12,
        maxWidth: 380,
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "#1a1a1a" }}>
        <RefreshIcon />
        {label}
      </span>
      <form action={boundSetInterval}>
        <input type="hidden" name="variantId" value={variantId} />
        <input type="hidden" name="interval" value={next} />
        <button
          type="submit"
          style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          {cta}
        </button>
      </form>
    </div>
  );
}
