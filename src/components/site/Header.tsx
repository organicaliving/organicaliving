import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV = [
  { label: "Shop", href: "/products" },
  { label: "Science", href: "/science" },
  { label: "Learn", href: "/blog" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-header/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-xl font-medium tracking-tight text-ink">
            Organica Living
          </Link>
          <nav className="hidden gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-pill px-3 py-1.5 text-sm text-ink transition hover:bg-cream"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/login" className="text-sm text-ink">
            Sign In
          </Link>
          <Button href="/signup">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
