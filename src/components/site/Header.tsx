import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";

const NAV = [
  { label: "Shop", href: "/products" },
  { label: "Science", href: "/science" },
  { label: "Learn", href: "/blog" },
];

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-header/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-xl font-medium tracking-tight text-ink">Organica Living</Link>
          <nav className="hidden gap-1 md:flex">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-pill px-3 py-1.5 text-sm text-ink transition hover:bg-cream">{item.label}</Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          {user ? (
            <>
              <Link href="/account" className="text-sm text-ink">Account</Link>
              <form action="/auth/signout" method="post">
                <button type="submit" className="text-sm text-ink">Sign out</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-ink">Sign In</Link>
              <Button href="/signup">Get Started</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
