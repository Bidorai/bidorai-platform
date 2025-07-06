'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  viewMode: 'list' | 'map';
  setViewMode: (mode: 'list' | 'map') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  location: string;
  setLocation: (location: string) => void;
  partySize: number;
  setPartySize: (size: number) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Dallas, TX');
  const [partySize, setPartySize] = useState(15);

  return (
    <SearchContext.Provider value={{
      viewMode,
      setViewMode,
      searchQuery,
      setSearchQuery,
      location,
      setLocation,
      partySize,
      setPartySize,
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 