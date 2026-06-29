import { describe, it, expect } from "vitest";
import { fieldError, type ActionResult } from "@/lib/forms";

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
