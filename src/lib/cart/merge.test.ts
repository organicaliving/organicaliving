import { describe, it, expect, vi, beforeEach } from "vitest";

const { getUser, fromMock, readGuestCart, clearGuestCart } = vi.hoisted(() => ({
  getUser: vi.fn(),
  fromMock: vi.fn(),
  readGuestCart: vi.fn(),
  clearGuestCart: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({ createClient: vi.fn(async () => ({ auth: { getUser }, from: fromMock })) }));
vi.mock("@/lib/cart/guest", () => ({ readGuestCart, clearGuestCart }));

import { mergeGuestCartIntoUser } from "@/lib/cart/merge";

beforeEach(() => { getUser.mockReset(); fromMock.mockReset(); readGuestCart.mockReset(); clearGuestCart.mockReset(); });

describe("mergeGuestCartIntoUser", () => {
  it("no-ops when the guest cart is empty", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "u1" } } });
    readGuestCart.mockResolvedValue({ items: [] });
    await mergeGuestCartIntoUser();
    expect(fromMock).not.toHaveBeenCalled();
    expect(clearGuestCart).toHaveBeenCalled();
  });
  it("no-ops when no user", async () => {
    getUser.mockResolvedValue({ data: { user: null } });
    await mergeGuestCartIntoUser();
    expect(fromMock).not.toHaveBeenCalled();
  });
});
