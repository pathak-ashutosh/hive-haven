'use client'

import Link from 'next/link'
import { CldImage } from 'next-cloudinary'
import { Database } from '@/types/supabase'
import { hiveClient } from '@/lib/supabase-client'
import { useEffect, useState } from 'react'

type PropertyImagesRow = Database['hive']['Tables']['property_images']['Row']
type PropertyRow = Database['hive']['Tables']['properties']['Row']

type Property = PropertyRow & {
  property_images: Pick<PropertyImagesRow, 'id' | 'cloudinary_public_id' | 'is_primary'>[]
}

export default function PropertiesList() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      const supabase = hiveClient
      
      try {
        const { data, error } = await supabase
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

        if (error) throw error
        setProperties(data as Property[])
      } catch (err) {
        setError('Error fetching properties')
        console.error('Error fetching properties:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  if (loading) return <div>Loading properties...</div>
  if (error) return <div>{error}</div>

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