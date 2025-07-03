'use client';

import { useState } from 'react';
import { AddressAutocomplete } from './AddressAutocomplete';
import { BiddingCard } from './BiddingCard';

export function HeroSection() {
  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
    placeId: string;
  } | null>(null);
  const [partySize, setPartySize] = useState(15);

  const handleLocationSelect = (location: {
    address: string;
    lat: number;
    lng: number;
    placeId: string;
  }) => {
    setSelectedLocation(location);
  };

  const handleFindMenu = () => {
    if (selectedLocation) {
      const searchParams = new URLSearchParams({
        location: selectedLocation.address,
        partySize: partySize.toString()
      });
      window.location.href = `/search?${searchParams.toString()}`;
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-orange-50 pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-8 items-stretch">
          {/* Left Content */}
          <div className="flex-1 min-w-0 p-10 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center">
            {/* Badge */}
            <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3 mb-6 border border-blue-200">
              <span className="text-xl mr-2">🎉</span>
              <span className="text-blue-600 font-medium">The world's first party tray food bidding app</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-6xl font-black text-center mb-6 leading-tight">
              <div className="text-gray-900">Bid your Meal.</div>
              <div className="text-blue-600">Win your Order.</div>
              <div className="text-orange-500">Feast your Party.</div>
            </h1>

            {/* Subheading - two lines */}
            <p className="text-lg text-gray-600 text-center mb-8 w-full">
              Bid on delicious half &amp; full tray meals from local restaurants.<br/>
              <span className="text-blue-600 font-semibold">Name your price</span> and pick it up fresh.
            </p>

            {/* Location and Party Size in one row */}
            <div className="flex w-full gap-3 mb-8">
              <div className="flex-1">
                <AddressAutocomplete
                  onLocationSelect={handleLocationSelect}
                  placeholder="Enter your location"
                  className="bg-gray-50"
                />
              </div>
              <div className="w-32">
                <select
                  value={partySize}
                  onChange={(e) => setPartySize(parseInt(e.target.value))}
                  className="w-full text-gray-700 font-medium text-center outline-none bg-gray-50 rounded-lg border border-gray-300 px-2 py-3"
                >
                  {[10, 15, 20, 25, 30, 35, 40, 45, 50].map(size => (
                    <option key={size} value={size}>{size} people</option>
                  ))}
                </select>
              </div>
            </div>

            {/* CTA Button */}
            <button
              className={`bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 mb-8 shadow-lg transition-all transform hover:scale-105 w-full ${!selectedLocation ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleFindMenu}
              disabled={!selectedLocation}
            >
              <span>🍽️</span> Find My Perfect Party Menu
            </button>

            {/* Bottom Info */}
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <span className="text-xl">🚀</span>
              <span className="font-medium">Now launching in Dallas, TX</span>
            </div>

            <div className="bg-blue-50 rounded-xl px-6 py-4 flex items-center justify-center gap-3 border border-blue-200 w-full">
              <span className="text-2xl">💰</span>
              <span className="text-blue-700 font-semibold">$1 Tray Bids every Friday. Limited spots only.</span>
            </div>
          </div>

          {/* Right Content - Party Live Bidding Block */}
          <div className="flex-1 min-w-0 flex items-center justify-center">
            <div className="w-full h-full">
              <BiddingCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 