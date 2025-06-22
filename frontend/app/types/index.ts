export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  rating: number;
  image: string;
  menus: Menu[];
}

export interface Menu {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  basePrice: number;
  servingSize: number;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface Bid {
  id: string;
  menuId: string;
  userId: string;
  amount: number;
  timestamp: Date;
  status: 'active' | 'won' | 'lost' | 'expired';
}

export interface AuctionSession {
  id: string;
  menuId: string;
  startTime: Date;
  endTime: Date;
  startingPrice: number;
  currentHighestBid: number;
  currentHighestBidder: string | null;
  participants: number;
  status: 'upcoming' | 'active' | 'completed';
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}