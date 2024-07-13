'use client'

import { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary'
import { Database } from '@/types/supabase'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

interface RentalData {
  date: string;
  price: number;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const [rentalData, setRentalData] = useState<RentalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const primaryImage = property.property_images?.find(img => img.is_primary);
  const otherImages = property.property_images?.filter(img => !img.is_primary);

  const landlordInfo = {
    name: `${property.users?.first_name || ''} ${property.users?.last_name || ''}`.trim(),
    email: property.users?.email,
    phone: property.users?.phone
  };

  useEffect(() => {
    async function fetchRentalData() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/rental-data?city=${encodeURIComponent(property.city)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch rental data');
        }
        const data = await response.json();
        setRentalData(data);
      } catch (error) {
        console.error('Error fetching rental data:', error);
        setError('Failed to load rental data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchRentalData();
  }, [property.city]);

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
              <div className='flex flex-col justify-center items-center my-10'>
                <h2 className="text-2xl font-semibold mb-4">Rental <span className='text-primary'>Trends</span> in {property.city}</h2>
                {isLoading ? (
                  <p>Loading rental data...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={rentalData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { year: '2-digit', month: 'short' })}
                        />
                        <YAxis />
                        <Tooltip 
                          labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                          formatter={(value: number | string) => {
                            const numValue = typeof value === 'string' ? parseFloat(value) : value;
                            return [`$${numValue.toFixed(2)}`, "Rent"];
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke="hsl(var(--primary))"
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
                <p className="mt-4 text-sm text-gray-600">
                  This chart shows the average rental prices in {property.city} from 2020 to present.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}