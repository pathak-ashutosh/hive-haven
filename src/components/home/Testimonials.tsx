import { Database } from '@/types/supabase'

type ReviewRow = Database['hive']['Tables']['reviews']['Row']
type UserRow = Database['hive']['Tables']['users']['Row']
type PropertyRow = Database['hive']['Tables']['properties']['Row']

type Testimonial = ReviewRow & {
  users: Pick<UserRow, 'first_name' | 'last_name'> | null
  properties: Pick<PropertyRow, 'name'> | null
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-background p-6 rounded-lg shadow-md">
              <p className="text-lg mb-4">&quot;{testimonial.comment}&quot;</p>
              <p className="font-semibold">
                {testimonial.users?.first_name} {testimonial.users?.last_name}
              </p>
              <p className="text-sm text-muted-foreground">
                {testimonial.properties?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Rating: {testimonial.rating}/5
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}