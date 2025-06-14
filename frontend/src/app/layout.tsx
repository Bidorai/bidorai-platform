import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bidorai - Smart Event Catering',
  description: 'Revolutionary bidding system for professional event catering',
  keywords: 'catering, events, bidding, restaurants, food, party planning',
  authors: [{ name: 'Bidorai Team' }],
  openGraph: {
    title: 'Bidorai - Smart Event Catering',
    description: 'Revolutionary bidding system for professional event catering',
    url: 'https://bidorai.com',
    siteName: 'Bidorai',
    images: [
      {
        url: '/Logo.png',
        width: 1200,
        height: 630,
        alt: 'Bidorai Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bidorai - Smart Event Catering',
    description: 'Revolutionary bidding system for professional event catering',
    images: ['/Logo.png'],
  },
  manifest: '/manifest.json',
  themeColor: '#f97316',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/Logo.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={`${inter.className} antialiased`}>
          <div id="root">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  )
}