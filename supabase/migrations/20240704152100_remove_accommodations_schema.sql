-- Set the search path
SET search_path TO hive, public, extensions;

-- Drop the accommodations schema if it exists
DROP SCHEMA IF EXISTS accommodations CASCADE;

-- Ensure all necessary permissions are set for the hive schema
GRANT USAGE ON SCHEMA hive TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA hive TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA hive TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA hive TO postgres, anon, authenticated, service_role;

-- Reaffirm the default schema settings
ALTER DATABASE postgres SET search_path TO hive, public, extensions;
ALTER ROLE authenticator SET search_path TO hive, public, extensions;
ALTER ROLE anon SET search_path TO hive, public, extensions;
ALTER ROLE authenticated SET search_path TO hive, public, extensions;
ALTER ROLE service_role SET search_path TO hive, public, extensions;