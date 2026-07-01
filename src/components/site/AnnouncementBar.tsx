import Link from "next/link";
import { ArrowRight } from "@/components/ui/ArrowRight";

export function AnnouncementBar({ loggedIn }: { loggedIn?: boolean }) {
  // Members-only bar for signed-in users (matches Account.dc.html).
  if (loggedIn) {
    return (
      <div
        style={{
          background: "#62e104",
          color: "#1a1a1a",
          textAlign: "center",
          fontSize: "13px",
          fontWeight: 500,
          padding: "9px 16px",
          letterSpacing: 0,
        }}
      >
        Members Only • 25% Off New Products
      </div>
    );
  }

  return (
    <Link
      href="/products"
      style={{
        display: "block",
        background: "#62e104",
        color: "#1a1a1a",
        textAlign: "center",
        fontSize: "13px",
        fontWeight: 500,
        padding: "9px 16px",
        letterSpacing: 0,
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      Find the right products for you&nbsp;{" "}
      <ArrowRight size={14} />
    </Link>
  );
}
