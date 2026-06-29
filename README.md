# Organica Living

DTC supplement storefront — built fully in-house on an owned stack.

## Tech stack

| Concern | Tool |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (design tokens in `src/app/globals.css`) |
| Database / Auth / Storage | Supabase (Postgres + RLS) |
| Payments / Subscriptions / Tax | Stripe (Payments, Billing, Tax) |
| Transactional email | Resend + React Email |
| Validation | Zod |
| Hosting | Vercel |

External services are limited to card processing (Stripe — PCI) and email
delivery (Resend). Everything else — catalog, cart, orders, accounts,
referrals, discounts, blog/CMS, search — is built in-house on Supabase.

## Project structure

```
src/
  app/              # App Router routes + globals.css (design tokens)
  components/       # Shared UI components
  emails/           # React Email templates (Resend)
  lib/
    env.ts          # Validated env access (public vs server-only)
    stripe.ts       # Server Stripe client
    resend.ts       # Resend client
    supabase/
      client.ts     # Browser client (anon key, RLS-bound)
      server.ts     # Server client (cookies, RLS-bound)
      admin.ts      # Service-role client (bypasses RLS — webhooks only)
      middleware.ts # Session refresh helper
  proxy.ts          # Next 16 proxy (auth session refresh)
supabase/
  migrations/       # SQL migrations
design-reference/   # Original Claude Design mockups (.dc.html) — design source of truth
```

## Getting started

```bash
cp .env.example .env.local   # fill in Supabase / Stripe / Resend keys
pnpm install
pnpm dev                     # http://localhost:3000
```

## Scripts

- `pnpm dev` — start the dev server
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — ESLint
