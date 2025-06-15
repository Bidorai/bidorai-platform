// frontend/src/types/user.ts
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  preferences: {
    cuisines: string[];
    dietaryRestrictions: string[];
    maxDistance: number;
    notifications: {
      bidUpdates: boolean;
      newAuctions: boolean;
      promotions: boolean;
    };
  };
  bidHistory: {
    totalBids: number;
    wonAuctions: number;
    totalSpent: number;
    averageSavings: number;
  };
  paymentMethods: PaymentMethod[];
  addresses: Address[];
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  isDefault: boolean;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}