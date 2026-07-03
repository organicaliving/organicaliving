# Help Center & Footer Pages — Facts to Confirm

These are placeholder values marked `[[DEFAULT]]` across the new help-center and footer pages added in the `feat/help-center` branch. The owner should confirm or replace every value in the "Owner's real value" column, after which the `[[DEFAULT]]` markers and the "draft — pending legal review" banners can be removed.

**Total `[[DEFAULT]]` occurrences in grep output: 51** (2 are in comment/doc lines — `src/lib/help/content.ts:5` and `src/lib/legal-content.ts:4` — leaving **49 substantive placeholders** across 8 pages/files, represented as rows below. Multiple markers on the same logical fact are combined into one row where they share the same meaning.)

---

## `/legal-content.ts` — Shared legal entity facts (used by Terms, Privacy, Accessibility, Consent)

| # | File / where it appears | The fact needed | Our current default value | Owner's real value (blank) |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 1 | `src/lib/legal-content.ts:10` | Registered business address | Atlanta, GA | |
| 2 | `src/lib/legal-content.ts:11` | Governing jurisdiction | State of Georgia, USA | |

---

## `/terms/page.tsx` — Terms of Service

| # | File / where it appears | The fact needed | Our current default value | Owner's real value (blank) |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 3 | `src/app/(storefront)/terms/page.tsx:149` | Advance notice (days) before price change takes effect | 14 days | |
| 4 | `src/app/(storefront)/terms/page.tsx:174` | Window (business days) to report a dispute after receiving a renewal order | 5 business days | |
| 5 | `src/app/(storefront)/terms/page.tsx:193` | Return window (days) from delivery date | 30 days | |
| 6 | `src/app/(storefront)/terms/page.tsx:318` | Liability cap look-back period (months of payments) | 12 months | |

---

## `/privacy/page.tsx` — Privacy Policy

| # | File / where it appears | The fact needed | Our current default value | Owner's real value (blank) |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 7 | `src/app/(storefront)/privacy/page.tsx:76` | Name of analytics provider | (to be confirmed — e.g. Plausible, Vercel Analytics, GA4) | |
| 8 | `src/app/(storefront)/privacy/page.tsx:132` | Analytics provider name (inline copy) | (to be confirmed — Specify provider) | |
| 9 | `src/app/(storefront)/privacy/page.tsx:238` | Days to respond to a data subject request | 30 days | |
| 10 | `src/app/(storefront)/privacy/page.tsx:257` | Days before personal data is deleted upon request | 90 days | |
| 11 | `src/app/(storefront)/privacy/page.tsx:259` | Years financial/accounting data is retained | 7 years | |
| 12 | `src/app/(storefront)/privacy/page.tsx:329` | EEA transfer mechanism (e.g. SCCs, adequacy decision) | (to be confirmed with legal counsel) | |

---

## `/accessibility/page.tsx` — Accessibility Statement

| # | File / where it appears | The fact needed | Our current default value | Owner's real value (blank) |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 13 | `src/app/(storefront)/accessibility/page.tsx:140` | Whether existing product videos have captions | (to be confirmed — assumed not yet; stated as going forward) | |
| 14 | `src/app/(storefront)/accessibility/page.tsx:180` | Business days to acknowledge an accessibility complaint | 2 business days | |
| 15 | `src/app/(storefront)/accessibility/page.tsx:181` | Business days to provide substantive response or workaround | 5 business days | |

---

## `/consent/page.tsx` — Cookie & Consent Policy

| # | File / where it appears | The fact needed | Our current default value | Owner's real value (blank) |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 16 | `src/app/(storefront)/consent/page.tsx:94` | Analytics provider name | (to be confirmed — e.g. Plausible, Vercel Analytics, GA4) | |
| 17 | `src/app/(storefront)/consent/page.tsx:128` | Specific data fields shared with analytics provider | (to be listed — e.g. page URL, referrer, device type) | |
| 18 | `src/app/(storefront)/consent/page.tsx:159` | Consent management tool / banner integration | (pending — tool not yet integrated) | |
| 19 | `src/app/(storefront)/consent/page.tsx:173` | Business days to honour a cookie opt-out request | 5 business days | |

---

## `/practitioners/page.tsx` — Practitioners Program

| # | File / where it appears | The fact needed | Our current default value | Owner's real value (blank) |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 20 | `src/app/(storefront)/practitioners/page.tsx:21` | Wholesale / pro discount percentage and minimum order terms | (to be confirmed) | |
| 21 | `src/app/(storefront)/practitioners/page.tsx:26` | Referral tracking method and client-link terms | (to be confirmed) | |
| 22 | `src/app/(storefront)/practitioners/page.tsx:46` | Application credential requirements | (to be confirmed) | |
| 23 | `src/app/(storefront)/practitioners/page.tsx:69` | Application review timeline (days) | (to be confirmed) | |

---

## `/careers/page.tsx` — Careers

| # | File / where it appears | The fact needed | Our current default value | Owner's real value (blank) |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 24 | `src/app/(storefront)/careers/page.tsx:41` | Benefits package (health coverage, parental leave, PTO, remote/flexible-work stipend) | (to be confirmed) | |
| 25 | `src/app/(storefront)/careers/page.tsx:46` | L&D budget and promotion criteria | (to be confirmed) | |

---

## `src/lib/help/content.ts` — Help Center Content

### Orders & Shipping

| # | File / where it appears | The fact needed | Our current default value | Owner's real value (blank) |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 26 | `content.ts:96` | Standard delivery window (business days after processing) | 5–7 business days | |
| 27 | `content.ts:100` | Expedited shipping delivery window | 2–3 business days | |
| 28 | `content.ts:104` | Free-shipping order threshold (displayed at checkout) | (shown at checkout — threshold amount TBC) | |
| 29 | `content.ts:108` | Order processing time before handover to carrier | 1–2 business days | |
| 30 | `content.ts:121` | International destination list (which countries are supported) | "select international destinations" | |
| 31 | `content.ts:125` | International delivery window (business days after dispatch) | 10–21 business days | |

### Subscriptions

| # | File / where it appears | The fact needed | Our current default value | Owner's real value (blank) |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 32 | `content.ts:176` | Advance reminder email timing before billing date | 3–5 days before | |
| 33 | `content.ts:180` | Subscribe & Save recurring discount percentage | (shown on each product page — percentage TBC) | |
| 34 | `content.ts:204` | Cut-off window to make subscription changes before next billing | 24 hours | |
| 35 | `content.ts:225` | Available subscription frequencies | Every 1, 2, or 3 months | |
| 36 | `content.ts:239` | Advance reminder email timing before renewal (FAQ answer) | 3–5 days before | |
| 37 | `content.ts:243` | Subscription renewal dispatch time after billing | 1–2 business days | |
| 38 | `content.ts:264` | Subscribe & Save discount percentage (in promotions section) | (varies by product — shown on product page) | |

### Returns & Refunds

| # | File / where it appears | The fact needed | Our current default value | Owner's real value (blank) |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 39 | `content.ts:292` | Return window (days from delivery) | 30 days | |
| 40 | `content.ts:296` | Return eligibility condition | Unused and in original packaging (opened only if defective/damaged) | |
| 41 | `content.ts:300` | Return window for unwanted subscription renewals | 30 days | |
| 42 | `content.ts:314` | Team response time for return authorisation request | 1–2 business days | |
| 43 | `content.ts:332` | Refund processing time after item received | 3–5 business days | |
| 44 | `content.ts:336` | Bank posting time after refund is issued | 3–10 business days (bank-dependent) | |
| 45 | `content.ts:351` | Window to report a damaged/wrong item after delivery | 14 days | |

### Product Usage

| # | File / where it appears | The fact needed | Our current default value | Owner's real value (blank) |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 46 | `content.ts:402` | Sleep Pro+ timing — minutes before bedtime to take | 30–60 minutes | |
| 47 | `content.ts:439` | Sleep Pro+ timing (repeated in general guidance section) | 30–60 minutes | |

### Account & Security

| # | File / where it appears | The fact needed | Our current default value | Owner's real value (blank) |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 48 | `content.ts:580` | Password reset link expiry time | 60 minutes | |

### Contact

| # | File / where it appears | The fact needed | Our current default value | Owner's real value (blank) |
|---|-------------------------|-----------------|--------------------------|---------------------------|
| 49 | `content.ts:697` | Customer care response time (business days) | 1–2 business days | |

---

*Grep command used:* `grep -rn "\[\[DEFAULT" src/app src/lib/help/content.ts src/lib/legal-content.ts`
*Total grep hits: 51 (includes 2 comment lines). Substantive placeholder rows in this table: 49.*
