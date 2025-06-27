'use client';

import { useState } from 'react';

interface BiddingCardProps {
  timeRemaining: number;
  formatTime: (seconds: number) => string;
}

export function BiddingCard({ timeRemaining, formatTime }: BiddingCardProps) {
  const [activeBids] = useState([
    { 
      id: 1, 
      restaurant: 'Farm Fresh Kitchen', 
      amount: 217, 
      rating: 4.9, 
      distance: 0.8, 
      tags: ['Organic Certified'], 
      serve: 'Organic Harvest Bowl', 
      serves: 15, 
      bidders: 8, 
      icon: 'F' 
    },
    { 
      id: 2, 
      restaurant: 'Green Garden Bistro', 
      amount: 185, 
      rating: 4.8, 
      distance: 1.2, 
      tags: ['Farm-to-Table'], 
      serve: 'Sustainable Feast Tray', 
      serves: 12, 
      bidders: 12, 
      icon: 'G' 
    },
    { 
      id: 3, 
      restaurant: 'Tokyo Sushi', 
      amount: 165, 
      rating: 4.7, 
      distance: 2.1, 
      tags: ['Fresh Daily'], 
      serve: 'Premium Sushi Platter', 
      serves: 10, 
      bidders: 5, 
      icon: 'T' 
    }
  ]);

  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col h-full">
      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Party Menu Bidding
            <span className="text-blue-600 text-lg cursor-help">ℹ️</span>
          </h2>
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold uppercase animate-pulse">
            Live
          </span>
        </div>

        {/* Timer */}
        <div className="bg-indigo-600 text-white rounded-lg px-4 py-3 mb-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-bold text-lg">{formatTime(timeRemaining)} remaining</span>
          </div>
        </div>

        {/* Savings Banner */}
        <div className="bg-gray-900 text-white rounded-lg px-4 py-4 text-center mb-4">
          <div className="text-2xl font-bold mb-1">Save $284</div>
          <div className="text-xs opacity-90 flex items-center justify-center gap-1">
            <span>🎯</span>
            <span>Average 18% below market price</span>
          </div>
        </div>

        {/* Restaurant Cards - Scrollable */}
        <div className="flex-1 flex flex-col gap-2 mb-4 overflow-y-auto pr-2 max-h-72 custom-scrollbar">
          {activeBids.map((bid, index) => (
            <div 
              key={bid.id}
              className={
                `
                ${index === 0 ? 'border-2 border-indigo-600 bg-indigo-50' : 'border border-gray-200 bg-white'} 
                rounded-lg p-3 flex-shrink-0
              `
              }
            >
              {index < 2 ? (
                // Expanded view for first two
                <div className="flex gap-3">
                  <div className={
                    `
                    w-12 h-12 ${index === 0 ? 'bg-indigo-600' : 'bg-gray-600'} 
                    text-white rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0
                  `}>
                    {bid.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{bid.restaurant}</h3>
                      <span className="text-2xl font-bold text-blue-600">${bid.amount}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                      <span>⭐ {bid.rating}</span>
                      <span>•</span>
                      <span>📍 {bid.distance} km</span>
                      <span>•</span>
                      <span className="text-green-600 font-medium">{bid.tags[0]}</span>
                    </div>
                    <div className="text-sm text-gray-700 mb-2">
                      🥗 {bid.serve} • Serves {bid.serves}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span>👥</span>
                      <span>{bid.bidders} people bidding</span>
                    </div>
                    {index === 0 && (
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                        🏷️ Fresh picked today!
                      </button>
                    )}
                    {index === 1 && (
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                        🏆 Best value!
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                // Collapsed view for third
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                      {bid.icon}
                    </div>
                    <div>
                      <h3 className="font-bold">{bid.restaurant}</h3>
                      <div className="text-sm text-gray-600">{bid.serve}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-blue-600">${bid.amount}</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-2">
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-lg mb-3 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
            <span>🎯</span> Place Your Bid Now
          </button>

          <button className="w-full bg-white hover:bg-gray-50 text-blue-600 border-2 border-gray-200 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
            <span>▶️</span> Watch Demo
          </button>
        </div>
      </div>
    </div>
  );
} 