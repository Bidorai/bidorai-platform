'use client';

import { useState } from 'react';

export default function Header() {
  const [cartCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-[#1877F2] to-[#1565C0] rounded-lg flex items-center justify-center text-white shadow-lg">
              <span className="text-base">🍽️</span>
            </div>
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Bidorai</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search restaurants, cuisines..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all"
              />
            </div>

            {/* Search Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                <div className="p-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Popular Searches</div>
                  <div className="space-y-1">
                    {['Pizza', 'Sushi', 'Tacos', 'BBQ', 'Italian'].map((item) => (
                      <div
                        key={item}
                        className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer text-sm"
                        onClick={() => setSearchQuery(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-1 text-gray-600 font-medium text-sm">
              📞 1-800-BIDORAI
            </span>
            <span className="hidden lg:inline text-gray-600 font-medium text-sm cursor-pointer hover:text-[#1877F2]">
              For Restaurants
            </span>
            
            {/* Cart */}
            <div className="relative cursor-pointer">
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </div>
              )}
            </div>
            
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-all text-sm">
              Sign In
            </button>
            <button className="px-4 py-2 bg-[#1877F2] text-white hover:bg-[#1565C0] rounded-lg font-semibold shadow-md hover:shadow-lg transition-all text-sm">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}