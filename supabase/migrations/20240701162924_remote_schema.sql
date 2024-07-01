create schema if not exists "accommodations";

create type "accommodations"."gender" as enum ('male', 'female', 'other');

create table "accommodations"."images" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "c_public_id" text,
    "c_url" text,
    "user_id" uuid not null
);


alter table "accommodations"."images" enable row level security;

create table "accommodations"."profiles" (
    "user_id" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default now(),
    "is_student" boolean,
    "is_landlord" boolean,
    "date_of_birth" date,
    "username" text,
    "bio" text,
    "photo_id" uuid default gen_random_uuid(),
    "first_name" text,
    "last_name" text,
    "address_l1" text,
    "address_l2" text,
    "city" text,
    "state" text,
    "country" text,
    "zip_code" text
);


alter table "accommodations"."profiles" enable row level security;

create table "accommodations"."properties" (
    "id" bigint not null,
    "street_addr" text not null,
    "zip_code" text not null,
    "city" text not null,
    "state" text not null,
    "country" text not null,
    "rent" double precision not null,
    "avg_utilities" double precision,
    "posted_by" text,
    "desc" text,
    "image_url" text not null,
    "bedrooms" bigint,
    "full_baths" bigint,
    "half_baths" bigint,
    "is_house" boolean,
    "is_apt" boolean
);


alter table "accommodations"."properties" enable row level security;

CREATE UNIQUE INDEX images_pkey ON accommodations.images USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON accommodations.profiles USING btree (user_id);

CREATE UNIQUE INDEX properties_pkey ON accommodations.properties USING btree (id);

alter table "accommodations"."images" add constraint "images_pkey" PRIMARY KEY using index "images_pkey";

alter table "accommodations"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "accommodations"."properties" add constraint "properties_pkey" PRIMARY KEY using index "properties_pkey";

alter table "accommodations"."profiles" add constraint "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "accommodations"."profiles" validate constraint "profiles_user_id_fkey";

grant delete on table "accommodations"."images" to "anon";

grant insert on table "accommodations"."images" to "anon";

grant references on table "accommodations"."images" to "anon";

grant select on table "accommodations"."images" to "anon";

grant trigger on table "accommodations"."images" to "anon";

grant truncate on table "accommodations"."images" to "anon";

grant update on table "accommodations"."images" to "anon";

grant delete on table "accommodations"."images" to "authenticated";

grant insert on table "accommodations"."images" to "authenticated";

grant references on table "accommodations"."images" to "authenticated";

grant select on table "accommodations"."images" to "authenticated";

grant trigger on table "accommodations"."images" to "authenticated";

grant truncate on table "accommodations"."images" to "authenticated";

grant update on table "accommodations"."images" to "authenticated";

grant delete on table "accommodations"."images" to "service_role";

grant insert on table "accommodations"."images" to "service_role";

grant references on table "accommodations"."images" to "service_role";

grant select on table "accommodations"."images" to "service_role";

grant trigger on table "accommodations"."images" to "service_role";

grant truncate on table "accommodations"."images" to "service_role";

grant update on table "accommodations"."images" to "service_role";

grant delete on table "accommodations"."profiles" to "anon";

grant insert on table "accommodations"."profiles" to "anon";

grant references on table "accommodations"."profiles" to "anon";

grant select on table "accommodations"."profiles" to "anon";

grant trigger on table "accommodations"."profiles" to "anon";

grant truncate on table "accommodations"."profiles" to "anon";

grant update on table "accommodations"."profiles" to "anon";

grant delete on table "accommodations"."profiles" to "authenticated";

grant insert on table "accommodations"."profiles" to "authenticated";

grant references on table "accommodations"."profiles" to "authenticated";

grant select on table "accommodations"."profiles" to "authenticated";

grant trigger on table "accommodations"."profiles" to "authenticated";

grant truncate on table "accommodations"."profiles" to "authenticated";

grant update on table "accommodations"."profiles" to "authenticated";

grant delete on table "accommodations"."profiles" to "service_role";

grant insert on table "accommodations"."profiles" to "service_role";

grant references on table "accommodations"."profiles" to "service_role";

grant select on table "accommodations"."profiles" to "service_role";

grant trigger on table "accommodations"."profiles" to "service_role";

grant truncate on table "accommodations"."profiles" to "service_role";

grant update on table "accommodations"."profiles" to "service_role";

grant delete on table "accommodations"."properties" to "anon";

grant insert on table "accommodations"."properties" to "anon";

grant references on table "accommodations"."properties" to "anon";

grant select on table "accommodations"."properties" to "anon";

grant trigger on table "accommodations"."properties" to "anon";

grant truncate on table "accommodations"."properties" to "anon";

grant update on table "accommodations"."properties" to "anon";

grant delete on table "accommodations"."properties" to "authenticated";

grant insert on table "accommodations"."properties" to "authenticated";

grant references on table "accommodations"."properties" to "authenticated";

grant select on table "accommodations"."properties" to "authenticated";

grant trigger on table "accommodations"."properties" to "authenticated";

grant truncate on table "accommodations"."properties" to "authenticated";

grant update on table "accommodations"."properties" to "authenticated";

grant delete on table "accommodations"."properties" to "service_role";

grant insert on table "accommodations"."properties" to "service_role";

grant references on table "accommodations"."properties" to "service_role";

grant select on table "accommodations"."properties" to "service_role";

grant trigger on table "accommodations"."properties" to "service_role";

grant truncate on table "accommodations"."properties" to "service_role";

grant update on table "accommodations"."properties" to "service_role";

create policy "Enable insert for authenticated users only"
on "accommodations"."images"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable insert for authenticated users only"
on "accommodations"."profiles"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "accommodations"."properties"
as permissive
for select
to public
using (true);



