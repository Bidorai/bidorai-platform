"use client";
import { usePathname } from 'next/navigation';
import HeaderWithAuth from './HeaderWithAuth';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't render the customer header on restaurant owners pages
  if (pathname?.startsWith('/restaurantowners')) {
    return null;
  }
  
  return <HeaderWithAuth />;
} 