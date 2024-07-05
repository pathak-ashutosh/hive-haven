export type User = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  user_type?: "student" | "landlord" | "admin";
  created_at?: string;
  updated_at?: string;
};

export type PropertyImage = {
  id: string;
  property_id?: string;
  cloudinary_public_id: string;
  cloudinary_url: string;
  is_primary: boolean;
  created_at?: string;
};

export type Property = {
  id: string;
  landlord_id: string;
  name: string;
  description: string | null;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  property_type: "apartment" | "house" | "dorm" | "shared_room";
  total_rooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  price_per_month: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  users?: User | null;
  property_images?: PropertyImage[];
};