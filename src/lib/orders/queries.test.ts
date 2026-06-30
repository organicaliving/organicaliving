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
