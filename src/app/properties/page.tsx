// src/app/properties/page.tsx
import { createClient } from '@/lib/supabase-server'
import PropertiesList from '@/components/PropertiesList'
import { Property } from '@/types/property'

export default async function PropertiesPage() {
  const supabase = createClient()

  const { data: properties, error } = await supabase
    .from('properties')
    .select(`
      *,
      property_images (
        id,
        cloudinary_public_id,
        cloudinary_url,
        is_primary
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching properties:', error)
    // Handle error appropriately
    return <div>Error loading properties</div>
  }

  return <PropertiesList properties={properties} />
}