"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface RestaurantUser {
  id: string;
  email: string;
  phone: string;
  restaurantName: string;
  ownerName: string;
  address: string;
  cuisine: string;
  isApproved: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: RestaurantUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithPhone: (phone: string, otp: string) => Promise<boolean>;
  signup: (userData: Omit<RestaurantUser, 'id' | 'isApproved' | 'createdAt'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  sendOTP: (phone: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<RestaurantUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('restaurant_token');
        if (token) {
          // In a real app, you'd verify the token with your backend
          const userData = localStorage.getItem('restaurant_user');
          if (userData) {
            setUser(JSON.parse(userData));
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('restaurant_token');
        localStorage.removeItem('restaurant_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Mock API call - replace with actual backend call
      const response = await fetch('/api/restaurant/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('restaurant_token', data.token);
        localStorage.setItem('restaurant_user', JSON.stringify(data.user));
        return true;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithPhone = async (phone: string, otp: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Mock API call - replace with actual backend call
      const response = await fetch('/api/restaurant/login-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('restaurant_token', data.token);
        localStorage.setItem('restaurant_user', JSON.stringify(data.user));
        return true;
      } else {
        throw new Error('Phone login failed');
      }
    } catch (error) {
      console.error('Phone login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: Omit<RestaurantUser, 'id' | 'isApproved' | 'createdAt'> & { password: string }): Promise<boolean> => {
    try {
      setIsLoading(true);
      // First check if email is already used in customer portal
      const customerCheckResponse = await fetch('/api/customer/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData.email }),
      });
      if (customerCheckResponse.ok) {
        const customerData = await customerCheckResponse.json();
        if (customerData.exists) {
          throw new Error('This email is already registered as a customer. Please use a different email for restaurant registration.');
        }
      }
      // Check if email is already used in restaurant portal
      const restaurantCheckResponse = await fetch('/api/restaurant/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData.email }),
      });
      if (restaurantCheckResponse.ok) {
        const restaurantData = await restaurantCheckResponse.json();
        if (restaurantData.exists) {
          throw new Error('This email is already registered as a restaurant. Please use a different email or sign in.');
        }
      }
      // Mock API call - replace with actual backend call
      const response = await fetch('/api/restaurant/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('restaurant_token', data.token);
        localStorage.setItem('restaurant_user', JSON.stringify(data.user));
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error; // Re-throw to handle in the component
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async (phone: string): Promise<boolean> => {
    try {
      // Mock API call - replace with actual backend call
      const response = await fetch('/api/restaurant/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      return response.ok;
    } catch (error) {
      console.error('Send OTP error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('restaurant_token');
    localStorage.removeItem('restaurant_user');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    loginWithPhone,
    signup,
    logout,
    sendOTP,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 