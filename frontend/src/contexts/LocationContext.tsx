// frontend/src/contexts/LocationContext.tsx
'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface LocationData {
  address: string;
  coordinates: { lat: number; lng: number } | null;
  city: string;
  state: string;
}

interface LocationContextType {
  location: LocationData;
  setLocation: (location: LocationData) => void;
  updateLocation: (address: string, coordinates: { lat: number; lng: number }) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const [location, setLocationState] = useState<LocationData>({
    address: '',
    coordinates: null,
    city: 'Dallas',
    state: 'TX'
  });
  const [isLoading, setIsLoading] = useState(false);

  const setLocation = useCallback((newLocation: LocationData) => {
    setLocationState(newLocation);
  }, []);

  const updateLocation = useCallback((address: string, coordinates: { lat: number; lng: number }) => {
    // Extract city and state from address
    const parts = address.split(', ');
    const city = parts[parts.length - 3] || 'Dallas';
    const state = parts[parts.length - 2]?.split(' ')[0] || 'TX';

    setLocationState({
      address,
      coordinates,
      city,
      state
    });
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        updateLocation,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};