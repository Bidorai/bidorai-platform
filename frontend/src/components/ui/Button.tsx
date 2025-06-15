'use client';

import React from 'react';
import { EnhancedButton } from './EnhancedButton';

// Keep the old interface for backward compatibility
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'cta' | 'navy' | 'navy-outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  // Map old variants to new ones
  const variantMap: Record<string, any> = {
    'primary': 'primary',
    'ghost': 'ghost',
    'cta': 'gradient',
    'navy': 'primary',
    'navy-outline': 'ghost',
    'danger': 'gradient',
    'success': 'primary'
  };

  return (
    <EnhancedButton 
      variant={variantMap[variant] || 'primary'} 
      {...props} 
    />
  );
};

export default Button;