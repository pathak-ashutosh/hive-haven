import { Button } from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">About HiveHaven</h1>
          <div className="max-w-3xl mx-auto">
            <p className="mb-6 text-lg">
              HiveHaven was founded with a simple mission: to make finding student accommodation easy, safe, and affordable for international students in the US.
            </p>
            <p className="mb-6 text-lg">
              Our team of ex-international students understands the challenges of finding a home away from home. That&apos;s why we&apos;ve created a platform that connects students with verified, quality housing options near their universities.
            </p>
            <p className="mb-8 text-lg">
              We believe that a comfortable living space is crucial for academic success and personal growth. With HiveHaven, students can focus on their studies and experiences, knowing they have a secure and welcoming place to call home.
            </p>
            <div className="text-center">
              <Button useNextLink href="/properties">Find Your New Home</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}