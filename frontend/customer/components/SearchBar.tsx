'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';

interface SearchResult {
  id: string;
  type: 'restaurant' | 'menu' | 'cuisine' | 'category';
  name: string;
  description?: string;
  image?: string;
  rating?: number;
  deliveryTime?: string;
  category?: string;
}

interface RecentSearch {
  id: string;
  query: string;
  timestamp: Date;
}

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'restaurants' | 'dishes'>('all');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Popular cuisines/categories for quick access
  const popularCategories = [
    { id: '1', name: 'Italian', icon: '🍝', query: 'italian' },
    { id: '2', name: 'Mexican', icon: '🌮', query: 'mexican' },
    { id: '3', name: 'Sushi', icon: '🍣', query: 'sushi' },
    { id: '4', name: 'BBQ', icon: '🍖', query: 'bbq' },
    { id: '5', name: 'Vegetarian', icon: '🥗', query: 'vegetarian' },
    { id: '6', name: 'Desserts', icon: '🍰', query: 'desserts' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchItems = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/search?q=${encodeURIComponent(searchQuery)}&type=${activeTab}`
        );
        if (response.ok) {
          const data = await response.json();
          setResults(data.results || []);
        }
      } catch (error) {
        setResults(getMockResults(searchQuery));
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [activeTab]
  );

  const getMockResults = (searchQuery: string): SearchResult[] => {
    const mockData = [
      {
        id: '1',
        type: 'restaurant' as const,
        name: 'Farm Fresh Kitchen',
        description: 'Organic, healthy catering',
        rating: 4.9,
        deliveryTime: '30-45 min',
        category: 'Healthy'
      },
      {
        id: '2',
        type: 'menu' as const,
        name: 'Organic Garden Salad Tray',
        description: 'Fresh mixed greens, serves 15-20',
        category: 'Salads'
      },
      {
        id: '3',
        type: 'restaurant' as const,
        name: 'Tokyo Sushi Bar',
        description: 'Authentic Japanese cuisine',
        rating: 4.8,
        deliveryTime: '25-40 min',
        category: 'Japanese'
      },
      {
        id: '4',
        type: 'cuisine' as const,
        name: 'Italian Cuisine',
        description: 'View all Italian restaurants'
      }
    ];
    return mockData.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    if (value.trim()) {
      searchItems(value);
    } else {
      setResults([]);
    }
  };

  const saveRecentSearch = (searchQuery: string) => {
    const newSearch: RecentSearch = {
      id: Date.now().toString(),
      query: searchQuery,
      timestamp: new Date()
    };
    const updated = [newSearch, ...recentSearches.filter(s => s.query !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    saveRecentSearch(result.name);
    setIsOpen(false);
    if (result.type === 'restaurant') {
      router.push(`/restaurant/${result.id}`);
    } else if (result.type === 'menu') {
      router.push(`/menu/${result.id}`);
    } else if (result.type === 'cuisine' || result.type === 'category') {
      router.push(`/search?category=${result.name.toLowerCase()}`);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : prev);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex > -1 && results[selectedIndex]) {
        handleResultClick(results[selectedIndex]);
      } else {
        handleSearch(query);
      }
    }
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-2xl mx-4">
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleSearchChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search restaurants, cuisines, or dishes..."
          className="w-full px-12 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
        />
        <svg 
          className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Results
            </button>
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'restaurants' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Restaurants
            </button>
            <button
              onClick={() => setActiveTab('dishes')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'dishes' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dishes
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {isLoading && (
              <div className="px-4 py-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Searching...</p>
              </div>
            )}
            {!isLoading && query && results.length > 0 && (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                  Search Results
                </div>
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={`w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left flex items-center gap-3 ${index === selectedIndex ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex-shrink-0">
                      {result.type === 'restaurant' && (
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600">🏪</span>
                        </div>
                      )}
                      {result.type === 'menu' && (
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <span className="text-green-600">🍽️</span>
                        </div>
                      )}
                      {(result.type === 'cuisine' || result.type === 'category') && (
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600">🏷️</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{result.name}</div>
                      {result.description && (
                        <div className="text-sm text-gray-600 truncate">{result.description}</div>
                      )}
                      {result.type === 'restaurant' && result.rating && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            ⭐ {result.rating}
                          </span>
                          {result.deliveryTime && (
                            <>
                              <span>•</span>
                              <span>{result.deliveryTime}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
            {!isLoading && query && results.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-600">
                <p>No results found for "{query}"</p>
                <p className="text-sm mt-2">Try searching for restaurants or cuisines</p>
              </div>
            )}
            {!query && (
              <>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                  Popular Categories
                </div>
                <div className="grid grid-cols-3 gap-2 p-4">
                  {popularCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setQuery(category.query);
                        handleSearch(category.query);
                      }}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-2xl">{category.icon}</span>
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </button>
                  ))}
                </div>
                {recentSearches.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase flex items-center justify-between">
                      <span>Recent Searches</span>
                      <button
                        onClick={clearRecentSearches}
                        className="text-blue-600 hover:text-blue-800 normal-case font-normal"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="pb-2">
                      {recentSearches.map((recent) => (
                        <button
                          key={recent.id}
                          onClick={() => {
                            setQuery(recent.query);
                            handleSearch(recent.query);
                          }}
                          className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left flex items-center gap-3"
                        >
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700">{recent.query}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 