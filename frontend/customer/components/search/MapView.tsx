'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { 
  MapIcon, 
  StarIcon, 
  ClockIcon, 
  TruckIcon, 
  CurrencyDollarIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

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

interface MapViewProps {
  restaurants: Restaurant[];
}

const mapContainerStyle = {
  width: '100%',
  height: '100vh'
};

const defaultCenter = {
  lat: 32.7767,
  lng: -96.7970 // Dallas, TX
};

export function MapView({ restaurants }: MapViewProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    rating: 0,
    cuisine: [] as string[],
    dietaryOptions: [] as string[],
    distance: 10
  });
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    
    // Fit bounds to show all restaurants
    if (restaurants.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      restaurants.forEach(restaurant => {
        bounds.extend(restaurant.coordinates);
      });
      map.fitBounds(bounds);
    }
  }, [restaurants]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleInfoWindowClose = () => {
    setSelectedRestaurant(null);
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          if (map) {
            map.panTo({ lat: latitude, lng: longitude });
            map.setZoom(14);
          }
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
        }
      );
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() && map) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          map.panTo(location);
          map.setZoom(14);
        }
      });
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (searchQuery && !restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.rating > 0 && restaurant.rating < filters.rating) {
      return false;
    }
    if (filters.cuisine.length > 0 && !restaurant.cuisine.some(c => filters.cuisine.includes(c))) {
      return false;
    }
    if (filters.dietaryOptions.length > 0 && !restaurant.dietaryOptions.some(d => filters.dietaryOptions.includes(d))) {
      return false;
    }
    return true;
  });

  const getMarkerIcon = (restaurant: Restaurant) => {
    if (restaurant.featured) {
      return {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#3B82F6" stroke="#1E40AF" stroke-width="2"/>
            <text x="20" y="25" text-anchor="middle" fill="white" font-size="12" font-weight="bold">★</text>
          </svg>
        `),
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20)
      };
    }
    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="#EF4444" stroke="#DC2626" stroke-width="2"/>
          <text x="16" y="20" text-anchor="middle" fill="white" font-size="10" font-weight="bold">🍽</text>
        </svg>
      `),
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 16)
    };
  };

  if (loadError) {
    return (
      <div className="h-full bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-600">Error loading map</p>
          <p className="text-sm text-gray-500 mt-2">
            Please check your internet connection
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      {/* Search and Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search restaurants or addresses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location Button */}
          <button
            onClick={getCurrentLocation}
            disabled={isLoadingLocation}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            title="Use my location"
          >
            {isLoadingLocation ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <MapPinIcon className="w-5 h-5" />
            )}
          </button>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg ${showFilters ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <FunnelIcon className="w-5 h-5" />
          </button>

          {/* Restaurant Count */}
          <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
            {filteredRestaurants.length} restaurants
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value={0}>Any rating</option>
                  <option value={4}>4+ stars</option>
                  <option value={3}>3+ stars</option>
                  <option value={2}>2+ stars</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={`${filters.priceRange[0]}-${filters.priceRange[1]}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number);
                    setFilters(prev => ({ ...prev, priceRange: [min, max] }));
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="0-500">Any price</option>
                  <option value="0-20">Under $20</option>
                  <option value="20-50">$20 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-500">Over $100</option>
                </select>
              </div>

              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Distance</label>
                <select
                  value={filters.distance}
                  onChange={(e) => setFilters(prev => ({ ...prev, distance: parseInt(e.target.value) }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                  <option value={20}>20 km</option>
                  <option value={50}>50 km</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => setFilters({
                    priceRange: [0, 500],
                    rating: 0,
                    cuisine: [],
                    dietaryOptions: [],
                    distance: 10
                  })}
                  className="w-full bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        }}
      >
        {/* User Location Marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#3B82F6" stroke="#1E40AF" stroke-width="2"/>
                  <circle cx="12" cy="12" r="4" fill="#1E40AF"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24),
              anchor: new google.maps.Point(12, 12)
            }}
            title="Your location"
          />
        )}

        {/* Restaurant Markers */}
        {filteredRestaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={restaurant.coordinates}
            icon={getMarkerIcon(restaurant)}
            onClick={() => handleMarkerClick(restaurant)}
            title={restaurant.name}
          />
        ))}

        {/* Info Window */}
        {selectedRestaurant && (
          <InfoWindow
            position={selectedRestaurant.coordinates}
            onCloseClick={handleInfoWindowClose}
            options={{
              pixelOffset: new google.maps.Size(0, -40)
            }}
          >
            <div className="max-w-sm">
              <div className="flex items-start space-x-3">
                <img
                  src={selectedRestaurant.image}
                  alt={selectedRestaurant.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{selectedRestaurant.name}</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarSolid
                          key={star}
                          className={`w-3 h-3 ${
                            star <= selectedRestaurant.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">({selectedRestaurant.reviewCount})</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-gray-600">
                    <span className="flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {selectedRestaurant.deliveryTime}
                    </span>
                    <span className="flex items-center">
                      <CurrencyDollarIcon className="w-3 h-3 mr-1" />
                      {selectedRestaurant.priceRange}
                    </span>
                  </div>
                  <div className="mt-2">
                    <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700">
                      View Menu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Restaurant List Panel */}
      <div className="absolute bottom-4 left-4 right-4 z-10 bg-white rounded-lg shadow-lg max-h-64 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Nearby Restaurants</h3>
        </div>
        <div className="overflow-y-auto max-h-48">
          {filteredRestaurants.slice(0, 5).map((restaurant) => (
            <div
              key={restaurant.id}
              className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                setSelectedRestaurant(restaurant);
                if (map) {
                  map.panTo(restaurant.coordinates);
                  map.setZoom(16);
                }
              }}
            >
              <div className="flex items-start space-x-3">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{restaurant.name}</h4>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarSolid
                          key={star}
                          className={`w-3 h-3 ${
                            star <= restaurant.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">({restaurant.reviewCount})</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-gray-600">
                    <span>{restaurant.cuisine.join(', ')}</span>
                    <span>•</span>
                    <span>{restaurant.deliveryTime}</span>
                    <span>•</span>
                    <span>{restaurant.priceRange}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {restaurant.distance}km
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 