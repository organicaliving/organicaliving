-- ===========================================================================
-- Organica Living — initial schema
-- Catalog, cart, orders, subscriptions, referrals, discounts + RLS.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles  (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id                 uuid primary key references auth.users (id) on delete cascade,
  email              text,
  full_name          text,
  referral_code      text unique,
  referred_by        uuid references public.profiles (id),
  stripe_customer_id text unique,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile + referral code when a user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, referral_code)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- products / variants / supplement facts
-- ---------------------------------------------------------------------------
create table public.products (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  subtitle    text,                       -- e.g. "Multivitamin + Minerals"
  category    text,                       -- e.g. "Multivitamin"
  description text,
  badge       text,                       -- e.g. "New"
  image_path  text,                       -- e.g. "images/multi-pro.webp"
  hero_claims jsonb not null default '[]'::jsonb,
  benefits    jsonb not null default '[]'::jsonb,
  is_active   boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

create table public.product_variants (
  id                     uuid primary key default gen_random_uuid(),
  product_id             uuid not null references public.products (id) on delete cascade,
  sku                    text unique,
  upc                    text,
  title                  text not null,            -- e.g. "30 capsules"
  price_cents            int not null check (price_cents >= 0),
  compare_at_cents       int check (compare_at_cents >= 0),   -- strike-through price
  subscription_eligible  boolean not null default true,
  subscription_price_cents int check (subscription_price_cents >= 0),
  currency               text not null default 'usd',
  stripe_price_id        text,             -- one-time purchase price
  stripe_sub_price_id    text,             -- recurring (subscription) price
  inventory              int,
  is_default             boolean not null default false,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index on public.product_variants (product_id);

create trigger product_variants_set_updated_at
  before update on public.product_variants
  for each row execute function public.set_updated_at();

create table public.product_facts (
  id                     uuid primary key default gen_random_uuid(),
  product_id             uuid not null references public.products (id) on delete cascade,
  serving_size           text,
  servings_per_container text,
  rows                   jsonb not null default '[]'::jsonb,  -- [{name, amount, dv}]
  other_ingredients      text,
  warnings               text,
  created_at             timestamptz not null default now()
);

create index on public.product_facts (product_id);

-- ---------------------------------------------------------------------------
-- carts / cart_items
-- ---------------------------------------------------------------------------
create table public.carts (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  status     text not null default 'active' check (status in ('active', 'converted', 'abandoned')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- one active cart per user
create unique index carts_one_active_per_user
  on public.carts (user_id) where status = 'active';

create trigger carts_set_updated_at
  before update on public.carts
  for each row execute function public.set_updated_at();

create table public.cart_items (
  id            uuid primary key default gen_random_uuid(),
  cart_id       uuid not null references public.carts (id) on delete cascade,
  variant_id    uuid not null references public.product_variants (id),
  quantity      int not null default 1 check (quantity > 0),
  purchase_type text not null default 'one_time' check (purchase_type in ('one_time', 'subscription')),
  created_at    timestamptz not null default now(),
  unique (cart_id, variant_id, purchase_type)
);

create index on public.cart_items (cart_id);

-- ---------------------------------------------------------------------------
-- orders / order_items
-- ---------------------------------------------------------------------------
create table public.orders (
  id                          uuid primary key default gen_random_uuid(),
  user_id                     uuid references auth.users (id) on delete set null,
  email                       text,
  status                      text not null default 'pending'
                                check (status in ('pending', 'paid', 'fulfilled', 'cancelled', 'refunded')),
  subtotal_cents              int not null default 0,
  discount_cents              int not null default 0,
  tax_cents                   int not null default 0,
  shipping_cents              int not null default 0,
  total_cents                 int not null default 0,
  currency                    text not null default 'usd',
  discount_code               text,
  shipping_address            jsonb,
  stripe_payment_intent_id    text unique,
  stripe_checkout_session_id  text unique,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now()
);

create index on public.orders (user_id);

create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

create table public.order_items (
  id              uuid primary key default gen_random_uuid(),
  order_id        uuid not null references public.orders (id) on delete cascade,
  variant_id      uuid references public.product_variants (id) on delete set null,
  product_name    text not null,          -- snapshot at purchase time
  variant_title   text not null,          -- snapshot
  unit_price_cents int not null,
  quantity        int not null check (quantity > 0),
  purchase_type   text not null default 'one_time',
  created_at      timestamptz not null default now()
);

create index on public.order_items (order_id);

-- ---------------------------------------------------------------------------
-- subscriptions  (mirrors Stripe Billing state)
-- ---------------------------------------------------------------------------
create table public.subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null references auth.users (id) on delete cascade,
  variant_id             uuid references public.product_variants (id) on delete set null,
  stripe_subscription_id text unique,
  stripe_customer_id     text,
  status                 text not null default 'active'
                           check (status in ('active', 'paused', 'past_due', 'cancelled')),
  interval               text not null default 'month',
  interval_count         int not null default 1,
  quantity               int not null default 1 check (quantity > 0),
  current_period_end     timestamptz,
  next_charge_at         timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index on public.subscriptions (user_id);

create trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- discount_codes
-- ---------------------------------------------------------------------------
create table public.discount_codes (
  id              uuid primary key default gen_random_uuid(),
  code            text unique not null,
  description     text,
  type            text not null check (type in ('percent', 'fixed')),
  value           int not null check (value >= 0),   -- percent: 0-100; fixed: cents
  active          boolean not null default true,
  max_redemptions int,
  times_redeemed  int not null default 0,
  starts_at       timestamptz,
  ends_at         timestamptz,
  created_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- referrals  (Give $25 / Get $25)
-- ---------------------------------------------------------------------------
create table public.referrals (
  id               uuid primary key default gen_random_uuid(),
  referrer_id      uuid not null references public.profiles (id) on delete cascade,
  referred_email   text,
  referred_user_id uuid references public.profiles (id) on delete set null,
  status           text not null default 'pending'
                     check (status in ('pending', 'completed', 'rewarded')),
  reward_cents     int not null default 2500,
  created_at       timestamptz not null default now(),
  completed_at     timestamptz
);

create index on public.referrals (referrer_id);

-- ===========================================================================
-- Row Level Security
-- ===========================================================================
alter table public.profiles         enable row level security;
alter table public.products         enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_facts    enable row level security;
alter table public.carts            enable row level security;
alter table public.cart_items       enable row level security;
alter table public.orders           enable row level security;
alter table public.order_items      enable row level security;
alter table public.subscriptions    enable row level security;
alter table public.discount_codes   enable row level security;
alter table public.referrals        enable row level security;

-- ---- public catalog: anyone may read active products ----
create policy "products are public" on public.products
  for select using (is_active = true);

create policy "variants are public" on public.product_variants
  for select using (
    exists (select 1 from public.products p where p.id = product_id and p.is_active)
  );

create policy "facts are public" on public.product_facts
  for select using (
    exists (select 1 from public.products p where p.id = product_id and p.is_active)
  );

create policy "active discount codes are readable" on public.discount_codes
  for select using (active = true);

-- ---- profiles: owner-only ----
create policy "read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "update own profile" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- ---- carts: owner-only full access ----
create policy "manage own carts" on public.carts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---- cart_items: access via owned cart ----
create policy "manage own cart items" on public.cart_items
  for all
  using (exists (select 1 from public.carts c where c.id = cart_id and c.user_id = auth.uid()))
  with check (exists (select 1 from public.carts c where c.id = cart_id and c.user_id = auth.uid()));

-- ---- orders: read own (writes happen via service role in webhooks) ----
create policy "read own orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "read own order items" on public.order_items
  for select
  using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

-- ---- subscriptions: read own (writes via service role) ----
create policy "read own subscriptions" on public.subscriptions
  for select using (auth.uid() = user_id);

-- ---- referrals: referrer can read their own ----
create policy "read own referrals" on public.referrals
  for select using (auth.uid() = referrer_id);

-- NOTE: the service-role key bypasses RLS, so Stripe webhooks and other trusted
-- server code can insert/update orders, subscriptions and referral rewards.
