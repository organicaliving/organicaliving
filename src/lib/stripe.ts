import "server-only";
import Stripe from "stripe";
import { serverEnv } from "@/lib/env";

/**
 * Server-side Stripe client. Handles payments, subscriptions (Stripe Billing)
 * and tax (Stripe Tax). Never import this into client code.
 * apiVersion is left at the SDK default so it stays pinned with the package.
 */
export const stripe = new Stripe(serverEnv.stripeSecretKey, {
  typescript: true,
});
