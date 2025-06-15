// src/components/bidding/LiveBiddingPanel.tsx
'use client'

import { useState, useEffect } from 'react'
import { Clock, Users, Star, MapPin, Play } from 'lucide-react'
import { toast } from 'sonner'

interface Restaurant {
  id: string
  name: string
  avatar: string
  rating: number
  distance: number
  cuisine: string
  dish: string
  serves: number
  bidders: number
  price: number
  progress: number
  tag: string
  gradient: string
}

export function LiveBiddingPanel() {
  const [timeRemaining, setTimeRemaining] = useState<number>(165) // 2:45 in seconds
  const [savingsAmount, setSavingsAmount] = useState<number>(284)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: 'farm-fresh',
      name: 'Farm Fresh Kitchen',
      avatar: 'F',
      rating: 4.9,
      distance: 0.8,
      cuisine: 'Organic Certified',
      dish: '🥗 Organic Harvest Bowl',
      serves: 15,
      bidders: 8,
      price: 217,
      progress: 75,
      tag: '🌱 Fresh picked today!',
      gradient: 'from-bidorai-blue-600 to-bidorai-blue-700'
    },
    {
      id: 'green-garden',
      name: 'Green Garden Bistro',
      avatar: 'G',
      rating: 4.8,
      distance: 1.2,
      cuisine: 'Farm-to-Table',
      dish: '🥘 Sustainable Feast Tray',
      serves: 12,
      bidders: 12,
      price: 185,
      progress: 88,
      tag: '🏆 Best value!',
      gradient: 'from-bidorai-navy-800 to-bidorai-navy-900'
    },
    {
      id: 'tokyo-sushi',
      name: 'Tokyo Sushi',
      avatar: 'T',
      rating: 4.7,
      distance: 2.1,
      cuisine: 'Japanese Fresh',
      dish: '🍣 Sushi Platter',
      serves: 8,
      bidders: 6,
      price: 165,
      progress: 45,
      tag: '🆕 New entry!',
      gradient: 'from-bidorai-blue-600 to-bidorai-blue-700'
    },
    {
      id: 'el-mariachi',
      name: 'El Mariachi',
      avatar: 'E',
      rating: 4.6,
      distance: 1.8,
      cuisine: 'Mexican Authentic',
      dish: '🌮 Taco Bar Setup',
      serves: 20,
      bidders: 15,
      price: 245,
      progress: 92,
      tag: '🚀 Bidding war!',
      gradient: 'from-bidorai-navy-800 to-bidorai-navy-900'
    },
    {
      id: 'pasta-palace',
      name: 'Bella Vista',
      avatar: 'B',
      rating: 4.7,
      distance: 3.4,
      cuisine: 'Italian Classic',
      dish: '🍝 Pasta Buffet Tray',
      serves: 18,
      bidders: 4,
      price: 195,
      progress: 30,
      tag: '⏰ Ending soon!',
      gradient: 'from-bidorai-blue-600 to-bidorai-blue-700'
    },
    {
      id: 'bbq-master',
      name: 'BBQ Master',
      avatar: 'B',
      rating: 4.7,
      distance: 2.5,
      cuisine: 'Texas BBQ',
      dish: '🍖 Smoky Brisket Tray',
      serves: 25,
      bidders: 11,
      price: 275,
      progress: 67,
      tag: '🔥 Popular choice!',
      gradient: 'from-bidorai-navy-800 to-bidorai-navy-900'
    }
  ])

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          toast.info('New bidding round started!')
          return 180 // Reset to 3 minutes
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Bid updates effect
  useEffect(() => {
    const bidUpdater = setInterval(() => {
      setRestaurants(prev => prev.map(restaurant => {
        if (Math.random() < 0.3) { // 30% chance per restaurant
          const increase = Math.floor(Math.random() * 15) + 1
          return { ...restaurant, price: restaurant.price + increase }
        }
        return restaurant
      }))
    }, 5000)

    return () => clearInterval(bidUpdater)
  }, [])

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const selectRestaurant = (restaurant: Restaurant) => {
    toast.success(`Selected ${restaurant.name} - ${restaurant.dish}`)
    console.log('🏪 Restaurant selected:', restaurant.name)
  }

  const placeBid = () => {
    toast.info('Opening bid placement interface...')
    console.log('🎯 Place bid clicked')
  }

  const watchDemo = () => {
    toast.info('Loading demo video...')
    console.log('📺 Demo clicked')
  }

  return (
    <div className="bg-white rounded-2xl shadow-lift p-6 flex flex-col animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-bidorai-navy-900">Live Party Menu Bidding</span>
          <span className="text-lg">ℹ️</span>
        </div>
        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse-glow">
          LIVE
        </span>
      </div>

      {/* Countdown Timer */}
      <div className="bg-gradient-to-r from-bidorai-blue-600 to-bidorai-blue-700 text-white p-3 rounded-lg text-center font-bold mb-4 text-sm shadow-glow">
        <Clock className="inline w-4 h-4 mr-2" />
        <span>{formatTime(timeRemaining)} remaining</span>
      </div>

      {/* Savings Display */}
      <div className="bg-gradient-to-r from-bidorai-navy-800 to-bidorai-navy-900 text-white p-4 rounded-xl text-center mb-5 shadow-lg">
        <div className="text-2xl font-extrabold mb-1">Save ${savingsAmount}</div>
        <div className="text-sm opacity-90">🎯 Average 18% below market price</div>
      </div>

      {/* Restaurant List */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-96 scrollbar-thin scrollbar-thumb-bidorai-blue-600 scrollbar-track-bidorai-neutral-100">
        {restaurants.map((restaurant, index) => (
          <div
            key={restaurant.id}
            className="bg-bidorai-blue-50 border border-bidorai-blue-200 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:shadow-bidorai-blue-200 animate-slide-up-fade"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => selectRestaurant(restaurant)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-3 flex-1">
                <div className={`w-11 h-11 bg-gradient-to-r ${restaurant.gradient} rounded-lg flex items-center justify-center text-white font-extrabold text-lg shadow-md`}>
                  {restaurant.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-bidorai-navy-900 truncate">{restaurant.name}</h3>
                  <div className="text-sm text-bidorai-neutral-600 flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-bidorai-blue-600 fill-current" />
                      <span className="text-bidorai-blue-600 font-semibold">{restaurant.rating}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{restaurant.distance} km</span>
                    </div>
                    <span>•</span>
                    <span className="font-semibold">{restaurant.cuisine}</span>
                  </div>
                  <div className="text-sm text-bidorai-neutral-600 mb-1">{restaurant.dish} • Serves {restaurant.serves}</div>
                  <div className="flex items-center gap-2 text-xs text-bidorai-neutral-500">
                    <div className="w-2 h-2 rounded-full bg-bidorai-blue-600 animate-pulse"></div>
                    <Users className="w-3 h-3" />
                    <span>{restaurant.bidders} people bidding</span>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-bidorai-blue-600">
                ${restaurant.price}
              </div>
            </div>
            
            {restaurant.progress > 0 && (
              <div className="w-full h-1 bg-bidorai-neutral-200 rounded-full mb-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-bidorai-blue-600 to-bidorai-blue-700 rounded-full transition-all duration-300"
                  style={{ width: `${restaurant.progress}%` }}
                />
              </div>
            )}
            
            <div className="flex justify-center">
              <div className="bg-bidorai-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 justify-center">
                {restaurant.tag}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={placeBid}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] min-h-[48px] text-base"
        >
          🎯 Place Your Bid Now
        </button>
        <button
          onClick={watchDemo}
          className="w-full bg-transparent border-2 border-bidorai-blue-600 text-bidorai-blue-600 hover:bg-bidorai-blue-50 font-semibold py-3 px-4 rounded-lg transition-all duration-200 min-h-[48px] text-base flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" />
          Watch Demo
        </button>
      </div>
    </div>
  )
}