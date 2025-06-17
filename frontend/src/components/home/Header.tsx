// src/components/ui/Header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { signOutUser } from '@/app/actions/auth';
import { UserButton } from '@clerk/nextjs';

export default function Header() {
  const { user } = useUser()
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"...`)
    }
  }

  const showCart = () => {
    toast.info('Opening shopping cart...')
    console.log('🛒 Cart clicked')
  }

  return (
    <header className="bg-white border-b border-bidorai-neutral-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-r from-bidorai-blue-600 to-bidorai-blue-700 rounded-lg flex items-center justify-center text-white shadow-lg shadow-bidorai-blue-600/30">
              🍽️
            </div>
            <span className="text-2xl font-extrabold text-bidorai-navy-900 tracking-tight">
              Bidorai
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bidorai-neutral-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-bidorai-neutral-200 rounded-lg text-base bg-bidorai-neutral-50 transition-all focus:outline-none focus:border-bidorai-blue-600 focus:bg-white focus:shadow-glow"
              placeholder="Search restaurants, cuisines..."
            />
          </form>

          {/* Navigation */}
          <div className="flex items-center gap-5">
            <span className="hidden md:flex items-center gap-2 text-bidorai-neutral-600 font-medium">
              <span className="text-base">📞</span>
              <a href="tel:1-800-BIDORAI" className="hover:text-bidorai-blue-600 transition-colors">
                1-800-BIDORAI
              </a>
            </span>
            <Link 
              href="/restaurants" 
              className="hidden md:block text-bidorai-neutral-600 font-medium hover:text-bidorai-blue-600 transition-colors"
            >
              For Restaurants
            </Link>
            <button 
              onClick={showCart}
              className="relative group flex items-center justify-center w-10 h-10 rounded-lg hover:bg-bidorai-neutral-100 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-bidorai-neutral-600 group-hover:text-bidorai-blue-600 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                2
              </span>
            </button>
            
            {user ? (
              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-bidorai-neutral-600">
                    Hi, {user.firstName || 'User'}
                  </span>
                  <UserButton afterSignOutUrl="/sign-in" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/sign-in"
                  className="text-bidorai-neutral-600 hover:text-bidorai-blue-600 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/sign-up"
                  className="bg-bidorai-blue-600 hover:bg-bidorai-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
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