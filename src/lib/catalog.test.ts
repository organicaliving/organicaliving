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
  createStaticClient: vi.fn(() => ({ from: fromMock })),
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
  it("calls select/eq/order with correct arguments", async () => {
    const b = builder({ data: [], error: null });
    const selectSpy = vi.fn(() => b);
    const eqSpy = vi.fn(() => b);
    const orderSpy = vi.fn(() => b);
    b.select = selectSpy;
    b.eq = eqSpy;
    b.order = orderSpy;
    fromMock.mockReturnValue(b);
    await getActiveProducts();
    expect(selectSpy).toHaveBeenCalledWith(expect.stringContaining("variants:product_variants(*)"));
    expect(eqSpy).toHaveBeenCalledWith("is_active", true);
    expect(orderSpy).toHaveBeenCalledWith("sort_order", { ascending: true });
  });
});

describe("getProductBySlug", () => {
  it("returns a single product or null", async () => {
    fromMock.mockReturnValue(builder({ data: null, error: null }));
    expect(await getProductBySlug("nope")).toBeNull();
  });
  it("select embeds variants and facts, and uses maybeSingle", async () => {
    const b = builder({ data: null, error: null });
    const selectSpy = vi.fn(() => b);
    const maybeSingleSpy = vi.fn(() => Promise.resolve({ data: null, error: null }));
    b.select = selectSpy;
    b.maybeSingle = maybeSingleSpy;
    fromMock.mockReturnValue(b);
    await getProductBySlug("some-slug");
    expect(selectSpy).toHaveBeenCalledWith(expect.stringContaining("variants:product_variants(*)"));
    expect(selectSpy).toHaveBeenCalledWith(expect.stringContaining("facts:product_facts(*)"));
    expect(maybeSingleSpy).toHaveBeenCalled();
  });
  it("throws on error", async () => {
    fromMock.mockReturnValue(builder({ data: null, error: { message: "boom" } }));
    await expect(getProductBySlug("any")).rejects.toBeTruthy();
  });
});

describe("getProductSlugs", () => {
  it("maps rows to slug strings", async () => {
    fromMock.mockReturnValue(builder({ data: [{ slug: "a" }, { slug: "b" }], error: null }));
    expect(await getProductSlugs()).toEqual(["a", "b"]);
  });
  it("throws on error", async () => {
    fromMock.mockReturnValue(builder({ data: null, error: { message: "boom" } }));
    await expect(getProductSlugs()).rejects.toBeTruthy();
  });
});
