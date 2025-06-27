'use client';

import { useState, useEffect } from 'react';
import { BiddingCard } from './BiddingCard';
import { useBidding } from '@/hooks/useBidding';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Premium Catering at
                <span className="block text-yellow-400">Unbeatable Prices</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Join live auctions for premium catering packages. Save up to 25% while supporting local restaurants and enjoying guaranteed freshness.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 transform hover:scale-105">
                🎯 Join Live Auction
              </button>
              <button className="border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200">
                📱 Download App
              </button>
            </div>
            
            <div className="flex items-center gap-8 text-blue-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍽️</span>
                <span>500+ Restaurants</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                <span>25% Average Savings</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Visual */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl mx-auto">
                  🍽️
                </div>
                <h3 className="text-2xl font-bold">Live Auction in Progress</h3>
                <p className="text-blue-100">Premium catering package from Farm Fresh Kitchen</p>
                <div className="bg-blue-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-blue-200">Current Bid</span>
                    <span className="text-2xl font-bold text-yellow-400">$65</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-blue-200">Time Left</span>
                    <span className="text-lg font-semibold text-red-400">2:45</span>
                  </div>
                  <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-blue-900 py-3 rounded-lg font-bold transition-colors">
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 