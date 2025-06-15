'use client';

import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import Button from './Button';

const HeroSection: React.FC = () => {
  const [location, setLocation] = useState('Detecting location...');
  const [partySize, setPartySize] = useState(10);
  const [cuisine, setCuisine] = useState('');
  const [partySizeHelper, setPartySizeHelper] = useState('');
  const [showHelper, setShowHelper] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'detecting' | 'success' | 'error'>('detecting');

  const cuisineOptions = [
    { value: '', label: '🍽️ Cuisine (optional)' },
    { value: 'american', label: '🇺🇸 American' },
    { value: 'italian', label: '🇮🇹 Italian' },
    { value: 'chinese', label: '🥡 Chinese' },
    { value: 'mexican', label: '🌮 Mexican' },
    { value: 'indian', label: '🍛 Indian' },
    { value: 'japanese', label: '🍣 Japanese' },
    { value: 'thai', label: '🍜 Thai' },
    { value: 'mediterranean', label: '🫒 Mediterranean' },
    { value: 'bbq', label: '🍖 BBQ & Grill' },
    { value: 'vegetarian', label: '🥗 Vegetarian' },
    { value: 'vegan', label: '🌱 Vegan' },
    { value: 'farm-to-table', label: '🚜 Farm-to-Table' },
    { value: 'organic', label: '🌿 Organic' }
  ];

  const getPartySizeCategory = (size: number): string => {
    if (size <= 20) return 'Small gathering';
    if (size <= 50) return 'Medium event';
    if (size <= 100) return 'Large party';
    if (size <= 300) return 'Corporate event';
    return 'Major event';
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
        
        // Simple Dallas area detection
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
        timeout: 15000,
        maximumAge: 600000
      }
    );
  };

  useEffect(() => {
    // Auto-request location on mount
    setTimeout(requestLocation, 1000);
  }, []);

  const handleSearch = () => {
    console.log('Search params:', { location, partySize, cuisine });
    // Implement search functionality
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl flex flex-col justify-center p-8 text-left min-h-[550px]">
      {/* Tagline */}
      <div className="flex justify-center mb-6">
        <div className="bg-blue-50 text-blue-600 px-4 py-2.5 rounded-full font-semibold text-base border-2 border-blue-200">
          ✨ The world's first party tray food bidding app
        </div>
      </div>
      
      {/* Main Heading */}
      <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-5 text-center tracking-tight">
        Bid your Meal.<br />
        <span className="text-blue-600">Win your Order.</span><br />
        <span className="text-blue-600">Feast your Party.</span>
      </h1>
      
      {/* Subtitle */}
      <p className="text-lg text-gray-600 mb-7 text-center leading-relaxed font-medium max-w-lg mx-auto">
        Bid on delicious half & full tray meals from local restaurants.{' '}
        <span className="text-blue-600 font-semibold">Name your price</span> and pick it up fresh.
      </p>

      {/* Search Form */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Updated grid layout: Location gets 2/3 width, Party Size gets 1/3 width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location Input - Takes 2 columns */}
          <div className="relative md:col-span-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full pl-11 pr-24 py-3.5 border-2 rounded-lg text-base bg-white transition-all duration-200 min-h-12 focus:outline-none ${
                locationStatus === 'success' ? 'border-green-500 bg-green-50' : 
                locationStatus === 'error' ? 'border-gray-300' : 'border-gray-300'
              } focus:border-blue-600`}
              placeholder="Enter your location"
            />
            <MapPin className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            
            {locationStatus === 'detecting' && (
              <button
                type="button"
                onClick={requestLocation}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white border-0 rounded-md px-3 py-2 text-xs cursor-pointer font-semibold"
              >
                📍 Use My Location
              </button>
            )}
            
            {locationStatus === 'success' && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-3 py-2 rounded-md text-xs font-semibold">
                ✅ Location set
              </div>
            )}
          </div>

          {/* Party Size Input - Takes 1 column */}
          <div className="relative md:col-span-1">
            <input
              type="number"
              min="10"
              max="1000"
              step="5"
              value={partySize}
              onChange={(e) => handlePartySizeChange(parseInt(e.target.value) || 10)}
              className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg text-base bg-white transition-all duration-200 min-h-12 focus:outline-none focus:border-blue-600"
              placeholder="Party size"
            />
            
            {showHelper && (
              <div className="absolute top-full left-0 right-0 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-b-lg text-xs font-semibold z-10">
                {partySizeHelper}
              </div>
            )}
          </div>
        </div>

        {/* Cuisine Select */}
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className={`w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg text-base bg-white min-h-12 focus:outline-none focus:border-blue-600 ${
            cuisine ? 'text-gray-800' : 'text-gray-500'
          }`}
        >
          {cuisineOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Button variant="cta" size="lg" onClick={handleSearch} className="w-full text-lg font-bold">
          🍽️ Search My Party Menu
        </Button>
      </div>

      {/* Promo Messages */}
      <div className="flex flex-col gap-3">
        <div className="bg-gray-50 text-gray-800 px-4 py-3.5 rounded-xl flex items-center justify-center gap-2.5 text-sm font-semibold border border-gray-200">
          <span className="text-lg">🚀</span>
          <span>Now launching in Dallas, TX</span>
        </div>
        <div className="bg-blue-50 text-blue-600 px-4 py-3.5 rounded-xl flex items-center justify-center gap-2.5 text-sm font-semibold border border-blue-200">
          <span className="text-lg">🍽️</span>
          <span>$1 Tray Bids every Friday. Limited spots only.</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;