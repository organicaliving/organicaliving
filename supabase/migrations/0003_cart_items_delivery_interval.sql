-- Add a delivery cadence to cart line items, for the "3-Month Delivery" upsell.
-- 'monthly' (default) or 'quarterly' (3-month delivery, earns an extra 10% off).
alter table public.cart_items
  add column if not exists delivery_interval text not null default 'monthly';

alter table public.cart_items
  drop constraint if exists cart_items_delivery_interval_check;
alter table public.cart_items
  add constraint cart_items_delivery_interval_check
  check (delivery_interval in ('monthly', 'quarterly'));
