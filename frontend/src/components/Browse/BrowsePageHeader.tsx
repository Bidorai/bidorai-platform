// frontend/src/components/browse/BrowsePageHeader.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, ShoppingCart, MapPin, Users, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'
import { useUser, UserButton } from '@clerk/nextjs'

interface BrowsePageHeaderProps {
  onLocationChange?: (location: string) => void
  onPartySizeChange?: (size: number) => void
  onSearch?: (query: string) => void
}

export default function BrowsePageHeader({ 
  onLocationChange, 
  onPartySizeChange, 
  onSearch 
}: BrowsePageHeaderProps) {
  const { user } = useUser()
  const searchParams = useSearchParams()
  
  // Initialize state with URL parameters or defaults
  const [location, setLocation] = useState('Dallas, TX')
  const [partySize, setPartySize] = useState(15)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)

  useEffect(() => {
    // Read initial values from URL parameters
    const urlLocation = searchParams.get('location')
    const urlPartySize = searchParams.get('partySize')
    const urlCuisine = searchParams.get('cuisine')
    
    if (urlLocation) {
      setLocation(urlLocation)
      onLocationChange?.(urlLocation)
      console.log('📍 Location loaded from URL:', urlLocation)
    }
    
    if (urlPartySize) {
      const parsedSize = parseInt(urlPartySize)
      if (parsedSize >= 10 && parsedSize <= 1000) {
        setPartySize(parsedSize)
        onPartySizeChange?.(parsedSize)
        console.log('👥 Party size loaded from URL:', parsedSize)
      }
    }
    
    if (urlCuisine) {
      console.log('🍽️ Cuisine filter loaded from URL:', urlCuisine)
    }

    // Show welcome message if parameters were passed
    if (urlLocation || urlPartySize) {
      setTimeout(() => {
        toast.success(`Welcome! Searching in ${urlLocation || location} for ${urlPartySize || partySize} people`)
      }, 500)
    }
  }, [searchParams, onLocationChange, onPartySizeChange])

  const requestLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser')
      return
    }

    setIsDetectingLocation(true)
    setLocation('📍 Getting your location...')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        let city = 'Dallas, TX'

        if (latitude >= 32.78 && latitude <= 32.88 && longitude >= -97.0 && longitude <= -96.9) {
          city = 'Irving, TX'
        } else if (latitude >= 32.7 && latitude <= 32.8 && longitude >= -97.0 && longitude <= -96.7) {
          city = 'Dallas, TX'
        } else if (latitude >= 33.0 && longitude <= -96.8) {
          city = 'Plano, TX'
        }
        
        setLocation(city)
        setIsDetectingLocation(false)
        onLocationChange?.(city)
        
        toast.success('✅ Location updated successfully')
      },
      (error) => {
        console.log('📍 Location error:', error.message)
        setLocation('Dallas, TX')
        setIsDetectingLocation(false)
        onLocationChange?.('Dallas, TX')
        toast.error('Could not detect location, using Dallas, TX')
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
    )
  }

  const validatePartySize = (value: string) => {
    let numValue = parseInt(value) || 15
    numValue = Math.max(10, Math.min(1000, numValue))
    numValue = Math.round(numValue / 5) * 5
    setPartySize(numValue)
    onPartySizeChange?.(numValue)
    
    const category = getPartySizeCategory(numValue)
    toast.info(`Planning for ${numValue} people - ${category}`)
  }

  const getPartySizeCategory = (size: number): string => {
    if (size <= 20) return 'Small gathering'
    if (size <= 50) return 'Medium event'
    if (size <= 100) return 'Large party'
    if (size <= 300) return 'Corporate event'
    return 'Major event'
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch?.(searchQuery)
      toast.info(`Searching for "${searchQuery}"...`)
    }
  }

  const showCart = () => {
    toast.info('Opening shopping cart...')
    console.log('🛒 Cart clicked')
  }

  return (
    <header className="bg-white border-b border-bidorai-neutral-200 shadow-sm sticky top-0 z-50">
      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-r from-bidorai-blue-600 to-bidorai-blue-700 rounded-lg flex items-center justify-center text-white shadow-lg shadow-bidorai-blue-600/30">
              🍽️
            </div>
            <span className="text-2xl font-extrabold text-bidorai-navy-900 tracking-tight">
              Bidorai
            </span>
          </Link>

          {/* Search Controls */}
          <div className="flex items-center gap-3 flex-1 max-w-4xl mx-4">
            {/* Location Field */}
            <div className="relative min-w-[200px]">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bidorai-neutral-400 w-4 h-4" />
              <input
                type="text"
                className="w-full pl-10 pr-20 py-2 border border-bidorai-neutral-300 rounded-md text-sm bg-white transition-colors focus:outline-none focus:border-bidorai-blue-600"
                value={location}
                readOnly
                placeholder="Enter pickup location..."
              />
              <button
                type="button"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-bidorai-blue-600 text-white border-none rounded px-2 py-1 text-xs cursor-pointer font-semibold whitespace-nowrap disabled:opacity-50 hover:bg-bidorai-blue-700 transition-colors"
                onClick={requestLocation}
                disabled={isDetectingLocation}
              >
                {isDetectingLocation ? '📍 Getting...' : '📍 Detect'}
              </button>
            </div>

            {/* Party Size Field */}
            <div className="relative min-w-[120px]">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bidorai-neutral-400 w-4 h-4" />
              <input
                type="number"
                min="10"
                max="1000"
                step="5"
                value={partySize}
                onChange={(e) => validatePartySize(e.target.value)}
                placeholder="Party size"
                className="w-full pl-10 pr-3 py-2 border border-bidorai-neutral-300 rounded-md text-sm bg-white transition-colors focus:outline-none focus:border-bidorai-blue-600"
              />
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex flex-1 min-w-[200px]">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bidorai-neutral-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-bidorai-neutral-300 rounded-l-md text-sm bg-white transition-colors focus:outline-none focus:border-bidorai-blue-600"
                  placeholder="Search restaurants & cuisines..."
                />
              </div>
              <button
                type="submit"
                className="bg-bidorai-blue-600 hover:bg-bidorai-blue-700 text-white px-4 py-2 rounded-r-md transition-colors text-sm font-medium"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-4">
            <span className="hidden lg:flex items-center gap-2 text-bidorai-neutral-600 font-medium text-sm">
              <span className="text-base">📞</span>
              <a href="tel:1-800-BIDORAI" className="hover:text-bidorai-blue-600 transition-colors">
                1-800-BIDORAI
              </a>
            </span>
            
            <Link 
              href="/restaurants" 
              className="hidden md:block text-bidorai-neutral-600 font-medium hover:text-bidorai-blue-600 transition-colors text-sm"
            >
              For Restaurants
            </Link>
            
            <button 
              onClick={showCart}
              className="relative group flex items-center justify-center w-9 h-9 rounded-lg hover:bg-bidorai-neutral-100 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 text-bidorai-neutral-600 group-hover:text-bidorai-blue-600 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md">
                2
              </span>
            </button>
            
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:block text-sm text-bidorai-neutral-600">
                  Hi, {user.firstName || 'User'}
                </span>
                <UserButton afterSignOutUrl="/sign-in" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  href="/sign-in"
                  className="text-bidorai-neutral-600 hover:text-bidorai-blue-600 font-medium transition-colors text-sm"
                >
                  Sign In
                </Link>
                <Link 
                  href="/sign-up"
                  className="bg-bidorai-blue-600 hover:bg-bidorai-blue-700 text-white px-3 py-2 rounded-md font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>


    </header>
  )
}