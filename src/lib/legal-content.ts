/**
 * Shared facts for the legal pages (/terms, /privacy, /accessibility, /consent).
 * Real values supplied by the owner; unresolved specifics are marked
 * `[[DEFAULT: …]]` and confirmed at the end of the build. Reuses entity facts
 * already established in the footer / brand-content.
 */
export const LEGAL_META = {
  entity: "Organica Living, Inc.",
  brand: "Organica Living",
  address: "[[DEFAULT: registered business address, Atlanta, GA]]",
  jurisdiction: "[[DEFAULT: State of Georgia, USA]]",
  privacyEmail: "privacy@organicaliving.com",
  careEmail: "care@organicaliving.com",
  lastUpdated: "July 2, 2026",
} as const;

export const DRAFT_NOTICE =
  "Draft — pending legal review. This document is a working draft and not yet a binding legal agreement.";
