"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import { HeroSection } from '../components/HeroSection';
import { HowItWorks } from '../components/HowItWorks';
import { FeaturedRestaurants } from '../components/FeaturedRestaurants';
import { WhyChoose } from '../components/WhyChoose';
import { Testimonials } from '../components/Testimonials';
import { CTASection } from '../components/CTASection';

export default function HomePage() {
  const [location, setLocation] = useState("Dallas, TX");
  const [partySize, setPartySize] = useState(15);
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { loaded } = useClerk();

  // Only redirect if user is signed in and Clerk is loaded
  useEffect(() => {
    if (loaded && isSignedIn) {
      // Add a small delay to ensure the authentication state is fully processed
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isSignedIn, loaded, router]);

  // Mock data for BiddingCard
  const mockSession = {
    id: 1,
    menu: {
      name: "Organic Garden Salad Tray",
      restaurant: "Farm Fresh Kitchen",
      price: 85,
      image: "/restaurants/farm-fresh.jpg",
      serves: 20,
      tags: ["Organic", "Fresh"]
    },
    timeRemaining: 180,
    currentBids: [
      { userId: 1, amount: 65, userName: "Sarah" },
      { userId: 2, amount: 62, userName: "Mike" },
      { userId: 3, amount: 60, userName: "Jenny" }
    ],
    savings: 20
  };

  const handleJoinSession = (sessionId: number) => {
    console.log('Joining session:', sessionId);
    // TODO: Implement actual bidding logic
  };

  // Show loading state while Clerk is loading
  if (!loaded) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <FeaturedRestaurants />
      <WhyChoose />
      <Testimonials />
      <CTASection />
    </main>
  );
} 