'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Star, Clock, Users, DollarSign, MapPin, ChefHat, Sparkles, ArrowRight } from 'lucide-react'

// Mock data - will be replaced with API calls
const mockRestaurants = [
  {
    id: 1,
    name: "Bella's Italian Kitchen",
    cuisine: "Italian",
    rating: 4.8,
    reviews: 156,
    image: "/api/placeholder/400/300",
    basePrice: 75,
    currentBid: 89,
    description: "Authentic Italian cuisine with fresh pasta and wood-fired pizzas",
    location: "Downtown",
    servingSize: "30-100 guests",
    features: ["Vegetarian Options", "Gluten-Free", "Live Cooking"],
    auctionEndsIn: "2h 34m",
    bidders: 8,
    isActive: true
  },
  {
    id: 2,
    name: "Dragon Palace",
    cuisine: "Chinese",
    rating: 4.6,
    reviews: 203,
    image: "/api/placeholder/400/300",
    basePrice: 65,
    currentBid: 78,
    description: "Traditional Chinese dishes with modern presentation",
    location: "Chinatown",
    servingSize: "20-80 guests",
    features: ["Authentic Recipes", "Fresh Seafood", "Dim Sum"],
    auctionEndsIn: "4h 12m",
    bidders: 5,
    isActive: true
  },
  {
    id: 3,
    name: "Smokehouse BBQ",
    cuisine: "BBQ",
    rating: 4.9,
    reviews: 312,
    image: "/api/placeholder/400/300",
    basePrice: 55,
    currentBid: 72,
    description: "Slow-smoked meats with signature dry rubs and sauces",
    location: "West Side",
    servingSize: "25-150 guests",
    features: ["Smoked Daily", "House Sauces", "Sides Included"],
    auctionEndsIn: "1h 45m",
    bidders: 12,
    isActive: true
  },
  {
    id: 4,
    name: "Mediterranean Breeze",
    cuisine: "Mediterranean",
    rating: 4.7,
    reviews: 189,
    image: "/api/placeholder/400/300",
    basePrice: 85,
    currentBid: 0,
    description: "Fresh Mediterranean flavors with olive oil and herbs",
    location: "Harbor District",
    servingSize: "15-60 guests",
    features: ["Healthy Options", "Fresh Herbs", "Olive Oil"],
    auctionEndsIn: "6h 22m",
    bidders: 0,
    isActive: false
  }
]

export default function BrowseRestaurants() {
  const [restaurants, setRestaurants] = useState(mockRestaurants)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('All')
  const [priceRange, setPriceRange] = useState('All')
  const [sortBy, setSortBy] = useState('Popular')

  const cuisines = ['All', 'Italian', 'Chinese', 'BBQ', 'Mediterranean', 'Mexican', 'Indian', 'Thai']
  const priceRanges = ['All', '$50-70', '$71-90', '$91-120', '$120+']

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine
    
    let matchesPrice = true
    if (priceRange !== 'All') {
      const price = restaurant.currentBid || restaurant.basePrice
      switch (priceRange) {
        case '$50-70':
          matchesPrice = price >= 50 && price <= 70
          break
        case '$71-90':
          matchesPrice = price >= 71 && price <= 90
          break
        case '$91-120':
          matchesPrice = price >= 91 && price <= 120
          break
        case '$120+':
          matchesPrice = price > 120
          break
      }
    }
    
    return matchesSearch && matchesCuisine && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-bidorai-neutral-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-bidorai-neutral-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <Link href="/" className="inline-flex items-center text-bidorai-blue-500 hover:text-bidorai-blue-600 transition-colors mb-2 font-medium">
                ← Back to Home
              </Link>
              <h1 className="text-3xl font-bold text-bidorai-neutral-900">Browse Restaurants</h1>
              <p className="text-bidorai-neutral-600 mt-2">Discover amazing catering options and start bidding</p>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 lg:w-2/3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bidorai-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search restaurants or cuisine..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-bidorai-neutral-300 rounded-xl text-bidorai-neutral-900 placeholder-bidorai-neutral-500 focus:outline-none focus:ring-2 focus:ring-bidorai-blue-500 focus:border-transparent shadow-sm"
                />
              </div>
              
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="px-4 py-3 bg-white border border-bidorai-neutral-300 rounded-xl text-bidorai-neutral-900 focus:outline-none focus:ring-2 focus:ring-bidorai-blue-500 shadow-sm"
              >
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
              
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 bg-white border border-bidorai-neutral-300 rounded-xl text-bidorai-neutral-900 focus:outline-none focus:ring-2 focus:ring-bidorai-blue-500 shadow-sm"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Results Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-400">
            Showing {filteredRestaurants.length} restaurants
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="Popular">Most Popular</option>
            <option value="Price Low">Price: Low to High</option>
            <option value="Price High">Price: High to Low</option>
            <option value="Rating">Highest Rated</option>
            <option value="Ending Soon">Ending Soon</option>
          </select>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="group bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-orange-500/20 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all duration-300 hover:scale-[1.02]">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-orange-300">
                    {restaurant.cuisine}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  {restaurant.isActive ? (
                    <div className="flex items-center bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                      LIVE
                    </div>
                  ) : (
                    <div className="bg-gray-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                      UPCOMING
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                    <span className="text-gray-400 text-sm ml-1">({restaurant.reviews})</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {restaurant.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {restaurant.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="bg-orange-500/10 text-orange-300 px-2 py-1 rounded-lg text-xs">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {restaurant.location}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    {restaurant.servingSize}
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Base Price</span>
                    <span className="text-white font-semibold">${restaurant.basePrice}</span>
                  </div>
                  {restaurant.currentBid > 0 ? (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Current Highest Bid</span>
                      <span className="text-2xl font-bold text-orange-400">${restaurant.currentBid}</span>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <span className="text-orange-400 font-semibold">No bids yet - Be the first!</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Ends in {restaurant.auctionEndsIn}
                    </span>
                    <span className="text-gray-400">
                      {restaurant.bidders} bidders
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/bidding/${restaurant.id}`}>
                  <button className="w-full group bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center">
                    {restaurant.currentBid > 0 ? 'Join Bidding' : 'Start Bidding'}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-20">
            <ChefHat className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No restaurants found</h3>
            <p className="text-gray-500">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  )
}