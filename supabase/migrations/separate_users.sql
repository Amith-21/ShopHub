-- Create sellers table
create table public.sellers (
  id uuid references auth.users not null primary key,
  email text,
  store_name text,
  gst_number text,
  phone text,
  address text,
  city text,
  state text,
  postal_code text,
  country text,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create customers table
create table public.customers (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  phone text,
  address text,
  city text,
  state text,
  postal_code text,
  country text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.sellers enable row level security;
alter table public.customers enable row level security;

-- Policies for sellers
create policy "Sellers can view their own data" on public.sellers
  for select using (auth.uid() = id);

create policy "Sellers can update their own data" on public.sellers
  for update using (auth.uid() = id);

create policy "Sellers can insert their own data" on public.sellers
  for insert with check (auth.uid() = id);

-- Policies for customers
create policy "Customers can view their own data" on public.customers
  for select using (auth.uid() = id);

create policy "Customers can update their own data" on public.customers
  for update using (auth.uid() = id);

create policy "Customers can insert their own data" on public.customers
  for insert with check (auth.uid() = id);

-- Public read access (optional, if needed for profiles)
-- create policy "Public profiles are viewable by everyone" on public.sellers
--   for select using (true);
