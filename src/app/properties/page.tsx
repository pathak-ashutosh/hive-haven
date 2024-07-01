import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient()
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
  const pageSize = 9
  
  let query = supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .range((page - 1) * pageSize, page * pageSize - 1)

  if (searchParams.city) {
    query = query.ilike('city', `%${searchParams.city}%`)
  }

  const { data: properties, count } = await query

  const totalPages = count ? Math.ceil(count / pageSize) : 0

  return (
    <div className="bg-background text-foreground">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Available Properties</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties?.map((property) => (
              <div key={property.id} className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md">
                <img src={`https://source.unsplash.com/800x600/?apartment&${property.id}`} alt={property.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
                  <p className="text-muted-foreground mb-2">{property.city}, {property.state}</p>
                  <p className="text-lg font-bold mb-4">${property.price_per_month}/month</p>
                  <Link href={`/properties/${property.id}`} className="text-primary hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center space-x-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`/properties?page=${pageNum}${searchParams.city ? `&city=${searchParams.city}` : ''}`}
                  className={`px-4 py-2 rounded ${pageNum === page ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                >
                  {pageNum}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}