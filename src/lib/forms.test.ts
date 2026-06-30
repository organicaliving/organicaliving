import { describe, it, expect } from "vitest";
import { fieldError, safeNextPath, type ActionResult } from "@/lib/forms";

describe("fieldError", () => {
  it("returns the first error for a field", () => {
    const r: ActionResult = { ok: false, error: "x", fieldErrors: { email: ["Invalid email"] } };
    expect(fieldError(r, "email")).toBe("Invalid email");
  });
  it("returns undefined when none / ok", () => {
    expect(fieldError({ ok: true }, "email")).toBeUndefined();
    expect(fieldError(null, "email")).toBeUndefined();
  });
});

describe("safeNextPath", () => {
  it("returns fallback for null/undefined/empty", () => {
    expect(safeNextPath(null)).toBe("/account");
    expect(safeNextPath(undefined)).toBe("/account");
    expect(safeNextPath("")).toBe("/account");
  });
  it("returns fallback for open-redirect attempts", () => {
    expect(safeNextPath("//evil.com")).toBe("/account");
    expect(safeNextPath("/\\evil.com")).toBe("/account");
    expect(safeNextPath("https://evil.com")).toBe("/account");
  });
  it("returns the path for a safe same-origin path", () => {
    expect(safeNextPath("/account/orders")).toBe("/account/orders");
  });
});
