-- Enable RLS on all tables
ALTER TABLE hive.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hive.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE hive.property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE hive.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE hive.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hive.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE hive.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE hive.favorites ENABLE ROW LEVEL SECURITY;

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
CREATE POLICY "Users can view their own profile" ON hive.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON hive.users FOR UPDATE USING (auth.uid() = id);

-- Properties table policies
CREATE POLICY "Anyone can view properties" ON hive.properties FOR SELECT USING (true);
CREATE POLICY "Landlords can insert properties" ON hive.properties FOR INSERT WITH CHECK (auth.uid() = landlord_id);
CREATE POLICY "Landlords can update their own properties" ON hive.properties FOR UPDATE USING (auth.uid() = landlord_id);

-- Property amenities policies
CREATE POLICY "Anyone can view property amenities" ON hive.property_amenities FOR SELECT USING (true);
CREATE POLICY "Landlords can manage property amenities" ON hive.property_amenities USING (auth.uid() = (SELECT landlord_id FROM hive.properties WHERE id = property_id));

-- Property images policies
CREATE POLICY "Anyone can view property images" ON hive.property_images FOR SELECT USING (true);
CREATE POLICY "Landlords can manage property images" ON hive.property_images USING (auth.uid() = (SELECT landlord_id FROM hive.properties WHERE id = property_id));

-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON hive.bookings FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Landlords can view bookings for their properties" ON hive.bookings FOR SELECT USING (auth.uid() = (SELECT landlord_id FROM hive.properties WHERE id = property_id));
CREATE POLICY "Students can create bookings" ON hive.bookings FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON hive.reviews FOR SELECT USING (true);
CREATE POLICY "Students can create reviews for properties they've booked" ON hive.reviews FOR INSERT WITH CHECK (auth.uid() = student_id AND EXISTS (SELECT 1 FROM hive.bookings WHERE property_id = reviews.property_id AND student_id = auth.uid()));

-- Messages policies
CREATE POLICY "Users can view their own messages" ON hive.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can send messages" ON hive.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Favorites policies
CREATE POLICY "Users can view their own favorites" ON hive.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own favorites" ON hive.favorites USING (auth.uid() = user_id);