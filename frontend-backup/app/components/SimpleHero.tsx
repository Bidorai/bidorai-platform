// app/components/SimpleHero.tsx
'use client';

import { useState } from 'react';

export default function SimpleHero() {
  const [location, setLocation] = useState('Dallas, TX');
  const [partySize, setPartySize] = useState('15');

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      {/* Tagline */}
      <div className="text-center mb-6">
        <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold inline-block">
          🎉 The world's first party tray food bidding app
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-6">
        Bid your Meal.<br />
        <span className="text-blue-600">Win your Order.</span><br />
        <span className="text-orange-500">Feast your Party.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-center text-gray-600 mb-8">
        Bid on delicious half & full tray meals from local restaurants.
        <span className="text-blue-600 font-semibold"> Name your price</span> and pick it up fresh.
      </p>

      {/* Form */}
      <div className="space-y-4">
        <div className="relative">
          <span className="absolute left-3 top-3">📍</span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter location"
          />
        </div>

        <div className="relative">
          <span className="absolute left-3 top-3">👥</span>
          <input
            type="text"
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
            className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Party size"
          />
        </div>

        <button className="w-full bg-orange-500 text-white font-bold py-4 rounded-lg hover:bg-orange-600">
          🍽️ Find My Perfect Party Menu
        </button>
      </div>

      {/* Bottom info */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 mb-3">🚀 Now launching in Dallas, TX</p>
        <div className="bg-blue-50 text-blue-600 p-3 rounded-lg font-semibold">
          🍽️ $1 Tray Bids every Friday. Limited spots only.
        </div>
      </div>
    </div>
  );
}