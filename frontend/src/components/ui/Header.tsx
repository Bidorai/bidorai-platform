// frontend/src/components/ui/Header.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';
import { Search, ShoppingCart, Phone, Menu, X } from 'lucide-react';
import Button from './Button';
import { SearchDropdown } from './SearchDropdown';

interface HeaderProps {
  variant?: 'default' | 'minimal';
}

const Header: React.FC<HeaderProps> = ({ variant = 'default' }) => {
  const { isSignedIn, user } = useUser();
  const [searchValue, setSearchValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchFocus = () => setShowDropdown(true);
  const handleSearchBlur = (e: React.FocusEvent) => {
    setTimeout(() => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setShowDropdown(false);
      }
    }, 200);
  };

  const navigation = [
    { name: 'Browse', href: '/browse' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'For Restaurants', href: '#restaurants' },
  ];

  if (variant === 'minimal') {
    return (
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white text-sm">
                🍽️
              </div>
              <span className="text-xl font-bold text-gray-900">BIDORAI</span>
            </Link>
            
            {isSignedIn && (
              <UserButton afterSignOutUrl="/" />
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white shadow-lg">
              🍽️
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              BIDORAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-200"
                placeholder="Search restaurants, cuisines..."
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

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Contact Info */}
            <div className="hidden lg:flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="font-medium">1-800-BIDORAI</span>
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Link>

            {/* Authentication */}
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <Link href="/bidding">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10",
                    }
                  }}
                />
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/sign-in">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="primary">Join Free</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Navigation Links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Authentication for Mobile */}
              {!isSignedIn && (
                <div className="border-t border-gray-200 pt-4 px-4 space-y-3">
                  <Link href="/sign-in" className="block">
                    <Button variant="ghost" className="w-full justify-center">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up" className="block">
                    <Button variant="primary" className="w-full justify-center">
                      Join Free
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;