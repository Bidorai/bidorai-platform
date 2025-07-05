'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPinIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { AddressAutocomplete } from './AddressAutocomplete';
import { useUser, useClerk } from '@clerk/nextjs';
import { Modal } from './Modal';
import { SignIn, SignUp } from '@clerk/nextjs';
import { SearchBar } from './SearchBar';
import { MdMyLocation } from 'react-icons/md';

const mockBids = [
  {
    id: 1,
    name: 'Farm Fresh Kitchen',
    rating: 4.9,
    distance: '0.8 km',
    tags: ['Organic Certified'],
    menu: 'Organic Harvest Bowl',
    serves: 15,
    peopleBidding: 8,
    price: 217,
    badge: 'Fresh picked today!'
  },
  {
    id: 2,
    name: 'Green Garden Bistro',
    rating: 4.8,
    distance: '1.2 km',
    tags: ['Farm-to-Table'],
    menu: 'Sustainable Feast Tray',
    serves: 12,
    peopleBidding: 12,
    price: 185,
    badge: 'Best value!'
  },
  {
    id: 3,
    name: 'Tokyo Sushi',
    rating: 4.7,
    distance: '2.1 km',
    tags: ['Sushi', 'Japanese'],
    menu: 'Party Sushi Platter',
    serves: 10,
    peopleBidding: 5,
    price: 165,
    badge: ''
  }
];

export function HeroSection() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { signOut, loaded } = useClerk();
  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
    placeId: string;
  } | null>(null);
  const [locationInput, setLocationInput] = useState('Dallas, TX');
  const [partySize, setPartySize] = useState(15);
  const [usingCurrentLocation, setUsingCurrentLocation] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [authState, setAuthState] = useState<'loading' | 'signed-in' | 'signed-out'>('loading');
  const [isLocating, setIsLocating] = useState(false);

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

  const handleLocationSelect = (location: {
    address: string;
    lat: number;
    lng: number;
    placeId: string;
  }) => {
    setSelectedLocation(location);
    setLocationInput(location.address);
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      setUsingCurrentLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedLocation({
            address: 'Current Location',
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            placeId: ''
          });
          setLocationInput('Current Location');
          setUsingCurrentLocation(false);
        },
        () => {
          setUsingCurrentLocation(false);
        }
      );
    }
  };

  // Handler for clicking the location focus icon
  const handleLocationFocusClick = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let address = `Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
        let placeId = '';
        // Try to reverse geocode using Google Maps if available
        if (typeof google !== 'undefined' && google.maps && google.maps.Geocoder) {
          try {
            const geocoder = new google.maps.Geocoder();
            const result = await geocoder.geocode({ location: { lat: latitude, lng: longitude } });
            if (result.results && result.results.length > 0) {
              address = result.results[0].formatted_address || address;
              placeId = result.results[0].place_id || '';
            }
          } catch (err) {
            // fallback to lat/lng string
          }
        }
        setSelectedLocation({ address, lat: latitude, lng: longitude, placeId });
        setLocationInput(address);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        alert('Unable to retrieve your location.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      location: selectedLocation?.address || locationInput || 'Dallas, TX',
      partySize: partySize.toString(),
      q: ''
    });
    router.push(`/search?${params.toString()}`);
  };

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

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 overflow-hidden">
      {/* Header Section */}
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
              <div className="flex items-center space-x-2">
                <img
                  src={user.imageUrl}
                  alt={user.fullName || 'User'}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-700 font-medium">{user.firstName}</span>
              </div>
            ) : (
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Content Section */}
      <div className="flex items-center justify-center flex-1 px-4 py-2">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full items-stretch justify-center">
          {/* Left Block - Equal width */}
          <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center text-center">
            <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-lg font-bold mb-6">
              ✨ The world's first party tray food bidding app
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight flex flex-wrap items-center justify-center gap-x-3">
              <span className="text-gray-900">Bid your Meal.</span>
              <span className="text-blue-600">Win your Order. <span className="text-orange-500">Feast your Party.</span></span>
            </h1>
            <p className="text-2xl text-gray-700 mb-8 font-semibold">
              Bid on delicious half & full tray meals from local restaurants. <span className="font-bold text-blue-700">Name your price</span> and pick it up fresh.
            </p>
            <form onSubmit={handleSearch} className="flex flex-col gap-6 w-full items-center mb-6">
              <div className="flex gap-3 w-full items-center justify-center">
                {/* Location Input */}
                <div className="flex-1 relative">
                  <AddressAutocomplete
                    onLocationSelect={handleLocationSelect}
                    placeholder="Dallas, TX"
                    className="w-full pr-12 pl-3 py-4 text-lg rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    value={locationInput}
                    onChange={e => setLocationInput(e.target.value)}
                  />
                  <button type="button" onClick={handleLocationFocusClick} disabled={isLocating} className="absolute right-3 top-1/2 -translate-y-1/2 p-0 bg-transparent border-none cursor-pointer">
                    {isLocating ? (
                      <span className="w-7 h-7 flex items-center justify-center animate-spin"><svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg></span>
                    ) : (
                      <MdMyLocation className="w-7 h-7 text-blue-600" />
                    )}
                  </button>
                </div>
                <div className="flex items-center px-6 py-4 rounded-xl bg-gray-100 text-gray-700 font-bold text-lg">
                  <UserIcon className="w-7 h-7 mr-2" />
                  {partySize} people
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-4 px-8 rounded-xl text-2xl transition-colors duration-200 shadow-xl mt-2"
              >
                🍽️ Find My Perfect Party Menu
              </button>
            </form>
            <div className="flex flex-col gap-3 mt-4 w-full items-center justify-center">
              <div className="bg-blue-50 text-blue-700 px-6 py-3 rounded-xl text-lg font-bold flex items-center w-full justify-center">
                Now launching in Dallas, TX
              </div>
              <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-xl text-lg font-bold flex items-center w-full justify-center">
                🍽️ $1 Tray Bids every Friday. Limited spots only.
              </div>
            </div>
          </div>
          
          {/* Right Block - Equal width */}
          <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl">Party Menu Bidding</span>
                <span className="text-gray-400 cursor-pointer text-xl" title="How does bidding work?">ℹ️</span>
              </div>
              <span className="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">LIVE</span>
            </div>
            <div className="bg-blue-100 text-blue-700 rounded-xl px-6 py-3 mb-4 flex items-center justify-center font-bold text-lg w-full">
              ⏰ 2:36 remaining
            </div>
            <div className="bg-gray-900 text-white rounded-xl px-6 py-4 mb-6 flex flex-col items-center w-full">
              <span className="text-2xl font-extrabold mb-1">Save $284</span>
              <span className="text-base text-orange-300 font-bold">Average 18% below market price</span>
            </div>
            {/* Bidding Items with Scroll */}
            <div className="space-y-4 mb-12 w-full max-h-96 overflow-y-auto">
              {mockBids.slice(0, 3).map((bid) => (
                <div key={bid.id} className="bg-white border-2 border-gray-200 rounded-xl p-4 flex items-center justify-between w-full">
                  <div className="text-left">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="bg-blue-100 text-blue-700 font-extrabold rounded-full px-3 py-1 text-lg">
                        {bid.name[0]}
                      </span>
                      <span className="font-bold text-lg">{bid.name}</span>
                    </div>
                    <div className="text-base text-gray-500 font-semibold">{bid.menu} • Serves {bid.serves}</div>
                    <div className="flex items-center gap-3 text-base text-gray-500 font-semibold">
                      <span>{bid.rating} ★</span>
                      <span>{bid.distance}</span>
                      {bid.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="text-base text-blue-600 mt-1 font-bold">{bid.peopleBidding} people bidding</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-blue-700">${bid.price}</div>
                    {bid.badge && (
                      <div className="text-base bg-blue-100 text-blue-700 rounded px-3 py-1 mt-2 font-bold">{bid.badge}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-colors duration-200 shadow-lg mb-4">
              🎯 Join Live Bidding
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-8 rounded-xl text-lg transition-colors duration-200 shadow-lg">
              ▶️ Watch Demo
            </button>
          </div>
        </div>
      </div>

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
              onClick={() => {
                setShowSignIn(false);
                setShowSignUp(true);
              }}
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
              onClick={() => {
                setShowSignUp(false);
                setShowSignIn(true);
              }}
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
