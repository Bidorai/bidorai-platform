'use client';

import { useState } from 'react';

interface HeroSectionProps {
  location: string;
  setLocation: (location: string) => void;
}

export default function HeroSection({ location, setLocation }: HeroSectionProps) {
  const [partySize, setPartySize] = useState(10);
  const [cuisine, setCuisine] = useState('');
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      setIsRequestingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          if (lat >= 32.78 && lat <= 32.88 && lng >= -97.0 && lng <= -96.9) {
            setLocation("Irving, TX");
          } else if (lat >= 32.5 && lat <= 33.2 && lng >= -97.5 && lng <= -96.5) {
            setLocation("Dallas, TX");
          } else {
            setLocation("Dallas Metro, TX");
          }
          setIsRequestingLocation(false);
        },
        () => {
          setLocation("Dallas, TX");
          setIsRequestingLocation(false);
        }
      );
    }
  };

  const handleSearch = () => {
    console.log('Searching with:', { location, partySize, cuisine });
    // Implement search logic
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center">
      {/* Tagline */}
      <div className="flex justify-center mb-6">
        <div className="bg-blue-50 text-[#1877F2] px-4 py-2 rounded-full font-semibold text-sm border-2 border-blue-100">
          ✨ The world's first party tray food bidding app
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-5 leading-tight tracking-tight">
        Bid your Meal.<br />
        <span className="text-[#1877F2]">Win your Order.</span><br />
        <span className="text-[#1877F2]">Feast your Party.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 text-center mb-7 font-medium max-w-lg mx-auto">
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
              placeholder="Detecting location..."
              className="w-full pl-10 pr-32 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-[#1877F2] focus:outline-none transition-colors"
            />
            <button
              onClick={requestLocation}
              disabled={isRequestingLocation}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1877F2] text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-[#1565C0] transition-colors disabled:opacity-50"
            >
              {isRequestingLocation ? 'Getting...' : '📍 Use My Location'}
            </button>
          </div>

          {/* Party Size Input */}
          <div className="relative">
            <input
              type="number"
              min="10"
              max="1000"
              step="5"
              value={partySize}
              onChange={(e) => setPartySize(Math.max(10, Math.min(1000, parseInt(e.target.value) || 10)))}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-[#1877F2] focus:outline-none transition-colors"
              placeholder="Party size (10-1000)"
            />
          </div>
        </div>

        {/* Cuisine Select */}
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-[#1877F2] focus:outline-none transition-colors text-gray-600"
        >
          <option value="">🍽️ Cuisine (optional)</option>
          <option value="american">🇺🇸 American</option>
          <option value="italian">🇮🇹 Italian</option>
          <option value="chinese">🥡 Chinese</option>
          <option value="mexican">🌮 Mexican</option>
          <option value="indian">🍛 Indian</option>
          <option value="japanese">🍣 Japanese</option>
          <option value="thai">🍜 Thai</option>
          <option value="mediterranean">🫒 Mediterranean</option>
        </select>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full bg-[#1877F2] text-white font-bold text-lg py-4 rounded-lg hover:bg-[#1565C0] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          🍽️ Search My Party Menu
        </button>
      </div>

      {/* Promo Messages */}
      <div className="space-y-3">
        <div className="bg-gray-50 text-gray-900 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm border border-gray-200">
          <span className="text-lg">🚀</span>
          <span>Now launching in Dallas, TX</span>
        </div>
        <div className="bg-blue-50 text-[#1877F2] px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm border border-blue-200">
          <span className="text-lg">🍽️</span>
          <span>$1 Tray Bids every Friday. Limited spots only.</span>
        </div>
      </div>
    </div>
  );
}