import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SearchBar } from '../components/SearchBar'

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
              <SearchBar />
            </div>
            {/* Right: Phone, Links, Cart, Auth */}
            <div className="flex items-center space-x-6">
              <span className="text-red-600 font-semibold whitespace-nowrap">1-800-BIDORAI</span>
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
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <img src="/logo.png" alt="Bidorai" className="w-8 h-8" />
                <span className="font-bold text-2xl">Bidorai</span>
              </div>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Connecting communities with premium fresh food through innovative bidding technology and restaurant partnerships.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-4 text-yellow-400">⭐ BIDORAI</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Press</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-gray-400">👤 For Customers</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">How It Works</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                  <li><a href="#" className="hover:text-white">Support</a></li>
                  <li><a href="#" className="hover:text-white">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-gray-400">🍴 For Restaurants</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Become a Partner</a></li>
                  <li><a href="#" className="hover:text-white">Restaurant Portal</a></li>
                  <li><a href="#" className="hover:text-white">Resources</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-gray-400">⚖️ Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                </ul>
                <p className="mt-4 text-orange-400 font-semibold">📞 1-800-BIDORAI</p>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex gap-6 mb-4 md:mb-0 text-sm">
                  <span className="flex items-center gap-2">🚀 Same-Day Pickup</span>
                  <span className="flex items-center gap-2">🏆 Premium Quality</span>
                  <span className="flex items-center gap-2">❤️ Local Partners</span>
                </div>
                <p className="text-gray-400 text-sm">
                  © 2025 BIDORAI. Making party catering affordable and accessible.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
