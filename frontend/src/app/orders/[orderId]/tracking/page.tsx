// frontend/src/app/orders/[orderId]/tracking/page.tsx
'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { OrderTrackingMap } from '@/components/tracking/OrderTrackingMap';

interface OrderData {
  id: string;
  restaurantLocation: { lat: number; lng: number };
  deliveryLocation: { lat: number; lng: number };
  driverLocation?: { lat: number; lng: number };
  status: 'preparing' | 'ready' | 'picked_up' | 'delivered';
}

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    // Mock order data - replace with actual API call
    const mockOrderData: OrderData = {
      id: orderId,
      restaurantLocation: { lat: 32.7767, lng: -96.7970 }, // Dallas
      deliveryLocation: { lat: 32.8140, lng: -96.9489 }, // Irving
      driverLocation: { lat: 32.7900, lng: -96.8200 }, // En route
      status: 'picked_up'
    };

    setOrderData(mockOrderData);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOrderData(prev => {
        if (!prev || !prev.driverLocation) return prev;
        
        // Simulate driver movement
        return {
          ...prev,
          driverLocation: {
            lat: prev.driverLocation.lat + (Math.random() - 0.5) * 0.001,
            lng: prev.driverLocation.lng + (Math.random() - 0.5) * 0.001,
          }
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId]);

  if (!orderData) {
    return <div>Loading order tracking...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>
      <OrderTrackingMap {...orderData} />
    </div>
  );
}