'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'glassmorphism';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  glow = false,
  disabled,
  className, 
  children, 
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold 
    transition-all duration-300 ease-out rounded-xl 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    transform-gpu will-change-transform
    active:scale-[0.98]
  `;
  
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700 
      text-white shadow-lg shadow-blue-600/25
      hover:from-blue-700 hover:to-blue-800 
      hover:shadow-xl hover:shadow-blue-600/40 
      hover:-translate-y-1 hover:scale-[1.02]
      focus:ring-blue-500
    `,
    secondary: `
      bg-gradient-to-r from-gray-100 to-gray-200 
      text-gray-900 border border-gray-300
      hover:from-gray-200 hover:to-gray-300 
      hover:shadow-lg hover:-translate-y-0.5
      focus:ring-gray-500
    `,
    ghost: `
      bg-transparent text-gray-600 border border-gray-200/50
      backdrop-blur-sm hover:bg-white/80 hover:text-gray-900
      hover:border-gray-300 hover:shadow-lg hover:-translate-y-0.5
      focus:ring-gray-500
    `,
    gradient: `
      bg-gradient-to-r from-orange-500 via-red-500 to-pink-500
      text-white shadow-lg shadow-orange-500/25
      hover:shadow-xl hover:shadow-orange-500/40
      hover:-translate-y-1 hover:scale-[1.02]
      focus:ring-orange-500
    `,
    glassmorphism: `
      bg-white/10 backdrop-blur-xl border border-white/20
      text-white shadow-lg
      hover:bg-white/20 hover:border-white/30
      hover:shadow-xl hover:-translate-y-1
      focus:ring-white/50
    `,
  };

  const sizes = {
    sm: "px-4 py-2.5 text-sm min-h-[40px] gap-2",
    md: "px-6 py-3.5 text-base min-h-[48px] gap-2",
    lg: "px-8 py-4 text-lg min-h-[56px] gap-3",
    xl: "px-10 py-5 text-xl min-h-[64px] gap-3"
  };

  const glowEffect = glow ? `
    before:absolute before:inset-0 before:rounded-xl 
    before:bg-gradient-to-r before:from-blue-600 before:to-purple-600
    before:opacity-75 before:blur-lg before:-z-10
    before:transition-all before:duration-300
    hover:before:opacity-100 hover:before:blur-xl
    relative
  ` : '';

  return (
    <button
      className={cn(
        baseClasses, 
        variants[variant], 
        sizes[size],
        glowEffect,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 animate-spin" />
      )}
      {children}
    </button>
  );
};