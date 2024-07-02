import { createClient } from '@/lib/supabase-server'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type User = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
};

type Property = {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price_per_month: number;
  users?: User | null;
};

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

  // Extract landlord information, providing defaults if it's null or a string
  const typedProperty = property as Property;

  const landlordInfo = {
    name: typedProperty.users ? `${typedProperty.users.first_name || ''} ${typedProperty.users.last_name || ''}`.trim() || 'Unknown' : 'Unknown',
    email: typedProperty.users?.email || 'Not available',
    phone: typedProperty.users?.phone || 'Not available'
  };

  return (
    <div className="bg-background text-foreground">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">{typedProperty.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
            <Image
              src={`https://source.unsplash.com/800x600/?apartment&${typedProperty.id}`}
              alt={typedProperty.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
              <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
              <p className="mb-2"><strong>Location:</strong> {typedProperty.address}, {typedProperty.city}, {typedProperty.state} {typedProperty.zip_code}</p>
              <p className="mb-2"><strong>Price:</strong> ${typedProperty.price_per_month}/month</p>
              <p className="mb-4">{typedProperty.description}</p>
              <h3 className="text-xl font-semibold mb-2">Amenities</h3>
              <ul className="list-disc list-inside mb-4">
                {amenities?.map((amenity) => (
                  <li key={amenity.amenity}>{amenity.amenity}</li>
                ))}
              </ul>
            </div>
            <div>
            <h2 className="text-2xl font-semibold mb-4">Landlord Information</h2>
            <p className="mb-2"><strong>Name:</strong> {landlordInfo.name}</p>
            <p className="mb-2"><strong>Email:</strong> {landlordInfo.email}</p>
            <p className="mb-4"><strong>Phone:</strong> {landlordInfo.phone}</p>
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            {reviews?.map((review) => (
              <div key={review.id} className="mb-4">
                <p className="font-semibold">
                  {review.users && review.users.length > 0
                    ? `${review.users[0].first_name || 'Anonymous'} ${review.users[0].last_name || ''}`
                    : 'Anonymous'}
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