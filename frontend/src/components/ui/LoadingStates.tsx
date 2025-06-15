'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'shimmer' | 'pulse';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  variant = 'default' 
}) => {
  const variants = {
    default: 'bg-gray-200 animate-pulse',
    shimmer: 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer',
    pulse: 'bg-gray-200 animate-pulse-glow',
  };

  return (
    <div 
      className={cn(
        'rounded-lg',
        variants[variant],
        className
      )}
    />
  );
};

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'gradient';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  variant = 'default' 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variants = {
    default: 'text-blue-600',
    gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600',
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className={cn(
          'animate-spin rounded-full border-2 border-transparent border-t-current',
          sizes[size],
          variants[variant]
        )}
      />
    </div>
  );
};

export const LoadingCard: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <div className="space-y-4">
      <Skeleton className="h-4 w-3/4" variant="shimmer" />
      <Skeleton className="h-3 w-1/2" variant="shimmer" />
      <Skeleton className="h-20 w-full" variant="shimmer" />
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-16" variant="shimmer" />
        <Skeleton className="h-8 w-16" variant="shimmer" />
      </div>
    </div>
  </div>
);