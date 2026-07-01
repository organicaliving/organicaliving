import { z } from "zod";

/** Topics mirror the contact channels shown on the page. */
export const CONTACT_TOPICS = [
  "Customer Care",
  "Partnerships",
  "Practitioners",
  "Press",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address."),
  topic: z.enum(CONTACT_TOPICS, { message: "Please choose a topic." }),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail (10+ characters).")
    .max(2000, "Message is too long (2000 characters max)."),
  // Honeypot — real users leave this empty; bots tend to fill every field.
  // Accept anything so a filled value passes validation, then the action
  // silently short-circuits on it (no error signal handed back to bots).
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
