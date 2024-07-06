'use client'

import Link from 'next/link'
import { CldImage } from 'next-cloudinary'
import { Database } from '@/types/supabase'

type PropertyRow = Database['hive']['Tables']['properties']['Row']
type PropertyImagesRow = Database['hive']['Tables']['property_images']['Row']

type Property = PropertyRow & {
  property_images: Pick<PropertyImagesRow, 'id' | 'cloudinary_public_id' | 'is_primary'>[]
}

interface FeaturedPropertiesProps {
  properties: Property[]
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center"><span className='text-primary'>Featured</span> Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {properties.map((property) => {
            const primaryImage = property.property_images?.find(img => img.is_primary);
            return (
              <Link href={`/properties/${property.id}`} key={property.id} className="bg-card text-card-foreground rounded-lg overflow-hidden border shadow-md hover:shadow-lg">
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
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
                  <p className="text-muted-foreground mb-2">{property.city}, {property.state}</p>
                  <p className="text-lg font-bold max-sm:mb-4">${property.price_per_month}/month</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  )
}