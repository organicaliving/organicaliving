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
