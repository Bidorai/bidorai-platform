'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { cartService, CartItem, Cart } from '@/services/cartService';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id'> }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.menuId === action.payload.menuId && item.restaurantId === action.payload.restaurantId
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          ...action.payload,
          id: `${action.payload.menuId}-${action.payload.restaurantId}-${Date.now()}`
        };
        newItems = [...state.items, newItem];
      }

      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((count, item) => count + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        itemCount
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.itemId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);

      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((count, item) => count + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        itemCount
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((count, item) => count + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        itemCount
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        itemCount: action.payload.itemCount
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false
      };

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  getItemsByRestaurant: (restaurantId: string) => CartItem[];
  hasRestaurantItems: (restaurantId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    isOpen: false
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = cartService.getCart();
    dispatch({ type: 'LOAD_CART', payload: savedCart });
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      cartService.saveCart({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount
      });
    }
  }, [state.items, state.total, state.itemCount]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const getItemsByRestaurant = (restaurantId: string) => {
    return state.items.filter(item => item.restaurantId === restaurantId);
  };

  const hasRestaurantItems = (restaurantId: string) => {
    return getItemsByRestaurant(restaurantId).length > 0;
  };

  const value: CartContextType = {
    state,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    toggleCart,
    closeCart,
    getItemsByRestaurant,
    hasRestaurantItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 