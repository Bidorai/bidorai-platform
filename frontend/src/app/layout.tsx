// frontend/src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import { LocationProvider } from '@/contexts/LocationContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BIDORAI - Smart Food Bidding Platform',
  description: 'Bid on premium catering from top local restaurants. Save 10-25% on party trays with our innovative auction system.',
  keywords: [
    'food bidding',
    'catering',
    'restaurant deals',
    'party catering',
    'Dallas food',
    'group orders',
    'food auction'
  ],
  authors: [{ name: 'Bidorai Team' }],
  creator: 'Bidorai',
  publisher: 'Bidorai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bidorai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BIDORAI - Smart Food Bidding Platform',
    description: 'Bid on premium catering from top local restaurants. Save 10-25% on party trays with our innovative auction system.',
    url: 'https://bidorai.com',
    siteName: 'Bidorai',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bidorai - Smart Food Bidding Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIDORAI - Smart Food Bidding Platform',
    description: 'Bid on premium catering from top local restaurants. Save 10-25% on party trays.',
    images: ['/twitter-image.jpg'],
    creator: '@bidorai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all duration-200',
          socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50 transition-colors',
          formFieldInput: 'border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-lg',
          card: 'shadow-xl border border-gray-200 rounded-2xl',
          headerTitle: 'text-2xl font-bold text-gray-900',
          headerSubtitle: 'text-gray-600',
          footerActionLink: 'text-blue-600 hover:text-blue-700',
        },
        variables: {
          colorPrimary: '#1D8FE3',
          colorTextOnPrimaryBackground: '#ffffff',
          colorBackground: '#ffffff',
          colorInputBackground: '#ffffff',
          colorInputText: '#1f2937',
          colorText: '#1f2937',
          colorTextSecondary: '#6b7280',
          borderRadius: '0.5rem',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Preconnect to Google Maps */}
          <link rel="preconnect" href="https://maps.googleapis.com" />
          <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="" />
          
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          
          {/* Theme color for mobile browsers */}
          <meta name="theme-color" content="#1D8FE3" />
          <meta name="msapplication-TileColor" content="#1D8FE3" />
          
          {/* Viewport settings for better mobile experience */}
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        </head>
        <body className={inter.className} suppressHydrationWarning></body>
        <body className={`${inter.className} antialiased`}>
          {/* Location Context Provider - provides location state to all components */}
          <LocationProvider>
            {/* Toast notifications */}
            <Toaster 
              position="top-right" 
              expand={true}
              richColors={true}
              closeButton={true}
              duration={4000}
              toastOptions={{
                style: {
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '14px',
                },
                className: 'font-medium',
              }}
            />
            
            {/* Main application content */}
            <div id="root">
              {children}
            </div>
            
            {/* Skip to main content for accessibility */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
            >
              Skip to main content
            </a>
          </LocationProvider>
          
          {/* Development tools - only in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed bottom-4 left-4 z-50">
              <div className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                DEV MODE
              </div>
            </div>
          )}
        </body>
      </html>
    </ClerkProvider>
  )
}