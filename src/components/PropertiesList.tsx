'use client'

import Link from 'next/link'
import { CldImage } from 'next-cloudinary'
import { Database } from '@/types/supabase'

type PropertyImagesRow = Database['hive']['Tables']['property_images']['Row']
type PropertyRow = Database['hive']['Tables']['properties']['Row']

type Property = PropertyRow & {
  property_images: Pick<PropertyImagesRow, 'id' | 'cloudinary_public_id' | 'cloudinary_url' | 'is_primary'>[]
}

interface PropertiesListProps {
  properties: Property[]
}

export default function PropertiesList({ properties }: PropertiesListProps) {
  return (
    <div className="bg-background text-foreground">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Available Properties</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => {
              const primaryImage = property.property_images?.find(img => img.is_primary);
              return (
                <div key={property.id} className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md">
                  {primaryImage ? (
                    <CldImage
                      width="400"
                      height="300"
                      src={primaryImage.cloudinary_public_id}
                      alt={property.name}
                      crop="fill"
                      gravity="auto"
                      loading="lazy"
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
                    <p className="text-muted-foreground mb-2">{property.city}, {property.state}</p>
                    <p className="text-lg font-bold mb-4">${property.price_per_month}/month</p>
                    <Link href={`/properties/${property.id}`} className="text-primary hover:underline">
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  )
}