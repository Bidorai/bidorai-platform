import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SearchBar } from '../components/SearchBar'
import { GoogleMapsProvider } from '../providers/GoogleMapsProvider'
import { ClerkProvider } from '@clerk/nextjs'
import ConditionalHeader from '../components/ConditionalHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
      title: 'Bidovio - Customer Portal',
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
        <ClerkProvider>
          <GoogleMapsProvider>
            <ConditionalHeader />
            <div className="min-h-screen bg-gray-50">
              {children}
            </div>
            <footer className="bg-gray-900 text-white pt-16 pb-16">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <img src="/logo.png" alt="Bidorai" className="w-8 h-8" />
                    <span className="font-bold text-2xl">Bidovio</span>
                  </div>
                  <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                    Connecting communities with premium fresh food through innovative bidding technology and restaurant partnerships.
                  </p>
                  <hr className="border-t-2 border-white opacity-30 mb-8" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                  <div>
                    <h3 className="font-semibold mb-4 text-yellow-400">⭐ BIDOVIO</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="/about" target="_blank" rel="noopener noreferrer" className="hover:text-white">About Us</a></li>
                      <li><a href="/careers" target="_blank" rel="noopener noreferrer" className="hover:text-white">Careers</a></li>
                      <li><a href="/contact" target="_blank" rel="noopener noreferrer" className="hover:text-white">Contact</a></li>
                      <li><a href="/help" target="_blank" rel="noopener noreferrer" className="hover:text-white">Help Center</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 text-gray-400">👤 For Customers</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="/help" target="_blank" rel="noopener noreferrer" className="hover:text-white">How It Works</a></li>
                      <li><a href="/faq" target="_blank" rel="noopener noreferrer" className="hover:text-white">FAQ</a></li>
                      <li><a href="/contact" target="_blank" rel="noopener noreferrer" className="hover:text-white">Support</a></li>
                      <li><a href="/help" target="_blank" rel="noopener noreferrer" className="hover:text-white">Tutorials</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 text-gray-400">🍴 For Restaurants</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="/restaurant" target="_blank" rel="noopener noreferrer" className="hover:text-white">Become a Partner</a></li>
                      <li><a href="/restaurant" target="_blank" rel="noopener noreferrer" className="hover:text-white">Restaurant Portal</a></li>
                      <li><a href="/careers" target="_blank" rel="noopener noreferrer" className="hover:text-white">Join Our Team</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 text-gray-400">⚖️ Legal</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white">Terms of Service</a></li>
                      <li><a href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white">Privacy Policy</a></li>
                      <li><a href="/faq" target="_blank" rel="noopener noreferrer" className="hover:text-white">Cookie Policy</a></li>
                    </ul>
                    <p className="mt-4 text-orange-400 font-semibold">📞 1-800-BIDOVIO</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-8 mt-12">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex gap-6 mb-4 md:mb-0 text-sm">
                      <span className="flex items-center gap-2">🚀 Same-Day Pickup</span>
                      <span className="flex items-center gap-2">🏆 Premium Quality</span>
                      <span className="flex items-center gap-2">❤️ Local Partners</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      © 2025 BIDOVIO. Making party catering affordable and accessible.
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </GoogleMapsProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
