import { describe, it, expect, vi, beforeEach } from "vitest";

const { fromMock, getUser, readGuestCart } = vi.hoisted(() => ({
  fromMock: vi.fn(),
  getUser: vi.fn(),
  readGuestCart: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({ from: fromMock, auth: { getUser } })),
}));
vi.mock("@/lib/cart/guest", () => ({ readGuestCart }));

import { getCart } from "@/lib/cart/queries";

function builder(result: { data: unknown; error: unknown }) {
  const b: Record<string, unknown> = {};
  b.select = () => b; b.eq = () => b; b.in = () => b; b.gte = () => b; b.lte = () => b;
  b.order = () => b; b.maybeSingle = () => Promise.resolve(result);
  b.then = (res: (v: unknown) => void) => res(result);
  return b;
}

beforeEach(() => { fromMock.mockReset(); getUser.mockReset(); readGuestCart.mockReset(); });

describe("getCart (guest)", () => {
  it("builds a CartView from the cookie and looked-up variants", async () => {
    getUser.mockResolvedValue({ data: { user: null } });
    readGuestCart.mockResolvedValue({ items: [{ variantId: "v1", quantity: 2, purchaseType: "one_time" }] });
    fromMock.mockImplementation((table: string) => {
      if (table === "product_variants") return builder({ data: [{
        id: "v1", price_cents: 3999, subscription_price_cents: 2999, currency: "usd", title: "60 capsules",
        product: { slug: "multi-pro", name: "Multi Pro", image_path: "images/multi-pro.webp" },
      }], error: null });
      return builder({ data: [], error: null });
    });
    const cart = await getCart();
    expect(cart.itemCount).toBe(2);
    expect(cart.subtotalCents).toBe(7998);
    expect(cart.lines[0].productName).toBe("Multi Pro");
  });
  it("returns an empty cart for an empty guest cookie", async () => {
    getUser.mockResolvedValue({ data: { user: null } });
    readGuestCart.mockResolvedValue({ items: [] });
    const cart = await getCart();
    expect(cart).toMatchObject({ itemCount: 0, subtotalCents: 0, totalCents: 0, lines: [] });
  });
});
