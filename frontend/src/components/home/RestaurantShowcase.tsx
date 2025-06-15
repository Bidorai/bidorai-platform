'use client'

import { Star, MapPin, Clock } from 'lucide-react'
import { toast } from 'sonner'

export function RestaurantShowcase() {
  const restaurants = [
    {
      id: 'farm-fresh',
      emoji: '🥗',
      name: 'Farm Fresh Kitchen',
      description: 'Organic ingredients, sustainable sourcing',
      rating: 4.9,
      location: 'Deep Ellum',
      pickup: '30 min pickup',
      badge: '🌿 Certified Organic',
      bgClass: 'from-bidorai-blue-600 to-bidorai-blue-700'
    },
    {
      id: 'tokyo-sushi',
      emoji: '🍣', 
      name: 'Tokyo Sushi Bar',
      description: 'Fresh daily sourcing, master craftsmanship',
      rating: 4.8,
      location: 'Uptown',
      pickup: '25 min pickup', 
      badge: '🐟 Daily Fresh',
      bgClass: 'from-bidorai-blue-600 to-bidorai-blue-700'
    },
    {
      id: 'el-mariachi',
      emoji: '🌮',
      name: 'El Mariachi Cantina', 
      description: 'Authentic Mexican, family recipes',
      rating: 4.6,
      location: 'Bishop Arts',
      pickup: '35 min pickup',
      badge: '🇲🇽 Authentic',
      bgClass: 'from-bidorai-blue-600 to-bidorai-blue-700'
    },
    {
      id: 'bella-vista',
      emoji: '🍝',
      name: 'Bella Vista Trattoria',
      description: 'Handmade pasta, authentic Italian', 
      rating: 4.7,
      location: 'Little Italy',
      pickup: '40 min pickup',
      badge: '🇮🇹 Handmade',
      bgClass: 'from-bidorai-blue-600 to-bidorai-blue-700'
    },
    {
      id: 'dallas-bbq',
      emoji: '🍖',
      name: 'Dallas BBQ Master',
      description: 'Authentic Texas BBQ, slow-smoked',
      rating: 4.7, 
      location: 'Deep Ellum',
      pickup: '45 min pickup',
      badge: '🔥 Slow-Smoked',
      bgClass: 'from-bidorai-blue-600 to-bidorai-blue-700'
    },
    {
      id: 'green-garden',
      emoji: '🥘',
      name: 'Green Garden Bistro',
      description: 'Farm-to-table, seasonal menu',
      rating: 4.8,
      location: 'Knox-Henderson', 
      pickup: '35 min pickup',
      badge: '🌱 Farm-to-Table',
      bgClass: 'from-bidorai-blue-600 to-bidorai-blue-700'
    }
  ]

  const exploreRestaurants = () => {
    toast.info('Loading restaurant directory...')
    console.log('🍽️ Explore restaurants clicked')
  }

  return (
    <section className="bg-bidorai-navy-900 py-15 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-bidorai-blue-600/10 via-transparent to-bidorai-blue-600/5" />
      
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-4">
          Culinary Excellence from Dallas's Finest
        </h2>
        <p className="text-lg text-bidorai-neutral-300 text-center mb-15 max-w-2xl mx-auto">
          Experience the artistry and passion of our premium restaurant partners committed to quality and freshness.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className={`relative h-70 rounded-2xl overflow-hidden cursor-pointer transition-all duration-400 hover:scale-105 hover:shadow-2xl bg-gradient-to-r ${restaurant.bgClass}`}
              style={{ 
                boxShadow: '0 10px 30px rgba(24, 119, 242, 0.3)',
              }}
            >
              {/* Content overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-bidorai-blue-600/20 hover:from-black/20 hover:to-bidorai-blue-600/10 transition-all duration-300" />
              
              {/* Main content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">
                <div className="text-5xl mb-4">{restaurant.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-2">{restaurant.name}</h3>
                <p className="text-sm text-white/90 mb-3">{restaurant.description}</p>
                <div className="flex items-center gap-4 text-xs text-white/80">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{restaurant.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{restaurant.pickup}</span>
                  </div>
                </div>
              </div>
              
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-2 rounded-full text-xs font-bold backdrop-blur-sm">
                {restaurant.badge}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={exploreRestaurants}
            className="bg-gradient-to-r from-bidorai-blue-600 to-bidorai-blue-700 text-white px-9 py-4 rounded-2xl text-lg font-bold cursor-pointer shadow-lg shadow-bidorai-blue-600/40 transition-all duration-300 hover:shadow-xl hover:scale-105 uppercase tracking-wide"
          >
            🍽️ Explore Our Restaurant Partners
          </button>
        </div>
      </div>
    </section>
  )
}