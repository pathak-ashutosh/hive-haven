-- Set the search path for this session
SET search_path TO hive, public, extensions;

-- Clear existing data
TRUNCATE users, properties, property_amenities, property_images, bookings, reviews, messages, favorites CASCADE;

-- Seed Users
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, user_type) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'john@example.com', 'hashed_password', 'John', 'Doe', '1234567890', 'student'),
('f47ac10b-58cc-4372-a567-0e02b2c3d480', 'jane@example.com', 'hashed_password', 'Jane', 'Smith', '0987654321', 'student'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'landlord@example.com', 'hashed_password', 'Bob', 'Johnson', '1122334455', 'landlord'),
('f47ac10b-58cc-4372-a567-0e02b2c3d482', 'admin@hivehaven.com', 'hashed_password', 'Admin', 'User', '9876543210', 'admin');

-- Seed Properties
INSERT INTO properties (id, landlord_id, name, description, address, city, state, zip_code, country, property_type, total_rooms, bathrooms, square_feet, price_per_month, is_available) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d483', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Cozy Studio Near Campus', 'Perfect for students, close to amenities', '123 University Ave', 'College Town', 'CA', '12345', 'USA', 'apartment', 1, 1, 500, 800, true),
('f47ac10b-58cc-4372-a567-0e02b2c3d484', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Spacious 2BR Apartment', 'Great for sharing, newly renovated', '456 College St', 'College Town', 'CA', '12345', 'USA', 'apartment', 2, 2, 900, 1200, true),
('f47ac10b-58cc-4372-a567-0e02b2c3d485', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Student House', 'Large house perfect for group living', '789 Frat Row', 'College Town', 'CA', '12345', 'USA', 'house', 5, 3, 2000, 2500, true);

-- Seed Property Amenities
INSERT INTO property_amenities (property_id, amenity) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d483', 'Wi-Fi'),
('f47ac10b-58cc-4372-a567-0e02b2c3d483', 'Air Conditioning'),
('f47ac10b-58cc-4372-a567-0e02b2c3d484', 'Wi-Fi'),
('f47ac10b-58cc-4372-a567-0e02b2c3d484', 'Parking'),
('f47ac10b-58cc-4372-a567-0e02b2c3d484', 'Gym'),
('f47ac10b-58cc-4372-a567-0e02b2c3d485', 'Wi-Fi'),
('f47ac10b-58cc-4372-a567-0e02b2c3d485', 'Parking'),
('f47ac10b-58cc-4372-a567-0e02b2c3d485', 'Backyard');

-- Seed Property Images
INSERT INTO property_images (id, property_id, cloudinary_public_id, cloudinary_url, is_primary) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d486', 'f47ac10b-58cc-4372-a567-0e02b2c3d483', 'hivehaven/property_main_1', 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg', true),
('f47ac10b-58cc-4372-a567-0e02b2c3d487', 'f47ac10b-58cc-4372-a567-0e02b2c3d484', 'hivehaven/property_main_2', 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg', true),
('f47ac10b-58cc-4372-a567-0e02b2c3d488', 'f47ac10b-58cc-4372-a567-0e02b2c3d485', 'hivehaven/property_main_3', 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg', true);

-- Seed Bookings
INSERT INTO bookings (id, property_id, student_id, start_date, end_date, total_price, status) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d489', 'f47ac10b-58cc-4372-a567-0e02b2c3d483', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', DATE '2023-09-01', DATE '2024-05-31', 7200, 'confirmed'),
('f47ac10b-58cc-4372-a567-0e02b2c3d48a', 'f47ac10b-58cc-4372-a567-0e02b2c3d484', 'f47ac10b-58cc-4372-a567-0e02b2c3d480', DATE '2023-09-01', DATE '2024-05-31', 10800, 'confirmed'),
('f47ac10b-58cc-4372-a567-0e02b2c3d48b', 'f47ac10b-58cc-4372-a567-0e02b2c3d485', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', DATE '2024-09-01', DATE '2025-05-31', 22500, 'pending');

-- Seed Reviews
INSERT INTO reviews (id, property_id, student_id, rating, comment) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d48c', 'f47ac10b-58cc-4372-a567-0e02b2c3d483', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 4, 'Great location, but a bit small'),
('f47ac10b-58cc-4372-a567-0e02b2c3d48d', 'f47ac10b-58cc-4372-a567-0e02b2c3d484', 'f47ac10b-58cc-4372-a567-0e02b2c3d480', 5, 'Excellent apartment, highly recommended!');

-- Seed Messages
INSERT INTO messages (id, sender_id, recipient_id, property_id, content, is_read) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d48e', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 'f47ac10b-58cc-4372-a567-0e02b2c3d483', 'Is this apartment still available?', false),
('f47ac10b-58cc-4372-a567-0e02b2c3d48f', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d483', 'Yes, it is! Would you like to schedule a viewing?', false),
('f47ac10b-58cc-4372-a567-0e02b2c3d490', 'f47ac10b-58cc-4372-a567-0e02b2c3d480', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 'f47ac10b-58cc-4372-a567-0e02b2c3d484', 'Can I bring my cat to this apartment?', false);

-- Seed Favorites
INSERT INTO favorites (user_id, property_id) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d484'),
('f47ac10b-58cc-4372-a567-0e02b2c3d480', 'f47ac10b-58cc-4372-a567-0e02b2c3d483'),
('f47ac10b-58cc-4372-a567-0e02b2c3d480', 'f47ac10b-58cc-4372-a567-0e02b2c3d485');