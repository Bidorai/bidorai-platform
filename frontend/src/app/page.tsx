// src/app/page.tsx - CORRECTED to match original design structure
'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/home/Header'
import { HeroSection } from '@/components/home/HeroSection'
import { LiveBiddingPanel } from '@/components/bidding/LiveBiddingPanel'
import { ThreeWaysSection } from '@/components/home/ThreeWaysSection'
import { RestaurantShowcase } from '@/components/home/RestaurantShowcase'
import { WhyChooseSection } from '@/components/home/WhyChooseSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { CallToActionSection } from '@/components/home/CallToActionSection'
import { Footer } from '@/components/home/Footer'

export default function HomePage() {
  // Add scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
        }
      })
    }, { threshold: 0.1 })
    
    document.querySelectorAll('.fade-in-up').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-bidorai-neutral-50">
      <Header />
      
      <main>
        {/* Hero Section with Live Bidding - matching original grid layout */}
        <section className="py-10 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[600px] items-stretch">
              <HeroSection />
              <LiveBiddingPanel />
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