import { notFound } from 'next/navigation'
import Link from 'next/link'

export default function CatchAllPage({ params }: { params: { slug: string[] } }) {
  // You can access the slug parts via params.slug array
  console.log('Slug parts:', params.slug)

  // Example: Check if it's a known route that might have been moved
  if (params.slug.join('/') === 'old-page') {
    // Redirect to the new page
    // Note: In a real app, you'd use a more robust method to handle redirects
    return (
      <div>
        <p>This page has moved. Redirecting...</p>
        <meta httpEquiv="refresh" content="0;url=/new-page" />
      </div>
    )
  }

  // If it's not a known route, render a 404-like page
  return notFound()
}

// Optional: Custom 404 component
export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back to homepage
      </Link>
    </div>
  )
}