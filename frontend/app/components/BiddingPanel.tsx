// app/components/BiddingPanel.tsx
'use client';

import { useState, useEffect } from 'react';
import { Restaurant } from './types';

interface BiddingPanelProps {
  restaurants: Restaurant[];
}

export default function BiddingPanel({ restaurants }: BiddingPanelProps) {
  const [timeRemaining, setTimeRemaining] = useState(238); // 2:38

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) return 180;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-gray-900">Party Menu Bidding</span>
          <span className="text-blue-500">ℹ️</span>
        </div>
        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
          LIVE
        </span>
      </div>

      {/* Timer */}
      <div className="bg-[#1877F2] text-white px-4 py-3 rounded-lg text-center font-bold mb-4">
        ⏰ {formatTime(timeRemaining)} remaining
      </div>

      {/* Savings */}
      <div className="bg-gray-900 text-white p-4 rounded-lg text-center mb-4">
        <div className="text-2xl font-bold">Save $284</div>
        <div className="text-sm opacity-90">🎯 Average 18% below market price</div>
      </div>

      {/* Restaurant List */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {restaurants.map((restaurant, index) => (
          <div key={restaurant.id} className="rounded-lg p-3 border hover:shadow-md transition-all bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center text-white font-bold shadow">
                  {restaurant.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                  <div className="text-sm text-gray-600">
                    ⭐ {restaurant.rating} • 📍 {restaurant.distance} km • {restaurant.cuisine}
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    {restaurant.dish} • Serves {restaurant.serves}
                  </div>
                  {restaurant.bidders > 0 && (
                    <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span>👥 {restaurant.bidders} people bidding</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-2xl font-bold text-[#1877F2]">
                ${restaurant.currentBid}
              </div>
            </div>
            
            {restaurant.progress > 0 && (
              <>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#1877F2] to-[#1565C0] transition-all duration-500"
                    style={{ width: `${restaurant.progress}%` }}
                  />
                </div>
                {restaurant.tag && (
                  <div className="mt-2 text-center">
                    <span className="text-xs font-semibold text-[#1877F2]">{restaurant.tag}</span>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors shadow-lg">
          🎯 Place Your Bid Now
        </button>
        <button className="w-full bg-white text-gray-900 border-2 border-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-all">
          ▶️ Watch Demo
        </button>
      </div>
    </div>
  );
}