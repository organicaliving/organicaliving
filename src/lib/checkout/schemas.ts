import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export const addressSchema = z.object({
  fullName: z.string().min(1, "Name is required."),
  line1: z.string().min(1, "Address is required."),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  postalCode: z.string().min(1, "ZIP is required."),
  country: z.string().min(2).default("US"),
});

export const checkoutSchema = contactSchema.merge(addressSchema);
export type CheckoutInput = z.infer<typeof checkoutSchema>;
