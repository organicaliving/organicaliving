import { describe, it, expect } from "vitest";
import { signUpSchema, signInSchema, emailSchema, updatePasswordSchema } from "@/lib/auth/schemas";

describe("auth schemas", () => {
  it("rejects short passwords on signup", () => {
    const r = signUpSchema.safeParse({ fullName: "A", email: "a@b.com", password: "short" });
    expect(r.success).toBe(false);
  });
  it("accepts a valid signup", () => {
    const r = signUpSchema.safeParse({ fullName: "Ada", email: "a@b.com", password: "longenough" });
    expect(r.success).toBe(true);
  });
  it("rejects invalid email", () => {
    expect(emailSchema.safeParse({ email: "nope" }).success).toBe(false);
  });
  it("signIn requires both fields", () => {
    expect(signInSchema.safeParse({ email: "a@b.com", password: "" }).success).toBe(false);
  });
  it("updatePassword enforces min length", () => {
    expect(updatePasswordSchema.safeParse({ password: "short" }).success).toBe(false);
  });
});
