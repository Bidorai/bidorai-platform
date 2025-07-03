"use client";
import { useState, useEffect, useRef } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { Modal } from './Modal';
import { SignIn, SignUp } from '@clerk/nextjs';
import { SearchBar } from './SearchBar';

export default function HeaderWithAuth() {
  const { isSignedIn, user } = useUser();
  const { signOut, loaded } = useClerk();
  const pathname = usePathname();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [authState, setAuthState] = useState<'loading' | 'signed-in' | 'signed-out'>('loading');
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Hide header on restaurant page
  if (pathname === '/restaurant') {
    return null;
  }

  // Debug logging
  useEffect(() => {
    console.log('Auth state changed:', { loaded, isSignedIn, user: user?.id, authState });
  }, [loaded, isSignedIn, user, authState]);

  // Update auth state when Clerk state changes
  useEffect(() => {
    if (!loaded) {
      setAuthState('loading');
    } else if (isSignedIn) {
      setAuthState('signed-in');
    } else {
      setAuthState('signed-out');
    }
  }, [loaded, isSignedIn]);

  // Immediate check for authentication state when component mounts
  useEffect(() => {
    if (loaded && isSignedIn && (showSignIn || showSignUp)) {
      console.log('User already signed in on mount, closing modals');
      closeModals();
    }
  }, [loaded, isSignedIn, showSignIn, showSignUp]);

  const openSignIn = () => {
    setShowSignIn(true);
  };

  const openSignUp = () => {
    setShowSignUp(true);
  };

  const closeModals = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const switchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const switchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const handleLogout = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  // Close modals when user signs in successfully
  useEffect(() => {
    if (authState === 'signed-in' && (showSignIn || showSignUp)) {
      console.log('User signed in, closing modals');
      closeModals();
    }
  }, [authState, showSignIn, showSignUp]);

  // Additional authentication state monitoring for social auth
  useEffect(() => {
    if (isSignedIn && (showSignIn || showSignUp)) {
      console.log('User is signed in, closing modals');
      closeModals();
    }
  }, [isSignedIn, showSignIn, showSignUp]);

  // Enhanced monitoring for social authentication completion
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (showSignIn || showSignUp) {
      // Poll for authentication state changes every 200ms when modals are open
      interval = setInterval(() => {
        if (isSignedIn && loaded) {
          console.log('Social auth detected, closing modals immediately');
          closeModals();
          // Force a re-render to update the UI
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 100);
        }
      }, 200);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showSignIn, showSignUp, isSignedIn, loaded]);

  // Listen for URL hash changes (Clerk uses hash routing)
  useEffect(() => {
    const handleHashChange = () => {
      // Check if the hash indicates successful authentication
      const hash = window.location.hash;
      if (hash.includes('__clerk_status=complete') || hash.includes('__clerk_status=success')) {
        console.log('Clerk authentication completed, checking state');
        // Force a re-check of authentication state
        setTimeout(() => {
          if (isSignedIn && loaded) {
            closeModals();
            window.location.href = '/dashboard';
          }
        }, 500);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isSignedIn, loaded]);

  // Additional monitoring for Clerk state changes
  useEffect(() => {
    if (loaded && isSignedIn && (showSignIn || showSignUp)) {
      console.log('Clerk state changed to signed in, closing modals');
      closeModals();
      // Small delay to ensure state is fully updated
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 100);
    }
  }, [loaded, isSignedIn, showSignIn, showSignUp]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    // Close menu when pressing Escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showUserMenu]);

  // Don't render auth buttons until Clerk is loaded
  if (!loaded || authState === 'loading') {
    return (
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Left: Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Bidovio Logo" className="w-9 h-9" />
            <span className="font-bold text-2xl text-blue-700">Bidovio</span>
          </a>
          {/* Center: Search Bar */}
          <div className="flex-1 flex justify-center">
            <SearchBar />
          </div>
          {/* Right: Phone, Links, Cart, Auth */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1 text-red-600 font-semibold whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>1-800-BIDORAI</span>
            </div>
            {authState === 'signed-out' && (
              <a href="/restaurantowners" className="text-gray-600 hover:text-blue-700 whitespace-nowrap">For Restaurants</a>
            )}
            <div className="relative">
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5">2</span>
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-2.2L17 13M7 13V6h13" /></svg>
            </div>
            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Left: Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Bidovio Logo" className="w-9 h-9" />
            <span className="font-bold text-2xl text-blue-700">Bidovio</span>
          </a>
          {/* Center: Search Bar */}
          <div className="flex-1 flex justify-center">
            <SearchBar />
          </div>
          {/* Right: Phone, Links, Cart, Auth */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1 text-red-600 font-semibold whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>1-800-BIDORAI</span>
            </div>
            {authState === 'signed-out' && (
              <a href="/restaurantowners" className="text-gray-600 hover:text-blue-700 whitespace-nowrap">For Restaurants</a>
            )}
            <div className="relative">
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5">2</span>
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-2.2L17 13M7 13V6h13" /></svg>
            </div>
            
            {/* Auth Section */}
            {authState === 'signed-out' ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={openSignIn}
                  className="text-gray-600 hover:text-blue-700 font-medium"
                >
                  Sign in
                </button>
                <button
                  onClick={openSignUp}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Sign up
                </button>
              </div>
            ) : authState === 'signed-in' && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </a>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      href="/bids"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Bids
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
            )}
          </div>
        </div>
      </header>
      {/* Auth Modals */}
      <Modal open={showSignIn} onClose={closeModals}>
        <div>
          <SignIn 
            routing="hash" 
            afterSignInUrl="/dashboard" 
            afterSignUpUrl="/dashboard"
            appearance={{
              elements: {
                footerActionLink: "hidden",
              }
            }}
          />
          <div className="mt-4 text-center border-t pt-4">
            <button
              onClick={switchToSignUp}
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={showSignUp} onClose={closeModals}>
        <div>
          <SignUp 
            routing="hash" 
            afterSignInUrl="/dashboard" 
            afterSignUpUrl="/dashboard"
            appearance={{
              elements: {
                footerActionLink: "hidden",
              }
            }}
          />
          <div className="mt-4 text-center border-t pt-4">
            <button
              onClick={switchToSignIn}
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
} 