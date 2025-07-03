'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  MapPinIcon, 
  StarIcon, 
  ClockIcon, 
  UsersIcon, 
  FunnelIcon,
  MapIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

interface SearchResult {
  id: string;
  type: 'restaurant' | 'menu';
  name: string;
  description: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  serves?: number;
  restaurant?: string;
  deliveryTime?: string;
  cuisine?: string;
  distance?: number;
  minimumOrder?: number;
  tags?: string[];
  dietaryOptions?: string[];
  pickupTime?: string;
  location?: {
    address: string;
    lat: number;
    lng: number;
  };
}

interface FilterState {
  priceRange: [number, number];
  rating: number;
  cuisine: string[];
  dietaryOptions: string[];
  deliveryTime: string;
  partySize: number;
  sortBy: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || 'Dallas, TX';
  const partySize = parseInt(searchParams.get('partySize') || '15');
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 200],
    rating: 0,
    cuisine: [],
    dietaryOptions: [],
    deliveryTime: '',
    partySize: partySize,
    sortBy: 'relevance'
  });

  const cuisines = [
    'American', 'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 
    'Thai', 'Mediterranean', 'BBQ', 'Seafood', 'Vegetarian', 'Vegan'
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 
    'Halal', 'Kosher', 'Low-Carb', 'Keto-Friendly'
  ];

  useEffect(() => {
    searchItems();
  }, [query, location, partySize, filters]);

  const searchItems = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('q', query);
      params.append('location', location);
      params.append('partySize', partySize.toString());
      params.append('sortBy', filters.sortBy);
      params.append('deliveryTime', filters.deliveryTime);
      params.append('priceRange', filters.priceRange.join(','));
      params.append('rating', filters.rating.toString());
      params.append('cuisine', filters.cuisine.join(','));
      params.append('dietaryOptions', filters.dietaryOptions.join(','));
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
        description: 'Organic, healthy catering for all occasions with farm-to-table ingredients',
        rating: 4.9,
        reviewCount: 127,
        deliveryTime: '30-45 min',
        cuisine: 'American',
        distance: 2.3,
        minimumOrder: 50,
        tags: ['Organic', 'Farm-to-Table', 'Healthy'],
        dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free'],
        pickupTime: '2-3 hours',
        image: '/restaurants/farm-fresh.jpg',
        location: {
          address: '123 Main St, Dallas, TX',
          lat: 32.7767,
          lng: -96.7970
        }
      },
      {
        id: '2',
        type: 'menu',
        name: 'Organic Garden Salad Tray',
        description: 'Fresh mixed greens with seasonal vegetables, house-made dressing',
        price: 65,
        serves: 15,
        restaurant: 'Farm Fresh Kitchen',
        cuisine: 'American',
        tags: ['Organic', 'Fresh', 'Healthy'],
        dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free'],
        image: '/menus/salad-tray.jpg'
      },
      {
        id: '3',
        type: 'restaurant',
        name: 'Green Garden Bistro',
        description: 'Farm-to-table dining experience with locally sourced ingredients',
        rating: 4.8,
        reviewCount: 89,
        deliveryTime: '25-40 min',
        cuisine: 'Mediterranean',
        distance: 1.8,
        minimumOrder: 40,
        tags: ['Farm-to-Table', 'Local', 'Fresh'],
        dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free'],
        pickupTime: '1-2 hours',
        image: '/restaurants/green-garden.jpg',
        location: {
          address: '456 Oak Ave, Dallas, TX',
          lat: 32.7767,
          lng: -96.7970
        }
      },
      {
        id: '4',
        type: 'menu',
        name: 'Vegetarian Feast Platter',
        description: 'Assorted vegetarian appetizers and mains with dipping sauces',
        price: 85,
        serves: 20,
        restaurant: 'Green Garden Bistro',
        cuisine: 'Mediterranean',
        tags: ['Vegetarian', 'Assorted', 'Fresh'],
        dietaryOptions: ['Vegetarian', 'Vegan'],
        image: '/menus/veg-platter.jpg'
      },
      {
        id: '5',
        type: 'restaurant',
        name: 'BBQ Pit Masters',
        description: 'Authentic Texas BBQ with slow-smoked meats and traditional sides',
        rating: 4.7,
        reviewCount: 203,
        deliveryTime: '45-60 min',
        cuisine: 'BBQ',
        distance: 3.1,
        minimumOrder: 60,
        tags: ['BBQ', 'Smoked', 'Traditional'],
        dietaryOptions: ['Gluten-Free'],
        pickupTime: '3-4 hours',
        image: '/restaurants/bbq-pit.jpg',
        location: {
          address: '789 BBQ Lane, Dallas, TX',
          lat: 32.7767,
          lng: -96.7970
        }
      },
      {
        id: '6',
        type: 'menu',
        name: 'BBQ Feast Combo',
        description: 'Brisket, ribs, pulled pork with coleslaw and baked beans',
        price: 120,
        serves: 25,
        restaurant: 'BBQ Pit Masters',
        cuisine: 'BBQ',
        tags: ['BBQ', 'Combo', 'Traditional'],
        dietaryOptions: ['Gluten-Free'],
        image: '/menus/bbq-combo.jpg'
      }
    ];
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 200],
      rating: 0,
      cuisine: [],
      dietaryOptions: [],
      deliveryTime: '',
      partySize: partySize,
      sortBy: 'relevance'
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.rating > 0) count++;
    if (filters.cuisine.length > 0) count++;
    if (filters.dietaryOptions.length > 0) count++;
    if (filters.deliveryTime) count++;
    if (filters.priceRange[1] < 200) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-700">
                ← Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {query ? `"${query}"` : 'Party Catering'} in {location}
                </h1>
                <p className="text-sm text-gray-600">
                  {results.length} restaurants • {partySize} people
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
                              <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Bars3Icon className="w-5 h-5" />
                </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <MapIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  {showFilters ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                </button>
              </div>

              {showFilters && (
                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Minimum Rating</h3>
                    <div className="space-y-2">
                      {[4, 4.5, 4.8].map(rating => (
                        <label key={rating} className="flex items-center">
                          <input
                            type="radio"
                            name="rating"
                            value={rating}
                            checked={filters.rating === rating}
                            onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                            className="mr-2"
                          />
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600">{rating}+</span>
                            <div className="flex ml-1">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Cuisine */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Cuisine</h3>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {cuisines.map(cuisine => (
                        <label key={cuisine} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.cuisine.includes(cuisine)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleFilterChange('cuisine', [...filters.cuisine, cuisine]);
                              } else {
                                handleFilterChange('cuisine', filters.cuisine.filter(c => c !== cuisine));
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-600">{cuisine}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Dietary Options */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Dietary Options</h3>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {dietaryOptions.map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.dietaryOptions.includes(option)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleFilterChange('dietaryOptions', [...filters.dietaryOptions, option]);
                              } else {
                                handleFilterChange('dietaryOptions', filters.dietaryOptions.filter(o => o !== option));
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-600">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Time */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Delivery Time</h3>
                    <select
                      value={filters.deliveryTime}
                      onChange={(e) => handleFilterChange('deliveryTime', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Any time</option>
                      <option value="30">30 minutes or less</option>
                      <option value="45">45 minutes or less</option>
                      <option value="60">1 hour or less</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  {getActiveFiltersCount() > 0 && (
                    <button
                      onClick={clearFilters}
                      className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 rounded-md hover:bg-blue-50"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {results.length} results
                </span>
                {getActiveFiltersCount() > 0 && (
                  <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {getActiveFiltersCount()} filters applied
                  </span>
                )}
              </div>
              
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="relevance">Most Relevant</option>
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="delivery-time">Fastest Delivery</option>
              </select>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Searching restaurants...</p>
              </div>
            )}

            {/* Results Grid */}
            {!isLoading && (
              <div className="space-y-4">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex">
                      {/* Image */}
                      <div className="w-48 h-32 flex-shrink-0">
                        <img
                          src={result.image || '/placeholder-restaurant.jpg'}
                          alt={result.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {result.name}
                              </h3>
                              {result.type === 'restaurant' && result.rating && (
                                <div className="flex items-center space-x-1">
                                  <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm font-medium text-gray-900">
                                    {result.rating}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    ({result.reviewCount})
                                  </span>
                                </div>
                              )}
                            </div>

                            {result.type === 'menu' && result.restaurant && (
                              <p className="text-sm text-gray-600 mb-1">
                                by {result.restaurant}
                              </p>
                            )}

                            <p className="text-gray-600 text-sm mb-2">
                              {result.description}
                            </p>

                            {/* Tags */}
                            {result.tags && result.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {result.tags.map(tag => (
                                  <span
                                    key={tag}
                                    className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Details */}
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              {result.type === 'restaurant' && (
                                <>
                                  {result.deliveryTime && (
                                    <div className="flex items-center">
                                      <ClockIcon className="w-4 h-4 mr-1" />
                                      {result.deliveryTime}
                                    </div>
                                  )}
                                  {result.distance && (
                                    <div className="flex items-center">
                                      <MapPinIcon className="w-4 h-4 mr-1" />
                                      {result.distance} mi
                                    </div>
                                  )}
                                  {result.minimumOrder && (
                                    <span>Min. ${result.minimumOrder}</span>
                                  )}
                                </>
                              )}
                              {result.type === 'menu' && (
                                <>
                                  <div className="flex items-center">
                                    <UsersIcon className="w-4 h-4 mr-1" />
                                    Serves {result.serves}
                                  </div>
                                  <span className="text-lg font-bold text-blue-600">
                                    ${result.price}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="ml-4">
                            <Link
                              href={result.type === 'restaurant' ? `/restaurant/${result.id}` : `/menu/${result.id}`}
                              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                            >
                              {result.type === 'restaurant' ? 'View Menu' : 'View Details'}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && results.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <MagnifyingGlassIcon className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 