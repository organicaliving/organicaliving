import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL_META, DRAFT_NOTICE } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Consent Preferences — Organica Living",
  description:
    "Understand the cookie and marketing consent categories used on the Organica Living website, and learn how to update your preferences.",
};

const P = (props: ComponentPropsWithoutRef<"p">) => (
  <p style={{ margin: 0 }} {...props} />
);

export default function ConsentPage() {
  return (
    <LegalPage
      title="Consent Preferences"
      lastUpdated={LEGAL_META.lastUpdated}
      draftNotice={DRAFT_NOTICE}
      intro={
        <>
          <P>
            When you visit the {LEGAL_META.brand} website, certain technologies
            — cookies, local storage, and similar browser mechanisms — are used
            to make the site work and to help us understand how it is being used.
            Some of those technologies are strictly necessary; others are
            optional and activated only when you give your consent.
          </P>
          <P>
            This page describes each consent category in plain language so you
            can make an informed choice. For the full picture of how we collect
            and use personal information, see our{" "}
            <Link href="/privacy" style={{ color: "#1c3a13" }}>
              Privacy Policy
            </Link>
            .
          </P>
        </>
      }
      sections={[
        {
          id: "essential",
          heading: "Essential (Always On)",
          body: (
            <>
              <P>
                Essential cookies and storage are required for the website to
                function at all. Without them, you could not sign in, add items
                to your cart, or complete a purchase. Because they are
                technically necessary, they are always active — no consent
                banner can turn them off, and they are never used for advertising
                or tracking your activity across other websites.
              </P>
              <P>
                <strong>What they do:</strong> maintain your login session across
                page loads, keep your shopping cart intact during a visit, store
                your security token so authenticated pages can verify your
                identity, and preserve a small set of site preferences (such as
                dismissal of one-time notices).
              </P>
              <P>
                <strong>Who sets them:</strong> {LEGAL_META.entity} directly,
                and our infrastructure provider (Supabase) for authentication.
                No third-party advertising networks receive these cookies.
              </P>
            </>
          ),
        },
        {
          id: "analytics",
          heading: "Analytics",
          body: (
            <>
              <P>
                Analytics cookies help us understand how visitors as a whole
                interact with the site — which pages are visited most, how long
                people stay, and where they came from. We use this information
                to improve the shopping experience and to identify technical
                problems.
              </P>
              <P>
                <strong>What they do:</strong> count page views, record which
                products attract the most interest, and surface broken links or
                slow-loading pages. Data is aggregated; it describes patterns
                across many visitors rather than building a profile of you
                individually.
              </P>
              <P>
                <strong>Data shared:</strong> aggregated, non-personally
                identifying usage data processed by Plausible Analytics. Plausible
                receives an anonymized page URL, referrer, browser and device type,
                and country — no cookies, no personal identifiers. We do not share
                analytics data with advertising networks.
              </P>
              <P>
                You can decline analytics cookies without affecting your ability
                to browse or purchase. If you have previously accepted analytics
                cookies and would like to withdraw that consent, email us at{" "}
                <a href={`mailto:${LEGAL_META.privacyEmail}`}>
                  {LEGAL_META.privacyEmail}
                </a>
                .
              </P>
            </>
          ),
        },
        {
          id: "marketing",
          heading: "Marketing",
          body: (
            <>
              <P>
                Marketing cookies are used to tailor promotional content to your
                interests — for example, showing you a reminder about a product
                you viewed, or allowing us to measure whether a promotional
                campaign led to a purchase.
              </P>
              <P>
                <strong>What they do:</strong> remember that you visited specific
                product pages, assign a pseudonymous identifier that can be
                matched with ad-platform records, and measure click-through and
                conversion rates for any paid or social campaigns we run.
              </P>
              <P>
                <strong>Data shared:</strong> We do not currently use
                ad-retargeting or conversion-tracking cookies (such as Meta Pixel
                or Google Ads tags). If this changes, we will update this page
                before any such cookies are set.
                We do not share your name, email address, or order details
                through these technologies.
              </P>
              <P>
                Marketing cookies are entirely optional. Declining them will not
                prevent you from browsing, shopping, or receiving order-related
                emails. If you would like to withdraw consent after previously
                accepting, email us at{" "}
                <a href={`mailto:${LEGAL_META.privacyEmail}`}>
                  {LEGAL_META.privacyEmail}
                </a>
                .
              </P>
            </>
          ),
        },
        {
          id: "how-to-change",
          heading: "How to Update Your Preferences",
          body: (
            <>
              <P>
                <strong>Cookie defaults and browser controls.</strong> Only
                essential cookies are set by default — no analytics or marketing
                cookies are placed without your knowledge. You can manage or
                remove cookies at any time through your browser settings. A
                full in-browser preference center is in development and will be
                available here once it launches; until then, please use the
                email option below or your browser controls.
              </P>
              <P>
                <strong>Request by email (available now).</strong> Until the
                preference center is live, you can update or withdraw your
                consent at any time by emailing{" "}
                <a href={`mailto:${LEGAL_META.privacyEmail}`}>
                  {LEGAL_META.privacyEmail}
                </a>{" "}
                with the subject line &ldquo;Consent Preferences.&rdquo; Please
                tell us which categories you want to enable or disable, and we
                will action your request and confirm by reply within{" "}
                5 business days.
              </P>
              <P>
                <strong>Browser-level controls.</strong> Every major browser
                lets you view, block, and delete cookies through its settings
                menu. Blocking all cookies will disable Essential functionality
                (sign-in, cart, checkout), so we recommend using browser
                controls only to clear existing cookies, not to prevent all
                future cookies from being set.
              </P>
              <P>
                <strong>Opt-out of marketing emails.</strong> Consent preferences
                on this page cover cookies and browser-based tracking. If you
                want to stop receiving marketing emails specifically, use the
                unsubscribe link in any marketing email we send you, or contact
                us at{" "}
                <a href={`mailto:${LEGAL_META.privacyEmail}`}>
                  {LEGAL_META.privacyEmail}
                </a>
                .
              </P>
            </>
          ),
        },
        {
          id: "related",
          heading: "Related Information",
          body: (
            <>
              <P>
                <strong>Privacy Policy.</strong> Our{" "}
                <Link href="/privacy" style={{ color: "#1c3a13" }}>
                  Privacy Policy
                </Link>{" "}
                covers the full picture of how {LEGAL_META.entity} collects,
                uses, stores, and shares personal information — including
                information collected independently of cookies (such as order
                data and account details).
              </P>
              <P>
                <strong>Questions?</strong> For any question about your consent
                preferences or how we use cookies, reach out to our privacy team
                at{" "}
                <a href={`mailto:${LEGAL_META.privacyEmail}`}>
                  {LEGAL_META.privacyEmail}
                </a>
                . For order, shipping, and product questions, please use{" "}
                <a href={`mailto:${LEGAL_META.careEmail}`}>
                  {LEGAL_META.careEmail}
                </a>
                .
              </P>
            </>
          ),
        },
      ]}
    />
  );
}
