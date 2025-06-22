// app/components/SearchBar.tsx
'use client';

import { useState, useRef, useEffect } from 'react';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="flex-1 max-w-md relative">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search restaurants, cuisines..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1877F2] focus:bg-white transition-all"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto z-50">
          <div className="p-3">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Popular Searches</div>
            <div className="space-y-1">
              {['Pizza', 'Sushi', 'Tacos', 'BBQ', 'Italian'].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setSearchQuery(item);
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}