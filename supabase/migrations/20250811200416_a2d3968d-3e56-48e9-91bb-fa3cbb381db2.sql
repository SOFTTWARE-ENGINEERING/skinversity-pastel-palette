-- Enable required extension for UUIDs
create extension if not exists pgcrypto;

-- Timestamp update helper (idempotent)
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Profiles policies
create policy if not exists "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy if not exists "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy if not exists "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger for profiles timestamps
create or replace trigger update_profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- Posts table
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_user_id_idx on public.posts(user_id);

alter table public.posts enable row level security;

-- Posts policies
create policy if not exists "Posts are viewable by everyone"
  on public.posts for select
  using (true);

create policy if not exists "Users can create their own posts"
  on public.posts for insert
  with check (auth.uid() = user_id);

create policy if not exists "Users can update their own posts"
  on public.posts for update
  using (auth.uid() = user_id);

create policy if not exists "Users can delete their own posts"
  on public.posts for delete
  using (auth.uid() = user_id);

-- Trigger for posts timestamps
create or replace trigger update_posts_updated_at
before update on public.posts
for each row execute function public.update_updated_at_column();