import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">This page is under construction</h1>
      <p className="text-xl mb-8">Oops! The page you&apos;re looking for needs work.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back to homepage
      </Link>
    </div>
  )
}