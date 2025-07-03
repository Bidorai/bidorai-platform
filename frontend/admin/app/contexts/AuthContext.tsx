"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

interface AdminUser {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  createdAt: string;
}

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithPhone: (phone: string, otp: string) => Promise<boolean>;
  signup: (userData: Omit<AdminUser, 'id' | 'createdAt'> & { password: string }) => Promise<boolean>;
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
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        if (token) {
          // In a real app, you'd verify the token with your backend
          const userData = localStorage.getItem('admin_user');
          if (userData) {
            setUser(JSON.parse(userData));
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const response = await authAPI.login(email, password);
      setUser(response.data.user);
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_user', JSON.stringify(response.data.user));
      return true;
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
      
      const response = await authAPI.loginWithPhone(phone, otp);
      setUser(response.data.user);
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_user', JSON.stringify(response.data.user));
      return true;
    } catch (error) {
      console.error('Phone login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: Omit<AdminUser, 'id' | 'createdAt'> & { password: string }): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const response = await authAPI.signup(userData);
      setUser(response.data.user);
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_user', JSON.stringify(response.data.user));
      return true;
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async (phone: string): Promise<boolean> => {
    try {
      const response = await authAPI.sendOTP(phone);
      return response.data.success;
    } catch (error) {
      console.error('Send OTP error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 