'use client';

import { useState } from 'react';
import SearchBar from './SearchBar';
import { ClientOnly } from './ClientOnly';

export default function Header() {
  const [cartCount] = useState(2);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
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
          <ClientOnly>
            <SearchBar />
          </ClientOnly>

          {/* Navigation */}
          <div className="flex items-center gap-5">
            <span className="hidden md:flex items-center gap-1 text-gray-600 font-medium">
              <span>📞</span>
              1-800-BIDORAI
            </span>
            <span className="hidden lg:inline text-gray-600 font-medium">For Restaurant Owners</span>
            
            {/* Cart */}
            <div className="relative cursor-pointer">
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-[#1877F2] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md">
                  {cartCount}
                </div>
              )}
            </div>
            
            <button className="btn btn-ghost">Sign In</button>
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </div>
    </header>
  );
}