import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL_META, DRAFT_NOTICE } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy — Organica Living",
  description:
    "How Organica Living collects, uses, and protects your personal information when you shop for vitamins and supplements.",
};

const P = (props: ComponentPropsWithoutRef<"p">) => (
  <p style={{ margin: 0 }} {...props} />
);

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={LEGAL_META.lastUpdated}
      draftNotice={DRAFT_NOTICE}
      intro={
        <>
          <P>
            {LEGAL_META.entity} (&ldquo;{LEGAL_META.brand}&rdquo;, &ldquo;we&rdquo;,
            &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is a vitamin and dietary supplement
            company based in Atlanta, Georgia. We care about your privacy and want you
            to understand clearly what information we collect, how we use it, and the
            choices you have.
          </P>
          <P>
            This Privacy Policy applies to all personal information we collect through
            our website, mobile experiences, and any related communications — including
            when you browse, create an account, place an order, or contact us. By using
            the Site you acknowledge the practices described here.
          </P>
        </>
      }
      sections={[
        {
          id: "what-we-collect",
          heading: "Information We Collect",
          body: (
            <>
              <P>
                <strong>Account information.</strong> When you create an account we
                collect your name, email address, and a hashed password. Account
                creation and authentication are handled through our authentication
                provider; we do not store plain-text passwords.
              </P>
              <P>
                <strong>Order and shipping details.</strong> When you place an order we
                collect your billing name, shipping address, and contact information
                needed to fulfill and ship your purchase. We retain order history so
                you can view past purchases and manage subscriptions.
              </P>
              <P>
                <strong>Payment information.</strong> Payments are processed by our
                payment processor. We do not receive or store your full card number,
                CVV, or bank account details — only a payment token and the last four
                digits of the card your processor shares with us for display purposes.
              </P>
              <P>
                <strong>Communications.</strong> If you contact us by email or through
                our contact form, we collect the content of your message and your
                contact details so we can respond. If you subscribe to marketing
                emails, we collect your email address and your communication
                preferences.
              </P>
              <P>
                <strong>Usage and analytics data.</strong> We collect basic information
                about how visitors interact with the Site — pages visited, time spent,
                referral source, and general device/browser type. This data is
                aggregated and used to improve our products and website experience.
                [[DEFAULT: Confirm analytics provider — e.g. Plausible, Vercel Analytics,
                or similar privacy-preserving tool.]]
              </P>
              <P>
                <strong>Cookies and similar technologies.</strong> We use cookies and
                similar browser storage to keep you signed in, remember your preferences,
                and understand aggregate usage patterns. See Section&nbsp;5 (Cookies) for
                details and your opt-out options.
              </P>
            </>
          ),
        },
        {
          id: "how-we-use",
          heading: "How We Use Your Information",
          body: (
            <>
              <P>We use the information we collect to:</P>
              <ul style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 8 }}>
                <li>Process and fulfill your orders, including sending confirmation and shipping notifications.</li>
                <li>Manage your account, subscriptions, and preferences.</li>
                <li>Respond to your customer service inquiries and support requests.</li>
                <li>Send you transactional emails related to your account or purchases (e.g., order confirmation, shipment tracking, subscription reminders).</li>
                <li>Send marketing emails if you have opted in — you can unsubscribe at any time using the link in any marketing email or by contacting us.</li>
                <li>Improve our website, product offerings, and customer experience through aggregated analytics.</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activity.</li>
                <li>Comply with applicable legal obligations.</li>
              </ul>
              <P>
                We will not use your information for any purpose materially different from
                those described here without first providing notice and, where required by
                law, obtaining your consent.
              </P>
            </>
          ),
        },
        {
          id: "sharing",
          heading: "Sharing Your Information",
          body: (
            <>
              <P>
                <strong>We do not sell your personal information.</strong> We do not rent,
                trade, or sell your personal data to third parties for their own marketing
                purposes.
              </P>
              <P>
                We share information only with the service providers (&ldquo;processors&rdquo;)
                who help us operate our business, and only to the extent necessary for them
                to perform their services on our behalf:
              </P>
              <ul style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 8 }}>
                <li><strong>Payment processing.</strong> Your payment details go directly to our payment processor (Stripe) to authorize and complete transactions. We are bound by their data-handling terms.</li>
                <li><strong>Order fulfillment and shipping.</strong> We share your name and shipping address with our fulfillment partners and carriers so they can deliver your order.</li>
                <li><strong>Email delivery.</strong> Transactional and marketing emails are sent through our email provider (Resend). They receive your email address and the content of messages we send you.</li>
                <li><strong>Authentication and database.</strong> Account credentials and order data are stored with our infrastructure provider (Supabase), which operates under its own privacy and security commitments.</li>
                <li><strong>Analytics.</strong> Aggregated, non-personally-identifying usage data may be processed by our analytics provider. [[DEFAULT: Specify provider.]]</li>
              </ul>
              <P>
                We may also disclose information when required to do so by law, court order,
                or lawful governmental authority, or when we believe disclosure is necessary
                to protect the rights, property, or safety of {LEGAL_META.entity}, our
                customers, or the public.
              </P>
              <P>
                In the event of a merger, acquisition, or sale of all or a portion of our
                assets, personal information may be transferred to the acquiring entity.
                We will provide notice before your information is transferred and becomes
                subject to a different privacy policy.
              </P>
            </>
          ),
        },
        {
          id: "cookies",
          heading: "Cookies & Tracking Technologies",
          body: (
            <>
              <P>
                We use cookies (small text files placed on your device) and similar
                technologies such as local storage to operate the Site. Cookies help us
                keep you signed in across pages, remember items in your cart, and understand
                how visitors use our Site in aggregate.
              </P>
              <P>
                We use the following types of cookies:
              </P>
              <ul style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 8 }}>
                <li><strong>Essential cookies</strong> are required for the Site to function — for example, to maintain your session when you are logged in or to process a checkout. These cannot be disabled without breaking core functionality.</li>
                <li><strong>Preference cookies</strong> remember choices you have made, such as your preferred currency or communication settings.</li>
                <li><strong>Analytics cookies</strong> collect aggregated information about how visitors interact with the Site so we can improve it. No personally identifying information is sold or shared with advertisers through these cookies.</li>
              </ul>
              <P>
                You can manage or withdraw your cookie consent at any time through our{" "}
                <Link href="/consent" style={{ color: "#1c3a13" }}>
                  Cookie Preferences
                </Link>{" "}
                page. You may also configure your browser to block or delete cookies, though
                doing so may affect some features of the Site.
              </P>
            </>
          ),
        },
        {
          id: "your-rights",
          heading: "Your Rights",
          body: (
            <>
              <P>
                Depending on where you live, you may have certain rights regarding your
                personal information. We honor these rights regardless of your location
                where operationally feasible.
              </P>
              <P>
                <strong>Access and portability.</strong> You may request a copy of the
                personal information we hold about you in a structured, machine-readable
                format.
              </P>
              <P>
                <strong>Correction.</strong> If any information we hold about you is
                inaccurate or incomplete, you may ask us to correct or update it. You can
                also update basic account details directly from your account settings.
              </P>
              <P>
                <strong>Deletion.</strong> You may request that we delete your personal
                information. We will fulfill deletion requests to the extent permitted by
                law; some information may need to be retained for legal, tax, or fraud-
                prevention purposes.
              </P>
              <P>
                <strong>Opt-out of marketing.</strong> You can unsubscribe from marketing
                emails at any time using the unsubscribe link in any marketing email, or
                by contacting us directly. Opting out of marketing does not affect
                transactional messages related to your account or purchases.
              </P>
              <P>
                <strong>Restriction and objection.</strong> In certain circumstances you
                may ask us to restrict how we process your data, or to stop processing it
                for a particular purpose.
              </P>
              <P>
                <strong>GDPR (EEA/UK residents).</strong> If you are located in the
                European Economic Area or the United Kingdom, you have additional rights
                under the General Data Protection Regulation (GDPR) and UK GDPR, including
                the right to lodge a complaint with your local supervisory authority.
                Our legal basis for processing is typically performance of a contract (to
                fulfil your orders), legitimate interests (to improve our services and
                prevent fraud), or your consent (for marketing communications).
              </P>
              <P>
                <strong>CCPA (California residents).</strong> If you are a California
                resident, the California Consumer Privacy Act (CCPA) gives you additional
                rights, including the right to know what categories of personal information
                we collect, the right to delete your personal information, and the right
                to opt out of its &ldquo;sale.&rdquo; We do not sell personal information
                as defined by the CCPA. You may exercise your rights by contacting us at{" "}
                <a href={`mailto:${LEGAL_META.privacyEmail}`}>{LEGAL_META.privacyEmail}</a>.
                We will not discriminate against you for exercising your privacy rights.
              </P>
              <P>
                To submit a privacy rights request, email us at{" "}
                <a href={`mailto:${LEGAL_META.privacyEmail}`}>{LEGAL_META.privacyEmail}</a>.
                We will respond within [[DEFAULT: 30]] days. We may ask you to verify
                your identity before fulfilling a request.
              </P>
            </>
          ),
        },
        {
          id: "data-retention",
          heading: "Data Retention",
          body: (
            <>
              <P>
                We keep your personal information only as long as necessary to provide our
                services and fulfill the purposes described in this policy, or as required
                by applicable law.
              </P>
              <P>
                Account information is retained for as long as your account is active.
                If you close your account, we will delete or anonymize your personal
                information within [[DEFAULT: 90]] days, except where we are required to
                retain it — for example, order records that we must keep for tax or
                accounting purposes for [[DEFAULT: 7]] years.
              </P>
              <P>
                Marketing email preferences and suppression lists are kept until you
                request their removal, so that we can honor your opt-out preferences
                going forward.
              </P>
            </>
          ),
        },
        {
          id: "security",
          heading: "Security",
          body: (
            <>
              <P>
                We take reasonable technical and organizational measures to protect your
                personal information against unauthorized access, disclosure, alteration,
                or destruction. These measures include encryption of data in transit (TLS),
                hashed password storage, and access controls that limit who within our
                organization can view personal data.
              </P>
              <P>
                No method of transmission over the internet or electronic storage is
                completely secure. While we work hard to protect your information, we
                cannot guarantee absolute security. If you have reason to believe your
                interaction with us is no longer secure, please contact us immediately
                at{" "}
                <a href={`mailto:${LEGAL_META.privacyEmail}`}>{LEGAL_META.privacyEmail}</a>.
              </P>
            </>
          ),
        },
        {
          id: "childrens-privacy",
          heading: "Children&rsquo;s Privacy",
          body: (
            <>
              <P>
                Our Site and products are not directed to children under the age of 13,
                and we do not knowingly collect personal information from children under
                13. If you are a parent or guardian and believe your child has provided
                us with personal information without your consent, please contact us
                at{" "}
                <a href={`mailto:${LEGAL_META.privacyEmail}`}>{LEGAL_META.privacyEmail}</a>{" "}
                and we will take steps to delete that information.
              </P>
              <P>
                If you are between 13 and 18 years of age, please review this policy with
                a parent or guardian before using the Site or providing any personal
                information.
              </P>
            </>
          ),
        },
        {
          id: "international-transfers",
          heading: "International Data Transfers",
          body: (
            <>
              <P>
                {LEGAL_META.entity} is based in the United States. If you access our Site
                from outside the US, your information will be transferred to and processed
                in the United States, where data protection laws may differ from those
                in your country.
              </P>
              <P>
                Where required by applicable law, we rely on appropriate transfer mechanisms
                to ensure your personal information receives adequate protection — for
                example, Standard Contractual Clauses approved by the European Commission
                for transfers from the EEA. [[DEFAULT: Confirm transfer mechanisms with
                legal counsel before shipping to EU/UK customers.]]
              </P>
              <P>
                By using the Site you acknowledge that your information may be transferred
                to and processed in the United States.
              </P>
            </>
          ),
        },
        {
          id: "changes",
          heading: "Changes to This Policy",
          body: (
            <>
              <P>
                We may update this Privacy Policy from time to time to reflect changes
                in our practices, technologies, legal requirements, or for other
                operational reasons. When we make material changes, we will update the
                &ldquo;Last updated&rdquo; date at the top of this page.
              </P>
              <P>
                For significant changes that affect how we use personal information you
                have already provided, we will notify you by email (at the address
                associated with your account) or by a prominent notice on the Site before
                the changes take effect.
              </P>
              <P>
                Your continued use of the Site after any changes are posted constitutes
                your acknowledgement of the updated policy. We encourage you to review
                this page periodically.
              </P>
            </>
          ),
        },
        {
          id: "contact",
          heading: "Contact Us",
          body: (
            <>
              <P>
                If you have questions, concerns, or requests about this Privacy Policy
                or how we handle your personal information, please reach out to our
                privacy team:
              </P>
              <P>
                <strong>{LEGAL_META.entity}</strong>
                <br />
                {LEGAL_META.address}
                <br />
                Email:{" "}
                <a href={`mailto:${LEGAL_META.privacyEmail}`}>{LEGAL_META.privacyEmail}</a>
              </P>
              <P>
                For general customer care inquiries (orders, returns, subscriptions),
                please use{" "}
                <a href={`mailto:${LEGAL_META.careEmail}`}>{LEGAL_META.careEmail}</a>{" "}
                instead.
              </P>
            </>
          ),
        },
      ]}
    />
  );
}
