import { SiteInteractions } from "@/components/site/SiteInteractions";

// Checkout uses minimal chrome (the page renders its own centered-logo header
// and policy footer), so it deliberately omits the storefront Header/Footer.
// SiteInteractions is kept for the shared pill-button hover behavior.
export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteInteractions />
      <div className="flex-1">{children}</div>
    </>
  );
}
