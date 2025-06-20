// frontend/src/lib/googleMaps.ts
import { Loader } from '@googlemaps/js-api-loader';

let googleMapsPromise: Promise<void> | null = null;

export const initializeGoogleMaps = (): Promise<void> => {
  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    return Promise.reject(new Error('Google Maps API key is not configured. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.'));
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places', 'geometry'],
      region: 'US',
      language: 'en',
    });

    loader.load()
      .then(() => {
        console.log('✅ Google Maps loaded successfully');
        resolve();
      })
      .catch((error) => {
        console.error('❌ Google Maps failed to load:', error);
        reject(error);
      });
  });

  return googleMapsPromise;
};

// Helper function to geocode an address
export const geocodeAddress = async (address: string): Promise<google.maps.LatLng | null> => {
  try {
    await initializeGoogleMaps();
    
    const geocoder = new google.maps.Geocoder();
    const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results) {
          resolve(results);
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });

    return results[0]?.geometry?.location || null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

// Helper function to reverse geocode coordinates
export const reverseGeocode = async (lat: number, lng: number): Promise<string | null> => {
  try {
    await initializeGoogleMaps();
    
    const geocoder = new google.maps.Geocoder();
    const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results) {
          resolve(results);
        } else {
          reject(new Error(`Reverse geocoding failed: ${status}`));
        }
      });
    });

    return results[0]?.formatted_address || null;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
};

// Helper function to calculate distance between two points
export const calculateDistance = (
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};