import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: 'HiveHaven - Student Accommodation Made Easy',
    template: '%s | HiveHaven'
  },
  description: 'Find your perfect student accommodation in the US with ease.',
  keywords: ['student accommodation', 'US housing', 'international students'],
  authors: [{ name: 'Ashutosh Pathak' }],
  creator: 'Ashutosh Pathak',

  // Theme Color
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],

  // Open Graph Metadata
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.hive-haven.vercel.app/',
    siteName: 'HiveHaven',
    title: 'HiveHaven - Student Accommodation Made Easy',
    description: 'Find your perfect student accommodation in the US with ease.',
    images: [
      {
        url: '#',
        width: 1200,
        height: 630,
        alt: 'HiveHaven - Student Accommodation',
      },
    ],
  },

  // Twitter Card Metadata
  twitter: {
    card: 'summary_large_image',
    title: 'HiveHaven - Student Accommodation Made Easy',
    description: 'Find your perfect student accommodation in the US with ease.',
    images: ['#'],
    creator: '@4shutoshpathak'
  },

  // Viewport Settings
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}