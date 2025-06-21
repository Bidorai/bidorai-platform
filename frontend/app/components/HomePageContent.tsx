'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Phone, ShoppingCart, Clock, TrendingUp, Users, Menu } from 'lucide-react';

interface CuisineOption {
  value: string;
  label: string;
}

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  distance: string;
  type: string;
  dish: string;
  serves: number;
  bidders: number;
  price: number;
  progress: number;
  tag: string;
  color: string;
}

export default function HomePageContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [location, setLocation] = useState('Detecting location...');
  const [partySize, setPartySize] = useState(10);
  const [cuisine, setCuisine] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('2:45');
  const [cuisineOptions, setCuisineOptions] = useState<CuisineOption[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  // Initialize cuisine options
  useEffect(() => {
    const options = [
      { value: 'american', label: '🇺🇸 American' },
      { value: 'italian', label: '🇮🇹 Italian' },
      { value: 'chinese', label: '🥡 Chinese' },
      { value: 'mexican', label: '🌮 Mexican' },
      { value: 'indian', label: '🍛 Indian' },
      { value: 'japanese', label: '🍣 Japanese' },
      { value: 'thai', label: '🍜 Thai' },
      { value: 'mediterranean', label: '🫒 Mediterranean' },
    ];
    setCuisineOptions(options);
  }, []);

  // Initialize restaurants data
  useEffect(() => {
    const data = [
      {
        id: 'farm-fresh',
        name: 'Farm Fresh Kitchen',
        rating: 4.9,
        distance: '0.8 km',
        type: 'Organic Certified',
        dish: 'Organic Harvest Bowl',
        serves: 15,
        bidders: 8,
        price: 217,
        progress: 75,
        tag: 'Fresh picked today!',
        color: 'blue'
      },
      {
        id: 'green-garden',
        name: 'Green Garden Bistro',
        rating: 4.8,
        distance: '1.2 km',
        type: 'Farm-to-Table',
        dish: 'Sustainable Feast Tray',
        serves: 12,
        bidders: 12,
        price: 185,
        progress: 0,
        tag: '',
        color: 'gray'
      },
      {
        id: 'tokyo-sushi',
        name: 'Tokyo Sushi',
        rating: 4.7,
        distance: '2.1 km',
        type: 'Japanese Fresh',
        dish: 'Sushi Platter',
        serves: 8,
        bidders: 6,
        price: 165,
        progress: 45,
        tag: 'New entry!',
        color: 'blue'
      },
      {
        id: 'el-mariachi',
        name: 'El Mariachi',
        rating: 4.6,
        distance: '1.8 km',
        type: 'Mexican Authentic',
        dish: 'Taco Bar Setup',
        serves: 20,
        bidders: 15,
        price: 245,
        progress: 92,
        tag: 'Bidding war!',
        color: 'gray'
      },
      {
        id: 'pasta-palace',
        name: 'Pasta Palace',
        rating: 4.5,
        distance: '3.4 km',
        type: 'Italian Classic',
        dish: 'Pasta Buffet Tray',
        serves: 18,
        bidders: 4,
        price: 195,
        progress: 30,
        tag: 'Ending soon!',
        color: 'blue'
      }
    ];
    setRestaurants(data);
  }, []);

  // Location detection
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For demo, defaulting to Dallas area
          setLocation('Irving, TX');
        },
        (error) => {
          setLocation('Dallas, TX');
        }
      );
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const parts = timeRemaining.split(':');
      let minutes = parseInt(parts[0]);
      let seconds = parseInt(parts[1]);
      
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      }
      
      setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white shadow-md">
                <span className="text-base">🍽️</span>
              </div>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Bidorai</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Search BIDORAI"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              
              {/* Search Dropdown */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
                  {/* Popular Searches */}
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Popular right now</h3>
                    <div className="space-y-2">
                      <button className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <span className="text-2xl">🍕</span>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-gray-900">Pizza</div>
                          <div className="text-xs text-gray-500">Most ordered this week</div>
                        </div>
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">Trending</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-6">
              <a href="tel:1-800-BIDORAI" className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Phone className="w-4 h-4" />
                <span className="font-medium">1-800-BIDORAI</span>
              </a>
              <span className="hidden lg:block text-gray-600 font-medium">For Restaurant Owners</span>
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  2
                </span>
              </div>
              <button className="px-4 py-2 text-gray-600 font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Sign In
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all text-lg">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Side - Hero Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center">
            {/* Tagline */}
            <div className="flex justify-center mb-6">
              <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-semibold text-sm border-2 border-blue-100">
                ✨ The world's first party tray food bidding app
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-6 leading-tight">
              Bid your Meal.<br />
              <span className="text-blue-600">Win your Order.</span><br />
              <span className="text-blue-600">Feast your Party.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 text-center mb-8 font-medium max-w-lg mx-auto">
              Bid on delicious half & full tray meals from local restaurants. 
              <span className="text-blue-600 font-semibold"> Name your price</span> and pick it up fresh.
            </p>

            {/* Search Form */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={location}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg bg-white"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-semibold">
                    📍 Use My Location
                  </button>
                </div>
                <input
                  type="number"
                  value={partySize}
                  onChange={(e) => setPartySize(Math.max(10, Math.min(1000, parseInt(e.target.value) || 10)))}
                  min="10"
                  max="1000"
                  step="5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                  placeholder="Party size (10-1000)"
                />
              </div>
              <select 
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-600"
              >
                <option value="">🍽️ Cuisine (optional)</option>
                {cuisineOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all text-lg">
                🍽️ Search My Party Menu
              </button>
            </div>

            {/* Promo Messages */}
            <div className="space-y-3">
              <div className="bg-gray-50 text-gray-900 px-4 py-3 rounded-xl flex items-center justify-center space-x-2 font-semibold text-sm border border-gray-100">
                <span>🚀</span>
                <span>Now launching in Dallas, TX</span>
              </div>
              <div className="bg-blue-50 text-blue-600 px-4 py-3 rounded-xl flex items-center justify-center space-x-2 font-semibold text-sm border border-blue-100">
                <span>🍽️</span>
                <span>$1 Tray Bids every Friday. Limited spots only.</span>
              </div>
            </div>
          </div>

          {/* Right Side - Party Menu Bidding Block */}
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Time Remaining:</span>
                <span className="text-blue-600 font-semibold">{timeRemaining}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-semibold">$1 Bids Available</span>
              </div>
            </div>

            {/* Restaurant Cards */}
            <div className="space-y-4 flex-grow">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${restaurant.color === 'blue' ? 'bg-blue-500' : 'bg-gray-400'}`}>
                        {restaurant.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{restaurant.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-gray-600">{restaurant.rating}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-blue-600 font-semibold">{restaurant.type}</span>
                    <span className="text-gray-500"> • {restaurant.distance}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-gray-600">{restaurant.dish}</span>
                    <span className="ml-2 text-gray-500">• Serves {restaurant.serves}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-gray-600">{restaurant.bidders} bidders</span>
                    <span className="ml-2 text-gray-500">• ${restaurant.price}</span>
                  </div>
                  {restaurant.tag && (
                    <div className="mt-2 text-sm text-blue-600 font-semibold">{restaurant.tag}</div>
                  )}
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${restaurant.color === 'blue' ? 'bg-blue-500' : 'bg-gray-400'}`}
                        style={{ width: `${restaurant.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
