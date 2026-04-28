create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  nickname text not null,
  profileimg text not null default 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240',
  myself text not null default '안녕하세요? 잘 부탁드립니다',
  gender text not null default 'nothing',
  location text not null default '',
  first_category boolean not null default false,
  category text[] not null default array['전체']::text[],
  login_time timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    nickname,
    profileimg,
    myself,
    gender,
    location,
    first_category,
    category,
    login_time
  )
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'nickname', split_part(coalesce(new.email, ''), '@', 1), '사용자'),
    coalesce(new.raw_user_meta_data ->> 'profileimg', 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240'),
    coalesce(new.raw_user_meta_data ->> 'myself', '안녕하세요? 잘 부탁드립니다'),
    coalesce(new.raw_user_meta_data ->> 'gender', 'nothing'),
    coalesce(new.raw_user_meta_data ->> 'location', ''),
    coalesce((new.raw_user_meta_data ->> 'first_category')::boolean, false),
    coalesce(
      string_to_array(nullif(new.raw_user_meta_data ->> 'category', ''), ','),
      array['전체']::text[]
    ),
    now()
  )
  on conflict (id) do update
  set
    email = excluded.email,
    nickname = excluded.nickname,
    profileimg = excluded.profileimg,
    myself = excluded.myself,
    gender = excluded.gender,
    location = excluded.location;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  location text not null,
  category text not null,
  class_name text not null,
  class_target text not null,
  member_count integer not null default 20,
  make_user uuid not null references public.profiles(id) on delete cascade,
  thumbnail text,
  hash_tag text[] not null default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger classes_set_updated_at
before update on public.classes
for each row
execute function public.set_updated_at();

create table if not exists public.class_members (
  class_id uuid not null references public.classes(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (class_id, user_id)
);

create table if not exists public.class_invites (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (class_id, user_id)
);

create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  name text not null,
  place text not null,
  price text not null,
  member_count integer not null default 20,
  day timestamptz not null,
  time text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger meetings_set_updated_at
before update on public.meetings
for each row
execute function public.set_updated_at();

create table if not exists public.meeting_attendees (
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (meeting_id, user_id)
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  message text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger chat_messages_set_updated_at
before update on public.chat_messages
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.class_members enable row level security;
alter table public.class_invites enable row level security;
alter table public.meetings enable row level security;
alter table public.meeting_attendees enable row level security;
alter table public.chat_messages enable row level security;

drop policy if exists "Profiles are readable by authenticated users" on public.profiles;
create policy "Profiles are readable by authenticated users"
on public.profiles
for select
to authenticated
using (true);

drop policy if exists "Profiles are insertable by owner" on public.profiles;
create policy "Profiles are insertable by owner"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "Profiles are updatable by owner" on public.profiles;
create policy "Profiles are updatable by owner"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "Classes are readable by authenticated users" on public.classes;
create policy "Classes are readable by authenticated users"
on public.classes
for select
to authenticated
using (true);

drop policy if exists "Classes are insertable by owner" on public.classes;
create policy "Classes are insertable by owner"
on public.classes
for insert
to authenticated
with check (make_user = auth.uid());

drop policy if exists "Classes are updatable by owner" on public.classes;
create policy "Classes are updatable by owner"
on public.classes
for update
to authenticated
using (make_user = auth.uid())
with check (make_user = auth.uid());

drop policy if exists "Classes are deletable by owner" on public.classes;
create policy "Classes are deletable by owner"
on public.classes
for delete
to authenticated
using (make_user = auth.uid());

drop policy if exists "Class members are readable by authenticated users" on public.class_members;
create policy "Class members are readable by authenticated users"
on public.class_members
for select
to authenticated
using (true);

drop policy if exists "Class members are insertable by member or owner" on public.class_members;
create policy "Class members are insertable by member or owner"
on public.class_members
for insert
to authenticated
with check (
  user_id = auth.uid()
  or exists (
    select 1
    from public.classes c
    where c.id = class_id
      and c.make_user = auth.uid()
  )
);

drop policy if exists "Class members are deletable by member or owner" on public.class_members;
create policy "Class members are deletable by member or owner"
on public.class_members
for delete
to authenticated
using (
  user_id = auth.uid()
  or exists (
    select 1
    from public.classes c
    where c.id = class_id
      and c.make_user = auth.uid()
  )
);

drop policy if exists "Class invites are readable by authenticated users" on public.class_invites;
create policy "Class invites are readable by authenticated users"
on public.class_invites
for select
to authenticated
using (
  user_id = auth.uid()
  or exists (
    select 1
    from public.classes c
    where c.id = class_id
      and c.make_user = auth.uid()
  )
);

drop policy if exists "Class invites are insertable by owner" on public.class_invites;
create policy "Class invites are insertable by owner"
on public.class_invites
for insert
to authenticated
with check (
  exists (
    select 1
    from public.classes c
    where c.id = class_id
      and c.make_user = auth.uid()
  )
);

drop policy if exists "Class invites are deletable by owner or invitee" on public.class_invites;
create policy "Class invites are deletable by owner or invitee"
on public.class_invites
for delete
to authenticated
using (
  user_id = auth.uid()
  or exists (
    select 1
    from public.classes c
    where c.id = class_id
      and c.make_user = auth.uid()
  )
);

drop policy if exists "Meetings are readable by authenticated users" on public.meetings;
create policy "Meetings are readable by authenticated users"
on public.meetings
for select
to authenticated
using (true);

drop policy if exists "Meetings are insertable by owner" on public.meetings;
create policy "Meetings are insertable by owner"
on public.meetings
for insert
to authenticated
with check (
  exists (
    select 1
    from public.classes c
    where c.id = class_id
      and c.make_user = auth.uid()
  )
);

drop policy if exists "Meetings are updatable by owner" on public.meetings;
create policy "Meetings are updatable by owner"
on public.meetings
for update
to authenticated
using (
  exists (
    select 1
    from public.classes c
    where c.id = class_id
      and c.make_user = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.classes c
    where c.id = class_id
      and c.make_user = auth.uid()
  )
);

drop policy if exists "Meetings are deletable by owner" on public.meetings;
create policy "Meetings are deletable by owner"
on public.meetings
for delete
to authenticated
using (
  exists (
    select 1
    from public.classes c
    where c.id = class_id
      and c.make_user = auth.uid()
  )
);

drop policy if exists "Meeting attendees are readable by authenticated users" on public.meeting_attendees;
create policy "Meeting attendees are readable by authenticated users"
on public.meeting_attendees
for select
to authenticated
using (true);

drop policy if exists "Meeting attendees are insertable by owner or attendee" on public.meeting_attendees;
create policy "Meeting attendees are insertable by owner or attendee"
on public.meeting_attendees
for insert
to authenticated
with check (
  user_id = auth.uid()
  or exists (
    select 1
    from public.meetings m
    join public.classes c on c.id = m.class_id
    where m.id = meeting_id
      and c.make_user = auth.uid()
  )
);

drop policy if exists "Meeting attendees are deletable by owner or attendee" on public.meeting_attendees;
create policy "Meeting attendees are deletable by owner or attendee"
on public.meeting_attendees
for delete
to authenticated
using (
  user_id = auth.uid()
  or exists (
    select 1
    from public.meetings m
    join public.classes c on c.id = m.class_id
    where m.id = meeting_id
      and c.make_user = auth.uid()
  )
);

drop policy if exists "Chat messages are readable by authenticated users" on public.chat_messages;
create policy "Chat messages are readable by authenticated users"
on public.chat_messages
for select
to authenticated
using (true);

drop policy if exists "Chat messages are insertable by class members" on public.chat_messages;
create policy "Chat messages are insertable by class members"
on public.chat_messages
for insert
to authenticated
with check (
  user_id = auth.uid()
  and exists (
    select 1
    from public.class_members m
    where m.class_id = chat_messages.class_id
      and m.user_id = auth.uid()
  )
);

insert into storage.buckets (id, name, public)
values
  ('profile-images', 'profile-images', true),
  ('class-images', 'class-images', true)
on conflict (id) do update
set public = excluded.public;

drop policy if exists "Storage objects are readable" on storage.objects;
create policy "Storage objects are readable"
on storage.objects
for select
to public
using (bucket_id in ('profile-images', 'class-images'));

drop policy if exists "Authenticated users can upload storage objects" on storage.objects;
create policy "Authenticated users can upload storage objects"
on storage.objects
for insert
to authenticated
with check (bucket_id in ('profile-images', 'class-images'));

drop policy if exists "Owners can update storage objects" on storage.objects;
create policy "Owners can update storage objects"
on storage.objects
for update
to authenticated
using (bucket_id in ('profile-images', 'class-images') and owner = auth.uid())
with check (bucket_id in ('profile-images', 'class-images') and owner = auth.uid());

drop policy if exists "Owners can delete storage objects" on storage.objects;
create policy "Owners can delete storage objects"
on storage.objects
for delete
to authenticated
using (bucket_id in ('profile-images', 'class-images') and owner = auth.uid());
