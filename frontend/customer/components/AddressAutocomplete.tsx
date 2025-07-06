/**
 * 🚫 ADDRESS AUTOCOMPLETE - FROZEN DESIGN
 * 
 * IMPORTANT: This component is part of the frozen home page design.
 * The functionality and styling should not be modified without approval.
 * 
 * Reference: frontend/customer/backup/homepage-frozen/AddressAutocomplete.tsx
 * 
 * Last Modified: December 7, 2024
 * Version: 1.0.0 (FROZEN)
 * 
 * DO NOT MODIFY:
 * - Google Maps integration
 * - Autocomplete functionality
 * - Styling and positioning
 * - Location selection behavior
 * 
 * Allowed modifications:
 * - Bug fixes
 * - Performance improvements
 * - Accessibility improvements
 * 
 * Before making any changes, consult the frozen backup version.
 */

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
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AddressAutocomplete({ 
  onLocationSelect, 
  placeholder = "Enter your location",
  defaultValue = "",
  className = "",
  value,
  onChange
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const [valueState, setValue] = useState(defaultValue);
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
          if (onChange) {
            onChange({ target: { value: location.address } } as React.ChangeEvent<HTMLInputElement>);
          } else {
            setValue(location.address);
          }
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
          if (typeof google === 'undefined' || !google.maps || !google.maps.Geocoder) {
            const location = {
              address: `Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
              lat: latitude,
              lng: longitude,
              placeId: 'manual-location'
            };
            if (onChange) {
              onChange({ target: { value: location.address } } as React.ChangeEvent<HTMLInputElement>);
            } else {
              setValue(location.address);
            }
            onLocationSelect(location);
            setIsLoadingLocation(false);
            return;
          }
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
            if (onChange) {
              onChange({ target: { value: location.address } } as React.ChangeEvent<HTMLInputElement>);
            } else {
              setValue(location.address);
            }
            onLocationSelect(location);
          } else {
            alert('Could not find address for your location.');
          }
        } catch (error) {
          console.error('Geocoding error:', error);
          const location = {
            address: `Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
            lat: latitude,
            lng: longitude,
            placeId: 'manual-location'
          };
          if (onChange) {
            onChange({ target: { value: location.address } } as React.ChangeEvent<HTMLInputElement>);
          } else {
            setValue(location.address);
          }
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
          value={typeof value === 'string' ? value : valueState}
          onChange={e => {
            if (onChange) {
              onChange(e);
            } else {
              setValue(e.target.value);
              if (e.target.value.trim()) {
                onLocationSelect({
                  address: e.target.value,
                  lat: 32.7767,
                  lng: -96.7970,
                  placeId: 'manual-input'
                });
              }
            }
          }}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-32 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        />
      </StandaloneSearchBox>
    </div>
  );
} 