-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA hive TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA hive TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA hive TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA hive TO postgres, anon, authenticated, service_role;

-- Grant select permissions on all tables in the hive schema
GRANT SELECT ON ALL TABLES IN SCHEMA hive TO authenticated, anon, service_role;

-- Grant insert, update, delete permissions to authenticated and service_role
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA hive TO authenticated, service_role;

-- Users table policies
CREATE POLICY "Users can view their own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Properties table policies
CREATE POLICY "Anyone can view properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Landlords can insert properties" ON properties FOR INSERT WITH CHECK (auth.uid() = landlord_id);
CREATE POLICY "Landlords can update their own properties" ON properties FOR UPDATE USING (auth.uid() = landlord_id);

-- Property amenities policies
CREATE POLICY "Anyone can view property amenities" ON property_amenities FOR SELECT USING (true);
CREATE POLICY "Landlords can manage property amenities" ON property_amenities USING (auth.uid() = (SELECT landlord_id FROM properties WHERE id = property_id));

-- Property images policies
CREATE POLICY "Anyone can view property images" ON property_images FOR SELECT USING (true);
CREATE POLICY "Landlords can manage property images" ON property_images USING (auth.uid() = (SELECT landlord_id FROM properties WHERE id = property_id));

-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Landlords can view bookings for their properties" ON bookings FOR SELECT USING (auth.uid() = (SELECT landlord_id FROM properties WHERE id = property_id));
CREATE POLICY "Students can create bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Students can create reviews for properties they've booked" ON reviews FOR INSERT WITH CHECK (auth.uid() = student_id AND EXISTS (SELECT 1 FROM bookings WHERE property_id = reviews.property_id AND student_id = auth.uid()));

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Favorites policies
CREATE POLICY "Users can view their own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own favorites" ON favorites USING (auth.uid() = user_id);