import CallToAction from '@/components/home/CallToAction'
import Hero from '@/components/home/Hero'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import HowItWorks from '@/components/home/HowItWorks'
import Testimonials from '@/components/home/Testimonials'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import { createClient } from '@/lib/supabase-server'

export default async function Home() {
  const supabase = createClient()
  
  const { data: properties } = await supabase
    .from('properties')
    .select('*')
    .limit(3)

  const { data: testimonials } = await supabase
    .from('reviews')
    .select(`
      *,
      users (
        first_name,
        last_name
      ),
      properties (
        name
      )
    `)
    .limit(3)

  return (
    <main className="bg-background text-foreground">
      <Hero />
      <FeaturedProperties properties={properties || []} />
      <Testimonials testimonials={testimonials || []} />
      <HowItWorks />
      <WhyChooseUs />
      <CallToAction />
    </main>
  )
}