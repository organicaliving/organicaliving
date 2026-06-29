export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Organica Living
        </p>
        <h1 className="mt-4 text-5xl font-light tracking-tight text-ink">
          Rooted in nature,
          <br />
          backed by science.
        </h1>
        <p className="mt-6 text-lg text-muted">
          Project scaffold is live. Next.js + Supabase + Stripe + Resend,
          styled with the Organica Living design tokens.
        </p>
        <a
          href="#"
          className="mt-9 inline-block rounded-pill bg-lime px-6 py-3 text-sm font-medium text-ink transition hover:brightness-95"
        >
          Get Started
        </a>
      </div>
    </main>
  );
}
