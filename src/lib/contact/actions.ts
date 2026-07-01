"use server";
import { createElement } from "react";
import type { ActionResult } from "@/lib/forms";
import { sendEmail } from "@/lib/email/send";
import { ContactMessage } from "@/emails/ContactMessage";
import { contactSchema } from "@/lib/contact/schema";

/** Where contact-form submissions are delivered. Overridable via env. */
const CONTACT_TO = process.env.CONTACT_TO || "hello@organicaliving.com";

export async function sendContactMessage(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    topic: formData.get("topic"),
    message: formData.get("message"),
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot tripped — pretend success so bots get no signal.
  if (parsed.data.company) return { ok: true };

  const { name, email, topic, message } = parsed.data;

  const { ok } = await sendEmail({
    to: CONTACT_TO,
    subject: `[${topic}] Message from ${name}`,
    react: createElement(ContactMessage, { name, email, topic, message }),
    replyTo: email,
  });

  if (!ok) {
    return {
      ok: false,
      error: "Sorry — we couldn't send your message. Please email us directly at hello@organicaliving.com.",
    };
  }

  return { ok: true };
}
