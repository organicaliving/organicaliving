import { describe, it, expect, vi, beforeEach } from "vitest";
const sendMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/resend", () => ({ resend: { emails: { send: sendMock } } }));
import { sendEmail } from "@/lib/email/send";
import { createElement } from "react";

beforeEach(() => sendMock.mockReset());

describe("sendEmail", () => {
  it("returns ok on success", async () => {
    sendMock.mockResolvedValue({ data: { id: "e1" }, error: null });
    const r = await sendEmail({ to: "a@b.com", subject: "Hi", react: createElement("div", null, "x") });
    expect(r.ok).toBe(true);
    expect(sendMock).toHaveBeenCalled();
  });
  it("returns not-ok on error without throwing", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "bad" } });
    const r = await sendEmail({ to: "a@b.com", subject: "Hi", react: createElement("div") });
    expect(r.ok).toBe(false);
  });
});
