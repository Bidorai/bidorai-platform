// app/components/HomeContent.tsx
'use client';

import { useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import BiddingPanel from './BiddingPanel';
import { ThreeWaysSection, WhyChooseSection, FeaturesSection, TestimonialsSection, CTASection } from './Sections';
import CulinarySection from './CulinarySection';
import Footer from './Footer';
import { Restaurant } from './types';

export function HomeContent() {
  const [location, setLocation] = useState<string>('Dallas, TX');
  const [restaurants] = useState<Restaurant[]>([
    {
      id: "1",
      name: "Farm Fresh Kitchen",
      rating: 4.9,
      distance: 0.8,
      cuisine: "Organic Certified",
      dish: "Organic Harvest Bowl",
      serves: 15,
      bidders: 8,
      currentBid: 217,
      progress: 75,
      tag: "🌿 Fresh picked today!"
    },
    {
      id: "2",
      name: "Green Garden Bistro",
      rating: 4.8,
      distance: 1.2,
      cuisine: "Farm-to-Table",
      dish: "Sustainable Feast Tray",
      serves: 12,
      bidders: 12,
      currentBid: 185,
      progress: 60,
      tag: "🏆 Best value!"
    },
    {
      id: "3",
      name: "Tokyo Sushi",
      rating: 4.8,
      distance: 2.5,
      cuisine: "Japanese",
      dish: "Premium Sushi Platter",
      serves: 10,
      bidders: 6,
      currentBid: 165,
      progress: 0,
      tag: ""
    }
  ]);

  return (
    <>
      <Header />
      
      <main className="bg-gray-50">
        {/* Hero and Bidding Section */}
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HeroSection location={location} setLocation={setLocation} />
            <BiddingPanel restaurants={restaurants} />
          </div>
        </div>

        {/* Three Ways Section */}
        <ThreeWaysSection />
        
        {/* Culinary Excellence Section */}
        <CulinarySection />
        
        {/* Why Choose Section */}
        <WhyChooseSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}