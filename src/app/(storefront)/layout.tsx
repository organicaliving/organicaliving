import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SiteInteractions } from "@/components/site/SiteInteractions";

// The AnnouncementBar is rendered inside <Header/> (which owns the full sticky
// chrome, matching the mockup). Rendering it here too produced a duplicate bar.
export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteInteractions />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
