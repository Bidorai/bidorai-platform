// frontend/src/components/common/LocationAutocomplete.tsx
'use client'

import { useRef, useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { initializeGoogleMaps } from '@/lib/googleMaps';
import { useLocation } from '@/contexts/LocationContext';
import { toast } from 'sonner';

interface LocationAutocompleteProps {
  placeholder?: string;
  className?: string;
  onLocationSelect?: (address: string, coordinates: { lat: number; lng: number }) => void;
}

export const LocationAutocomplete = ({ 
  placeholder = "Enter pickup location...", 
  className = "",
  onLocationSelect 
}: LocationAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { location, updateLocation, isLoading, setIsLoading } = useLocation();
  const [inputValue, setInputValue] = useState(location.address);

  useEffect(() => {
    const initializeAutocomplete = async () => {
      try {
        await initializeGoogleMaps();
        
        if (inputRef.current && !autocompleteRef.current) {
          autocompleteRef.current = new google.maps.places.Autocomplete(
            inputRef.current,
            {
              types: ['address'],
              componentRestrictions: { country: 'us' },
              fields: ['formatted_address', 'geometry', 'address_components']
            }
          );

          autocompleteRef.current.addListener('place_changed', handlePlaceChanged);
        }
      } catch (error) {
        console.error('Failed to initialize autocomplete:', error);
        toast.error('Failed to load location search');
      }
    };

    initializeAutocomplete();

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    
    if (place?.formatted_address && place?.geometry?.location) {
      const address = place.formatted_address;
      const coordinates = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      setInputValue(address);
      updateLocation(address, coordinates);
      onLocationSelect?.(address, coordinates);
      
      toast.success('📍 Location updated successfully');
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported by your browser');
      return;
    }

    setIsLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const geocoder = new google.maps.Geocoder();
          const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
            geocoder.geocode(
              { location: { lat: latitude, lng: longitude } },
              (results, status) => {
                if (status === 'OK' && results) {
                  resolve(results);
                } else {
                  reject(new Error(`Geocoding failed: ${status}`));
                }
              }
            );
          });

          if (results[0]) {
            const address = results[0].formatted_address;
            const coordinates = { lat: latitude, lng: longitude };
            
            setInputValue(address);
            updateLocation(address, coordinates);
            onLocationSelect?.(address, coordinates);
            
            toast.success('📍 Current location detected');
          }
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
          toast.error('Failed to get address for your location');
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast.error('Failed to get your location');
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  };

  return (
    <div className={`relative ${className}`}>
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bidorai-neutral-400 w-4 h-4" />
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-20 py-2 border border-bidorai-neutral-300 rounded-md text-sm bg-white transition-colors focus:outline-none focus:border-bidorai-blue-600"
      />
      <button
        type="button"
        onClick={handleDetectLocation}
        disabled={isLoading}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-bidorai-blue-600 text-white border-none rounded px-2 py-1 text-xs cursor-pointer font-semibold whitespace-nowrap disabled:opacity-50 hover:bg-bidorai-blue-700 transition-colors"
      >
        {isLoading ? '📍 Getting...' : '📍 Detect'}
      </button>
    </div>
  );
};