// frontend/src/components/restaurants/RestaurantList.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Star, MapPin, Clock, Users, Filter, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'
import { useRestaurantFiltering, Restaurant } from '@/hooks/useRestaurantFiltering'
import { useLocation } from '@/contexts/LocationContext'

interface RestaurantListProps {
  searchQuery?: string
  selectedCuisines?: string[]
}

// Updated mock data that matches the Restaurant interface
const mockRestaurants: Restaurant[] = [
  {
    id: 'farm-fresh-kitchen',
    name: 'Farm Fresh Kitchen',
    description: 'Organic ingredients, sustainable sourcing, farm-to-table excellence',
    cuisine: ['organic', 'american', 'healthy'],
    rating: 4.9,
    reviewCount: 156,
    location: {
      address: '123 Organic Way, Dallas, TX',
      city: 'Dallas',
      state: 'TX',
      coordinates: [32.7767, -96.7970]
    },
    images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop'],
    features: ['Organic Certified', 'Locally Sourced', 'Gluten-Free Options'],
    certifications: ['USDA Organic', 'Local Farm Partnership'],
    averageOrderValue: 75,
    totalOrders: 342,
    responseTime: 25,
    operatingHours: {
      monday: { open: '07:00', close: '22:00' },
      tuesday: { open: '07:00', close: '22:00' },
      wednesday: { open: '07:00', close: '22:00' },
      thursday: { open: '07:00', close: '22:00' },
      friday: { open: '07:00', close: '23:00' },
      saturday: { open: '08:00', close: '23:00' },
      sunday: { open: '08:00', close: '21:00' }
    }
  },
  {
    id: 'green-garden-bistro',
    name: 'Green Garden Bistro',
    description: 'Farm-to-table dining with seasonal menus and sustainable practices',
    cuisine: ['mediterranean', 'vegetarian', 'farm-to-table'],
    rating: 4.8,
    reviewCount: 203,
    location: {
      address: '456 Garden Street, Irving, TX',
      city: 'Irving',
      state: 'TX',
      coordinates: [32.8140, -96.9489]
    },
    images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'],
    features: ['Farm-to-Table', 'Seasonal Menu', 'Vegan Options'],
    averageOrderValue: 65,
    totalOrders: 289,
    responseTime: 30,
    operatingHours: {
      monday: { open: '08:00', close: '21:00' },
      tuesday: { open: '08:00', close: '21:00' },
      wednesday: { open: '08:00', close: '21:00' },
      thursday: { open: '08:00', close: '21:00' },
      friday: { open: '08:00', close: '22:00' },
      saturday: { open: '09:00', close: '22:00' },
      sunday: { open: '09:00', close: '20:00' }
    }
  },
  {
    id: 'smoke-spice-bbq',
    name: 'Smoke & Spice BBQ',
    description: 'Authentic Texas BBQ with slow-smoked meats and traditional sides',
    cuisine: ['bbq', 'american', 'southern'],
    rating: 4.7,
    reviewCount: 324,
    location: {
      address: '789 BBQ Lane, Plano, TX',
      city: 'Plano',
      state: 'TX',
      coordinates: [33.0198, -96.6989]
    },
    images: ['https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop'],
    features: ['Slow-Smoked', 'Traditional Recipes', 'Large Portions'],
    averageOrderValue: 85,
    totalOrders: 567,
    responseTime: 35,
    operatingHours: {
      monday: { open: '11:00', close: '21:00' },
      tuesday: { open: '11:00', close: '21:00' },
      wednesday: { open: '11:00', close: '21:00' },
      thursday: { open: '11:00', close: '21:00' },
      friday: { open: '11:00', close: '22:00' },
      saturday: { open: '11:00', close: '22:00' },
      sunday: { open: '12:00', close: '20:00' }
    }
  },
  {
    id: 'pasta-paradise',
    name: 'Pasta Paradise',
    description: 'Authentic Italian cuisine with handmade pasta and traditional sauces',
    cuisine: ['italian', 'european', 'pasta'],
    rating: 4.6,
    reviewCount: 189,
    location: {
      address: '321 Italy Drive, Richardson, TX',
      city: 'Richardson',
      state: 'TX',
      coordinates: [32.9481, -96.7297]
    },
    images: ['https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop'],
    features: ['Handmade Pasta', 'Traditional Recipes', 'Wine Pairings'],
    averageOrderValue: 70,
    totalOrders: 234,
    responseTime: 28,
    operatingHours: {
      monday: { open: '16:00', close: '22:00' },
      tuesday: { open: '16:00', close: '22:00' },
      wednesday: { open: '16:00', close: '22:00' },
      thursday: { open: '16:00', close: '22:00' },
      friday: { open: '16:00', close: '23:00' },
      saturday: { open: '12:00', close: '23:00' },
      sunday: { open: '12:00', close: '21:00' }
    }
  },
  {
    id: 'spice-route-indian',
    name: 'Spice Route Indian Kitchen',
    description: 'Authentic Indian flavors with traditional spices and modern presentation',
    cuisine: ['indian', 'asian', 'curry'],
    rating: 4.5,
    reviewCount: 142,
    location: {
      address: '654 Curry Lane, Garland, TX',
      city: 'Garland',
      state: 'TX',
      coordinates: [32.9126, -96.6389]
    },
    images: ['https://images.unsplash.com/photo-1505253213348-cd54c92b37e4?w=400&h=300&fit=crop'],
    features: ['Authentic Spices', 'Vegetarian Options', 'Gluten-Free Available'],
    averageOrderValue: 60,
    totalOrders: 178,
    responseTime: 32,
    operatingHours: {
      monday: { open: '17:00', close: '22:00' },
      tuesday: { open: '17:00', close: '22:00' },
      wednesday: { open: '17:00', close: '22:00' },
      thursday: { open: '17:00', close: '22:00' },
      friday: { open: '17:00', close: '23:00' },
      saturday: { open: '12:00', close: '23:00' },
      sunday: { open: '12:00', close: '22:00' }
    }
  }
]

export default function RestaurantList({ 
  searchQuery, 
  selectedCuisines = [] 
}: RestaurantListProps) {
  const router = useRouter()
  const { location } = useLocation()
  
  // Filter state
  const [maxDistance, setMaxDistance] = useState<number>(25)
  const [minRating, setMinRating] = useState<number>(0)
  const [maxResponseTime, setMaxResponseTime] = useState<number>(60)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'responseTime'>('distance')

  // Apply filtering
  const filters = {
    maxDistance: location.coordinates ? maxDistance : undefined,
    minRating: minRating > 0 ? minRating : undefined,
    maxResponseTime: maxResponseTime < 60 ? maxResponseTime : undefined,
    cuisineTypes: selectedCuisines.length > 0 ? selectedCuisines : undefined,
    searchQuery: searchQuery || undefined,
  }

  const { 
    filteredRestaurants, 
    isFiltering, 
    stats,
    getNearbyRestaurants,
    getTopRatedRestaurants
  } = useRestaurantFiltering(mockRestaurants, filters)

  // Get unique cuisines for filter options
  const allCuisines = Array.from(
    new Set(mockRestaurants.flatMap(r => r.cuisine))
  ).sort()

  const handleRestaurantClick = (restaurant: Restaurant) => {
    toast.info(`Viewing ${restaurant.name} menu...`)
    router.push(`/restaurants/${restaurant.id}`)
  }

  const toggleFavorite = (restaurantId: string) => {
    toast.success('Added to favorites!')
    console.log('Toggle favorite for restaurant:', restaurantId)
  }

  const clearFilters = () => {
    setMaxDistance(25)
    setMinRating(0)
    setMaxResponseTime(60)
    toast.info('Filters cleared')
  }

  // Sort filtered restaurants
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'responseTime':
        return a.responseTime - b.responseTime
      case 'distance':
      default:
        return (a.distance || 0) - (b.distance || 0)
    }
  })

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold">
              {isFiltering ? 'Filtering...' : `${stats.filteredCount} Restaurants Found`}
            </h2>
            {location.coordinates && stats.nearestDistance > 0 && (
              <span className="text-sm text-gray-600">
                Nearest: {stats.nearestDistance} km away
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="distance">Sort by Distance</option>
              <option value="rating">Sort by Rating</option>
              <option value="responseTime">Sort by Speed</option>
            </select>
          </div>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Distance Filter */}
              {location.coordinates && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Distance: {maxDistance} km
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value={0}>Any Rating</option>
                  <option value={4.0}>4.0+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={4.8}>4.8+ Stars</option>
                </select>
              </div>

              {/* Response Time Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Response Time: {maxResponseTime}min
                </label>
                <input
                  type="range"
                  min="15"
                  max="60"
                  value={maxResponseTime}
                  onChange={(e) => setMaxResponseTime(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {isFiltering ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedRestaurants.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="text-gray-500 mb-4">
            <span className="text-4xl">🍽️</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No restaurants found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or search in a different location.
          </p>
          <button 
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map(restaurant => (
            <div 
              key={restaurant.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => handleRestaurantClick(restaurant)}
            >
              <div className="relative">
                <img 
                  src={restaurant.images[0]} 
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(restaurant.id)
                  }}
                  className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
                >
                  <span className="text-red-500">🤍</span>
                </button>
                {restaurant.distance && (
                  <div className="absolute top-3 left-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded-md text-xs">
                    {restaurant.distance.toFixed(1)} km
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {restaurant.name}
                  </h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {restaurant.description}
                </p>
                
                <div className="flex items-center space-x-1 mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{restaurant.rating}</span>
                  <span className="text-sm text-gray-500">({restaurant.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center space-x-1 mb-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{restaurant.location.city}, {restaurant.location.state}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {restaurant.cuisine.slice(0, 3).map(c => (
                    <span 
                      key={c}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full capitalize"
                    >
                      {c}
                    </span>
                  ))}
                  {restaurant.cuisine.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                      +{restaurant.cuisine.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{restaurant.responseTime} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>${restaurant.averageOrderValue} avg</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}