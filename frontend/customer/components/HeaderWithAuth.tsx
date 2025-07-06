"use client";
import { useState, useEffect, useRef } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Modal } from './Modal';
import { SignIn, SignUp } from '@clerk/nextjs';
import { SearchBar } from './SearchBar';
import { AddressAutocomplete } from './AddressAutocomplete';
import { MapPinIcon, UsersIcon, MagnifyingGlassIcon, Bars3Icon, MapIcon } from '@heroicons/react/24/outline';
import { MdMyLocation } from 'react-icons/md';
import { useSearch } from '../contexts/SearchContext';

export default function HeaderWithAuth() {
  const { isSignedIn, user } = useUser();
  const { signOut, loaded } = useClerk();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { viewMode, setViewMode } = useSearch();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [authState, setAuthState] = useState<'loading' | 'signed-in' | 'signed-out'>('loading');
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Search page specific state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || 'Dallas, TX');
  const [partySize, setPartySize] = useState(parseInt(searchParams.get('partySize') || '15'));
  const [isLocating, setIsLocating] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
    placeId: string;
  } | null>(null);

  const isSearchPage = pathname === '/search';
  const isBiddingPage = pathname === '/bidding';

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
      // Close modals if user is signed in
      if (showSignIn || showSignUp) {
        console.log('User signed in, closing modals');
        closeModals();
      }
    } else {
      setAuthState('signed-out');
    }
  }, [loaded, isSignedIn, showSignIn, showSignUp]);

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

  // Search page specific handlers
  const handleLocationSelect = (location: {
    address: string;
    lat: number;
    lng: number;
    placeId: string;
  }) => {
    setSelectedLocation(location);
    setLocation(location.address);
  };

  const handleLocationFocusClick = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let address = `Nearby (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
        let placeId = '';
        
        // Try to get approximate location using Google Maps if available
        if (typeof google !== 'undefined' && google.maps && google.maps.Geocoder) {
          try {
            const geocoder = new google.maps.Geocoder();
            const result = await geocoder.geocode({ location: { lat: latitude, lng: longitude } });
            if (result.results && result.results.length > 0) {
              // Get approximate location (city/neighborhood level) instead of exact address
              const addressComponents = result.results[0].address_components;
              let city = '';
              let state = '';
              let neighborhood = '';
              
              // Extract city, state, and neighborhood information
              for (const component of addressComponents) {
                if (component.types.includes('locality')) {
                  city = component.long_name;
                } else if (component.types.includes('administrative_area_level_1')) {
                  state = component.short_name;
                } else if (component.types.includes('sublocality_level_1') || 
                          component.types.includes('neighborhood')) {
                  neighborhood = component.long_name;
                }
              }
              
              // Create approximate location string
              if (neighborhood && city) {
                address = `${neighborhood}, ${city}`;
              } else if (city && state) {
                address = `${city}, ${state}`;
              } else if (city) {
                address = city;
              } else {
                // Fallback to approximate coordinates
                address = `Nearby (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
              }
              
              placeId = result.results[0].place_id || '';
            }
          } catch (err) {
            // Fallback to approximate coordinates
            address = `Nearby (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
          }
        } else {
          // No Google Maps available, use approximate coordinates
          address = `Nearby (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
        }
        
        setSelectedLocation({ address, lat: latitude, lng: longitude, placeId });
        setLocation(address);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        alert('Unable to retrieve your location.');
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (location) params.append('location', location);
    if (partySize) params.append('partySize', partySize.toString());
    router.push(`/search?${params.toString()}`);
  };

  const handlePartySizeChange = (newSize: number) => {
    setPartySize(newSize);
  };

  // Enhanced monitoring for social authentication completion
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (showSignIn || showSignUp) {
      // Poll for authentication state changes every 200ms when modals are open
      interval = setInterval(() => {
        if (isSignedIn && loaded) {
          console.log('Social auth detected, closing modals immediately');
          closeModals();
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
          }
        }, 500);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isSignedIn, loaded]);

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
            {isSearchPage ? (
              <div className="flex items-center space-x-4 flex-1 max-w-4xl">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search restaurants or cuisines..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <MagnifyingGlassIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 text-sm">
                  <MapPinIcon className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{location}</span>
                  <button 
                    onClick={handleLocationFocusClick}
                    disabled={isLocating}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {isLocating ? (
                      <span className="w-4 h-4 animate-spin">⏳</span>
                    ) : (
                      <MdMyLocation className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Party Size */}
                <div className="flex items-center space-x-2 text-sm">
                  <UsersIcon className="w-4 h-4 text-gray-500" />
                  <select
                    value={partySize}
                    onChange={(e) => handlePartySizeChange(parseInt(e.target.value))}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map(size => (
                      <option key={size} value={size}>{size} people</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <SearchBar />
            )}
          </div>
          
          {/* Right: Links, Cart, Auth */}
          <div className="flex items-center space-x-4">
            {isBiddingPage && (
              <a href="/search" className="text-gray-600 hover:text-blue-600 whitespace-nowrap">Search Restaurants</a>
            )}
            {authState === 'signed-out' && !isSearchPage && (
              <a href="/restaurantowners" className="text-gray-600 hover:text-blue-700 whitespace-nowrap">For Restaurants</a>
            )}
            <div className="relative">
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5">2</span>
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-2.2L17 13M7 13V6h13" /></svg>
            </div>
            
            {/* Auth Section */}
            {authState === 'signed-out' ? (
              <div className="flex items-center space-x-3">
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
            {isSearchPage ? (
              <div className="flex items-center space-x-4 flex-1 max-w-4xl">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search restaurants or cuisines..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <MagnifyingGlassIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 text-sm">
                  <MapPinIcon className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{location}</span>
                  <button 
                    onClick={handleLocationFocusClick}
                    disabled={isLocating}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {isLocating ? (
                      <span className="w-4 h-4 animate-spin">⏳</span>
                    ) : (
                      <MdMyLocation className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Party Size */}
                <div className="flex items-center space-x-2 text-sm">
                  <UsersIcon className="w-4 h-4 text-gray-500" />
                  <select
                    value={partySize}
                    onChange={(e) => handlePartySizeChange(parseInt(e.target.value))}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map(size => (
                      <option key={size} value={size}>{size} people</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <SearchBar />
            )}
          </div>
          
          {/* Right: Links, Cart, Auth */}
          <div className="flex items-center space-x-4">
            {isBiddingPage && (
              <a href="/search" className="text-gray-600 hover:text-blue-600 whitespace-nowrap">Search Restaurants</a>
            )}
            {authState === 'signed-out' && !isSearchPage && (
              <a href="/restaurantowners" className="text-gray-600 hover:text-blue-700 whitespace-nowrap">For Restaurants</a>
            )}
            <div className="relative">
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5">2</span>
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-2.2L17 13M7 13V6h13" /></svg>
            </div>
            
            {/* Auth Section */}
            {authState === 'signed-out' ? (
              <div className="flex items-center space-x-3">
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