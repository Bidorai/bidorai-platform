'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface EnhancedCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glassmorphism' | 'gradient' | 'floating';
  hover?: boolean;
  className?: string;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({ 
  children, 
  variant = 'default', 
  hover = true,
  className 
}) => {
  const baseClasses = `
    rounded-2xl transition-all duration-300 ease-out
    transform-gpu will-change-transform
  `;

  const variants = {
    default: `
      bg-white shadow-lg border border-gray-100
      ${hover ? 'hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01]' : ''}
    `,
    glassmorphism: `
      bg-white/10 backdrop-blur-xl border border-white/20
      shadow-xl
      ${hover ? 'hover:bg-white/20 hover:border-white/30 hover:-translate-y-2' : ''}
    `,
    gradient: `
      bg-gradient-to-br from-blue-50 via-white to-purple-50
      border border-gray-200 shadow-lg
      ${hover ? 'hover:shadow-2xl hover:-translate-y-2 hover:from-blue-100 hover:to-purple-100' : ''}
    `,
    floating: `
      bg-white shadow-2xl border-0
      before:absolute before:inset-0 before:rounded-2xl 
      before:bg-gradient-to-r before:from-blue-600/10 before:to-purple-600/10
      before:opacity-0 before:transition-opacity before:duration-300
      relative overflow-hidden
      ${hover ? 'hover:before:opacity-100 hover:shadow-3xl hover:-translate-y-3 hover:scale-[1.02]' : ''}
    `
  };

  return (
    <div className={cn(baseClasses, variants[variant], className)}>
      {children}
    </div>
  );
};