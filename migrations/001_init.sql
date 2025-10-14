// supabase/migrations/001_init.sql
/*
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Leads table
create table if not exists public.leads (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  first_name text,
  phone text,
  source text,
  utm jsonb,
  created_at timestamptz not null default now()
);

-- Create unique index on email (case insensitive)
create unique index if not exists leads_email_unique on public.leads (lower(email));

-- Create index on created_at for performance
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Enable Row Level Security
alter table public.leads enable row level security;

-- Allow anonymous inserts (for form submissions)
create policy "anon_insert_leads" on public.leads 
  for insert to anon 
  with check (true);

-- Allow service role full access
create policy "service_all_leads" on public.leads 
  for all to service_role 
  using (true);

-- Intakes table (for consultation requests)
create table if not exists public.intakes (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references public.leads(id) on delete set null,
  goal text,
  training_place text,  -- home/gym/minimal
  equipment text,
  availability text,
  notes text,
  status text default 'new',
  created_at timestamptz not null default now()
);

create index if not exists intakes_created_at_idx on public.intakes (created_at desc);
create index if not exists intakes_status_idx on public.intakes (status);

alter table public.intakes enable row level security;

create policy "anon_insert_intakes" on public.intakes 
  for insert to anon 
  with check (true);

create policy "service_all_intakes" on public.intakes 
  for all to service_role 
  using (true);
*/