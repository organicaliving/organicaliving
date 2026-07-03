/**
 * Shared facts for the legal pages (/terms, /privacy, /accessibility, /consent).
 * Real values supplied by the owner; formerly-placeholder specifics have been
 * confirmed and baked in. Reuses entity facts already established in the
 * footer / brand-content.
 */
export const LEGAL_META = {
  entity: "Organica Living Ltd. Co.",
  brand: "Organica Living",
  address: "Atlanta, Georgia, USA",
  jurisdiction: "State of Georgia, USA",
  privacyEmail: "privacy@organicaliving.com",
  careEmail: "care@organicaliving.com",
  lastUpdated: "July 2, 2026",
} as const;

export const DRAFT_NOTICE =
  "Draft — pending legal review. This document is a working draft and not yet a binding legal agreement.";
