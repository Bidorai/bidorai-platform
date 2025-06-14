import React from 'react';
import Header from '@/components/ui/Header';
import HeroSection from '@/components/ui/HeroSection';
import BiddingPanel from '@/components/ui/BiddingPanel';
import ThreeWaysSection from '@/components/ui/ThreeWaysSection';
import { 
  FoodShowcase, 
  BenefitsSection, 
  FeaturesSection, 
  TestimonialsSection, 
  CTASection, 
  Footer 
} from '@/components/ui/AllSections';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-10 min-h-[calc(100vh-64px)]">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[600px] items-stretch">
            <HeroSection />
            <BiddingPanel />
          </div>
        </div>
      </main>

      <ThreeWaysSection />
      <FoodShowcase />
      <BenefitsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}