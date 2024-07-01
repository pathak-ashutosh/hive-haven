import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  
  console.log('Fetching property with ID:', params.id)

  const { data: property, error } = await supabase
    .from('properties')
    .select(`
      *,
      landlord:users!properties_landlord_id_fkey (
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

  const { data: amenities } = await supabase
    .from('property_amenities')
    .select('amenity')
    .eq('property_id', params.id)

  console.log('Fetched amenities:', JSON.stringify(amenities, null, 2))

  const { data: reviews } = await supabase
    .from('reviews')
    .select(`
      *,
      users:users!reviews_student_id_fkey (
        first_name,
        last_name
      )
    `)
    .eq('property_id', params.id)

  console.log('Fetched reviews:', JSON.stringify(reviews, null, 2))

  // Extract landlord information, providing defaults if it's null
  const landlord = property.landlord_id || {
    first_name: 'Unknown',
    last_name: 'Landlord',
    email: 'Not available',
    phone: 'Not available'
  }

  return (
    <div className="bg-background text-foreground">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">{property.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img src={`https://source.unsplash.com/800x600/?apartment&${property.id}`} alt={property.name} className="w-full h-96 object-cover rounded-lg mb-8" />
              <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
              <p className="mb-2"><strong>Location:</strong> {property.address}, {property.city}, {property.state} {property.zip_code}</p>
              <p className="mb-2"><strong>Price:</strong> ${property.price_per_month}/month</p>
              <p className="mb-4">{property.description}</p>
              <h3 className="text-xl font-semibold mb-2">Amenities</h3>
              <ul className="list-disc list-inside mb-4">
                {amenities?.map((amenity) => (
                  <li key={amenity.amenity}>{amenity.amenity}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Landlord Information</h2>
              <p className="mb-2"><strong>Name:</strong> {landlord.first_name} {landlord.last_name}</p>
              <p className="mb-2"><strong>Email:</strong> {landlord.email}</p>
              <p className="mb-4"><strong>Phone:</strong> {landlord.phone}</p>
              <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
              {reviews?.map((review) => (
                <div key={review.id} className="mb-4">
                  <p className="font-semibold">
                    {review.users?.first_name || 'Anonymous'} {review.users?.last_name || ''}
                  </p>
                  <p className="text-muted-foreground">Rating: {review.rating}/5</p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}