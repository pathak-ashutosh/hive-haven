import { hiveClient } from '@/lib/supabase-client'
import Hero from '@/components/home/Hero'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import HowItWorks from '@/components/home/HowItWorks'
import Testimonials from '@/components/home/Testimonials'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import CallToAction from '@/components/home/CallToAction'

export default async function Home() {
  const supabase = hiveClient
  
  const { data: properties, error: propertiesError } = await supabase
    .from('properties')
    .select(`
      *,
      property_images (
        id,
        cloudinary_public_id,
        is_primary
      )
    `)
    .limit(3)

  if (propertiesError) {
    console.error('Error fetching featured properties:', propertiesError)
    return <div>Error loading featured properties</div>
  }

  console.log('Featured properties:', properties)

  const { data: testimonials, error: testimonialsError } = await supabase
    .from('reviews')
    .select(`
      *,
      properties (
        id,
        name
      ),
      users!reviews_student_id_fkey (
        id,
        first_name,
        last_name
      )
    `)
    .limit(3)

  if (testimonialsError) {
    console.error('Error fetching testimonials:', testimonialsError)
    return <div>Error loading testimonials</div>
  }

  console.log('Testimonials:', testimonials)

  return (
    <main className="bg-background">
      <Hero />
      <FeaturedProperties properties={properties} />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials || []} />
      <CallToAction />
    </main>
  )
}