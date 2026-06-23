create extension if not exists "pgcrypto";

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company_name text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.app_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  prompt text not null,
  status text not null default 'draft' check (status in ('draft', 'processing', 'ready', 'failed')),
  ai_spec jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  app_id uuid not null references public.app_projects(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  app_id uuid not null references public.app_projects(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  service_name text not null,
  stylist_name text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  price_cents integer not null default 0 check (price_cents >= 0),
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint booking_time_window check (ends_at > starts_at)
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  app_id uuid not null references public.app_projects(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  booking_id uuid references public.bookings(id) on delete set null,
  invoice_number text not null,
  amount_cents integer not null default 0 check (amount_cents >= 0),
  currency text not null default 'USD' check (char_length(currency) = 3),
  status text not null default 'draft' check (status in ('draft', 'sent', 'paid', 'overdue')),
  due_date date,
  paid_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, invoice_number)
);

create index if not exists idx_profiles_user_id on public.profiles(user_id);
create index if not exists idx_projects_user_id on public.app_projects(user_id);
create index if not exists idx_customers_user_id on public.customers(user_id);
create index if not exists idx_customers_app_id on public.customers(app_id);
create index if not exists idx_bookings_user_id on public.bookings(user_id);
create index if not exists idx_bookings_app_id on public.bookings(app_id);
create index if not exists idx_bookings_customer_id on public.bookings(customer_id);
create index if not exists idx_bookings_starts_at on public.bookings(starts_at);
create index if not exists idx_invoices_user_id on public.invoices(user_id);
create index if not exists idx_invoices_app_id on public.invoices(app_id);
create index if not exists idx_invoices_customer_id on public.invoices(customer_id);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.handle_updated_at();

drop trigger if exists set_projects_updated_at on public.app_projects;
create trigger set_projects_updated_at
before update on public.app_projects
for each row
execute function public.handle_updated_at();

drop trigger if exists set_customers_updated_at on public.customers;
create trigger set_customers_updated_at
before update on public.customers
for each row
execute function public.handle_updated_at();

drop trigger if exists set_bookings_updated_at on public.bookings;
create trigger set_bookings_updated_at
before update on public.bookings
for each row
execute function public.handle_updated_at();

drop trigger if exists set_invoices_updated_at on public.invoices;
create trigger set_invoices_updated_at
before update on public.invoices
for each row
execute function public.handle_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name, company_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'company_name', '')
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.app_projects enable row level security;
alter table public.customers enable row level security;
alter table public.bookings enable row level security;
alter table public.invoices enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = user_id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
with check (auth.uid() = user_id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "projects_select_own" on public.app_projects;
create policy "projects_select_own"
on public.app_projects
for select
using (auth.uid() = user_id);

drop policy if exists "projects_insert_own" on public.app_projects;
create policy "projects_insert_own"
on public.app_projects
for insert
with check (auth.uid() = user_id);

drop policy if exists "projects_update_own" on public.app_projects;
create policy "projects_update_own"
on public.app_projects
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "projects_delete_own" on public.app_projects;
create policy "projects_delete_own"
on public.app_projects
for delete
using (auth.uid() = user_id);

drop policy if exists "customers_select_own" on public.customers;
create policy "customers_select_own"
on public.customers
for select
using (auth.uid() = user_id);

drop policy if exists "customers_insert_own" on public.customers;
create policy "customers_insert_own"
on public.customers
for insert
with check (auth.uid() = user_id);

drop policy if exists "customers_update_own" on public.customers;
create policy "customers_update_own"
on public.customers
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "customers_delete_own" on public.customers;
create policy "customers_delete_own"
on public.customers
for delete
using (auth.uid() = user_id);

drop policy if exists "bookings_select_own" on public.bookings;
create policy "bookings_select_own"
on public.bookings
for select
using (auth.uid() = user_id);

drop policy if exists "bookings_insert_own" on public.bookings;
create policy "bookings_insert_own"
on public.bookings
for insert
with check (auth.uid() = user_id);

drop policy if exists "bookings_update_own" on public.bookings;
create policy "bookings_update_own"
on public.bookings
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "bookings_delete_own" on public.bookings;
create policy "bookings_delete_own"
on public.bookings
for delete
using (auth.uid() = user_id);

drop policy if exists "invoices_select_own" on public.invoices;
create policy "invoices_select_own"
on public.invoices
for select
using (auth.uid() = user_id);

drop policy if exists "invoices_insert_own" on public.invoices;
create policy "invoices_insert_own"
on public.invoices
for insert
with check (auth.uid() = user_id);

drop policy if exists "invoices_update_own" on public.invoices;
create policy "invoices_update_own"
on public.invoices
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "invoices_delete_own" on public.invoices;
create policy "invoices_delete_own"
on public.invoices
for delete
using (auth.uid() = user_id);
