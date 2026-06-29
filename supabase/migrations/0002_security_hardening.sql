-- ===========================================================================
-- Security hardening (from Supabase security advisor after 0001_init).
-- ===========================================================================

-- Pin search_path on the updated_at trigger function (advisor 0011).
alter function public.set_updated_at() set search_path = '';

-- handle_new_user is a SECURITY DEFINER trigger function; it must not be
-- callable through the public REST RPC endpoint (advisors 0028/0029).
revoke execute on function public.handle_new_user() from public, anon, authenticated;
