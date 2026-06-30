import { applyPromoAction, removePromoAction } from "@/lib/cart/actions";

const boundApply = applyPromoAction.bind(null, null) as unknown as (
  formData: FormData
) => Promise<void>;
const boundRemove = removePromoAction as unknown as () => Promise<void>;

/**
 * Promo Code control. Applied state shows the code chip + Remove (mockup);
 * otherwise an input + Apply. Wired to applyPromoAction / removePromoAction.
 */
export function CartPromo({ code }: { code: string | null }) {
  return (
    <>
      <div style={{ fontSize: 15, fontWeight: 600 }}>Promo Code</div>
      {code ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            background: "#fff",
            border: "1px solid #d7d3c6",
            borderRadius: 10,
            padding: "14px 16px",
            marginTop: 12,
          }}
        >
          <span style={{ fontSize: 13, color: "#1c3a13", background: "#e7f0c8", padding: "4px 10px", borderRadius: 6 }}>
            {code} applied!
          </span>
          <form action={boundRemove}>
            <button type="submit" style={{ fontSize: 13, color: "#1a1a1a", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              Remove
            </button>
          </form>
        </div>
      ) : (
        <form
          action={boundApply}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#fff",
            border: "1px solid #d7d3c6",
            borderRadius: 10,
            padding: "8px 8px 8px 16px",
            marginTop: 12,
          }}
        >
          <input
            name="code"
            placeholder="Enter promo code"
            style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#1a1a1a", fontFamily: "inherit" }}
          />
          <button
            type="submit"
            style={{ flex: "none", fontSize: 13, fontWeight: 500, color: "#fcfcf7", background: "#1c3a13", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer" }}
          >
            Apply
          </button>
        </form>
      )}
    </>
  );
}
