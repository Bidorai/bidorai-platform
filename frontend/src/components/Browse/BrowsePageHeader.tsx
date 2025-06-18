// frontend/src/components/Browse/BrowsePageHeader.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, Search } from 'lucide-react'
import { toast } from 'sonner'
import { LocationAutocomplete } from '@/components/common/LocationAutocomplete'
import { useLocation } from '@/contexts/LocationContext'

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
  const { location } = useLocation()
  const [partySize, setPartySize] = useState(15)
  const [searchQuery, setSearchQuery] = useState('')

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

  const handleLocationSelect = (address: string, coordinates: { lat: number; lng: number }) => {
    onLocationChange?.(address)
    console.log('Location updated in header:', address, coordinates)
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
            {/* Location Field - Now using LocationAutocomplete */}
            <div className="relative min-w-[200px]">
              <LocationAutocomplete
                placeholder="Enter pickup location..."
                onLocationSelect={handleLocationSelect}
              />
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

            {/* Account Links */}
            <div className="flex items-center gap-3 text-sm">
              <Link 
                href="/sign-in" 
                className="text-bidorai-neutral-600 hover:text-bidorai-blue-600 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up" 
                className="bg-bidorai-blue-600 hover:bg-bidorai-blue-700 text-white px-4 py-2 rounded-md transition-colors font-medium"
              >
                Sign Up
              </Link>
            </div>

            {/* Cart */}
            <button
              onClick={showCart}
              className="relative p-2 text-bidorai-neutral-600 hover:text-bidorai-blue-600 transition-colors"
            >
              <span className="text-xl">🛒</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Location Info Bar */}
      {location.address && (
        <div className="bg-bidorai-blue-50 border-t border-bidorai-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-2 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-bidorai-blue-700">
                <span>📍</span>
                <span>Delivering to: <strong>{location.address}</strong></span>
              </div>
              <div className="text-bidorai-blue-600">
                Party size: <strong>{partySize} people</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}