'use client'

import { CldImage } from 'next-cloudinary'
import { Database } from '@/types/supabase'

type PropertyImagesRow = Database['hive']['Tables']['property_images']['Row']
type UserRow = Database['hive']['Tables']['users']['Row']
type PropertyRow = Database['hive']['Tables']['properties']['Row']

type Property = PropertyRow & {
  property_images: Pick<PropertyImagesRow, 'id' | 'cloudinary_public_id' | 'is_primary'>[]
  users: Pick<UserRow, 'id' | 'first_name' | 'last_name' | 'email' | 'phone'> | null
}

interface PropertyDetailsProps {
  property: Property
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const primaryImage = property.property_images?.find(img => img.is_primary);
  const otherImages = property.property_images?.filter(img => !img.is_primary);

  const landlordInfo = {
    name: `${property.users?.first_name || ''} ${property.users?.last_name || ''}`.trim(),
    email: property.users?.email,
    phone: property.users?.phone
  };

  return (
    <div className="bg-background text-foreground">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">{property.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="relative w-full">
                {primaryImage ? (
                  <CldImage
                    width="800"
                    height="600"
                    src={primaryImage.cloudinary_public_id}
                    alt={property.name}
                    crop="fill"
                    gravity="auto"
                    loading="lazy"
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
              </div>
              {otherImages && otherImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mb-8">
                  {otherImages.map((image) => (
                    <CldImage
                      key={image.id}
                      width="200"
                      height="150"
                      src={image.cloudinary_public_id}
                      alt={`Additional view of ${property.name}`}
                      crop="fill"
                      gravity="auto"
                      loading="lazy"
                      className="rounded-lg"
                    />
                  ))}
                </div>
              )}
              <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
              <p className="mb-2"><strong>Location:</strong> {property.address}, {property.city}, {property.state} {property.zip_code}</p>
              <p className="mb-2"><strong>Price:</strong> ${property.price_per_month}/month</p>
              <p className="mb-4">{property.description}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Landlord Information</h2>
              <p className="mb-2"><strong>Name:</strong> {landlordInfo.name}</p>
              <p className="mb-2"><strong>Email:</strong> {landlordInfo.email}</p>
              <p className="mb-4"><strong>Phone:</strong> {landlordInfo.phone}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}