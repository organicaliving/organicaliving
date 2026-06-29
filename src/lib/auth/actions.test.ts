import { describe, it, expect, vi, beforeEach } from "vitest";

const auth = {
  signInWithPassword: vi.fn(),
  signUp: vi.fn(),
  resetPasswordForEmail: vi.fn(),
  updateUser: vi.fn(),
  signInWithOAuth: vi.fn(),
};
vi.mock("@/lib/supabase/server", () => ({ createClient: vi.fn(async () => ({ auth })) }));

import { signInAction, signUpAction, requestPasswordResetAction } from "@/lib/auth/actions";

function fd(obj: Record<string, string>) {
  const f = new FormData();
  Object.entries(obj).forEach(([k, v]) => f.set(k, v));
  return f;
}

beforeEach(() => Object.values(auth).forEach((m) => m.mockReset()));

describe("signInAction", () => {
  it("returns field errors on invalid input without calling supabase", async () => {
    const r = await signInAction(null, fd({ email: "bad", password: "" }));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fieldErrors?.email).toBeTruthy();
    expect(auth.signInWithPassword).not.toHaveBeenCalled();
  });
  it("maps a supabase error to ActionResult", async () => {
    auth.signInWithPassword.mockResolvedValue({ error: { message: "Invalid login credentials" } });
    const r = await signInAction(null, fd({ email: "a@b.com", password: "secret123" }));
    expect(r).toEqual({ ok: false, error: "Invalid login credentials" });
  });
});

describe("signUpAction", () => {
  it("returns ok on success (awaiting email confirmation)", async () => {
    auth.signUp.mockResolvedValue({ error: null });
    const r = await signUpAction(null, fd({ fullName: "Ada", email: "a@b.com", password: "longenough" }));
    expect(r.ok).toBe(true);
    expect(auth.signUp).toHaveBeenCalled();
  });
});

describe("requestPasswordResetAction", () => {
  it("returns ok even structurally on valid email", async () => {
    auth.resetPasswordForEmail.mockResolvedValue({ error: null });
    const r = await requestPasswordResetAction(null, fd({ email: "a@b.com" }));
    expect(r.ok).toBe(true);
  });
});
