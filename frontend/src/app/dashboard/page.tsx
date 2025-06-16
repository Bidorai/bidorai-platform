// src/app/dashboard/page.tsx
'use client'

import { useUser } from '@clerk/nextjs'
import { Header } from '@/components/home/Header'
import { Footer } from '@/components/home/Footer'
import { 
  Trophy, 
  Heart, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Star,
  MapPin,
  ChefHat,
  Zap,
  Target,
  Award
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useUser()

  // Mock data - replace with real API calls
  const userStats = {
    totalSaved: 847,
    activeBids: 3,
    wonAuctions: 12,
    favoriteRestaurants: 8,
    memberSince: 'March 2024'
  }

  const activeBids = [
    {
      id: 'bid-1',
      restaurant: 'Farm Fresh Kitchen',
      dish: '🥗 Organic Harvest Bowl',
      currentBid: 89,
      maxBid: 95,
      timeLeft: '2h 15m',
      status: 'leading',
      serves: 15
    },
    {
      id: 'bid-2', 
      restaurant: 'Tokyo Sushi Bar',
      dish: '🍣 Premium Sushi Platter',
      currentBid: 125,
      maxBid: 140,
      timeLeft: '45m',
      status: 'outbid',
      serves: 12
    },
    {
      id: 'bid-3',
      restaurant: 'Green Garden Bistro', 
      dish: '🥘 Sustainable Feast Tray',
      currentBid: 67,
      maxBid: 75,
      timeLeft: '1h 30m',
      status: 'leading',
      serves: 10
    }
  ]

  const recentWins = [
    {
      id: 'win-1',
      restaurant: 'El Mariachi Cantina',
      dish: '🌮 Taco Bar Setup',
      finalPrice: 156,
      originalPrice: 210,
      savedAmount: 54,
      date: '2 days ago',
      rating: 5
    },
    {
      id: 'win-2',
      restaurant: 'Bella Vista Trattoria',
      dish: '🍝 Pasta Buffet Tray', 
      finalPrice: 89,
      originalPrice: 125,
      savedAmount: 36,
      date: '1 week ago',
      rating: 4
    }
  ]

  const upcomingAuctions = [
    {
      id: 'auction-1',
      restaurant: 'Dallas BBQ Master',
      dish: '🍖 Smoky Brisket Tray',
      startingBid: 95,
      estimatedValue: 180,
      startsIn: '45 minutes',
      serves: 20
    },
    {
      id: 'auction-2',
      restaurant: 'Mediterranean Delights',
      dish: '🫒 Greek Feast Platter',
      startingBid: 75,
      estimatedValue: 140,
      startsIn: '2 hours',
      serves: 15
    }
  ]

  return (
    <div className="min-h-screen bg-bidorai-neutral-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-bidorai-navy-900 mb-2">
            Welcome back, {user?.firstName || 'Food Lover'}! 🍽️
          </h1>
          <p className="text-bidorai-neutral-600">
            Here's what's happening with your bids and savings
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-bidorai-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                +$54 this week
              </span>
            </div>
            <div className="text-2xl font-bold text-bidorai-navy-900 mb-1">
              ${userStats.totalSaved}
            </div>
            <div className="text-sm text-bidorai-neutral-600">Total Saved</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-bidorai-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-bidorai-blue-600" />
              <span className="text-xs text-bidorai-blue-600 bg-bidorai-blue-50 px-2 py-1 rounded-full font-medium">
                2 leading
              </span>
            </div>
            <div className="text-2xl font-bold text-bidorai-navy-900 mb-1">
              {userStats.activeBids}
            </div>
            <div className="text-sm text-bidorai-neutral-600">Active Bids</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-bidorai-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-orange-500" />
              <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full font-medium">
                92% win rate
              </span>
            </div>
            <div className="text-2xl font-bold text-bidorai-navy-900 mb-1">
              {userStats.wonAuctions}
            </div>
            <div className="text-sm text-bidorai-neutral-600">Auctions Won</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-bidorai-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-8 h-8 text-red-500" />
              <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full font-medium">
                +2 this month
              </span>
            </div>
            <div className="text-2xl font-bold text-bidorai-navy-900 mb-1">
              {userStats.favoriteRestaurants}
            </div>
            <div className="text-sm text-bidorai-neutral-600">Favorites</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Bids */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-bidorai-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-bidorai-navy-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-bidorai-blue-600" />
                  Active Bids
                </h2>
                <Link 
                  href="/dashboard/bids"
                  className="text-bidorai-blue-600 hover:text-bidorai-blue-700 font-medium text-sm"
                >
                  View all →
                </Link>
              </div>
              
              <div className="space-y-4">
                {activeBids.map((bid) => (
                  <div key={bid.id} className="border border-bidorai-neutral-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-bidorai-navy-900">{bid.restaurant}</h3>
                        <p className="text-bidorai-neutral-600 text-sm">{bid.dish} • Serves {bid.serves}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        bid.status === 'leading' 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-orange-50 text-orange-700'
                      }`}>
                        {bid.status === 'leading' ? '🏆 Leading' : '⚠️ Outbid'}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-bidorai-neutral-500">Current: </span>
                          <span className="font-semibold text-bidorai-navy-900">${bid.currentBid}</span>
                        </div>
                        <div>
                          <span className="text-bidorai-neutral-500">Your max: </span>
                          <span className="font-semibold text-bidorai-blue-600">${bid.maxBid}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-bidorai-neutral-600">
                        <Clock className="w-4 h-4" />
                        {bid.timeLeft} left
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Wins */}
            <div className="bg-white rounded-xl shadow-sm border border-bidorai-neutral-200 p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-bidorai-navy-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-orange-500" />
                  Recent Wins
                </h2>
                <Link 
                  href="/dashboard/orders"
                  className="text-bidorai-blue-600 hover:text-bidorai-blue-700 font-medium text-sm"
                >
                  View all →
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentWins.map((win) => (
                  <div key={win.id} className="border border-bidorai-neutral-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-bidorai-navy-900">{win.restaurant}</h3>
                        <p className="text-bidorai-neutral-600 text-sm">{win.dish}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          -${win.savedAmount}
                        </div>
                        <div className="text-xs text-bidorai-neutral-500">saved</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-bidorai-neutral-500">Paid: </span>
                          <span className="font-semibold text-bidorai-navy-900">${win.finalPrice}</span>
                        </div>
                        <div>
                          <span className="text-bidorai-neutral-500 line-through">Was: ${win.originalPrice}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(win.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-bidorai-neutral-500">{win.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Auctions */}
            <div className="bg-white rounded-xl shadow-sm border border-bidorai-neutral-200 p-6">
              <h3 className="text-lg font-bold text-bidorai-navy-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                Upcoming Auctions
              </h3>
              
              <div className="space-y-4">
                {upcomingAuctions.map((auction) => (
                  <div key={auction.id} className="border border-bidorai-neutral-200 rounded-lg p-3">
                    <div className="mb-2">
                      <h4 className="font-medium text-bidorai-navy-900 text-sm">{auction.restaurant}</h4>
                      <p className="text-xs text-bidorai-neutral-600">{auction.dish}</p>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <div className="text-bidorai-neutral-500">Starting: ${auction.startingBid}</div>
                        <div className="text-green-600 font-medium">Est. value: ${auction.estimatedValue}</div>
                      </div>
                      <div className="text-orange-600 font-medium">
                        {auction.startsIn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                href="/browse"
                className="block w-full mt-4 bg-bidorai-blue-600 hover:bg-bidorai-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Browse All Auctions
              </Link>
            </div>

            {/* Achievement */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-200 p-6">
              <div className="text-center">
                <Award className="w-12 h-12 text-orange-500 mx-auto mb-3" />
                <h3 className="font-bold text-orange-900 mb-2">Achievement Unlocked!</h3>
                <p className="text-sm text-orange-800 mb-3">
                  "Budget Master" - Saved over $500 this quarter
                </p>
                <div className="text-xs text-orange-700">
                  Keep it up! Next goal: $1,000 saved
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-bidorai-neutral-200 p-6">
              <h3 className="text-lg font-bold text-bidorai-navy-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link 
                  href="/browse"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-bidorai-neutral-50 transition-colors"
                >
                  <ChefHat className="w-5 h-5 text-bidorai-blue-600" />
                  <span className="font-medium text-bidorai-navy-900">Browse Restaurants</span>
                </Link>
                <Link 
                  href="/dashboard/favorites"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-bidorai-neutral-50 transition-colors"
                >
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-bidorai-navy-900">My Favorites</span>
                </Link>
                <Link 
                  href="/profile"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-bidorai-neutral-50 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-bidorai-navy-900">Update Location</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}