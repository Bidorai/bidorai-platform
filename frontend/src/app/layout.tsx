// src/app/layout.tsx - Remove ServiceWorker cleanup script
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BIDORAI - Smart Food Bidding Platform',
  description: 'Bid on premium catering from top local restaurants. Save 10-25% on party trays with our innovative auction system.',
  // ... rest of your metadata
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
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Toaster position="top-right" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}