// Under test, `@/lib/stripe` is aliased here so tax/payment modules import cleanly.
// The actual Stripe client is never called in unit tests.
export const stripe = {} as unknown as import("stripe").default;
