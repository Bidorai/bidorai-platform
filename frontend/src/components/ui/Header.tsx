'use client';

import React, { useState } from 'react';
import { Search, ShoppingCart, Phone } from 'lucide-react';
import SearchDropdown from './SearchDropdown';
import Button from './Button';

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchFocus = () => {
    setShowDropdown(true);
  };

  const handleSearchBlur = (e: React.FocusEvent) => {
    // Delay hiding to allow clicks on dropdown items
    setTimeout(() => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setShowDropdown(false);
      }
    }, 200);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between h-16 gap-5">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white text-sm shadow-lg shadow-blue-600/30">
              🍽️
            </div>
            <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
              Bidorai
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative z-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <input
                type="text"
                className="w-full pl-11 pr-3 py-3 border border-gray-300 rounded-lg text-base bg-gray-50 transition-all duration-200 focus:outline-none focus:border-blue-600 focus:bg-white focus:shadow-lg focus:shadow-blue-600/10"
                placeholder="Search BIDORAI"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              
              {showDropdown && (
                <SearchDropdown
                  searchTerm={searchValue}
                  onSelect={(term) => {
                    setSearchValue(term);
                    setShowDropdown(false);
                  }}
                />
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-1.5 text-gray-600 font-medium">
              <Phone className="w-4 h-4" />
              <span>1-800-BIDORAI</span>
            </div>
            
            <span className="hidden lg:block text-gray-600 font-medium">
              For Restaurant Owners
            </span>
            
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg shadow-blue-600/30">
                2
              </div>
            </div>
            
            <Button variant="ghost">Sign In</Button>
            <Button variant="primary">Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;