create extension if not exists postgis with schema extensions;
create extension if not exists pgcrypto with schema extensions;

create schema if not exists app_private;
comment on schema app_private is 'SuperNova private application boundary. No Phase 0 business feature tables live here.';
