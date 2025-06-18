// frontend/src/lib/googleMaps.ts
import { Loader } from '@googlemaps/js-api-loader';

let loader: Loader | null = null;
let isLoaded = false;

export const initializeGoogleMaps = async (): Promise<void> => {
  if (isLoaded) return;

  if (!loader) {
    loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: 'weekly',
      libraries: ['places', 'geometry'],
    });
  }

  try {
    await loader.load();
    isLoaded = true;
    console.log('Google Maps loaded successfully');
  } catch (error) {
    console.error('Error loading Google Maps:', error);
    throw error;
  }
};

export const isGoogleMapsLoaded = (): boolean => isLoaded;

// Geocoding utilities
export const geocodeAddress = async (address: string): Promise<google.maps.LatLng | null> => {
  if (!isLoaded) await initializeGoogleMaps();
  
  return new Promise((resolve) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        resolve(results[0].geometry.location);
      } else {
        console.error('Geocoding failed:', status);
        resolve(null);
      }
    });
  });
};

// Calculate distance between two points
export const calculateDistance = (
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number => {
  if (!google?.maps?.geometry) return 0;
  
  const latLng1 = new google.maps.LatLng(point1.lat, point1.lng);
  const latLng2 = new google.maps.LatLng(point2.lat, point2.lng);
  
  return google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2) / 1000; // km
};