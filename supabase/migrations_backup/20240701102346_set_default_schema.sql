-- Set the default schema for the database
ALTER DATABASE postgres SET search_path TO hive, public, extensions;

-- Set the default schema for the authenticator role
ALTER ROLE authenticator SET search_path TO hive, public, extensions;

-- Set the default schema for the anon role
ALTER ROLE anon SET search_path TO hive, public, extensions;

-- Set the default schema for the authenticated role
ALTER ROLE authenticated SET search_path TO hive, public, extensions;

-- Set the default schema for the service_role role
ALTER ROLE service_role SET search_path TO hive, public, extensions;