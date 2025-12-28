-- Run this query in the SQL Editor of your Supabase dashboard

-- 1. Create Profiles Table (Public profile info)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  email text,
  full_name text,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(full_name) >= 3)
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on public.profiles
  for update using ((select auth.uid()) = id);

-- 2. Create Quiz Results Table
create table if not exists public.quiz_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  subject_id text not null,
  chapter_id text not null,
  score integer not null,
  total_score integer not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.quiz_results enable row level security;

-- Policy: Users can see only their own results
create policy "Users can view own quiz results." on public.quiz_results
  for select using ((select auth.uid()) = user_id);

-- Policy: Users can insert their own results
create policy "Users can insert own quiz results." on public.quiz_results
  for insert with check ((select auth.uid()) = user_id);

-- 3. Trigger to create a profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
