"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSection } from '../components/HeroSection';
import { HowItWorks } from '../components/HowItWorks';
import { FeaturedRestaurants } from '../components/FeaturedRestaurants';
import { WhyChoose } from '../components/WhyChoose';
import { Testimonials } from '../components/Testimonials';
import { CTASection } from '../components/CTASection';
// import { useBidding } from '../hooks/useBidding'; // Uncomment and implement if needed

export default function HomePage() {
  const [location, setLocation] = useState("Dallas, TX");
  const [partySize, setPartySize] = useState(15);
  // const { activeSessions, joinSession } = useBidding(); // Uncomment and implement if needed

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