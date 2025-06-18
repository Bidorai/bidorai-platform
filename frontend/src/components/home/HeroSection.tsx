// frontend/src/components/home/HeroSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Users } from 'lucide-react'
import { toast } from 'sonner'

export function HeroSection() {
  const router = useRouter()
  const [location, setLocation] = useState('Detecting your location...')
  const [partySize, setPartySize] = useState(15)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [cuisine, setCuisine] = useState('')

  const cuisineOptions = [
    { value: '', label: 'All Cuisines' },
    { value: 'italian', label: 'Italian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'bbq', label: 'BBQ' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'indian', label: 'Indian' },
    { value: 'thai', label: 'Thai' }
  ]

  useEffect(() => {
    // Initialize location on component mount
    requestLocation()
  }, [])

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocation('Dallas, TX')
      setIsDetectingLocation(false)
      updateForLocation('Dallas, TX')
      return
    }

    setIsDetectingLocation(true)
    setLocation('📍 Getting your location...')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        console.log('📍 Location detected:', latitude, longitude)
        
        // Detect Dallas area cities
        let city = 'Dallas, TX'
        if (latitude >= 32.78 && latitude <= 32.88 && longitude >= -97.0 && longitude <= -96.9) {
          city = 'Irving, TX'
          toast.success('🏠 Irving special offers detected!')
        } else if (latitude >= 32.7 && latitude <= 32.8 && longitude >= -97.0 && longitude <= -96.7) {
          city = 'Dallas, TX'
        } else if (latitude >= 33.0 && longitude <= -96.8) {
          city = 'Plano, TX'
        }
        
        setLocation(city)
        setIsDetectingLocation(false)
        updateForLocation(city)
        
        setTimeout(() => {
          toast.success('✅ Location set successfully')
        }, 500)
      },
      (error) => {
        console.log('📍 Location error:', error.message)
        setLocation('Dallas, TX')
        setIsDetectingLocation(false)
        updateForLocation('Dallas, TX')
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
    )
  }

  const updateForLocation = (locationStr: string) => {
    console.log('🏙️ Updating for location:', locationStr)
  }

  const validatePartySize = (value: string) => {
    let numValue = parseInt(value) || 15
    numValue = Math.max(10, Math.min(1000, numValue))
    numValue = Math.round(numValue / 5) * 5
    setPartySize(numValue)
    
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

  const handleCuisineSelection = (value: string) => {
    setCuisine(value)
    if (value) {
      const option = cuisineOptions.find(opt => opt.value === value)
      toast.success(`${option?.label} cuisine selected`)
    }
  }

  // Updated function to navigate with parameters
  const searchPartyMenu = () => {
    // Validate required fields
    if (!location || location.includes('Detecting') || location.includes('Getting')) {
      toast.error('Please set your pickup location first')
      return
    }

    if (partySize < 10) {
      toast.error('Party size must be at least 10 people')
      return
    }

    toast.success('Searching for perfect party menus...')
    
    // Build URL with search parameters
    const searchParams = new URLSearchParams({
      location: location,
      partySize: partySize.toString(),
      ...(cuisine && { cuisine: cuisine })
    })

    // Navigate to browse page with parameters
    setTimeout(() => {
      router.push(`/browse?${searchParams.toString()}`)
    }, 500)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lift p-8 lg:p-10 flex flex-col justify-center animate-slide-up-fade">
      {/* Tagline */}
      <div className="flex justify-center mb-6">
        <div className="bg-bidorai-blue-50 text-bidorai-blue-600 px-5 py-3 rounded-full font-semibold text-base border-2 border-bidorai-blue-200">
          ✨ The world's first party tray food bidding app
        </div>
      </div>
      
      {/* Main Heading */}
      <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-bidorai-navy-900 text-center mb-5 leading-tight tracking-tight">
        Bid your Meal.<br />
        <span className="text-bidorai-blue-600">Win your Order.</span><br />
        <span className="text-orange-500">Feast your Party.</span>
      </h1>
      
      {/* Subtitle */}
      <p className="text-lg lg:text-xl text-bidorai-neutral-600 text-center mb-7 font-medium max-w-lg mx-auto leading-relaxed">
        Bid on delicious half & full tray meals from local restaurants.{' '}
        <span className="text-bidorai-blue-600 font-semibold"> Name your price </span> 
        and pick it up fresh.
      </p>

      {/* Search Form */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bidorai-neutral-400 w-5 h-5" />
            <input
              type="text"
              className="w-full pl-12 pr-28 py-4 border-2 border-bidorai-neutral-200 rounded-lg text-base bg-white transition-colors focus:outline-none focus:border-bidorai-blue-600 min-h-[48px]"
              value={location}
              readOnly
              placeholder="Pickup location..."
            />
            <button
              type="button"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-bidorai-blue-600 text-white border-none rounded-md px-3 py-2 text-xs cursor-pointer font-semibold whitespace-nowrap disabled:opacity-50"
              onClick={requestLocation}
              disabled={isDetectingLocation}
            >
              {isDetectingLocation ? '📍 Getting...' : '📍 Use My Location'}
            </button>
          </div>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bidorai-neutral-400 w-5 h-5" />
            <input
              type="number"
              min="10"
              max="1000"
              step="5"
              value={partySize}
              onChange={(e) => validatePartySize(e.target.value)}
              placeholder="Party size (10-1000)"
              className="w-full pl-12 pr-4 py-4 border-2 border-bidorai-neutral-200 rounded-lg text-base bg-white transition-colors focus:outline-none focus:border-bidorai-blue-600 min-h-[48px]"
            />
          </div>
        </div>
        <button
          onClick={searchPartyMenu}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] min-h-[48px]"
        >
          🍽️ Find My Perfect Party Menu
        </button>
      </div>

      {/* Promo Messages */}
      <div className="space-y-3">
        <div className="bg-bidorai-navy-50 text-bidorai-navy-800 px-5 py-4 rounded-xl flex items-center justify-center gap-3 font-semibold border border-bidorai-navy-100">
          <span className="text-lg">🚀</span>
          <span>Now launching in Dallas, TX</span>
        </div>
        <div className="bg-bidorai-blue-50 text-bidorai-blue-600 px-5 py-4 rounded-xl flex items-center justify-center gap-3 font-semibold border border-bidorai-blue-200">
          <span className="text-lg">🍽️</span>
          <span>$1 Tray Bids every Friday. Limited spots only.</span>
        </div>
      </div>
    </div>
  )
}