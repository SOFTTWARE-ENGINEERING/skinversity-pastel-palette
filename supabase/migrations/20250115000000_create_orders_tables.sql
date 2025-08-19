-- Create orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  total decimal(10,2) not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create order_items table
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  quantity integer not null check (quantity > 0),
  price decimal(10,2) not null,
  created_at timestamptz not null default now()
);

-- Create indexes for performance
create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists order_items_order_id_idx on public.order_items(order_id);

-- Enable RLS on both tables
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Orders policies
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can create their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own orders"
  on public.orders for update
  using (auth.uid() = user_id);

-- Admin can view all orders (we'll add role check later)
create policy "Admins can view all orders"
  on public.orders for select
  using (true); -- We'll restrict this to admin role in the next step

create policy "Admins can update all orders"
  on public.orders for update
  using (true); -- We'll restrict this to admin role in the next step

-- Order items policies
create policy "Users can view their own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

create policy "Users can create order items for their orders"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Admin can view all order items
create policy "Admins can view all order items"
  on public.order_items for select
  using (true);

-- Trigger for orders timestamps
create or replace trigger update_orders_updated_at
before update on public.orders
for each row execute function public.update_updated_at_column();
