-- ===========================================================================
-- Organica Living — catalog seed
-- Canonical prices taken from the design mockups (Products page).
-- Subscriber price = 25% off one-time (the site's subscription model).
-- Supplement-facts rows are intentionally left for a follow-up migration so
-- they can be reconciled against the official label transcriptions (the
-- mockup data had unit/dosage errors).
-- Idempotent: safe to re-run.
-- ===========================================================================

insert into public.products (slug, name, subtitle, category, badge, image_path, description, sort_order)
values
  ('multi-pro',       'Multi Pro',       'Multivitamin + Minerals',  'Multivitamin',        null,  'images/multi-pro.webp',       'A complete 31-nutrient multivitamin & minerals blend — enhanced with Omega-3, CoQ10 and Lutein to bridge your daily nutrient gap and support immunity, energy and bone health.*',  1),
  ('optimus-d3',      'Optimus D3',      'Vitamin D3 5000 IU',       'Vitamin D3',          null,  'images/optimus-d3.webp',      'Clinical-strength 5000 IU Vitamin D3 in an enteric-coated softgel for heart, bone and immune support with optimal calcium absorption.*',  2),
  ('omega-1000',      'Omega 1000',      'Omega-3 Fish Oil',         'Omega-3',             null,  'images/omega-1000.webp',      '1000mg full-spectrum Omega-3 (520mg EPA / 330mg DHA) with Vitamin E, lemon-infused to support heart, brain and eye health.*',  3),
  ('vision-pro',      'Vision Pro',      'Eye Health',               'Eye Health',          'New', 'images/vision-pro.webp',      'A 29-in-1 optical defense softgel with 20mg Lutein and 4mg Zeaxanthin to filter blue light, guard the retina and ease dry eyes.*',  4),
  ('sleep-pro',       'Sleep Pro+',      'Melatonin Sleep Support',  'Sleep Support',       null,  'images/sleep-pro.webp',       'A mixed-berry gummy pairing 5mg Melatonin with GABA, L-Theanine and 5-HTP for deep, restorative, non-habit-forming sleep.*',  5),
  ('glow-pro',        'Glow Pro',        'Hair, Skin & Nails',       'Hair, Skin & Nails',  'New', 'images/glow-pro.webp',        'A 25-in-1 beauty gummy combining 10,000mcg Biotin with Collagen and Hyaluronic Acid for radiant hair, skin and nails.*',  6),
  ('bloom',           'Bloom',           'Pregnancy Support',        'Prenatal',            'New', 'images/bloom.webp',           'A complete prenatal strawberry gummy with bioactive folate, 260mg DHA, Choline and Iron — nurturing mother and baby in one a day.*',  7),
  ('meno-pro',        'Meno Pro',        'Menopause Support',        'Menopause Support',   'New', 'images/meno-pro.webp',        'A 31-ingredient hormonal-balance capsule with phyto-estrogens, Melatonin and Ashwagandha to ease hot flashes, night sweats and sleep.*',  8),
  ('optimus-d3-mini', 'Optimus D3 Mini', 'Kids Vitamin D3',          'Kids D3',             'New', 'images/optimus-d3-mini.webp', 'A tasty orange bear-shaped 9-in-1 gummy with D3, Calcium, K2 and Omega-3 to support kids'' bones, immunity and growth.*',  9)
on conflict (slug) do update set
  name = excluded.name,
  subtitle = excluded.subtitle,
  category = excluded.category,
  badge = excluded.badge,
  image_path = excluded.image_path,
  description = excluded.description,
  sort_order = excluded.sort_order;

-- Default variants (one per product). price_cents / subscription_price_cents in USD cents.
insert into public.product_variants (product_id, sku, title, price_cents, subscription_price_cents, is_default)
select p.id, v.sku, v.title, v.price_cents, v.sub_cents, true
from (values
  ('multi-pro',       'OL-MULTI-60',     '60 capsules', 3999, 2999),
  ('optimus-d3',      'OL-D3-30',        '30 softgels', 2499, 1874),
  ('omega-1000',      'OL-OMEGA-60',     '60 softgels', 2999, 2249),
  ('vision-pro',      'OL-VISION-30',    '30 softgels', 3499, 2624),
  ('sleep-pro',       'OL-SLEEP-30',     '30 gummies',  2799, 2099),
  ('glow-pro',        'OL-GLOW-30',      '30 gummies',  3299, 2474),
  ('bloom',           'OL-BLOOM-30',     '30 gummies',  3499, 2624),
  ('meno-pro',        'OL-MENO-30',      '30 capsules', 3699, 2774),
  ('optimus-d3-mini', 'OL-D3MINI-30',    '30 gummies',  2299, 1724)
) as v(slug, sku, title, price_cents, sub_cents)
join public.products p on p.slug = v.slug
on conflict (sku) do update set
  title = excluded.title,
  price_cents = excluded.price_cents,
  subscription_price_cents = excluded.subscription_price_cents;

-- Discount codes
insert into public.discount_codes (code, description, type, value, active)
values
  ('BUNDLE25',  '25% off your bundle',     'percent', 25, true),
  ('WELCOME10', '10% off your first order', 'percent', 10, true)
on conflict (code) do nothing;
