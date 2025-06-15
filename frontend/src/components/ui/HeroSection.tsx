// frontend/src/components/ui/HeroSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import Button from './Button';
import { getTimeOfDay } from '@/lib/utils';

const HeroSection: React.FC = () => {
  const [location, setLocation] = useState('Detecting location...');
  const [partySize, setPartySize] = useState(15);
  const [cuisine, setCuisine] = useState('');
  const [partySizeHelper, setPartySizeHelper] = useState('');
  const [showHelper, setShowHelper] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'detecting' | 'success' | 'error'>('detecting');

  const timeOfDay = getTimeOfDay();
  const greeting = timeOfDay === 'morning' ? 'Good morning' : timeOfDay === 'afternoon' ? 'Good afternoon' : 'Good evening';

  const cuisineOptions = [
    { value: '', label: '🍽️ Any Cuisine' },
    { value: 'organic', label: '🌿 Organic & Fresh' },
    { value: 'farm-to-table', label: '🚜 Farm-to-Table' },
    { value: 'italian', label: '🇮🇹 Italian' },
    { value: 'japanese', label: '🍣 Japanese' },
    { value: 'mexican', label: '🌮 Mexican' },
    { value: 'chinese', label: '🥡 Chinese' },
    { value: 'indian', label: '🍛 Indian' },
    { value: 'mediterranean', label: '🫒 Mediterranean' },
    { value: 'bbq', label: '🍖 BBQ & Grill' },
    { value: 'healthy', label: '🥗 Healthy Options' },
    { value: 'vegetarian', label: '🌱 Vegetarian' }
  ];

  const getPartySizeCategory = (size: number): string => {
    if (size <= 20) return 'Small gathering - perfect for families';
    if (size <= 50) return 'Medium event - great for parties';
    if (size <= 100) return 'Large party - ideal for celebrations';
    if (size <= 300) return 'Corporate event - business ready';
    return 'Major event - we\'ve got you covered';
  };

  const handlePartySizeChange = (value: number) => {
    let adjustedValue = Math.max(10, Math.min(1000, value));
    adjustedValue = Math.round(adjustedValue / 5) * 5;
    setPartySize(adjustedValue);
    
    const category = getPartySizeCategory(adjustedValue);
    setPartySizeHelper(category);
    setShowHelper(true);
    
    setTimeout(() => setShowHelper(false), 3000);
  };

  const requestLocation = async () => {
    setLocationStatus('detecting');
    
    if (!navigator.geolocation) {
      setLocation('Dallas, TX');
      setLocationStatus('error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Dallas area detection
        if (latitude >= 32.5 && latitude <= 33.2 && longitude >= -97.5 && longitude <= -96.5) {
          if (latitude >= 32.78 && latitude <= 32.88 && longitude >= -97.0 && longitude <= -96.9) {
            setLocation('Irving, TX');
          } else if (latitude >= 33.0 && longitude <= -96.8) {
            setLocation('Plano, TX');
          } else {
            setLocation('Dallas, TX');
          }
        } else {
          setLocation('Dallas, TX');
        }
        
        setLocationStatus('success');
      },
      (error) => {
        console.error('Location error:', error);
        setLocation('Dallas, TX');
        setLocationStatus('error');
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  useEffect(() => {
    // Auto-request location after a delay
    const timer = setTimeout(requestLocation, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    // Navigate to browse page with search parameters
    const params = new URLSearchParams();
    if (location && location !== 'Detecting location...') params.set('location', location);
    if (partySize) params.set('partySize', partySize.toString());
    if (cuisine) params.set('cuisine', cuisine);
    
    window.location.href = `/browse?${params.toString()}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl flex flex-col justify-center p-8 text-left min-h-[600px]">
      {/* Tagline */}
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 px-5 py-3 rounded-full font-semibold text-base border-2 border-blue-200 shadow-sm">
          ✨ The world's first party tray food bidding app
        </div>
      </div>
      
      {/* Greeting & Main Heading */}
      <div className="text-center mb-6">
        <p className="text-lg text-gray-600 mb-2">{greeting}! Ready to save on amazing food?</p>
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
          Bid your Meal.<br />
          <span className="text-blue-600">Win your Order.</span><br />
          <span className="text-blue-600">Feast your Party.</span>
        </h1>
      </div>
      
      {/* Subtitle */}
      <p className="text-lg text-gray-600 mb-8 text-center leading-relaxed font-medium max-w-lg mx-auto">
        Bid on delicious catering from premium local restaurants.{' '}
        <span className="text-blue-600 font-semibold">Name your price</span> and save 10-25% instantly.
      </p>

      {/* Search Form */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Location and Party Size Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location Input - Takes 2 columns */}
          <div className="relative md:col-span-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-base bg-white transition-all duration-200 min-h-[52px] focus:outline-none ${
                locationStatus === 'success' ? 'border-green-500 bg-green-50' : 
                locationStatus === 'error' ? 'border-gray-300' : 'border-gray-300'
              } focus:border-blue-600 focus:ring-1 focus:ring-blue-600`}
              placeholder="Enter your location"
            />
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            
            {locationStatus === 'detecting' && (
              <button
                type="button"
                onClick={requestLocation}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg px-3 py-2 text-sm cursor-pointer font-semibold transition-colors"
              >
                📍 Use My Location
              </button>
            )}
            
            {locationStatus === 'success' && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-semibold">
                ✅ Location set
              </div>
            )}
          </div>

          {/* Party Size Input */}
          <div className="relative md:col-span-1">
            <input
              type="number"
              min="10"
              max="1000"
              step="5"
              value={partySize}
              onChange={(e) => handlePartySizeChange(parseInt(e.target.value) || 10)}
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-base bg-white transition-all duration-200 min-h-[52px] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              placeholder="Party size"
            />
            
            {showHelper && (
              <div className="absolute top-full left-0 right-0 bg-blue-50 text-blue-600 px-3 py-2 rounded-b-xl text-xs font-semibold z-10 mt-1 border border-blue-200">
                {partySizeHelper}
              </div>
            )}
          </div>
        </div>

        {/* Cuisine Select */}
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className={`w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-base bg-white min-h-[52px] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 ${
            cuisine ? 'text-gray-900' : 'text-gray-500'
          }`}
        >
          {cuisineOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Button variant="cta" size="lg" onClick={handleSearch} className="w-full text-lg font-bold">
          🍽️ Find My Perfect Meal
        </Button>
      </div>

      {/* Promo Messages */}
      <div className="flex flex-col gap-3">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 px-4 py-4 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold border border-gray-200">
          <span className="text-lg">🚀</span>
          <span>Now launching in Dallas, TX area</span>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 px-4 py-4 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold border border-blue-200">
          <span className="text-lg">🎯</span>
          <span>$1 Tray Bids every Friday • Limited time offer</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-2xl mb-1">🎯</div>
          <div className="text-xs text-gray-600 font-semibold">Live Bidding</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-2xl mb-1">💰</div>
          <div className="text-xs text-gray-600 font-semibold">Save 10-25%</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-2xl mb-1">🍽️</div>
          <div className="text-xs text-gray-600 font-semibold">Premium Food</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;