import { describe, it, expect } from "vitest";
import { contactSchema, addressSchema, checkoutSchema } from "@/lib/checkout/schemas";

describe("checkout schemas", () => {
  it("requires a valid email", () => {
    expect(contactSchema.safeParse({ email: "no" }).success).toBe(false);
    expect(contactSchema.safeParse({ email: "a@b.com" }).success).toBe(true);
  });
  it("requires address fields", () => {
    expect(addressSchema.safeParse({ fullName: "", line1: "", city: "", state: "", postalCode: "" }).success).toBe(false);
    expect(addressSchema.safeParse({ fullName: "Ada", line1: "1 St", city: "Atlanta", state: "GA", postalCode: "30301" }).success).toBe(true);
  });
  it("checkoutSchema merges contact + address", () => {
    const r = checkoutSchema.safeParse({ email: "a@b.com", fullName: "Ada", line1: "1 St", city: "Atlanta", state: "GA", postalCode: "30301" });
    expect(r.success).toBe(true);
  });
});
