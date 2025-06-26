import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bidorai - Customer Portal',
  description: 'Order party trays from the best restaurants with competitive bidding',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
            {/* Left: Logo */}
            <a href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Bidorai Logo" className="w-9 h-9" />
              <span className="font-bold text-2xl text-blue-700">Bidorai</span>
            </a>
            {/* Center: Search Bar */}
            <div className="flex-1 flex justify-center">
              <input
                className="w-[350px] px-4 py-2 rounded bg-gray-100 border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search restaurants, cuisines…"
                disabled
              />
            </div>
            {/* Right: Phone, Links, Cart, Auth */}
            <div className="flex items-center space-x-6">
              <span className="text-blue-700 font-semibold whitespace-nowrap">1-800-BIDORAI</span>
              <a href="#" className="text-gray-600 hover:text-blue-700 whitespace-nowrap">For Restaurants</a>
              <div className="relative">
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5">2</span>
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-2.3L17 13M7 13V6h13" /></svg>
              </div>
              <a href="#" className="text-blue-700 font-semibold whitespace-nowrap">Sign In</a>
              <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 whitespace-nowrap">Sign Up</a>
            </div>
          </div>
        </header>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
