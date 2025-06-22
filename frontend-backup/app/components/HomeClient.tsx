// app/components/HomeClient.tsx
'use client';

import { useState } from 'react';
import HeroSection from './HeroSection';

export default function HomeClient() {
  const [location, setLocation] = useState('Dallas, TX');

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <HeroSection location={location} setLocation={setLocation} />
        </div>
      </div>
    </main>
  );
}