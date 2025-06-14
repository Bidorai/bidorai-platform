'use client';

import React from 'react';

interface SearchDropdownProps {
  searchTerm: string;
  onSelect: (term: string) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ searchTerm, onSelect }) => {
  const popularSearches = [
    { icon: '🍕', title: 'Pizza', subtitle: 'Most ordered this week', tag: 'Trending' },
    { icon: '🍣', title: 'Sushi', subtitle: 'Fresh daily selections', tag: '' },
    { icon: '🌮', title: 'Tacos', subtitle: 'Authentic Mexican', tag: 'Fresh' }
  ];

  const cuisines = [
    { icon: '🍝', title: 'Italian', subtitle: 'Pasta, pizza & more' },
    { icon: '🍛', title: 'Indian', subtitle: 'Curry, biryani & tandoor' },
    { icon: '🥡', title: 'Chinese', subtitle: 'Dim sum & stir fry' }
  ];

  const restaurants = [
    { icon: '🏪', title: 'Farm Fresh Kitchen', subtitle: '⭐ 4.9 • Organic • 0.8 km' },
    { icon: '🏪', title: 'Green Garden Bistro', subtitle: '⭐ 4.7 • Farm-to-Table • 3.2 km' },
    { icon: '🏪', title: 'Artisan Eatery', subtitle: '⭐ 4.8 • Local Sourced • 1.5 km' }
  ];

  const filterItems = (items: any[], searchTerm: string) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredPopular = filterItems(popularSearches, searchTerm);
  const filteredCuisines = filterItems(cuisines, searchTerm);
  const filteredRestaurants = filterItems(restaurants, searchTerm);

  const DropdownItem = ({ item, showTag = false }: { item: any, showTag?: boolean }) => (
    <div
      className="flex items-center gap-3 p-2.5 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
      onClick={() => onSelect(item.title)}
    >
      <div className="text-lg w-6 text-center">{item.icon}</div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{item.title}</div>
        <div className="text-xs text-gray-500 mt-0.5">{item.subtitle}</div>
      </div>
      {showTag && item.tag && (
        <div className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-xs font-medium">
          {item.tag}
        </div>
      )}
    </div>
  );

  const hasVisibleSections = filteredPopular.length > 0 || filteredCuisines.length > 0 || filteredRestaurants.length > 0;

  if (!hasVisibleSections && searchTerm) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl mt-1 z-50">
        <div className="p-4 text-center text-gray-500">
          No results found for "{searchTerm}"
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl mt-1 z-50 max-h-96 overflow-y-auto">
      {filteredPopular.length > 0 && (
        <div className="py-4">
          <div className="px-4 pb-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Popular right now
            </div>
          </div>
          {filteredPopular.map((item, index) => (
            <DropdownItem key={index} item={item} showTag />
          ))}
        </div>
      )}

      {filteredCuisines.length > 0 && (
        <div className="py-4 border-t border-gray-100">
          <div className="px-4 pb-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Browse by cuisine
            </div>
          </div>
          {filteredCuisines.map((item, index) => (
            <DropdownItem key={index} item={item} />
          ))}
        </div>
      )}

      {filteredRestaurants.length > 0 && (
        <div className="py-4 border-t border-gray-100">
          <div className="px-4 pb-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Trending restaurants
            </div>
          </div>
          {filteredRestaurants.map((item, index) => (
            <DropdownItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;