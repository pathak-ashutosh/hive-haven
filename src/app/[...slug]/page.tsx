import { notFound } from 'next/navigation'

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
