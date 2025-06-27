'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  type: 'restaurant' | 'menu';
  name: string;
  description: string;
  image?: string;
  rating?: number;
  price?: number;
  serves?: number;
  restaurant?: string;
  deliveryTime?: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'price'>('relevance');
  const [filterType, setFilterType] = useState<'all' | 'restaurants' | 'menus'>('all');

  useEffect(() => {
    searchItems();
  }, [query, category, sortBy, filterType]);

  const searchItems = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        q: query,
        category: category,
        sort: sortBy,
        type: filterType
      });
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?${params}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
      }
    } catch (error) {
      setResults(getMockSearchResults());
    } finally {
      setIsLoading(false);
    }
  };

  const getMockSearchResults = (): SearchResult[] => {
    return [
      {
        id: '1',
        type: 'restaurant',
        name: 'Farm Fresh Kitchen',
        description: 'Organic, healthy catering for all occasions',
        rating: 4.9,
        deliveryTime: '30-45 min',
        image: '/restaurants/farm-fresh.jpg'
      },
      {
        id: '2',
        type: 'menu',
        name: 'Organic Garden Salad Tray',
        description: 'Fresh mixed greens with seasonal vegetables',
        price: 65,
        serves: 15,
        restaurant: 'Farm Fresh Kitchen',
        image: '/menus/salad-tray.jpg'
      },
      {
        id: '3',
        type: 'restaurant',
        name: 'Green Garden Bistro',
        description: 'Farm-to-table dining experience',
        rating: 4.8,
        deliveryTime: '25-40 min',
        image: '/restaurants/green-garden.jpg'
      },
      {
        id: '4',
        type: 'menu',
        name: 'Vegetarian Feast Platter',
        description: 'Assorted vegetarian appetizers and mains',
        price: 85,
        serves: 20,
        restaurant: 'Green Garden Bistro',
        image: '/menus/veg-platter.jpg'
      }
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {query ? `Results for "${query}"` : `${category} Restaurants`}
          </h1>
          <p className="text-gray-600">
            {results.length} results found
          </p>
        </div>
        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('restaurants')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'restaurants'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Restaurants
            </button>
            <button
              onClick={() => setFilterType('menus')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'menus'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Menu Items
            </button>
          </div>
          <div className="sm:ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="relevance">Most Relevant</option>
              <option value="rating">Highest Rated</option>
              <option value="price">Price: Low to High</option>
            </select>
          </div>
        </div>
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        )}
        {/* Results Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <Link
                key={result.id}
                href={result.type === 'restaurant' ? `/restaurant/${result.id}` : `/menu/${result.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {result.image && (
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{result.name}</h3>
                    {result.type === 'restaurant' && result.rating && (
                      <span className="flex items-center gap-1 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        ⭐ {result.rating}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{result.description}</p>
                  {result.type === 'restaurant' && result.deliveryTime && (
                    <p className="text-sm text-gray-500">{result.deliveryTime}</p>
                  )}
                  {result.type === 'menu' && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Serves {result.serves}</span>
                      <span className="text-lg font-bold text-blue-600">${result.price}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
        {/* No Results */}
        {!isLoading && results.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
} 