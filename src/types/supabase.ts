// REGENERATE THIS FILE WHENEVER YOU MAKE CHANGES TO YOUR DATABASE SCHEMA
// supabase gen types typescript --local > src/types/supabase.ts

// src/types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  hive: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          user_type: 'student' | 'landlord' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          user_type: 'student' | 'landlord' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          user_type?: 'student' | 'landlord' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          landlord_id: string
          name: string
          description: string | null
          address: string
          city: string
          state: string
          zip_code: string
          country: string
          property_type: 'apartment' | 'house' | 'dorm' | 'shared_room'
          total_rooms: number | null
          bathrooms: number | null
          square_feet: number | null
          price_per_month: number
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          landlord_id: string
          name: string
          description?: string | null
          address: string
          city: string
          state: string
          zip_code: string
          country: string
          property_type: 'apartment' | 'house' | 'dorm' | 'shared_room'
          total_rooms?: number | null
          bathrooms?: number | null
          square_feet?: number | null
          price_per_month: number
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          landlord_id?: string
          name?: string
          description?: string | null
          address?: string
          city?: string
          state?: string
          zip_code?: string
          country?: string
          property_type?: 'apartment' | 'house' | 'dorm' | 'shared_room'
          total_rooms?: number | null
          bathrooms?: number | null
          square_feet?: number | null
          price_per_month?: number
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      property_amenities: {
        Row: {
          property_id: string
          amenity: string
        }
        Insert: {
          property_id: string
          amenity: string
        }
        Update: {
          property_id?: string
          amenity?: string
        }
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          cloudinary_public_id: string
          cloudinary_url: string
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          cloudinary_public_id: string
          cloudinary_url: string
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          cloudinary_public_id?: string
          cloudinary_url?: string
          is_primary?: boolean
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          property_id: string
          student_id: string
          start_date: string
          end_date: string
          total_price: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          student_id: string
          start_date: string
          end_date: string
          total_price: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          student_id?: string
          start_date?: string
          end_date?: string
          total_price?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          property_id: string
          student_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          student_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          student_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          recipient_id: string
          property_id: string
          content: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          recipient_id: string
          property_id: string
          content: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          recipient_id?: string
          property_id?: string
          content?: string
          is_read?: boolean
          created_at?: string
        }
      }
      favorites: {
        Row: {
          user_id: string
          property_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          property_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          property_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}