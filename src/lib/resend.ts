import "server-only";
import { Resend } from "resend";
import { serverEnv } from "@/lib/env";

/**
 * Transactional email (order confirmations, password resets, referral payouts).
 * Compose emails as React with @react-email/components under src/emails.
 */
export const resend = new Resend(serverEnv.resendApiKey);
