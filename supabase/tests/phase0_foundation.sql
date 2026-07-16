begin;
select plan(4);

select ok(exists(select 1 from pg_extension where extname = 'postgis'), 'postgis extension exists');
select ok(exists(select 1 from pg_extension where extname = 'pgcrypto'), 'pgcrypto extension exists');
select ok(exists(select 1 from information_schema.schemata where schema_name = 'app_private'), 'app_private schema exists');
select is(
  (select count(*)::integer from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE'),
  0,
  'no public feature tables exist'
);

select * from finish();
rollback;
