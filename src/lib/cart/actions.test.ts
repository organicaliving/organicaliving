import { describe, it, expect, vi, beforeEach } from "vitest";

const { getUser, readGuestCart, writeGuestCart } = vi.hoisted(() => ({
  getUser: vi.fn(),
  readGuestCart: vi.fn(),
  writeGuestCart: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({ createClient: vi.fn(async () => ({ auth: { getUser }, from: vi.fn() })) }));
vi.mock("@/lib/cart/guest", () => ({ readGuestCart, writeGuestCart, clearGuestCart: vi.fn(), MAX_ITEMS: 50 }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("@/lib/cart/queries", () => ({ validatePromoCode: vi.fn(async (c: string) => (c === "BUNDLE25" ? { code: "BUNDLE25", type: "percent", value: 25 } : null)) }));

import { addItemAction, applyPromoAction } from "@/lib/cart/actions";

// Use a UUID that passes Zod v4's strict RFC 4122 validation (variant bits must be [89abAB])
const VALID_UUID = "11111111-1111-1111-8111-111111111111";

function fd(o: Record<string, string>) { const f = new FormData(); Object.entries(o).forEach(([k, v]) => f.set(k, v)); return f; }
beforeEach(() => { getUser.mockReset(); readGuestCart.mockReset(); writeGuestCart.mockReset(); getUser.mockResolvedValue({ data: { user: null } }); });

describe("addItemAction (guest)", () => {
  it("rejects an invalid variantId", async () => {
    const r = await addItemAction(null, fd({ variantId: "not-a-uuid", quantity: "1" }));
    expect(r.ok).toBe(false);
    expect(writeGuestCart).not.toHaveBeenCalled();
  });
  it("adds a new line and writes the cookie", async () => {
    readGuestCart.mockResolvedValue({ items: [] });
    const r = await addItemAction(null, fd({ variantId: VALID_UUID, quantity: "2", purchaseType: "one_time" }));
    expect(r.ok).toBe(true);
    expect(writeGuestCart).toHaveBeenCalledWith(expect.objectContaining({ items: [expect.objectContaining({ quantity: 2 })] }));
  });
  it("sums quantity for an existing variant+type", async () => {
    readGuestCart.mockResolvedValue({ items: [{ variantId: VALID_UUID, quantity: 1, purchaseType: "one_time" }] });
    await addItemAction(null, fd({ variantId: VALID_UUID, quantity: "2", purchaseType: "one_time" }));
    expect(writeGuestCart).toHaveBeenCalledWith(expect.objectContaining({ items: [expect.objectContaining({ quantity: 3 })] }));
  });
});

describe("applyPromoAction (guest)", () => {
  it("rejects an unknown code", async () => {
    readGuestCart.mockResolvedValue({ items: [] });
    const r = await applyPromoAction(null, fd({ code: "NOPE" }));
    expect(r.ok).toBe(false);
  });
  it("accepts a valid code and stores it", async () => {
    readGuestCart.mockResolvedValue({ items: [] });
    const r = await applyPromoAction(null, fd({ code: "BUNDLE25" }));
    expect(r.ok).toBe(true);
    expect(writeGuestCart).toHaveBeenCalledWith(expect.objectContaining({ code: "BUNDLE25" }));
  });
});
