import Link from "next/link";
import { Disclaimer } from "@/components/site/Disclaimer";

const COLUMNS: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Subscriptions", href: "/subscriptions" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Science", href: "/science" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign In", href: "/login" },
      { label: "Refer a Friend", href: "/refer" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <p className="text-lg font-medium">Organica Living</p>
            <p className="mt-2 text-sm text-cream/70">Rooted in nature, backed by science.</p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-wide text-cream/60">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-cream/90 hover:text-lime">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-cream/15 pt-6">
          <Disclaimer className="text-cream/60" />
          <p className="mt-4 text-xs text-cream/50">© 2026 Organica Living, Inc.</p>
        </div>
      </div>
    </footer>
  );
}
