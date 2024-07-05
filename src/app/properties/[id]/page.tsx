import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import PropertyDetails from '@/components/PropertyDetails'

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  
  console.log('Fetching property with ID:', params.id)

  const { data: property, error } = await supabase
    .from('properties')
    .select(`
      *,
      property_images (
        id,
        cloudinary_public_id,
        is_primary
      ),
      users!properties_landlord_id_fkey (
        id,
        first_name,
        last_name,
        email,
        phone
      )
    `)
    .eq('id', params.id)
    .single()

  if (error) {
    console.error('Error fetching property:', error)
    notFound()
  }

  if (!property) {
    console.error('No property found with ID:', params.id)
    notFound()
  }

  console.log('Fetched property:', JSON.stringify(property, null, 2))


  return <PropertyDetails property={property} />
}