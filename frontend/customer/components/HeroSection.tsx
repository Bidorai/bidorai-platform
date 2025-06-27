'use client';

import { useState, useEffect } from 'react';
import { BiddingCard } from './BiddingCard';

export function HeroSection() {
  const [timeRemaining, setTimeRemaining] = useState(158);
  const [location, setLocation] = useState('Dallas, TX');
  const [partySize, setPartySize] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-8 items-stretch">
          {/* Left Content */}
          <div className="flex-1 p-10 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center">
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

            {/* Subheading */}
            <p className="text-lg text-gray-600 text-center mb-8 w-full">
              Bid on delicious half & full tray meals from local restaurants.{' '}
              <span className="text-blue-600 font-semibold">Name your price</span> and pick it up fresh.
            </p>

            {/* Location and Party Size */}
            <div className="flex items-center bg-gray-50 rounded-full p-1 shadow-sm border border-gray-200 mb-8 w-full">
              <div className="flex items-center flex-1 px-5 py-3">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700 font-medium">{location}</span>
              </div>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors flex items-center gap-1 mr-2">
                <span>📍</span> Use My Location
              </button>
              
              <div className="w-px h-8 bg-gray-300 mx-4"></div>
              
              <div className="flex items-center px-5 py-3">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <input 
                  type="number" 
                  value={partySize} 
                  onChange={(e) => setPartySize(parseInt(e.target.value) || 1)}
                  className="w-10 text-gray-700 font-medium text-center outline-none bg-transparent"
                />
              </div>
            </div>

            {/* CTA Button */}
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 mb-8 shadow-lg transition-all transform hover:scale-105 w-full">
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

          {/* Right Content - Bidding Card */}
          <div className="flex-1">
            <BiddingCard 
              timeRemaining={timeRemaining} 
              formatTime={formatTime}
            />
          </div>
        </div>
      </div>
    </section>
  );
} 