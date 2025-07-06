/**
 * 🚫 HOME PAGE - FROZEN DESIGN
 * 
 * IMPORTANT: This is the main customer portal home page.
 * The design has been frozen and should not be modified without approval.
 * 
 * Reference: frontend/customer/backup/homepage-frozen/
 * 
 * Last Modified: December 7, 2024
 * Version: 1.0.0 (FROZEN)
 * 
 * DO NOT MODIFY:
 * - Component structure
 * - Styling classes
 * - Layout arrangement
 * - Authentication flow
 * 
 * Allowed modifications:
 * - Content updates (text, images)
 * - Bug fixes
 * - Performance improvements
 * - Accessibility improvements
 * 
 * Before making any changes, consult the frozen backup version.
 */

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

  // Removed automatic redirect to dashboard - users can now stay on home page
  // and access dashboard through the user menu if needed

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