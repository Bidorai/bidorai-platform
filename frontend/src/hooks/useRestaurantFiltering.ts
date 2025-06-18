// frontend/src/hooks/useRestaurantFiltering.ts
import { useState, useEffect } from 'react';
import { useLocation } from '@/contexts/LocationContext';

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: [number, number]; // [lat, lng]
  };
  images: string[];
  features: string[];
  certifications?: string[];
  averageOrderValue: number;
  totalOrders: number;
  responseTime: number;
  operatingHours: {
    [key: string]: { open: string; close: string };
  };
}

export interface FilteredRestaurant extends Restaurant {
  distance?: number;
}

interface FilterOptions {
  maxDistance?: number;
  minRating?: number;
  cuisineTypes?: string[];
  maxResponseTime?: number;
  searchQuery?: string;
}

// Calculate distance between two points using Haversine formula
const calculateDistance = (
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(point1.lat * Math.PI / 180) *
      Math.cos(point2.lat * Math.PI / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const useRestaurantFiltering = (
  restaurants: Restaurant[],
  filters: FilterOptions = {}
) => {
  const { location } = useLocation();
  const [filteredRestaurants, setFilteredRestaurants] = useState<FilteredRestaurant[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [stats, setStats] = useState({
    totalRestaurants: 0,
    filteredCount: 0,
    averageDistance: 0,
    nearestDistance: 0,
  });

  useEffect(() => {
    if (!restaurants.length) {
      setFilteredRestaurants([]);
      setStats({
        totalRestaurants: 0,
        filteredCount: 0,
        averageDistance: 0,
        nearestDistance: 0,
      });
      return;
    }

    setIsFiltering(true);

    const filterAndSort = async () => {
      try {
        // Add distance to each restaurant if user location is available
        const restaurantsWithDistance = restaurants.map(restaurant => {
          let distance = 0;
          if (location.coordinates) {
            distance = calculateDistance(
              location.coordinates,
              {
                lat: restaurant.location.coordinates[0],
                lng: restaurant.location.coordinates[1]
              }
            );
          }

          return {
            ...restaurant,
            distance
          };
        });

        // Apply filters
        let filtered = restaurantsWithDistance.filter(restaurant => {
          // Distance filter
          if (filters.maxDistance && restaurant.distance > filters.maxDistance) {
            return false;
          }

          // Rating filter
          if (filters.minRating && restaurant.rating < filters.minRating) {
            return false;
          }

          // Response time filter
          if (filters.maxResponseTime && restaurant.responseTime > filters.maxResponseTime) {
            return false;
          }

          // Cuisine filter
          if (filters.cuisineTypes && filters.cuisineTypes.length > 0) {
            const hasMatchingCuisine = restaurant.cuisine.some(cuisine =>
              filters.cuisineTypes!.includes(cuisine.toLowerCase())
            );
            if (!hasMatchingCuisine) {
              return false;
            }
          }

          // Search query filter
          if (filters.searchQuery && filters.searchQuery.trim()) {
            const query = filters.searchQuery.toLowerCase();
            const matchesName = restaurant.name.toLowerCase().includes(query);
            const matchesCuisine = restaurant.cuisine.some(c => 
              c.toLowerCase().includes(query)
            );
            const matchesDescription = restaurant.description.toLowerCase().includes(query);
            
            if (!matchesName && !matchesCuisine && !matchesDescription) {
              return false;
            }
          }

          return true;
        });

        // Sort by distance if user location is available, otherwise by rating
        if (location.coordinates) {
          filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        } else {
          filtered.sort((a, b) => b.rating - a.rating);
        }

        // Calculate stats
        const distances = filtered
          .map(r => r.distance || 0)
          .filter(d => d > 0);
        
        const avgDistance = distances.length > 0 
          ? distances.reduce((sum, d) => sum + d, 0) / distances.length 
          : 0;
        
        const nearestDistance = distances.length > 0 
          ? Math.min(...distances) 
          : 0;

        setStats({
          totalRestaurants: restaurants.length,
          filteredCount: filtered.length,
          averageDistance: Number(avgDistance.toFixed(1)),
          nearestDistance: Number(nearestDistance.toFixed(1)),
        });

        setFilteredRestaurants(filtered);
      } catch (error) {
        console.error('Error filtering restaurants:', error);
        setFilteredRestaurants(restaurantsWithDistance || restaurants);
      } finally {
        setIsFiltering(false);
      }
    };

    filterAndSort();
  }, [location.coordinates, restaurants, filters]);

  const getRestaurantById = (id: string): FilteredRestaurant | undefined => {
    return filteredRestaurants.find(restaurant => restaurant.id === id);
  };

  const getNearbyRestaurants = (radius: number = 10): FilteredRestaurant[] => {
    if (!location.coordinates) return filteredRestaurants;
    
    return filteredRestaurants.filter(restaurant => 
      restaurant.distance && restaurant.distance <= radius
    );
  };

  const getRestaurantsByCuisine = (cuisineType: string): FilteredRestaurant[] => {
    return filteredRestaurants.filter(restaurant =>
      restaurant.cuisine.some(c => 
        c.toLowerCase().includes(cuisineType.toLowerCase())
      )
    );
  };

  const getTopRatedRestaurants = (limit: number = 10): FilteredRestaurant[] => {
    return [...filteredRestaurants]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  };

  return {
    filteredRestaurants,
    isFiltering,
    stats,
    getRestaurantById,
    getNearbyRestaurants,
    getRestaurantsByCuisine,
    getTopRatedRestaurants,
  };
};