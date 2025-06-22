'use client';

import { useState, useRef, useEffect } from 'react';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const popularSearches = [
    { icon: '🍕', title: 'Pizza', subtitle: 'Most ordered this week', tag: 'Trending' },
    { icon: '🍣', title: 'Sushi', subtitle: 'Fresh daily selections' },
    { icon: '🌮', title: 'Tacos', subtitle: 'Authentic Mexican', tag: 'Fresh' },
  ];

  const cuisines = [
    { icon: '🍝', title: 'Italian', subtitle: 'Pasta, pizza & more' },
    { icon: '🍛', title: 'Indian', subtitle: 'Curry, biryani & tandoor' },
    { icon: '🥡', title: 'Chinese', subtitle: 'Dim sum & stir fry' },
  ];

  const restaurants = [
    { icon: '🏪', title: 'Farm Fresh Kitchen', subtitle: '⭐ 4.9 • Organic • 0.8 km' },
    { icon: '🏪', title: 'Green Garden Bistro', subtitle: '⭐ 4.7 • Farm-to-Table • 3.2 km' },
    { icon: '🏪', title: 'Artisan Eatery', subtitle: '⭐ 4.8 • Local Sourced • 1.5 km' },
  ];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setIsOpen(false);
    // Handle search logic here
  };

  return (
    <div ref={searchRef} className="flex-1 max-w-md relative z-50">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search BIDORAI"
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#1877F2] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-96 overflow-y-auto">
          {/* Popular Searches */}
          <div className="p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Popular right now
            </h3>
            {popularSearches.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSearch(item.title)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.subtitle}</div>
                </div>
                {item.tag && (
                  <span className="bg-blue-50 text-[#1877F2] px-2 py-1 rounded text-xs font-medium">
                    {item.tag}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Cuisines */}
          <div className="border-t border-gray-100 p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Browse by cuisine
            </h3>
            {cuisines.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSearch(item.title)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Trending Restaurants */}
          <div className="border-t border-gray-100 p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Trending restaurants
            </h3>
            {restaurants.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSearch(item.title)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}