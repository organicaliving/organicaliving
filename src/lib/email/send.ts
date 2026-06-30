import "server-only";
import type { ReactElement } from "react";
import { resend } from "@/lib/resend";

const FROM = "Organica Living <orders@organicaliving.com>";

export async function sendEmail(args: { to: string; subject: string; react: ReactElement }): Promise<{ ok: boolean }> {
  try {
    const { error } = await resend.emails.send({ from: FROM, to: args.to, subject: args.subject, react: args.react });
    if (error) {
      console.warn("[email] send failed:", error.message);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.warn("[email] send threw:", (err as Error).message);
    return { ok: false };
  }
}
