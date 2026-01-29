-- Function to handle new user creation automatically
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  user_role text;
  user_full_name text;
begin
  -- Get metadata from the auth.users table
  user_role := new.raw_user_meta_data->>'role';
  user_full_name := new.raw_user_meta_data->>'full_name';

  -- Insert into respective table based on role
  if user_role = 'seller' then
    insert into public.sellers (id, email, store_name, is_verified)
    values (new.id, new.email, user_full_name, false);
  elsif user_role = 'customer' then
    insert into public.customers (id, email, full_name)
    values (new.id, new.email, user_full_name);
  end if;
  
  return new;
end;
$$;

-- Create the trigger on auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Optional: Clean up any "insert" policies if they exist, as we don't need them anymore
-- drop policy "Sellers can insert their own data" on public.sellers;
-- drop policy "Customers can insert their own data" on public.customers;
