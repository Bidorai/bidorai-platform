// src/app/browse/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Star, Clock, MapPin, Users, Heart, ChevronDown } from 'lucide-react'
import Header from '@/components/home/Header'
import { Footer } from '@/components/home/Footer'
import { toast } from 'sonner'

interface Restaurant {
  id: number
  name: string
  image: string
  rating: number
  distance: string
  category: string
  cuisine: string
  description: string
  price: number
  serves: number
  deliveryTime: string
  isFavorited: boolean
  isPopular: boolean
  tags: string[]
}

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Farm Fresh Kitchen",
    image: "/api/placeholder/300/200",
    rating: 4.9,
    distance: "0.8 mi",
    category: "Organic",
    cuisine: "Farm-to-Table",
    description: "Fresh organic harvest bowls and sustainable catering",
    price: 185,
    serves: 15,
    deliveryTime: "45-60 min",
    isFavorited: false,
    isPopular: true,
    tags: ["Organic", "Healthy", "Local"]
  },
  {
    id: 2,
    name: "Tokyo Sushi House",
    image: "/api/placeholder/300/200",
    rating: 4.8,
    distance: "1.2 mi",
    category: "Japanese",
    cuisine: "Sushi & Japanese",
    description: "Premium sushi platters and authentic Japanese cuisine",
    price: 245,
    serves: 12,
    deliveryTime: "30-45 min",
    isFavorited: false,
    isPopular: true,
    tags: ["Fresh", "Premium", "Authentic"]
  },
  {
    id: 3,
    name: "El Mariachi Cantina",
    image: "/api/placeholder/300/200",
    rating: 4.7,
    distance: "2.1 mi",
    category: "Mexican",
    cuisine: "Mexican Authentic",
    description: "Traditional Mexican catering with taco bars and fajita stations",
    price: 165,
    serves: 20,
    deliveryTime: "35-50 min",
    isFavorited: true,
    isPopular: false,
    tags: ["Spicy", "Traditional", "Group Friendly"]
  },
  {
    id: 4,
    name: "Bella Vista Italian",
    image: "/api/placeholder/300/200",
    rating: 4.6,
    distance: "1.8 mi",
    category: "Italian",
    cuisine: "Italian Classic",
    description: "Authentic Italian pasta buffets and Mediterranean specialties",
    price: 195,
    serves: 18,
    deliveryTime: "40-55 min",
    isFavorited: false,
    isPopular: false,
    tags: ["Pasta", "Classic", "Comfort Food"]
  },
  {
    id: 5,
    name: "BBQ Master Smokehouse",
    image: "/api/placeholder/300/200",
    rating: 4.8,
    distance: "2.5 mi",
    category: "BBQ",
    cuisine: "Texas BBQ",
    description: "Slow-smoked Texas BBQ with all the fixings",
    price: 275,
    serves: 25,
    deliveryTime: "50-65 min",
    isFavorited: false,
    isPopular: true,
    tags: ["Smoky", "Texas Style", "Hearty"]
  },
  {
    id: 6,
    name: "Mediterranean Delights",
    image: "/api/placeholder/300/200",
    rating: 4.5,
    distance: "3.2 mi",
    category: "Mediterranean",
    cuisine: "Mediterranean",
    description: "Fresh Mediterranean mezze platters and grilled specialties",
    price: 155,
    serves: 16,
    deliveryTime: "35-50 min",
    isFavorited: false,
    isPopular: false,
    tags: ["Healthy", "Fresh", "Vegetarian Options"]
  }
]

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants)
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(mockRestaurants)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Popular')
  const [location, setLocation] = useState('')
  const [partySize, setPartySize] = useState(15)

  useEffect(() => {
    setMounted(true)
    
    // Get URL parameters
    const urlLocation = searchParams.get('location') || 'Dallas, TX'
    const urlPartySize = parseInt(searchParams.get('partySize') || '15')
    
    setLocation(urlLocation)
    setPartySize(urlPartySize)
    
    toast.success(`🎯 Found ${mockRestaurants.length} restaurants in ${urlLocation}`)
  }, [searchParams])

  useEffect(() => {
    if (!mounted) return

    let filtered = restaurants

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(r => r.category === selectedCategory)
    }

    // Filter by party size (restaurants that can serve the party size)
    filtered = filtered.filter(r => r.serves >= Math.ceil(partySize * 0.8)) // Allow some flexibility

    // Sort restaurants
    switch (sortBy) {
      case 'Popular':
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.rating - a.rating)
        break
      case 'Rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'Distance':
        filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
        break
      case 'Price':
        filtered.sort((a, b) => a.price - b.price)
        break
    }

    setFilteredRestaurants(filtered)
  }, [selectedCategory, sortBy, partySize, restaurants, mounted])

  const categories = ['All', 'Organic', 'Japanese', 'Mexican', 'Italian', 'BBQ', 'Mediterranean']
  const sortOptions = ['Popular', 'Rating', 'Distance', 'Price']

  const toggleFavorite = (id: number) => {
    setRestaurants(prev => prev.map(r => 
      r.id === id ? { ...r, isFavorited: !r.isFavorited } : r
    ))
    toast.success('Added to favorites!')
  }

  const selectRestaurant = (restaurant: Restaurant) => {
    toast.success(`Selected ${restaurant.name}!`)
    console.log('Selected restaurant:', restaurant)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-8 max-w-md"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Catering in {location}
            </h1>
            <p className="text-gray-600">
              {filteredRestaurants.length} restaurants available for {partySize} people
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>
                      Sort by {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <div
                key={restaurant.id}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => selectRestaurant(restaurant)}
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  {restaurant.isPopular && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Popular
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(restaurant.id)
                    }}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        restaurant.isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {restaurant.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {restaurant.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {restaurant.deliveryTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Serves {restaurant.serves}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {restaurant.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      ${restaurant.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        selectRestaurant(restaurant)
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No restaurants found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or party size
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All')
                  setSortBy('Popular')
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}