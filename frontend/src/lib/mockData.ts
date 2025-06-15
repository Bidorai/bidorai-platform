// frontend/src/lib/mockData.ts
import { Auction, Restaurant, Bid } from '@/types/bidding';

export const mockRestaurants: Restaurant[] = [
  {
    id: 'farm-fresh-kitchen',
    name: 'Farm Fresh Kitchen',
    description: 'Organic ingredients, sustainable sourcing, farm-to-table excellence',
    cuisine: ['Organic', 'American', 'Healthy'],
    rating: 4.9,
    reviewCount: 156,
    location: {
      address: '123 Organic Way',
      city: 'Dallas',
      state: 'TX',
      coordinates: [32.7767, -96.7970]
    },
    images: ['/api/placeholder/400/300'],
    features: ['Organic Certified', 'Locally Sourced', 'Gluten-Free Options'],
    certifications: ['USDA Organic', 'Local Farm Partnership'],
    averageOrderValue: 75,
    totalOrders: 342,
    responseTime: 25,
    operatingHours: {
      monday: { open: '07:00', close: '22:00' },
      tuesday: { open: '07:00', close: '22:00' },
      wednesday: { open: '07:00', close: '22:00' },
      thursday: { open: '07:00', close: '22:00' },
      friday: { open: '07:00', close: '23:00' },
      saturday: { open: '08:00', close: '23:00' },
      sunday: { open: '08:00', close: '21:00' }
    }
  },
  {
    id: 'green-garden-bistro',
    name: 'Green Garden Bistro',
    description: 'Farm-to-table dining with seasonal menus and sustainable practices',
    cuisine: ['Farm-to-Table', 'Mediterranean', 'Vegetarian'],
    rating: 4.8,
    reviewCount: 203,
    location: {
      address: '456 Garden Street',
      city: 'Dallas',
      state: 'TX',
      coordinates: [32.7767, -96.7970]
    },
    images: ['/api/placeholder/400/300'],
    features: ['Seasonal Menu', 'Sustainable Practices', 'Local Ingredients'],
    certifications: ['Green Restaurant Certified'],
    averageOrderValue: 85,
    totalOrders: 289,
    responseTime: 30,
    operatingHours: {
      monday: { open: '11:00', close: '22:00' },
      tuesday: { open: '11:00', close: '22:00' },
      wednesday: { open: '11:00', close: '22:00' },
      thursday: { open: '11:00', close: '22:00' },
      friday: { open: '11:00', close: '23:00' },
      saturday: { open: '10:00', close: '23:00' },
      sunday: { open: '10:00', close: '21:00' }
    }
  },
  {
    id: 'tokyo-sushi-bar',
    name: 'Tokyo Sushi Bar',
    description: 'Authentic Japanese cuisine with daily fresh fish deliveries',
    cuisine: ['Japanese', 'Sushi', 'Seafood'],
    rating: 4.7,
    reviewCount: 312,
    location: {
      address: '789 Sushi Lane',
      city: 'Dallas',
      state: 'TX',
      coordinates: [32.7767, -96.7970]
    },
    images: ['/api/placeholder/400/300'],
    features: ['Daily Fresh Fish', 'Traditional Preparation', 'Omakase Available'],
    certifications: ['Fresh Fish Certified'],
    averageOrderValue: 95,
    totalOrders: 456,
    responseTime: 20,
    operatingHours: {
      monday: { closed: true },
      tuesday: { open: '17:00', close: '22:00' },
      wednesday: { open: '17:00', close: '22:00' },
      thursday: { open: '17:00', close: '22:00' },
      friday: { open: '17:00', close: '23:00' },
      saturday: { open: '17:00', close: '23:00' },
      sunday: { open: '17:00', close: '21:00' }
    }
  }
];

export const generateMockAuctions = (): Auction[] => {
  const now = new Date();
  const auctionEndTimes = [
    new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours
    new Date(now.getTime() + 4 * 60 * 60 * 1000), // 4 hours
    new Date(now.getTime() + 1 * 60 * 60 * 1000), // 1 hour
  ];

  return [
    {
      id: 'auction-1',
      restaurantId: 'farm-fresh-kitchen',
      title: 'Organic Harvest Bowl Tray',
      description: 'Fresh organic vegetables, quinoa, and locally sourced proteins',
      dish: '🥗 Organic Harvest Bowl',
      serves: 15,
      cuisine: 'Organic Certified',
      startPrice: 280,
      currentBid: 217,
      minimumBid: 222,
      bidIncrement: 5,
      startTime: new Date(now.getTime() - 30 * 60 * 1000),
      endTime: auctionEndTimes[0],
      status: 'live',
      bids: [],
      totalBidders: 8,
      location: 'Dallas, TX',
      images: ['/api/placeholder/400/300'],
      features: ['Organic Certified', 'Locally Sourced', 'Gluten-Free Options'],
      pickupInstructions: 'Ready for pickup 2 hours after auction ends',
      cancellationPolicy: 'Free cancellation up to 1 hour before pickup',
      restaurant: mockRestaurants[0]
    },
    {
      id: 'auction-2',
      restaurantId: 'green-garden-bistro',
      title: 'Sustainable Feast Tray',
      description: 'Mediterranean-inspired dishes with seasonal ingredients',
      dish: '🥘 Sustainable Feast Tray',
      serves: 12,
      cuisine: 'Farm-to-Table',
      startPrice: 220,
      currentBid: 185,
      minimumBid: 190,
      bidIncrement: 5,
      startTime: new Date(now.getTime() - 45 * 60 * 1000),
      endTime: auctionEndTimes[1],
      status: 'live',
      bids: [],
      totalBidders: 12,
      location: 'Dallas, TX',
      images: ['/api/placeholder/400/300'],
      features: ['Seasonal Menu', 'Sustainable Practices', 'Local Ingredients'],
      pickupInstructions: 'Available for pickup within 3 hours',
      cancellationPolicy: 'Cancellation allowed up to 2 hours before pickup',
      restaurant: mockRestaurants[1]
    },
    {
      id: 'auction-3',
      restaurantId: 'tokyo-sushi-bar',
      title: 'Premium Sushi Platter',
      description: 'Assorted nigiri, sashimi, and specialty rolls',
      dish: '🍣 Premium Sushi Platter',
      serves: 8,
      cuisine: 'Japanese Fresh',
      startPrice: 195,
      currentBid: 165,
      minimumBid: 170,
      bidIncrement: 5,
      startTime: new Date(now.getTime() - 15 * 60 * 1000),
      endTime: auctionEndTimes[2],
      status: 'live',
      bids: [],
      totalBidders: 6,
      location: 'Dallas, TX',
      images: ['/api/placeholder/400/300'],
      features: ['Daily Fresh Fish', 'Traditional Preparation', 'Omakase Style'],
      pickupInstructions: 'Must be picked up within 1 hour of completion',
      cancellationPolicy: 'No cancellation for fresh fish orders',
      restaurant: mockRestaurants[2]
    }
  ];
};