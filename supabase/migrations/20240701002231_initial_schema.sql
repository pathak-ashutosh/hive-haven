-- Set the search path
SET search_path TO hive, public, extensions;

-- Create the hive schema
CREATE SCHEMA IF NOT EXISTS hive;

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE "hive"."users" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    user_type TEXT CHECK (user_type IN ('student', 'landlord', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Properties table
CREATE TABLE "hive"."properties" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    landlord_id UUID REFERENCES "hive"."users"(id),
    name TEXT NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    country TEXT NOT NULL,
    property_type TEXT CHECK (property_type IN ('apartment', 'house', 'dorm', 'shared_room')),
    total_rooms INT,
    bathrooms INT,
    square_feet NUMERIC(8,2),
    price_per_month NUMERIC(10,2) NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Property Amenities table
CREATE TABLE "hive"."property_amenities" (
    property_id UUID REFERENCES "hive"."properties"(id),
    amenity TEXT NOT NULL,
    PRIMARY KEY (property_id, amenity)
);

-- Property Images table (for Cloudinary)
CREATE TABLE "hive"."property_images" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES "hive"."properties"(id),
    cloudinary_public_id TEXT NOT NULL,
    cloudinary_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE "hive"."bookings" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES "hive"."properties"(id),
    student_id UUID REFERENCES "hive"."users"(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE "hive"."reviews" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES "hive"."properties"(id),
    student_id UUID REFERENCES "hive"."users"(id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE "hive"."messages" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES "hive"."users"(id),
    recipient_id UUID REFERENCES "hive"."users"(id),
    property_id UUID REFERENCES "hive"."properties"(id),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favorites table
CREATE TABLE "hive"."favorites" (
    user_id UUID REFERENCES "hive"."users"(id),
    property_id UUID REFERENCES "hive"."properties"(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, property_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_properties_landlord ON "hive"."properties"(landlord_id);
CREATE INDEX idx_bookings_property ON "hive"."bookings"(property_id);
CREATE INDEX idx_bookings_student ON "hive"."bookings"(student_id);
CREATE INDEX idx_reviews_property ON "hive"."reviews"(property_id);
CREATE INDEX idx_messages_sender ON "hive"."messages"(sender_id);
CREATE INDEX idx_messages_recipient ON "hive"."messages"(recipient_id);
CREATE INDEX idx_property_images_property ON "hive"."property_images"(property_id);

-- Add triggers for updated_at columns
CREATE OR REPLACE FUNCTION "hive"."update_modified_column"()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_modtime
    BEFORE UPDATE ON "hive"."users"
    FOR EACH ROW EXECUTE FUNCTION "hive"."update_modified_column"();

CREATE TRIGGER update_property_modtime
    BEFORE UPDATE ON "hive"."properties"
    FOR EACH ROW EXECUTE FUNCTION "hive"."update_modified_column"();

CREATE TRIGGER update_booking_modtime
    BEFORE UPDATE ON "hive"."bookings"
    FOR EACH ROW EXECUTE FUNCTION "hive"."update_modified_column"();

CREATE TRIGGER update_review_modtime
    BEFORE UPDATE ON "hive"."reviews"
    FOR EACH ROW EXECUTE FUNCTION "hive"."update_modified_column"();