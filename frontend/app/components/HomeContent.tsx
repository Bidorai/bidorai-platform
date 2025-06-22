'use client';

import { useState, useEffect } from 'react';
import { Restaurant } from './types';
import Header from './Header';
import HeroSection from './HeroSection';
import BiddingPanel from './BiddingPanel';
import { ClientOnly } from './ClientOnly';
import { ThreeWaysSection } from './Sections';
import CulinarySection from './CulinarySection';
import { WhyChooseSection, FeaturesSection, TestimonialsSection, CTASection } from './Sections';
import Footer from './Footer';

export function HomeContent() {
  // Initialize state with mock data
  const [location, setLocation] = useState<string>('Dallas, TX');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: "1",
      name: "Texas Roadhouse",
      rating: 4.5,
      distance: 2.3,
      cuisine: "Steakhouse",
      dish: "Prime Rib",
      serves: 8,
      bidders: 15,
      currentBid: 125.00,
      progress: 75,
      tag: "Hot"
    },
    {
      id: "2",
      name: "Olive Garden",
      rating: 4.2,
      distance: 1.8,
      cuisine: "Italian",
      dish: "Spaghetti Carbonara",
      serves: 6,
      bidders: 10,
      currentBid: 75.00,
      progress: 50,
      tag: "New"
    }
  ]);

  return (
    <ClientOnly>
      <>
        <Header />
        
        <main className="min-h-screen">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[550px] items-stretch">
            <ClientOnly>
              <HeroSection location={location} setLocation={setLocation} />
            </ClientOnly>
            <ClientOnly>
              <BiddingPanel restaurants={restaurants} />
            </ClientOnly>
          </div>
        </div>

        <ClientOnly>
          <ThreeWaysSection />
        </ClientOnly>
        <ClientOnly>
          <CulinarySection />
        </ClientOnly>
        <ClientOnly>
          <WhyChooseSection />
        </ClientOnly>
        <ClientOnly>
          <FeaturesSection />
        </ClientOnly>
        <ClientOnly>
          <TestimonialsSection />
        </ClientOnly>
        <ClientOnly>
          <CTASection />
        </ClientOnly>
      </main>

      <Footer />
    </>
  );
}
