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
  ChevronUpIcon,
  AdjustmentsHorizontalIcon,
  HeartIcon,
  TruckIcon,
  CheckCircleIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { MapView, EmptyState } from '@/components/search';
import { useSearch } from '../../contexts/SearchContext';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  cuisine: string[];
  priceRange: string;
  distance: number;
  deliveryTime: string;
  minimumOrder: number;
  dietaryOptions: string[];
  featured: boolean;
  onTimeDelivery: number;
  tags: string[];
  address: string;
  coordinates: { lat: number; lng: number };
  available: boolean;
  menus: Menu[];
}

interface Menu {
  id: string;
  name: string;
  description: string;
  price: number;
  serves: number;
  image: string;
  category: string;
  dietaryOptions: string[];
  popularItem: boolean;
  bidEnabled: boolean;
  currentBid: number | null;
  bidEndTime: string | null;
}

interface FilterState {
  priceRange: [number, number];
  rating: number;
  cuisine: string[];
  dietaryOptions: string[];
  deliveryTime: string;
  distance: number;
  features: string[];
  sortBy: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { viewMode, setViewMode }: { viewMode: 'list' | 'map'; setViewMode: (mode: 'list' | 'map') => void } = useSearch();
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || 'Dallas, TX';
  const partySize = parseInt(searchParams.get('partySize') || '15');
  
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [expandedRestaurant, setExpandedRestaurant] = useState<string | null>(null);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState('');
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showPartySizeModal, setShowPartySizeModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);
  
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500],
    rating: 0,
    cuisine: [],
    dietaryOptions: [],
    deliveryTime: '',
    distance: 10,
    features: [],
    sortBy: 'recommended'
  });

  const cuisineTypes = [
    'American', 'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 
    'Thai', 'Mediterranean', 'BBQ', 'Seafood', 'Pizza', 'Sandwiches',
    'Breakfast', 'Bakery', 'Greek', 'Korean', 'Vietnamese', 'French'
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 
    'Halal', 'Kosher', 'Low-Carb', 'Keto-Friendly', 'Organic'
  ];

  const features = [
    'Free Delivery', 'Eco-Friendly Packaging', 'Individually Packaged',
    'Setup Service', 'Utensils Included', 'Contactless Delivery'
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'delivery_time', label: 'Fastest Delivery' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'distance', label: 'Distance' }
  ];

  useEffect(() => {
    fetchRestaurants();
  }, [query, location, partySize, filters]);

  const fetchRestaurants = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (location) params.append('location', location);
      if (partySize) params.append('partySize', partySize.toString());
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.cuisine.length > 0) params.append('cuisines', filters.cuisine.join(','));
      if (filters.dietaryOptions.length > 0) params.append('dietaryOptions', filters.dietaryOptions.join(','));
      if (filters.rating > 0) params.append('minRating', filters.rating.toString());
      if (filters.distance < 10) params.append('maxDistance', filters.distance.toString());
      if (filters.priceRange[0] > 0) params.append('minPrice', filters.priceRange[0].toString());
      if (filters.priceRange[1] < 500) params.append('maxPrice', filters.priceRange[1].toString());
      if (filters.features.length > 0) params.append('features', filters.features.join(','));
      if (selectedDeliveryDate) params.append('deliveryDate', selectedDeliveryDate);
      if (selectedDeliveryTime) params.append('deliveryTime', selectedDeliveryTime);

      const response = await fetch(`/api/search/restaurants?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setRestaurants(data.data.restaurants);
      } else {
        console.error('Search failed:', data.error);
        setRestaurants([]);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setRestaurants([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleCuisine = (cuisine: string) => {
    setFilters(prev => ({
      ...prev,
      cuisine: prev.cuisine.includes(cuisine)
        ? prev.cuisine.filter(c => c !== cuisine)
        : [...prev.cuisine, cuisine]
    }));
  };

  const toggleDietaryOption = (option: string) => {
    setFilters(prev => ({
      ...prev,
      dietaryOptions: prev.dietaryOptions.includes(option)
        ? prev.dietaryOptions.filter(d => d !== option)
        : [...prev.dietaryOptions, option]
    }));
  };

  const toggleFeature = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 500],
      rating: 0,
      cuisine: [],
      dietaryOptions: [],
      deliveryTime: '',
      distance: 10,
      features: [],
      sortBy: 'recommended'
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.rating > 0) count++;
    if (filters.cuisine.length > 0) count += filters.cuisine.length;
    if (filters.dietaryOptions.length > 0) count += filters.dietaryOptions.length;
    if (filters.features.length > 0) count += filters.features.length;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) count++;
    if (filters.distance < 10) count++;
    return count;
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (location) params.append('location', location);
    if (partySize) params.append('partySize', partySize.toString());
    router.push(`/search?${params.toString()}`);
  };

  const formatTimeRemaining = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${minutes}m remaining`;
    }
  };

  const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
    const isExpanded = expandedRestaurant === restaurant.id;
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{restaurant.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <StarSolid className="w-4 h-4 text-yellow-400" />
                      <span className="ml-1">{restaurant.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{restaurant.reviewCount} reviews</span>
                    <span>•</span>
                    <span>{restaurant.distance} km away</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {restaurant.cuisine.map(cuisine => (
                  <span key={cuisine} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {cuisine}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{restaurant.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {restaurant.deliveryTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <CurrencyDollarIcon className="w-4 h-4" />
                    {restaurant.priceRange}
                  </span>
                  <span className="flex items-center gap-1">
                    <TruckIcon className="w-4 h-4" />
                    {restaurant.onTimeDelivery}% on time
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => setExpandedRestaurant(isExpanded ? null : restaurant.id)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {isExpanded ? 'Show less' : 'View menu'}
              </button>
            </div>
          </div>
          
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Popular Items</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurant.menus.slice(0, 4).map(menu => (
                  <div key={menu.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img 
                      src={menu.image} 
                      alt={menu.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{menu.name}</h5>
                      <p className="text-sm text-gray-600">Serves {menu.serves}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-semibold text-blue-600">${menu.price}</span>
                        {menu.bidEnabled && (
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                            Bidding available
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href={`/restaurant/${restaurant.id}`}
                className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                View Full Menu →
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {viewMode === 'map' ? (
          <MapView restaurants={restaurants} />
        ) : (
          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <div className={`${showFilters ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  {getActiveFiltersCount() > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear all ({getActiveFiltersCount()})
                    </button>
                  )}
                </div>

                {/* Delivery Date/Time Selection */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">When is your Party?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      <input
                        type="date"
                        value={selectedDeliveryDate}
                        onChange={(e) => setSelectedDeliveryDate(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4 text-gray-500" />
                      <select
                        value={selectedDeliveryTime}
                        onChange={(e) => setSelectedDeliveryTime(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select time</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="11:30">11:30 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="12:30">12:30 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="13:30">1:30 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="17:30">5:30 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="18:30">6:30 PM</option>
                        <option value="19:00">7:00 PM</option>
                      </select>
                    </div>
                    <div className="text-xs text-gray-600">
                      Showing restaurants available for your selected time
                    </div>
                  </div>
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Person
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      value={filters.priceRange[0]}
                      onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                      className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      min="0"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                      className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => handleFilterChange('rating', star)}
                        className={`p-1 rounded ${
                          filters.rating >= star 
                            ? 'text-yellow-400' 
                            : 'text-gray-300 hover:text-yellow-400'
                        }`}
                      >
                        <StarSolid className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cuisine Types */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuisine Types
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {cuisineTypes.map(cuisine => (
                      <label key={cuisine} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.cuisine.includes(cuisine)}
                          onChange={() => toggleCuisine(cuisine)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{cuisine}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dietary Options */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Options
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {dietaryOptions.map(option => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.dietaryOptions.includes(option)}
                          onChange={() => toggleDietaryOption(option)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  <div className="space-y-2">
                    {features.map(feature => (
                      <label key={feature} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.features.includes(feature)}
                          onChange={() => toggleFeature(feature)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Distance */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Distance: {filters.distance} km
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={filters.distance}
                    onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              {/* Filters Toggle */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <FunnelIcon className="w-5 h-5" />
                  <span>Filters</span>
                </button>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    {isLoading ? 'Loading...' : `${restaurants.length} restaurants found`}
                  </div>
                  {/* View Toggle */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${(viewMode as 'list' | 'map') === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <Bars3Icon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`p-2 rounded-lg ${(viewMode as 'list' | 'map') === 'map' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <MapIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Results */}
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : restaurants.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="space-y-4">
                  {restaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 