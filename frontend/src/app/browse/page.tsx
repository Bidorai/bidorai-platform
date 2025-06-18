// frontend/src/app/browse/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronDown, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
// Use enhanced header for browse page
import BrowsePageHeader from '@/components/browse/BrowsePageHeader'
import { Footer } from '@/components/home/Footer'

// Mock restaurant data matching ezCater format
const mockRestaurants = [
  {
    id: 1,
    name: "Urban Donut",
    image: "/api/placeholder/300/200",
    rating: 4.9,
    distance: "25 mi",
    rewardMultiplier: "2x",
    isFavorited: false,
    isReliabilityRockstar: false,
    category: "Desserts"
  },
  {
    id: 2,
    name: "Mi Casita",
    image: "/api/placeholder/300/200", 
    rating: 4.8,
    distance: "24 mi",
    rewardMultiplier: "3x",
    isFavorited: false,
    isReliabilityRockstar: false,
    category: "Mexican"
  },
  {
    id: 3,
    name: "Tastefully Texas Events",
    image: "/api/placeholder/300/200",
    rating: 4.9,
    distance: "15 mi", 
    rewardMultiplier: "3x",
    isFavorited: false,
    isReliabilityRockstar: true,
    category: "BBQ"
  },
  {
    id: 4,
    name: "Jersey Mike's Subs",
    image: "/api/placeholder/300/200",
    rating: 4.8,
    distance: "6 mi",
    rewardMultiplier: null,
    isFavorited: false,
    isReliabilityRockstar: true,
    category: "Sandwiches"
  },
  {
    id: 5,
    name: "Olive Garden",
    image: "/api/placeholder/300/200",
    rating: 4.8,
    distance: "6 mi",
    rewardMultiplier: null,
    isFavorited: false,
    isReliabilityRockstar: true,
    category: "Italian"
  },
  {
    id: 6,
    name: "Corner Bakery Cafe",
    image: "/api/placeholder/300/200",
    rating: 4.8,
    distance: "11 mi",
    rewardMultiplier: "3x",
    isFavorited: false,
    isReliabilityRockstar: false,
    category: "Breakfast"
  },
  {
    id: 7,
    name: "Panda Express",
    image: "/api/placeholder/300/200",
    rating: 4.6,
    distance: "8 mi",
    rewardMultiplier: "2x",
    isFavorited: false,
    isReliabilityRockstar: false,
    category: "Asian"
  },
  {
    id: 8,
    name: "Mediterranean Grill",
    image: "/api/placeholder/300/200",
    rating: 4.7,
    distance: "12 mi",
    rewardMultiplier: null,
    isFavorited: false,
    isReliabilityRockstar: true,
    category: "Mediterranean"
  },
  {
    id: 9,
    name: "Tony's Pizza Palace",
    image: "/api/placeholder/300/200",
    rating: 4.5,
    distance: "5 mi",
    rewardMultiplier: "2x",
    isFavorited: false,
    isReliabilityRockstar: false,
    category: "Pizza"
  }
]

const featuredRestaurants = [
  {
    id: 101,
    name: "Urban Donut", 
    image: "/api/placeholder/300/200",
    rating: 4.9,
    distance: "25 mi",
    rewardMultiplier: "2x"
  },
  {
    id: 102,
    name: "Mi Casita",
    image: "/api/placeholder/300/200",
    rating: 4.8, 
    distance: "24 mi",
    rewardMultiplier: "3x"
  },
  {
    id: 103,
    name: "Tastefully Texas Events",
    image: "/api/placeholder/300/200",
    rating: 4.9,
    distance: "15 mi",
    rewardMultiplier: "3x"
  },
  {
    id: 104,
    name: "Rainbow Cafe",
    image: "/api/placeholder/300/200",
    rating: 4.7,
    distance: "18 mi",
    rewardMultiplier: "2x"
  }
]

const cuisineTypes = [
  { name: 'Asian', icon: '🥢', active: false },
  { name: 'BBQ', icon: '🍖', active: false },
  { name: 'Breakfast', icon: '🥞', active: false },
  { name: 'Italian', icon: '🍝', active: false },
  { name: 'Mediterranean', icon: '🫒', active: false },
  { name: 'Mexican', icon: '🌮', active: false },
  { name: 'Pizza', icon: '🍕', active: false },
  { name: 'Sandwiches', icon: '🥪', active: false },
  { name: 'Desserts', icon: '🧁', active: false },
  { name: 'More', icon: '➕', active: false }
]

export default function BrowseRestaurantsPage() {
  const searchParams = useSearchParams()
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [reliabilityRockstar, setReliabilityRockstar] = useState(false)
  const [ratings, setRatings] = useState('All')
  const [dietaryOptions, setDietaryOptions] = useState('All')
  const [bidoraiRewards, setBidoraiRewards] = useState('All')
  const [pickupTime, setPickupTime] = useState('All')
  const [currentLocation, setCurrentLocation] = useState('Dallas, TX')
  const [currentPartySize, setCurrentPartySize] = useState(15)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleCuisine = (cuisineName: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisineName) 
        ? prev.filter(c => c !== cuisineName)
        : [...prev, cuisineName]
    )
  }

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Cuisine filter
    if (selectedCuisines.length > 0 && !selectedCuisines.includes(restaurant.category)) {
      return false
    }
    
    // Reliability filter
    if (reliabilityRockstar && !restaurant.isReliabilityRockstar) {
      return false
    }
    
    // Rating filter
    if (ratings === '4.5+' && restaurant.rating < 4.5) {
      return false
    }
    if (ratings === '4.0+' && restaurant.rating < 4.0) {
      return false
    }
    
    return matchesSearch
  })

  const toggleFavorite = (id: number) => {
    // Handle favorite toggle - you can implement this with state management later
    console.log('Toggle favorite for restaurant:', id)
  }

  // Initialize from URL parameters
  useEffect(() => {
    const urlLocation = searchParams.get('location')
    const urlPartySize = searchParams.get('partySize')
    const urlCuisine = searchParams.get('cuisine')
    
    if (urlLocation) {
      setCurrentLocation(urlLocation)
    }
    
    if (urlPartySize) {
      const parsedSize = parseInt(urlPartySize)
      if (parsedSize >= 10 && parsedSize <= 1000) {
        setCurrentPartySize(parsedSize)
      }
    }
    
    if (urlCuisine) {
      // Handle cuisine filter if needed
      console.log('Cuisine from URL:', urlCuisine)
    }
  }, [searchParams])

  const handleLocationChange = (location: string) => {
    setCurrentLocation(location)
    console.log('Location changed to:', location)
  }

  const handlePartySizeChange = (size: number) => {
    setCurrentPartySize(size)
    console.log('Party size changed to:', size)
  }

  const handleSearch = (query: string) => {
    setSearchTerm(query)
    console.log('Searching for:', query)
  }

  return (
    <div className="min-h-screen bg-bidorai-neutral-50">
      {/* Enhanced Header with Search Fields */}
      <BrowsePageHeader 
        onLocationChange={handleLocationChange}
        onPartySizeChange={handlePartySizeChange}
        onSearch={handleSearch}
      />

      {/* Cuisine Filter Bar */}
      <div className="bg-white border-b border-bidorai-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 overflow-x-auto">
            <div className="flex items-center gap-8 min-w-max">
              {cuisineTypes.map((cuisine, index) => (
                <button
                  key={index}
                  onClick={() => toggleCuisine(cuisine.name)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-[60px] ${
                    selectedCuisines.includes(cuisine.name)
                      ? 'bg-bidorai-blue-50 text-bidorai-blue-700 shadow-sm'
                      : 'text-bidorai-neutral-600 hover:bg-bidorai-neutral-50'
                  }`}
                >
                  <span className="text-2xl">{cuisine.icon}</span>
                  <span className="text-xs font-medium">{cuisine.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-bidorai-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-3 overflow-x-auto">
            {/* Reliability Rockstar */}
            <button
              onClick={() => setReliabilityRockstar(!reliabilityRockstar)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                reliabilityRockstar
                  ? 'bg-orange-50 border-orange-200 text-orange-700'
                  : 'bg-white border-bidorai-neutral-300 text-bidorai-neutral-700 hover:bg-bidorai-neutral-50'
              }`}
            >
              <Star className="w-4 h-4" />
              Reliability Rockstar
            </button>

            {/* Ratings Dropdown */}
            <div className="relative">
              <select
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
                className="appearance-none bg-white border border-bidorai-neutral-300 rounded-full px-3 py-1.5 pr-8 text-sm text-bidorai-neutral-700 hover:bg-bidorai-neutral-50 focus:outline-none focus:border-bidorai-blue-500"
              >
                <option value="All">Ratings</option>
                <option value="4.5+">4.5+ Stars</option>
                <option value="4.0+">4.0+ Stars</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bidorai-neutral-500 pointer-events-none" />
            </div>

            {/* Dietary Options Dropdown */}
            <div className="relative">
              <select
                value={dietaryOptions}
                onChange={(e) => setDietaryOptions(e.target.value)}
                className="appearance-none bg-white border border-bidorai-neutral-300 rounded-full px-3 py-1.5 pr-8 text-sm text-bidorai-neutral-700 hover:bg-bidorai-neutral-50 focus:outline-none focus:border-bidorai-blue-500"
              >
                <option value="All">Dietary options</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-free">Gluten-free</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bidorai-neutral-500 pointer-events-none" />
            </div>

            {/* Bidorai Rewards Dropdown */}
            <div className="relative">
              <select
                value={bidoraiRewards}
                onChange={(e) => setBidoraiRewards(e.target.value)}
                className="appearance-none bg-white border border-bidorai-neutral-300 rounded-full px-3 py-1.5 pr-8 text-sm text-bidorai-neutral-700 hover:bg-bidorai-neutral-50 focus:outline-none focus:border-bidorai-blue-500"
              >
                <option value="All">Bidorai rewards</option>
                <option value="2x">2x Points</option>
                <option value="3x">3x Points</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bidorai-neutral-500 pointer-events-none" />
            </div>

            {/* Pickup Time Dropdown */}
            <div className="relative">
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="appearance-none bg-white border border-bidorai-neutral-300 rounded-full px-3 py-1.5 pr-8 text-sm text-bidorai-neutral-700 hover:bg-bidorai-neutral-50 focus:outline-none focus:border-bidorai-blue-500"
              >
                <option value="All">Pickup time</option>
                <option value="30min">30 min or less</option>
                <option value="1hour">1 hour or less</option>
                <option value="2hours">2 hours or less</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bidorai-neutral-500 pointer-events-none" />
            </div>

            {/* Other Filters */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-bidorai-neutral-300 text-sm text-bidorai-neutral-700 hover:bg-bidorai-neutral-50">
              Other filters
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <p className="text-bidorai-neutral-600 font-medium">
            {filteredRestaurants.length} restaurants found in {currentLocation}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCuisines.length > 0 && ` • ${selectedCuisines.join(', ')} cuisine`}
          </p>
          <div className="text-sm text-bidorai-neutral-500">
            Serving {currentPartySize} people
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-bidorai-navy-900">
            Featured Premium Partners
          </h2>
          <button className="text-bidorai-blue-600 hover:text-bidorai-blue-700 font-medium text-sm">
            View all
          </button>
        </div>
        
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-bidorai-neutral-300">
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex-shrink-0 w-72">
                <div className="bg-white rounded-lg shadow-sm border border-bidorai-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-40 object-cover"
                    />
                    <button
                      onClick={() => toggleFavorite(restaurant.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-bidorai-neutral-50"
                    >
                      <Heart className="w-4 h-4 text-bidorai-neutral-400" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-bidorai-navy-900 mb-1">{restaurant.name}</h3>
                    <div className="flex items-center justify-between text-sm text-bidorai-neutral-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{restaurant.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{restaurant.distance}</span>
                      </div>
                    </div>
                    {restaurant.rewardMultiplier && (
                      <div className="mt-2">
                        <span className="inline-block bg-bidorai-blue-100 text-bidorai-blue-800 text-xs px-2 py-1 rounded">
                          {restaurant.rewardMultiplier} Rewards
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-semibold text-bidorai-navy-900 mb-6">
          All restaurants matching your search
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-sm border border-bidorai-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                {restaurant.isReliabilityRockstar && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Reliability Rockstar
                    </span>
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(restaurant.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-bidorai-neutral-50"
                >
                  <Heart className={`w-4 h-4 ${restaurant.isFavorited ? 'text-red-500 fill-current' : 'text-bidorai-neutral-400'}`} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-bidorai-navy-900 mb-1">{restaurant.name}</h3>
                <div className="flex items-center justify-between text-sm text-bidorai-neutral-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{restaurant.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{restaurant.distance}</span>
                  </div>
                </div>
                {restaurant.rewardMultiplier && (
                  <div className="mt-2">
                    <span className="inline-block bg-bidorai-blue-100 text-bidorai-blue-800 text-xs px-2 py-1 rounded">
                      {restaurant.rewardMultiplier} Rewards
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Results */}
        {filteredRestaurants.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-white border border-bidorai-neutral-300 text-bidorai-neutral-700 px-6 py-2 rounded-md hover:bg-bidorai-neutral-50 transition-colors">
              Load more results
            </button>
          </div>
        )}

        {/* No Results State */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-bidorai-neutral-400 text-lg mb-2">No restaurants match your current filters</div>
            <button 
              onClick={() => {
                setSelectedCuisines([])
                setReliabilityRockstar(false)
                setRatings('All')
                setDietaryOptions('All')
                setBidoraiRewards('All')
                setPickupTime('All')
                setSearchTerm('')
              }}
              className="text-bidorai-blue-600 hover:text-bidorai-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Bidorai Footer */}
      <Footer />
    </div>
  )
}