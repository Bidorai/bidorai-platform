'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Sparkles, TrendingUp, Users, Clock } from 'lucide-react';
import { EnhancedButton } from './EnhancedButton';
import { EnhancedCard } from './EnhancedCard';
import { getTimeOfDay } from '@/lib/utils';

const HeroSection: React.FC = () => {
  const [location, setLocation] = useState('Detecting location...');
  const [partySize, setPartySize] = useState(15);
  const [cuisine, setCuisine] = useState('');
  const [activeStats, setActiveStats] = useState(0);

  const stats = [
    { icon: Users, label: 'Active Bidders', value: '2,847', color: 'text-blue-600' },
    { icon: TrendingUp, label: 'Avg Savings', value: '23%', color: 'text-green-600' },
    { icon: Clock, label: 'Live Auctions', value: '12', color: 'text-orange-600' },
  ];

  const cuisineOptions = [
    { value: '', label: '🍽️ Any Cuisine' },
    { value: 'organic', label: '🌿 Organic & Fresh' },
    { value: 'farm-to-table', label: '🚜 Farm-to-Table' },
    { value: 'italian', label: '🇮🇹 Italian' },
    { value: 'japanese', label: '🍣 Japanese' },
    { value: 'mexican', label: '🌮 Mexican' },
  ];

  // Animated stats rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStats((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const timeOfDay = getTimeOfDay();
  const greeting = timeOfDay === 'morning' ? 'Good morning' : timeOfDay === 'afternoon' ? 'Good afternoon' : 'Good evening';

  const getPartySizeCategory = (size: number): string => {
    if (size <= 20) return 'Small gathering';
    if (size <= 50) return 'Medium event';
    if (size <= 100) return 'Large party';
    return 'Corporate event';
  };

  const handlePartySizeChange = (value: number) => {
    let adjustedValue = Math.max(10, Math.min(1000, value));
    adjustedValue = Math.round(adjustedValue / 5) * 5;
    setPartySize(adjustedValue);
  };

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setLocation('Dallas, TX');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Dallas area detection
        if (latitude >= 32.5 && latitude <= 33.2 && longitude >= -97.5 && longitude <= -96.5) {
          if (latitude >= 32.78 && latitude <= 32.88 && longitude >= -97.0 && longitude <= -96.9) {
            setLocation('Irving, TX');
          } else {
            setLocation('Dallas, TX');
          }
        } else {
          setLocation('Dallas, TX');
        }
      },
      () => setLocation('Dallas, TX'),
      { timeout: 10000 }
    );
  };

  useEffect(() => {
    const timer = setTimeout(requestLocation, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <EnhancedCard variant="floating" className="p-8 min-h-[650px] flex flex-col justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-orange-100/30 to-pink-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Floating Badge */}
        <div className="flex justify-center mb-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-sm border border-white/20 backdrop-blur-sm">
              <Sparkles className="inline w-4 h-4 mr-2" />
              World's First Food Bidding Platform
            </div>
          </div>
        </div>
        
        {/* Dynamic Greeting & Main Heading */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-lg text-gray-600 font-medium">{greeting}! Live Now in Dallas</span>
          </div>
          
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 leading-tight tracking-tight mb-6">
            Bid. Win. Feast.
            <br />
            <span className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              Save Big.
            </span>
          </h1>
        </div>
        
        {/* Enhanced Subtitle with Stats */}
        <div className="text-center mb-10">
          <p className="text-xl text-gray-600 leading-relaxed font-medium max-w-2xl mx-auto mb-6">
            Join live auctions for premium catering from Dallas's finest restaurants.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold">
              Name your price
            </span>{' '}
            and save up to 25% instantly.
          </p>

          {/* Animated Stats */}
          <div className="flex justify-center items-center space-x-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className={`flex items-center space-x-2 transition-all duration-500 ${
                    index === activeStats 
                      ? 'scale-110 opacity-100' 
                      : 'scale-100 opacity-70'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="font-bold text-lg">{stat.value}</span>
                  <span className="text-gray-600 text-sm">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Search Form */}
        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location with Animation */}
            <div className="relative md:col-span-2 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-blue-600 transition-colors" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-base bg-white/80 backdrop-blur-sm transition-all duration-300 min-h-[56px] focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 focus:bg-white group-hover:shadow-lg"
                  placeholder="Enter your location"
                />
              </div>
            </div>

            {/* Party Size with Visual Feedback */}
            <div className="relative group">
              <input
                type="number"
                min="10"
                max="1000"
                step="5"
                value={partySize}
                onChange={(e) => handlePartySizeChange(parseInt(e.target.value) || 10)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-base bg-white/80 backdrop-blur-sm transition-all duration-300 min-h-[56px] focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 focus:bg-white group-hover:shadow-lg"
                placeholder="Party size"
              />
              <div className="absolute top-full left-0 right-0 text-center">
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {getPartySizeCategory(partySize)}
                </span>
              </div>
            </div>
          </div>

          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-base bg-white/80 backdrop-blur-sm transition-all duration-300 min-h-[56px] focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 focus:bg-white hover:shadow-lg"
          >
            {cuisineOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Enhanced CTA Button */}
          <EnhancedButton 
            variant="gradient" 
            size="xl" 
            className="w-full font-black text-xl"
            glow
          >
            <Sparkles className="w-6 h-6" />
            Find My Perfect Meal
            <TrendingUp className="w-6 h-6" />
          </EnhancedButton>
        </div>

        {/* Floating Promo Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-800 font-semibold">🚀 Now Live in Dallas</span>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-orange-800 font-semibold">🎯 $1 Friday Specials</span>
          </div>
        </div>
      </div>
    </EnhancedCard>
  );
};

export default HeroSection;