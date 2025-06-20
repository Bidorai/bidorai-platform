// frontend/src/app/page.tsx
import { MapPin, Users, Star, Clock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <h1 className="text-2xl font-bold text-blue-600">Bidorai</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Browse</span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">How it Works</span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Sign In</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign Up
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Hero Text */}
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  <span className="text-blue-600">Bid</span> on Premium 
                  <br />Party Catering
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-lg">
                  Save 10-25% on catering from top Dallas restaurants through our unique bidding platform.
                </p>

                {/* Search Form */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Enter delivery address"
                        defaultValue="Dallas, TX"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        placeholder="Party size"
                        defaultValue="15"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    🔍 Start Bidding
                  </button>
                </div>
              </div>

              {/* Right Column - Live Bidding Panel */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Live Auctions</h3>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    LIVE
                  </span>
                </div>

                {/* Mock Live Auction */}
                <div className="border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      🍽️
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Italian Feast Platter</h4>
                      <p className="text-sm text-gray-600">Serves 15 • Romano&apos;s Kitchen</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.8</span>
                        <Clock className="w-4 h-4 text-gray-400 ml-2" />
                        <span className="text-sm text-gray-600">45 min</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Current bid:</span>
                      <span className="font-bold text-lg text-green-600">$189</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-600">Regular price:</span>
                      <span className="text-sm text-gray-400 line-through">$245</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Your bid"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium">
                        Bid Now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View all live auctions →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Three Ways to Save on Catering
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose how you want to order and save with Bidorai&apos;s flexible platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Purchase</h3>
                <p className="text-gray-600">
                  Buy immediately at 10% off regular prices. Perfect for last-minute orders.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Live Bidding</h3>
                <p className="text-gray-600">
                  Join 3-minute auctions every hour. Win with savings up to 25% off.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Second Chance</h3>
                <p className="text-gray-600">
                  Lost a bid? Get a second chance to match the winning price via email.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <h3 className="text-xl font-bold text-blue-400">Bidorai</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Making party catering affordable and accessible through smart bidding.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <span className="text-gray-400 hover:text-white cursor-pointer">About</span>
              <span className="text-gray-400 hover:text-white cursor-pointer">Contact</span>
              <span className="text-gray-400 hover:text-white cursor-pointer">Privacy</span>
              <span className="text-gray-400 hover:text-white cursor-pointer">Terms</span>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-500 text-sm">
                © 2025 Bidorai. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}