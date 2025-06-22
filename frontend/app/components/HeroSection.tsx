// app/components/HeroSection.tsx
'use client';

import { useState } from 'react';

interface HeroSectionProps {
  location: string;
  setLocation: (location: string) => void;
}

export default function HeroSection({ location, setLocation }: HeroSectionProps) {
  const [partySize, setPartySize] = useState(15);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      setIsRequestingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For demo, we'll just use Dallas
          setLocation("Irving, Texas");
          setIsRequestingLocation(false);
        },
        () => {
          setLocation("Dallas, TX");
          setIsRequestingLocation(false);
        }
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center h-full">
      {/* Tagline */}
      <div className="flex justify-center mb-6">
        <div className="bg-blue-50 text-[#1877F2] px-4 py-2 rounded-full font-semibold text-sm border-2 border-blue-100">
          🎉 The world's first party tray food bidding app
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-6 leading-tight">
        Bid your Meal.<br />
        <span className="text-[#1877F2]">Win your Order.</span><br />
        <span className="text-orange-500">Feast your Party.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 text-center mb-8 max-w-lg mx-auto">
        Bid on delicious half & full tray meals from local restaurants.{' '}
        <span className="text-[#1877F2] font-semibold">Name your price</span> and pick it up fresh.
      </p>

      {/* Search Form */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Location Input */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">📍</span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
              className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-[#1877F2] focus:outline-none"
            />
            <button
              onClick={requestLocation}
              disabled={isRequestingLocation}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1877F2] text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-[#1565C0] transition-colors"
            >
              📍 Use My Location
            </button>
          </div>

          {/* Party Size Input */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">👥</span>
            <input
              type="number"
              value={partySize}
              onChange={(e) => setPartySize(parseInt(e.target.value) || 10)}
              className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-[#1877F2] focus:outline-none"
              placeholder="Number of guests"
              min="1"
              max="100"
            />
          </div>
        </div>

        {/* Search Button */}
        <button className="w-full bg-orange-500 text-white font-bold text-lg py-4 rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          🍽️ Find My Perfect Party Menu
        </button>
      </div>

      {/* Bottom Info */}
      <div className="space-y-3">
        <div className="text-center text-gray-700 font-medium">
          🚀 Now launching in Dallas, TX
        </div>
        <div className="bg-blue-50 text-[#1877F2] px-4 py-3 rounded-lg text-center font-semibold">
          🍽️ $1 Tray Bids every Friday. Limited spots only.
        </div>
      </div>
    </div>
  );
}