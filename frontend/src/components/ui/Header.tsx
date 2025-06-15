'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Phone, X } from 'lucide-react';
import { SignIn, SignUp, useUser, UserButton } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import SearchDropdown from './SearchDropdown';
import Button from './Button';

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const { isSignedIn, user } = useUser();
  const searchParams = useSearchParams();

  // Handle URL parameters for opening modals
  useEffect(() => {
    const auth = searchParams.get('auth');
    if (auth === 'signin') {
      setShowSignIn(true);
      setShowSignUp(false);
      // Clean up URL
      window.history.replaceState({}, '', '/');
    } else if (auth === 'signup') {
      setShowSignUp(true);
      setShowSignIn(false);
      // Clean up URL
      window.history.replaceState({}, '', '/');
    }
  }, [searchParams]);

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

  const openSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const openSignUp = () => {
    setShowSignUp(true);
    setShowSignIn(false);
  };

  const closeModals = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  // Modal backdrop component
  const ModalBackdrop = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        
        {/* Modal Body */}
        <div className="p-6 pt-12">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <>
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
              
              {/* Authentication Buttons */}
              {isSignedIn ? (
                <div className="flex items-center gap-3">
                  <span className="hidden sm:block text-gray-700 font-medium">
                    Welcome, {user?.firstName || 'User'}!
                  </span>
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10",
                        userButtonPopoverCard: "shadow-2xl border border-gray-200",
                        userButtonPopoverActionButton: "hover:bg-blue-50"
                      }
                    }}
                  />
                </div>
              ) : (
                <>
                  <Button variant="ghost" onClick={openSignIn}>
                    Sign In
                  </Button>
                  <Button variant="primary" onClick={openSignUp}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sign In Modal */}
      {showSignIn && (
        <ModalBackdrop onClose={closeModals}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Sign in to your Bidorai account</p>
          </div>
          
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                card: "shadow-none border-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
                formFieldInput: "border-gray-300 focus:border-blue-600 focus:ring-blue-600",
                footerActionLink: "text-blue-600 hover:text-blue-700"
              }
            }}
            redirectUrl="/"
            signUpUrl="#"
          />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={openSignUp}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign up here
              </button>
            </p>
          </div>
        </ModalBackdrop>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <ModalBackdrop onClose={closeModals}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Join Bidorai!</h2>
            <p className="text-gray-600">Create your account and start bidding</p>
          </div>
          
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                card: "shadow-none border-0",
                headerTitle: "hidden", 
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
                formFieldInput: "border-gray-300 focus:border-blue-600 focus:ring-blue-600",
                footerActionLink: "text-blue-600 hover:text-blue-700"
              }
            }}
            redirectUrl="/"
            signInUrl="#"
          />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={openSignIn}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign in here
              </button>
            </p>
          </div>
        </ModalBackdrop>
      )}
    </>
  );
};

export default Header;