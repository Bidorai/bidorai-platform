'use client';

import { useRef, useCallback, useState } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';

interface AddressAutocompleteProps {
  onLocationSelect: (location: { 
    address: string; 
    lat: number; 
    lng: number;
    placeId: string;
  }) => void;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export function AddressAutocomplete({ 
  onLocationSelect, 
  placeholder = "Enter your location",
  defaultValue = "",
  className = ""
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const [value, setValue] = useState(defaultValue);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [googleMapsError, setGoogleMapsError] = useState(false);

  const onLoad = useCallback((ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  }, []);

  const onPlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        if (place.geometry && place.geometry.location) {
          const location = {
            address: place.formatted_address || '',
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            placeId: place.place_id || ''
          };
          setValue(location.address);
          onLocationSelect(location);
        }
      }
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Check if Google Maps is available
          if (typeof google === 'undefined' || !google.maps || !google.maps.Geocoder) {
            // Fallback: use coordinates as address
            const location = {
              address: `Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
              lat: latitude,
              lng: longitude,
              placeId: 'manual-location'
            };
            setValue(location.address);
            onLocationSelect(location);
            setIsLoadingLocation(false);
            return;
          }

          // Use Google Geocoding API to get address from coordinates
          const geocoder = new google.maps.Geocoder();
          const result = await geocoder.geocode({
            location: { lat: latitude, lng: longitude }
          });

          if (result.results && result.results.length > 0) {
            const place = result.results[0];
            const location = {
              address: place.formatted_address || '',
              lat: latitude,
              lng: longitude,
              placeId: place.place_id || ''
            };
            setValue(location.address);
            onLocationSelect(location);
          } else {
            alert('Could not find address for your location.');
          }
        } catch (error) {
          console.error('Geocoding error:', error);
          // Fallback: use coordinates as address
          const location = {
            address: `Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
            lat: latitude,
            lng: longitude,
            placeId: 'manual-location'
          };
          setValue(location.address);
          onLocationSelect(location);
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Error getting your location.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        
        alert(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  return (
    <div className="relative">
      <StandaloneSearchBox
        onLoad={onLoad}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            // Simulate location selection with default coordinates when user types
            if (e.target.value.trim()) {
              onLocationSelect({
                address: e.target.value,
                lat: 32.7767, // Dallas coordinates as fallback
                lng: -96.7970,
                placeId: 'manual-input'
              });
            }
          }}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-32 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        />
      </StandaloneSearchBox>
      {/* Use My Location Button */}
      <button
        onClick={handleUseMyLocation}
        disabled={isLoadingLocation}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
      >
        {isLoadingLocation ? (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Loading...</span>
          </div>
        ) : (
          <span>📍 Use My Location</span>
        )}
      </button>
    </div>
  );
} 