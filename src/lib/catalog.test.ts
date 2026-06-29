import { describe, it, expect, vi, beforeEach } from "vitest";

// Chainable, awaitable Supabase query-builder mock.
function builder(result: { data: unknown; error: unknown }) {
  const b: Record<string, unknown> = {};
  b.select = () => b;
  b.eq = () => b;
  b.order = () => b;
  b.maybeSingle = () => Promise.resolve(result);
  b.then = (resolve: (v: unknown) => void) => resolve(result);
  return b;
}

const fromMock = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({ from: fromMock })),
}));

import { getActiveProducts, getProductBySlug, getProductSlugs } from "@/lib/catalog";

beforeEach(() => fromMock.mockReset());

describe("getActiveProducts", () => {
  it("returns the data array", async () => {
    fromMock.mockReturnValue(builder({ data: [{ id: "p1", variants: [] }], error: null }));
    const res = await getActiveProducts();
    expect(res).toHaveLength(1);
    expect(fromMock).toHaveBeenCalledWith("products");
  });
  it("throws on error", async () => {
    fromMock.mockReturnValue(builder({ data: null, error: { message: "boom" } }));
    await expect(getActiveProducts()).rejects.toBeTruthy();
  });
});

describe("getProductBySlug", () => {
  it("returns a single product or null", async () => {
    fromMock.mockReturnValue(builder({ data: null, error: null }));
    expect(await getProductBySlug("nope")).toBeNull();
  });
});

describe("getProductSlugs", () => {
  it("maps rows to slug strings", async () => {
    fromMock.mockReturnValue(builder({ data: [{ slug: "a" }, { slug: "b" }], error: null }));
    expect(await getProductSlugs()).toEqual(["a", "b"]);
  });
});
