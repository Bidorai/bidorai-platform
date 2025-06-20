'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/home/Header'
import { HeroSection } from '@/components/home/HeroSection'
import ClientOnly from '@/components/common/ClientOnly'

// Dynamically import components that might cause hydration issues
const LiveBiddingPanel = dynamic(
  () => import('@/components/bidding/LiveBiddingPanel').then(mod => ({ default: mod.LiveBiddingPanel })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-gray-900">Party Menu Bidding</span>
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            LIVE
          </span>
        </div>
        <div className="text-center text-gray-500 py-8">
          Loading live auctions...
        </div>
      </div>
    )
  }
)

const ThreeWaysSection = dynamic(
  () => import('@/components/home/ThreeWaysSection').then(mod => ({ default: mod.ThreeWaysSection })),
  { ssr: true }
)

const RestaurantShowcase = dynamic(
  () => import('@/components/home/RestaurantShowcase').then(mod => ({ default: mod.RestaurantShowcase })),
  { ssr: true }
)

const WhyChooseSection = dynamic(
  () => import('@/components/home/WhyChooseSection').then(mod => ({ default: mod.WhyChooseSection })),
  { ssr: true }
)

const FeaturesSection = dynamic(
  () => import('@/components/home/FeaturesSection').then(mod => ({ default: mod.FeaturesSection })),
  { ssr: true }
)

const TestimonialsSection = dynamic(
  () => import('@/components/home/TestimonialsSection').then(mod => ({ default: mod.TestimonialsSection })),
  { ssr: true }
)

const CallToActionSection = dynamic(
  () => import('@/components/home/CallToActionSection').then(mod => ({ default: mod.CallToActionSection })),
  { ssr: true }
)

const Footer = dynamic(
  () => import('@/components/home/Footer').then(mod => ({ default: mod.Footer })),
  { ssr: true }
)

export default function HomePage() {
  // Initialize isClient as true since this is a client component
  const [isClient, setIsClient] = useState(true)

  // Client-side only scroll animations
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
        }
      })
    }, { threshold: 0.1 })
    
    // Observe elements immediately after hydration
    document.querySelectorAll('.fade-in-up').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section with Live Bidding - matching original grid layout */}
        <section className="py-10 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[600px] items-stretch">
              <HeroSection />
              <ClientOnly
                fallback={
                  <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-gray-900">Party Menu Bidding</span>
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        LIVE
                      </span>
                    </div>
                    <div className="bg-blue-600 text-white p-3 rounded-lg text-center font-bold mb-4 text-sm">
                      Loading...
                    </div>
                    <div className="bg-gray-800 text-white p-4 rounded-xl text-center mb-5">
                      <div className="text-2xl font-bold mb-1">Save $284</div>
                      <div className="text-sm opacity-90">🎯 Average 18% below market price</div>
                    </div>
                    <div className="flex-1 mb-4">
                      <div className="text-center text-gray-500 py-8">
                        Loading live auctions...
                      </div>
                    </div>
                    <div className="space-y-2">
                      <button
                        disabled
                        className="w-full bg-gray-300 text-gray-500 font-semibold py-3 px-4 rounded-lg min-h-[48px] text-base"
                      >
                        🎯 Loading...
                      </button>
                    </div>
                  </div>
                }
              >
                <LiveBiddingPanel />
              </ClientOnly>
            </div>
          </div>
        </section>

        {/* Three Ways to Save - matching original design */}
        <ThreeWaysSection />

        {/* Restaurant Showcase - dark section with proper styling */}
        <RestaurantShowcase />

        {/* Why Choose BIDORAI - benefits section */}
        <WhyChooseSection />

        {/* Additional Features - light background */}
        <FeaturesSection />

        {/* Testimonials - white background */}
        <TestimonialsSection />

        {/* Call to Action - gradient background */}
        <CallToActionSection />
      </main>

      <Footer />
    </div>
  )
}