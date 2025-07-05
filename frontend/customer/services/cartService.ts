import { useState, useEffect, useCallback } from 'react';

export interface CartItem {
  id: string;
  menuId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
  dietaryOptions: string[];
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

class CartService {
  private readonly CART_KEY = 'bidovio_cart';

  private getCartInternal(): Cart {
    if (typeof window === 'undefined') {
      return { items: [], total: 0, itemCount: 0 };
    }

    const cartData = localStorage.getItem(this.CART_KEY);
    if (cartData) {
      try {
        return JSON.parse(cartData);
      } catch (error) {
        console.error('Error parsing cart data:', error);
        return { items: [], total: 0, itemCount: 0 };
      }
    }
    return { items: [], total: 0, itemCount: 0 };
  }

  public getCart(): Cart {
    return this.getCartInternal();
  }

  public saveCart(cart: Cart): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  private calculateItemCount(items: CartItem[]): number {
    return items.reduce((count, item) => count + item.quantity, 0);
  }

  addItem(item: Omit<CartItem, 'id'>): Cart {
    const cart = this.getCart();
    const existingItemIndex = cart.items.findIndex(
      cartItem => cartItem.menuId === item.menuId && cartItem.restaurantId === item.restaurantId
    );

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      cart.items[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      const newItem: CartItem = {
        ...item,
        id: `${item.menuId}-${item.restaurantId}-${Date.now()}`
      };
      cart.items.push(newItem);
    }

    cart.total = this.calculateTotal(cart.items);
    cart.itemCount = this.calculateItemCount(cart.items);
    this.saveCart(cart);

    return cart;
  }

  updateItemQuantity(itemId: string, quantity: number): Cart {
    const cart = this.getCart();
    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        cart.items.splice(itemIndex, 1);
      } else {
        // Update quantity
        cart.items[itemIndex].quantity = quantity;
      }

      cart.total = this.calculateTotal(cart.items);
      cart.itemCount = this.calculateItemCount(cart.items);
      this.saveCart(cart);
    }

    return cart;
  }

  removeItem(itemId: string): Cart {
    const cart = this.getCart();
    cart.items = cart.items.filter(item => item.id !== itemId);
    cart.total = this.calculateTotal(cart.items);
    cart.itemCount = this.calculateItemCount(cart.items);
    this.saveCart(cart);

    return cart;
  }

  clearCart(): Cart {
    const emptyCart = { items: [], total: 0, itemCount: 0 };
    this.saveCart(emptyCart);
    return emptyCart;
  }

  getItemCount(): number {
    return this.getCart().itemCount;
  }

  getTotal(): number {
    return this.getCart().total;
  }

  isEmpty(): boolean {
    return this.getCart().items.length === 0;
  }

  // Get items by restaurant
  getItemsByRestaurant(restaurantId: string): CartItem[] {
    return this.getCart().items.filter(item => item.restaurantId === restaurantId);
  }

  // Check if restaurant has items in cart
  hasRestaurantItems(restaurantId: string): boolean {
    return this.getItemsByRestaurant(restaurantId).length > 0;
  }

  // Get unique restaurants in cart
  getRestaurantsInCart(): string[] {
    const cart = this.getCart();
    return [...new Set(cart.items.map(item => item.restaurantId))];
  }
}

export const cartService = new CartService();

// React hook for cart state
export const useCart = () => {
  const [cart, setCart] = useState<Cart>(cartService.getCart());

  const addItem = useCallback((item: Omit<CartItem, 'id'>) => {
    const updatedCart = cartService.addItem(item);
    setCart(updatedCart);
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    const updatedCart = cartService.updateItemQuantity(itemId, quantity);
    setCart(updatedCart);
  }, []);

  const removeItem = useCallback((itemId: string) => {
    const updatedCart = cartService.removeItem(itemId);
    setCart(updatedCart);
  }, []);

  const clearCart = useCallback(() => {
    const updatedCart = cartService.clearCart();
    setCart(updatedCart);
  }, []);

  // Listen for storage changes (for multi-tab sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bidovio_cart') {
        setCart(cartService.getCart());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    cart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    itemCount: cart.itemCount,
    total: cart.total,
    isEmpty: cart.items.length === 0
  };
}; 