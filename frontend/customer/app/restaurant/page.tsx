"use client";
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/nextjs';

export default function RestaurantPortal() {
  const { isSignedIn } = useUser();
  const { loaded } = useClerk();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Header for Restaurant Page */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Bidorai Logo" className="w-9 h-9" />
            <span className="font-bold text-2xl text-blue-700">Bidorai</span>
          </Link>
          
          {/* Center: Phone */}
          <div className="flex items-center space-x-1 text-red-600 font-semibold whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>1-800-BIDORAI</span>
          </div>
          
          {/* Right: Customer Portal Link */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-700 font-semibold whitespace-nowrap"
            >
              ← Back to Customer Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Grow Your Restaurant Business with Bidorai
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join the innovative platform that connects restaurants with customers through competitive bidding. 
            Increase your revenue, reduce food waste, and build customer loyalty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/restaurant/auth"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started - It's Free
            </Link>
            <Link
              href="/restaurant/auth"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Restaurants Choose Bidorai</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Increase Revenue</h3>
              <p className="text-gray-600">
                Sell excess inventory and party trays at competitive prices. 
                Reach new customers and maximize your kitchen's efficiency.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Reduce Food Waste</h3>
              <p className="text-gray-600">
                Turn potential waste into profit. Our bidding system ensures 
                your food finds customers at the right price.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Build Customer Base</h3>
              <p className="text-gray-600">
                Attract new customers through competitive pricing. 
                Convert bidders into repeat customers for your regular menu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">List Your Menu</h3>
              <p className="text-gray-600">
                Upload your party trays and set starting prices. 
                Easy-to-use dashboard for menu management.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Customers Bid</h3>
              <p className="text-gray-600">
                Customers place competitive bids on your items. 
                Real-time bidding creates excitement and urgency.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Win-Win Sales</h3>
              <p className="text-gray-600">
                Highest bidder wins at auction end. 
                You get fair market value, customers get great deals.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Pickup</h3>
              <p className="text-gray-600">
                Customers pick up orders at your location. 
                No delivery hassles, just happy customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Restaurant Success Stories</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <p className="text-gray-300">Restaurants Partnered</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">$2.5M+</div>
              <p className="text-gray-300">Revenue Generated</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">85%</div>
              <p className="text-gray-300">Food Waste Reduction</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">4.8★</div>
              <p className="text-gray-300">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Business?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of restaurants already using Bidorai to increase revenue and reduce waste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/restaurant/auth"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Your Free Trial
            </Link>
            <Link
              href="/restaurant/auth"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 