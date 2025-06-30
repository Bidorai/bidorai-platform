'use client';

import { LoadScript } from '@react-google-maps/api';
import { ReactNode } from 'react';

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];

interface GoogleMapsProviderProps {
  children: ReactNode;
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  // If no API key is provided, render children without Google Maps
  if (!apiKey) {
    console.warn('Google Maps API key not found. Maps functionality will be limited.');
    return <>{children}</>;
  }

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={libraries}
      onError={(error) => {
        console.error('Google Maps failed to load:', error);
      }}
    >
      {children}
    </LoadScript>
  );
} 