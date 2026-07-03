import type { Metadata } from "next";
import type { ComponentPropsWithoutRef } from "react";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL_META, DRAFT_NOTICE } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Accessibility — Organica Living",
  description:
    "Our commitment to making the Organica Living website accessible to everyone, and how to reach us if you encounter a barrier.",
};

const P = (props: ComponentPropsWithoutRef<"p">) => (
  <p style={{ margin: 0 }} {...props} />
);

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility Statement"
      lastUpdated={LEGAL_META.lastUpdated}
      draftNotice={DRAFT_NOTICE}
      intro={
        <>
          <P>
            At {LEGAL_META.brand}, &ldquo;nature is our thing&rdquo; is more than
            a tagline &mdash; it is a reminder that the things that nourish us belong to
            everyone. We extend that same belief to our digital presence: this website
            should be usable by every person, regardless of ability or the tools they use
            to browse the web.
          </P>
          <P>
            This statement describes where we are today, what we are actively working
            to improve, and how to contact us if you run into a barrier.
          </P>
        </>
      }
      sections={[
        {
          id: "commitment",
          heading: "Our Commitment",
          body: (
            <>
              <P>
                {LEGAL_META.entity} is committed to building an inclusive digital
                experience. We believe that access to information about wellness,
                nutrition, and the products that support a healthy life should not depend
                on how someone interacts with a screen.
              </P>
              <P>
                Accessibility is not a one-time project for us &mdash; it is an ongoing
                design and engineering priority, woven into the way we evaluate new
                features, review content, and address reported issues.
              </P>
            </>
          ),
        },
        {
          id: "standard",
          heading: "Our Conformance Target",
          body: (
            <>
              <P>
                We aim to meet the{" "}
                <strong>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</strong>.
                These guidelines, published by the World Wide Web Consortium (W3C),
                define a widely accepted baseline for making web content perceivable,
                operable, understandable, and robust for users with a range of disabilities.
              </P>
              <P>
                We are working toward full WCAG 2.1 AA conformance and do not claim that
                every page or feature currently meets that standard. The improvements
                described in this statement reflect our active, good-faith efforts to close
                remaining gaps.
              </P>
            </>
          ),
        },
        {
          id: "what-we-do",
          heading: "What We Do to Support Accessibility",
          body: (
            <>
              <P>
                <strong>Semantic markup.</strong> Pages are written with standard HTML
                elements &mdash; headings, lists, landmarks, and form labels &mdash; so
                that screen readers and other assistive technologies can understand and
                navigate the page structure without relying on visual layout alone.
              </P>
              <P>
                <strong>Alternative text.</strong> Product photos and editorial images
                carry descriptive alt attributes. Decorative images that add no meaning
                are marked with empty alt text so screen readers skip them cleanly.
              </P>
              <P>
                <strong>Keyboard navigation.</strong> Core shopping flows &mdash; browsing
                products, reading educational content, submitting the contact form, and
                completing checkout &mdash; are intended to be fully operable using a
                keyboard alone, without requiring a mouse or touch input.
              </P>
              <P>
                <strong>Color contrast.</strong> Text and interactive elements are styled
                to maintain a contrast ratio that meets or exceeds the WCAG 2.1 AA minimum
                of 4.5:1 for normal text and 3:1 for large text. We verify contrast when
                introducing new palette values.
              </P>
              <P>
                <strong>Focus indicators.</strong> We preserve and style visible focus
                rings on interactive elements so keyboard users always know where they are
                on the page.
              </P>
              <P>
                <strong>Responsive and scalable layout.</strong> Pages are designed to
                remain readable and functional at browser text sizes up to 200% without
                horizontal scrolling, and across a broad range of viewport widths.
              </P>
            </>
          ),
        },
        {
          id: "known-limitations",
          heading: "Known Limitations",
          body: (
            <>
              <P>
                Despite our efforts, some areas of the site may not yet meet WCAG 2.1 AA
                in all respects:
              </P>
              <P>
                <strong>Third-party embeds.</strong> Certain features &mdash; including
                payment processors, review widgets, and any embedded maps or social-media
                content &mdash; are provided by external vendors. We do not control the
                accessibility of those components and cannot guarantee they meet WCAG 2.1
                AA. We evaluate vendor accessibility documentation when selecting partners
                and advocate for improvements when gaps are identified.
              </P>
              <P>
                <strong>Rich media.</strong> Video content, if present, may lack
                closed captions or audio descriptions. We are assessing the scope of
                this gap and will prioritize captioning for any educational or
                product-related videos going forward. [[DEFAULT: confirm whether any video
                content is currently published]]
              </P>
              <P>
                <strong>Legacy content.</strong> Older blog posts and educational articles
                may not fully conform to current markup standards. We are reviewing
                and updating this content incrementally.
              </P>
              <P>
                We document known issues here in the spirit of transparency. Our goal is
                to resolve each one rather than simply disclaim it.
              </P>
            </>
          ),
        },
        {
          id: "feedback",
          heading: "Report a Barrier",
          body: (
            <>
              <P>
                If you encounter any part of our website that is difficult or impossible
                for you to use, we want to know. Your feedback is the most direct signal
                we have that something needs attention.
              </P>
              <P>
                Please reach our customer care team at{" "}
                <a href={`mailto:${LEGAL_META.careEmail}`}>{LEGAL_META.careEmail}</a>{" "}
                and include:
              </P>
              <ul style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 8 }}>
                <li>The page or feature where you encountered the issue (a URL is helpful)</li>
                <li>A brief description of what happened or what you were trying to do</li>
                <li>The assistive technology or browser you were using, if known</li>
              </ul>
              <P>
                We aim to acknowledge accessibility feedback within{" "}
                [[DEFAULT: 2]] business days and to provide a substantive response
                or interim workaround within [[DEFAULT: 5]] business days. If the
                issue requires a longer fix, we will keep you informed of our progress.
              </P>
            </>
          ),
        },
        {
          id: "ongoing",
          heading: "Ongoing Improvements",
          body: (
            <>
              <P>
                Accessibility is never finished. As we add new pages, product lines, and
                features to the site, we incorporate accessibility review into our
                development process. This includes automated testing during builds,
                manual keyboard and screen-reader checks on key flows, and periodic
                broader audits against WCAG 2.1 AA criteria.
              </P>
              <P>
                We will update this statement as our conformance improves or as we
                identify new limitations that warrant disclosure. The &ldquo;Last
                updated&rdquo; date at the top of this page reflects when the statement
                was most recently revised.
              </P>
              <P>
                Thank you for holding us to this standard. Making nature&rsquo;s best
                accessible to everyone &mdash; in every sense of the word &mdash; is
                something we take seriously.
              </P>
            </>
          ),
        },
      ]}
    />
  );
}
