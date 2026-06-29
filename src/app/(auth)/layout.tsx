import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 py-12">
      <Link href="/" className="mb-8 text-xl font-medium tracking-tight text-ink">
        Organica Living
      </Link>
      <div className="w-full max-w-sm rounded-lg border border-line bg-header p-8">{children}</div>
    </main>
  );
}
