import Link from 'next/link'
import { Database } from '@/types/supabase'
import Image from 'next/image'

type Property = Database['hive']['Tables']['properties']['Row']

interface FeaturedPropertiesProps {
  properties: Property[]
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md">
              <Image src={`https://source.unsplash.com/800x600/?apartment&${property.id}`} width={192} height={192} alt={property.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
                <p className="text-muted-foreground mb-2">{property.city}, {property.state}</p>
                <p className="text-lg font-bold mb-4">${property.price_per_month}/month</p>
                <Link href={`/properties/${property.id}`} className="text-primary hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}