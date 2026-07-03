# Help Center & Footer Pages — Facts to Confirm

These values were formerly placeholder `[[DEFAULT: …]]` markers across the new help-center and footer pages added in the `feat/help-center` branch. All placeholders have been replaced with the chosen defaults baked into the copy; the `[[DEFAULT]]` markers and any "draft — pending legal review" banners can be removed once the four legal pages have been signed off.

**Note:** The four legal pages (`/terms`, `/privacy`, `/accessibility`, `/consent`) still carry their `DRAFT_NOTICE` banner and are pending final legal review. All other pages are considered complete.

**Total `[[DEFAULT]]` occurrences remaining in `src/`: 0** (all 51 markers — including the 2 comment/doc lines — have been removed).

---

## `/legal-content.ts` — Shared legal entity facts (used by Terms, Privacy, Accessibility, Consent)

| # | File / where it appears | The fact needed | Our current default value | Owner's real value |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 1 | `src/lib/legal-content.ts:10` | Registered business address | Atlanta, GA | Atlanta, Georgia, USA |
| 2 | `src/lib/legal-content.ts:11` | Governing jurisdiction | State of Georgia, USA | State of Georgia, USA |

---

## `/terms/page.tsx` — Terms of Service

| # | File / where it appears | The fact needed | Our current default value | Owner's real value |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 3 | `src/app/(storefront)/terms/page.tsx:149` | Advance notice (days) before price change takes effect | 14 days | 30 days |
| 4 | `src/app/(storefront)/terms/page.tsx:174` | Window (business days) to report a dispute after receiving a renewal order | 5 business days | 5 business days |
| 5 | `src/app/(storefront)/terms/page.tsx:193` | Return window (days) from delivery date | 30 days | 30 days |
| 6 | `src/app/(storefront)/terms/page.tsx:318` | Liability cap look-back period (months of payments) | 12 months | 12 months |

---

## `/privacy/page.tsx` — Privacy Policy

| # | File / where it appears | The fact needed | Our current default value | Owner's real value |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 7 | `src/app/(storefront)/privacy/page.tsx:76` | Name of analytics provider | (to be confirmed) | Plausible Analytics (a privacy-first, cookieless analytics service) |
| 8 | `src/app/(storefront)/privacy/page.tsx:132` | Analytics provider name (inline copy) | (to be confirmed) | Plausible Analytics (a privacy-first, cookieless analytics service) |
| 9 | `src/app/(storefront)/privacy/page.tsx:238` | Days to respond to a data subject request | 30 days | 30 days |
| 10 | `src/app/(storefront)/privacy/page.tsx:257` | Days before personal data is deleted upon request | 90 days | 30 days |
| 11 | `src/app/(storefront)/privacy/page.tsx:259` | Years financial/accounting data is retained | 7 years | 7 years |
| 12 | `src/app/(storefront)/privacy/page.tsx:329` | EEA transfer mechanism | (to be confirmed with legal counsel) | Standard Contractual Clauses (SCCs) |

---

## `/accessibility/page.tsx` — Accessibility Statement

| # | File / where it appears | The fact needed | Our current default value | Owner's real value |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 13 | `src/app/(storefront)/accessibility/page.tsx:140` | Whether existing product videos have captions | (to be confirmed) | Captions provided on all video content we publish |
| 14 | `src/app/(storefront)/accessibility/page.tsx:180` | Business days to acknowledge an accessibility complaint | 2 business days | 2 business days |
| 15 | `src/app/(storefront)/accessibility/page.tsx:181` | Business days to provide substantive response or workaround | 5 business days | 5 business days |

---

## `/consent/page.tsx` — Cookie & Consent Policy

| # | File / where it appears | The fact needed | Our current default value | Owner's real value |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 16 | `src/app/(storefront)/consent/page.tsx:94` | Analytics provider name | (to be confirmed) | Plausible Analytics |
| 17 | `src/app/(storefront)/consent/page.tsx:128` | Specific data fields shared with analytics provider | (to be listed) | an anonymized page URL, referrer, browser and device type, and country |
| 18 | `src/app/(storefront)/consent/page.tsx:159` | Consent management tool / banner integration | (pending) | Essential cookies only set by default; preferences via browser settings or email; full preference center rolling out |
| 19 | `src/app/(storefront)/consent/page.tsx:173` | Business days to honour a cookie opt-out request | 5 business days | 5 business days |

---

## `/practitioners/page.tsx` — Practitioners Program

| # | File / where it appears | The fact needed | Our current default value | Owner's real value |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 20 | `src/app/(storefront)/practitioners/page.tsx:21` | Wholesale / pro discount percentage and minimum order terms | (to be confirmed) | 20% professional discount on both personal and dispensing orders, with no minimum order |
| 21 | `src/app/(storefront)/practitioners/page.tsx:26` | Referral tracking method and client-link terms | (to be confirmed) | A unique practitioner code clients enter at checkout, with redemptions visible in the practitioner dashboard |
| 22 | `src/app/(storefront)/practitioners/page.tsx:46` | Application credential requirements | (to be confirmed) | Valid professional license or credential (MD, DO, ND, RD, RN, DC, LAc, or equivalent) |
| 23 | `src/app/(storefront)/practitioners/page.tsx:69` | Application review timeline (days) | (to be confirmed) | 2 business days |

---

## `/careers/page.tsx` — Careers

| # | File / where it appears | The fact needed | Our current default value | Owner's real value |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 24 | `src/app/(storefront)/careers/page.tsx:41` | Benefits package (health coverage, parental leave, PTO, remote/flexible-work stipend) | (to be confirmed) | Comprehensive health, dental and vision coverage, paid parental leave, generous paid time off, and a remote/flexible-work and wellness stipend |
| 25 | `src/app/(storefront)/careers/page.tsx:46` | L&D budget and promotion criteria | (to be confirmed) | Annual learning-and-development budget and clear, merit-based advancement |

---

## `src/lib/help/content.ts` — Help Center Content

### Orders & Shipping

| # | File / where it appears | The fact needed | Our current default value | Owner's real value |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 26 | `content.ts:96` | Standard delivery window (business days after processing) | 5–7 business days | 5–7 business days |
| 27 | `content.ts:100` | Expedited shipping delivery window | 2–3 business days | 2–3 business days |
| 28 | `content.ts:104` | Free-shipping order threshold | (shown at checkout — threshold TBC) | $50 |
| 29 | `content.ts:108` | Order processing time before handover to carrier | 1–2 business days | 1–2 business days |
| 30 | `content.ts:121` | International destination list | "select international destinations" | Canada, the United Kingdom, Australia, and select destinations across Europe |
| 31 | `content.ts:125` | International delivery window (business days after dispatch) | 10–21 business days | 10–21 business days |

### Subscriptions

| # | File / where it appears | The fact needed | Our current default value | Owner's real value |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 32 | `content.ts:176` | Advance reminder email timing before billing date | 3–5 days before | 3–5 days before |
| 33 | `content.ts:180` | Subscribe & Save recurring discount percentage | (percentage TBC) | 15% |
| 34 | `content.ts:204` | Cut-off window to make subscription changes before next billing | 24 hours | at least 24 hours before next billing date |
| 35 | `content.ts:225` | Available subscription frequencies | Every 1, 2, or 3 months | every 1, 2, or 3 months |
| 36 | `content.ts:239` | Advance reminder email timing before renewal (FAQ answer) | 3–5 days before | 3–5 days before |
| 37 | `content.ts:243` | Subscription renewal dispatch time after billing | 1–2 business days | 1–2 business days |
| 38 | `content.ts:264` | Subscribe & Save discount percentage (in promotions section) | (varies by product) | 15% |

### Returns & Refunds

| # | File / where it appears | The fact needed | Our current default value | Owner's real value |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 39 | `content.ts:292` | Return window (days from delivery) | 30 days | 30 days |
| 40 | `content.ts:296` | Return eligibility condition | Unused and in original packaging (opened only if defective/damaged) | unused and in original packaging (opened only if defective or damaged) |
| 41 | `content.ts:300` | Return window for unwanted subscription renewals | 30 days | 30 days |
| 42 | `content.ts:314` | Team response time for return authorisation request | 1–2 business days | 1–2 business days |
| 43 | `content.ts:332` | Refund processing time after item received | 3–5 business days | 3–5 business days |
| 44 | `content.ts:336` | Bank posting time after refund is issued | 3–10 business days (bank-dependent) | 3–10 business days, depending on your bank |
| 45 | `content.ts:351` | Window to report a damaged/wrong item after delivery | 14 days | 14 days |

### Product Usage

| # | File / where it appears | The fact needed | Our current default value | Owner's real value |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 46 | `content.ts:402` | Sleep Pro+ timing — minutes before bedtime to take | 30–60 minutes | 30–60 minutes before bedtime |
| 47 | `content.ts:439` | Sleep Pro+ timing (repeated in general guidance section) | 30–60 minutes | 30–60 minutes before bedtime |

### Account & Security

| # | File / where it appears | The fact needed | Our current default value | Owner's real value |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 48 | `content.ts:580` | Password reset link expiry time | 60 minutes | 60 minutes |

### Contact

| # | File / where it appears | The fact needed | Our current default value | Owner's real value |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 49 | `content.ts:697` | Customer care response time (business days) | 1–2 business days | 1–2 business days |

---

*Grep command used:* `grep -rn "\[\[DEFAULT" src/app src/lib/help/content.ts src/lib/legal-content.ts`
*Total grep hits remaining: 0. All 51 markers (including 2 comment lines) have been removed.*
