// frontend/src/components/tracking/OrderTrackingMap.tsx
'use client'

import { useEffect, useRef, useState } from 'react';
import { initializeGoogleMaps } from '@/lib/googleMaps';

interface OrderTrackingMapProps {
  orderId: string;
  restaurantLocation: { lat: number; lng: number };
  deliveryLocation: { lat: number; lng: number };
  driverLocation?: { lat: number; lng: number };
  orderStatus: 'preparing' | 'ready' | 'picked_up' | 'delivered';
}

export const OrderTrackingMap = ({
  orderId,
  restaurantLocation,
  deliveryLocation,
  driverLocation,
  orderStatus
}: OrderTrackingMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [driverMarker, setDriverMarker] = useState<google.maps.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    const initMap = async () => {
      try {
        await initializeGoogleMaps();
        
        if (!mapRef.current) return;

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: restaurantLocation,
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        const directionsServiceInstance = new google.maps.DirectionsService();
        const directionsRendererInstance = new google.maps.DirectionsRenderer({
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#1D8FE3',
            strokeWeight: 4,
            strokeOpacity: 0.8
          }
        });

        directionsRendererInstance.setMap(mapInstance);

        setMap(mapInstance);
        setDirectionsService(directionsServiceInstance);
        setDirectionsRenderer(directionsRendererInstance);

        // Add restaurant marker
        new google.maps.Marker({
          position: restaurantLocation,
          map: mapInstance,
          title: 'Restaurant',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#1D8FE3"/>
                <text x="16" y="20" text-anchor="middle" fill="white" font-size="16">🍽️</text>
              </svg>
            `),
            scaledSize: new google.maps.Size(32, 32)
          }
        });

        // Add delivery marker
        new google.maps.Marker({
          position: deliveryLocation,
          map: mapInstance,
          title: 'Delivery Location',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#FFD500"/>
                <text x="16" y="20" text-anchor="middle" fill="black" font-size="16">🏠</text>
              </svg>
            `),
            scaledSize: new google.maps.Size(32, 32)
          }
        });

      } catch (error) {
        console.error('Failed to initialize tracking map:', error);
      }
    };

    initMap();
  }, [restaurantLocation, deliveryLocation]);

  // Update driver location
  useEffect(() => {
    if (!map || !driverLocation) return;

    if (driverMarker) {
      driverMarker.setPosition(driverLocation);
    } else {
      const marker = new google.maps.Marker({
        position: driverLocation,
        map: map,
        title: 'Driver',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#22C55E"/>
              <text x="16" y="20" text-anchor="middle" fill="white" font-size="16">🚗</text>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32)
        }
      });
      setDriverMarker(marker);
    }

    // Update route if driver is en route
    if (directionsService && directionsRenderer && orderStatus === 'picked_up') {
      directionsService.route(
        {
          origin: driverLocation,
          destination: deliveryLocation,
          travelMode: google.maps.TravelMode.DRIVING,
          avoidTolls: true,
        },
        (result, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(result);
          }
        }
      );
    }
  }, [driverLocation, map, directionsService, directionsRenderer, orderStatus]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-2">Order #{orderId}</h3>
        <div className="flex items-center space-x-4">
          <div className={`w-3 h-3 rounded-full ${
            orderStatus === 'preparing' ? 'bg-yellow-500' :
            orderStatus === 'ready' ? 'bg-blue-500' :
            orderStatus === 'picked_up' ? 'bg-green-500' :
            'bg-gray-500'
          }`} />
          <span className="text-sm font-medium capitalize">
            {orderStatus.replace('_', ' ')}
          </span>
        </div>
      </div>
      
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg border border-gray-300"
      />
    </div>
  );
};