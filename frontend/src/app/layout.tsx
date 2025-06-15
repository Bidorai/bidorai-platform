// frontend/src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BIDORAI - Smart Food Bidding Platform',
  description: 'Bid on premium catering from top local restaurants. Save 10-25% on party trays with our innovative auction system.',
  keywords: 'food bidding, catering auction, restaurant deals, party trays, food delivery, Dallas catering, live auctions',
  authors: [{ name: 'BIDORAI Team' }],
  openGraph: {
    title: 'BIDORAI - Smart Food Bidding Platform',
    description: 'Bid on premium catering from top local restaurants. Save 10-25% on party trays.',
    url: 'https://bidorai.com',
    siteName: 'BIDORAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BIDORAI - Food Bidding Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIDORAI - Smart Food Bidding Platform',
    description: 'Bid on premium catering and save 10-25% on party trays',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  themeColor: '#1877F2',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://bidorai.com',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all duration-200',
          socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50 transition-colors',
          formFieldInput: 'border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-lg',
          card: 'shadow-xl border border-gray-200 rounded-2xl',
          headerTitle: 'text-2xl font-bold text-gray-900',
          headerSubtitle: 'text-gray-600',
          socialButtonsProviderIcon: 'filter-none',
          formButtonReset: 'text-blue-600 hover:text-blue-700',
          footerActionLink: 'text-blue-600 hover:text-blue-700 font-medium',
          userButtonAvatarBox: 'w-10 h-10 rounded-full shadow-md',
          userButtonPopoverCard: 'shadow-lg border border-gray-200 rounded-xl',
          userButtonPopoverActionButton: 'hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors',
          userButtonPopoverActionButtonIcon: 'text-gray-500',
          userButtonTrigger: 'hover:opacity-80 transition-opacity',
        },
        variables: {
          colorPrimary: '#1877F2',
          colorText: '#374151',
          colorTextSecondary: '#6B7280',
          colorBackground: '#FFFFFF',
          colorInputBackground: '#F9FAFB',
          colorInputText: '#374151',
          borderRadius: '0.75rem',
          spacingUnit: '1rem',
          fontSize: '1rem',
        }
      }}
    >
      <html lang="en" className="scroll-smooth">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <meta name="theme-color" content="#1877F2" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="BIDORAI" />
          <meta name="format-detection" content="telephone=no" />
        </head>
        <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
          <div id="root" className="min-h-screen">
            {children}
          </div>
          
          {/* Toast notifications */}
          <Toaster 
            position="top-right"
            expand={false}
            richColors
            toastOptions={{
              duration: 4000,
              style: {
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '0.75rem',
                fontFamily: inter.style.fontFamily,
                fontSize: '14px',
              },
              className: 'shadow-lg',
            }}
          />
          
          {/* Analytics Script */}
          {process.env.NODE_ENV === 'production' && (
            <>
              <script
                defer
                data-domain="bidorai.com"
                src="https://plausible.io/js/script.js"
              />
              
              {/* Google Analytics */}
              <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'GA_MEASUREMENT_ID');
                  `,
                }}
              />
            </>
          )}
          
          {/* Service Worker Registration */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js');
                  });
                }
              `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}