// frontend/src/components/ui/Button.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'cta' | 'navy' | 'navy-outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  disabled,
  className, 
  children, 
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 focus:ring-blue-500 disabled:hover:translate-y-0 disabled:hover:shadow-lg",
    ghost: "bg-transparent text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-800 focus:ring-gray-500",
    cta: "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 focus:ring-blue-500 disabled:hover:translate-y-0 disabled:hover:shadow-lg",
    navy: "bg-gray-800 text-white shadow-lg shadow-gray-800/30 hover:bg-gray-900 hover:shadow-xl hover:shadow-gray-800/40 hover:-translate-y-0.5 focus:ring-gray-500 disabled:hover:translate-y-0 disabled:hover:shadow-lg",
    'navy-outline': "bg-transparent text-gray-800 border-2 border-gray-800 hover:bg-gray-800 hover:text-white hover:-translate-y-0.5 focus:ring-gray-500 disabled:hover:translate-y-0",
    danger: "bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-0.5 focus:ring-red-500 disabled:hover:translate-y-0 disabled:hover:shadow-lg",
    success: "bg-green-600 text-white shadow-lg shadow-green-600/30 hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/40 hover:-translate-y-0.5 focus:ring-green-500 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[36px]",
    md: "px-6 py-3 text-base min-h-[44px]",
    lg: "px-8 py-4 text-lg min-h-[52px]"
  };

  return (
    <button
      className={cn(
        baseClasses, 
        variants[variant], 
        sizes[size], 
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button;