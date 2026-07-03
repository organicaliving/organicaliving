import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL_META } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Terms & Conditions — Organica Living",
  description:
    "The terms that govern your use of the Organica Living website, orders, and subscriptions.",
};

const P = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p style={{ margin: 0 }} {...props} />
);

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated={LEGAL_META.lastUpdated}
      intro={
        <>
          <P>
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) are a legal agreement
            between you and {LEGAL_META.entity} (&ldquo;{LEGAL_META.brand}&rdquo;,
            &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), a vitamin and
            dietary supplement company based in Atlanta, Georgia. They govern your access
            to and use of our website, mobile experiences, and any purchases you make from
            us.
          </P>
          <P>
            Please read these Terms carefully. By visiting our site or placing an order
            you confirm that you have read, understood, and agree to be bound by them.
            If you do not agree, please do not use our services.
          </P>
        </>
      }
      sections={[
        {
          id: "agreement",
          heading: "Agreement & Acceptance",
          body: (
            <>
              <P>
                {LEGAL_META.entity}{" "}operates this website and related digital
                properties (collectively, the &ldquo;Site&rdquo;). By accessing any part
                of the Site,
                clicking &ldquo;I agree,&rdquo; completing a purchase, or creating an
                account, you enter into a binding agreement with us under these Terms.
              </P>
              <P>
                These Terms apply to all visitors, registered users, and customers. They
                are in addition to any other agreements that may apply to specific features
                or promotions.
              </P>
              <P>
                We may update these Terms from time to time (see Section 13 — Changes).
                Continued use of the Site after changes are posted constitutes your
                acceptance of the revised Terms.
              </P>
            </>
          ),
        },
        {
          id: "eligibility",
          heading: "Eligibility",
          body: (
            <>
              <P>
                You must be at least 18 years old and capable of forming a legally binding
                contract to use the Site or place an order. By using the Site you represent
                that you meet these requirements.
              </P>
              <P>
                Our products are intended for personal, household use only. You may not
                purchase products for resale without our prior written consent. We reserve
                the right to refuse service or cancel orders at our discretion.
              </P>
              <P>
                If you create an account, you are responsible for maintaining the
                confidentiality of your login credentials and for all activity that occurs
                under your account. Notify us immediately at{" "}
                <a href={`mailto:${LEGAL_META.careEmail}`}>{LEGAL_META.careEmail}</a> if
                you suspect unauthorized use.
              </P>
            </>
          ),
        },
        {
          id: "orders-pricing",
          heading: "Orders & Pricing",
          body: (
            <>
              <P>
                Placing an order constitutes an offer to purchase. We accept your offer
                and form a contract when we send you an order confirmation email. We
                reserve the right to decline or cancel any order for reasons including
                product unavailability, pricing errors, or suspected fraud.
              </P>
              <P>
                All prices are displayed in US dollars and are subject to change without
                notice. The price charged to you is the price shown at the time you
                complete checkout. Taxes are calculated based on your shipping address and
                applicable state and local law; they will be displayed before you finalize
                payment.
              </P>
              <P>
                In the event of a pricing error on the Site, we are not obligated to
                honor that price. We will notify you of the error and give you the option
                to purchase at the correct price or cancel your order without charge.
              </P>
              <P>
                We accept the payment methods listed at checkout. By submitting payment
                information you represent that you are authorized to use the payment method
                provided.
              </P>
            </>
          ),
        },
        {
          id: "subscriptions",
          heading: "Subscriptions (Subscribe & Save)",
          body: (
            <>
              <P>
                {LEGAL_META.brand} offers a &ldquo;Subscribe &amp; Save&rdquo; program
                that delivers selected products on a recurring schedule at a discounted
                price. When you enroll in a subscription, you authorize us to charge your
                payment method at the price and frequency displayed at checkout
                (e.g., monthly or every two months) until you cancel.
              </P>
              <P>
                Your payment method will be charged automatically at the start of each
                billing period. You will receive an email reminder before each charge so
                you have time to make changes or skip the order. Charges begin on your
                initial order date and recur on the same calendar date each subsequent
                period, adjusted if that date does not exist in a given month.
              </P>
              <P>
                You may cancel your subscription at any time by logging into your account
                and managing your subscriptions, or by emailing{" "}
                <a href={`mailto:${LEGAL_META.careEmail}`}>{LEGAL_META.careEmail}</a>.
                Cancellation takes effect before the next scheduled charge; we do not
                provide refunds for charges already processed unless the order has not
                yet shipped.
              </P>
              <P>
                We may change subscription prices with advance notice. If we do, we will
                email you at least 30 days before the new price takes effect
                and give you the option to cancel before being charged at the new rate.
              </P>
            </>
          ),
        },
        {
          id: "shipping-title",
          heading: "Shipping & Title / Risk of Loss",
          body: (
            <>
              <P>
                We ship to addresses within the United States. Estimated delivery windows
                are provided at checkout and in your confirmation email; they are estimates,
                not guarantees. Delivery timelines depend on carrier availability and
                conditions outside our control.
              </P>
              <P>
                Title to products and risk of loss pass to you when we tender your shipment
                to the carrier. Once the carrier has possession of your package, any
                delays, damage, or loss become a matter between you and the carrier,
                though we will make reasonable efforts to assist you in resolving claims.
              </P>
              <P>
                If a package is marked delivered but you have not received it, please
                contact us within 5 business days and we will work with you
                to investigate. Claims submitted after that window may not be eligible for
                replacement or refund.
              </P>
              <P>
                Shipping charges, if any, are non-refundable except where required by law
                or where the error was ours.
              </P>
            </>
          ),
        },
        {
          id: "returns",
          heading: "Returns & Refunds",
          body: (
            <>
              <P>
                We stand behind the quality of our products. If you are not satisfied with
                your purchase, you may be eligible for a return or refund within
                30 days of the delivery date, subject to the conditions
                described in our{" "}
                <Link href="/help/returns-refunds" style={{ color: "#1c3a13" }}>
                  Returns &amp; Refunds policy
                </Link>
                .
              </P>
              <P>
                To initiate a return, contact our customer care team at{" "}
                <a href={`mailto:${LEGAL_META.careEmail}`}>{LEGAL_META.careEmail}</a>.
                Products must be returned in their original condition. We reserve the right
                to limit or decline returns that we reasonably believe are abusive or
                fraudulent.
              </P>
              <P>
                Refunds, when approved, are issued to the original payment method.
                Processing time may vary by payment provider. Shipping costs are not
                refunded unless the return is due to our error (e.g., wrong item shipped,
                defective product).
              </P>
            </>
          ),
        },
        {
          id: "intellectual-property",
          heading: "Intellectual Property",
          body: (
            <>
              <P>
                All content on the Site — including but not limited to text, photography,
                graphics, logos, product names, formulation descriptions, and software —
                is the property of {LEGAL_META.entity} or its licensors and is protected
                by US and international copyright, trademark, and other intellectual
                property laws.
              </P>
              <P>
                You may browse the Site and print or download content for your own
                personal, non-commercial reference. You may not reproduce, republish,
                distribute, display, modify, create derivative works of, or exploit any
                content from the Site without our express written permission.
              </P>
              <P>
                The Organica Living name, logo, and product names are trademarks of{" "}
                {LEGAL_META.entity}{" "}Nothing in these Terms grants you a license to use
                our trademarks. Any unauthorized use may violate trademark law and is
                strictly prohibited.
              </P>
            </>
          ),
        },
        {
          id: "user-content",
          heading: "User Content",
          body: (
            <>
              <P>
                If you submit reviews, comments, photos, or other content to the Site
                (&ldquo;User Content&rdquo;), you grant {LEGAL_META.entity} a
                non-exclusive, royalty-free, worldwide, perpetual license to use,
                reproduce, display, and distribute that content in connection with our
                business, including in marketing materials and on the Site.
              </P>
              <P>
                You represent that you own or have the rights to any User Content you
                submit, that it does not infringe any third-party rights, and that it
                complies with these Terms. You are solely responsible for your User Content.
              </P>
              <P>
                We reserve the right to remove any User Content at our discretion, without
                notice, including content we determine to be inaccurate, inappropriate,
                or in violation of these Terms. Prohibited content includes, without
                limitation: defamatory statements, unlawful content, spam, and content
                that infringes intellectual property rights.
              </P>
            </>
          ),
        },
        {
          id: "disclaimers",
          heading: "Disclaimers",
          body: (
            <>
              <P>
                <strong>Supplement Disclaimer.</strong> The products sold on this Site are
                dietary supplements intended to complement a healthy lifestyle. They are
                not intended to diagnose, treat, cure, or prevent any disease or medical
                condition. The information provided on this Site — including product
                descriptions, educational articles, and wellness guidance — is for
                informational purposes only and does not constitute medical advice.
                Consult a qualified healthcare professional before starting any new
                supplement, particularly if you are pregnant, nursing, have a medical
                condition, or take prescription medications.
              </P>
              <P>
                <strong>FDA Disclaimer.</strong> These statements have not been evaluated
                by the Food and Drug Administration. Our products are not intended to
                diagnose, treat, cure, or prevent any disease.
              </P>
              <P>
                <strong>Site Disclaimer.</strong> THE SITE AND ALL CONTENT ARE PROVIDED
                &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTY OF
                ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT
                THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL
                COMPONENTS.
              </P>
            </>
          ),
        },
        {
          id: "limitation-of-liability",
          heading: "Limitation of Liability",
          body: (
            <>
              <P>
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, {LEGAL_META.entity.toUpperCase()},
                ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR
                ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
                ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE, ANY PRODUCTS
                PURCHASED, OR THESE TERMS, EVEN IF WE HAVE BEEN ADVISED OF THE
                POSSIBILITY OF SUCH DAMAGES.
              </P>
              <P>
                OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF OR RELATING TO
                THESE TERMS OR YOUR USE OF THE SITE SHALL NOT EXCEED THE GREATER OF (A)
                THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE
                CLAIM OR (B) ONE HUNDRED US DOLLARS ($100).
              </P>
              <P>
                SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN
                DAMAGES, SO THE ABOVE MAY NOT APPLY TO YOU IN FULL.
              </P>
            </>
          ),
        },
        {
          id: "governing-law",
          heading: "Governing Law",
          body: (
            <>
              <P>
                These Terms and any dispute arising out of or related to them or your use
                of the Site shall be governed by and construed in accordance with the laws
                of the {LEGAL_META.jurisdiction}, without regard to conflict-of-law
                principles.
              </P>
              <P>
                You agree that any legal action or proceeding relating to these Terms shall
                be brought exclusively in the state or federal courts located in Atlanta,
                Georgia, and you consent to personal jurisdiction and venue in those courts.
              </P>
              <P>
                If any provision of these Terms is found to be unenforceable, that
                provision will be modified to the minimum extent necessary to make it
                enforceable, and the remaining provisions will remain in full force.
              </P>
            </>
          ),
        },
        {
          id: "changes",
          heading: "Changes to These Terms",
          body: (
            <>
              <P>
                We may revise these Terms at any time. When we make material changes, we
                will update the &ldquo;Last updated&rdquo; date at the top of this page
                and, where appropriate, notify you by email or by a prominent notice on
                the Site.
              </P>
              <P>
                Your continued use of the Site after any changes are posted constitutes
                your acceptance of the updated Terms. If you do not agree with a change,
                your only remedy is to stop using the Site and, if applicable, cancel any
                active subscriptions.
              </P>
              <P>
                We encourage you to review these Terms periodically. Material changes will
                not apply retroactively to orders already completed before the revision date.
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
                Questions about these Terms? We&rsquo;re happy to help. Reach our customer
                care team at:
              </P>
              <P>
                <strong>{LEGAL_META.entity}</strong>
                <br />
                {LEGAL_META.address}
                <br />
                Email:{" "}
                <a href={`mailto:${LEGAL_META.careEmail}`}>{LEGAL_META.careEmail}</a>
              </P>
              <P>
                For privacy-related inquiries, please use{" "}
                <a href={`mailto:${LEGAL_META.privacyEmail}`}>{LEGAL_META.privacyEmail}</a>{" "}
                instead.
              </P>
            </>
          ),
        },
      ]}
    />
  );
}
