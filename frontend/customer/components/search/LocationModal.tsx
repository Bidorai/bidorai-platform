'use client';

import { useState } from 'react';
import { MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
  currentLocation: string;
}

export function LocationModal({ isOpen, onClose, onSelectLocation, currentLocation }: LocationModalProps) {
  const [searchValue, setSearchValue] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const recentLocations = [
    'Dallas, TX',
    'Houston, TX',
    'Austin, TX',
    'San Antonio, TX',
    'Fort Worth, TX'
  ];

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In real app, convert coordinates to address
          onSelectLocation('Current Location');
          onClose();
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Choose Delivery Location</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Search Input */}
          <div className="relative mb-4">
            <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter address or ZIP code"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Use Current Location */}
          <button
            onClick={handleUseCurrentLocation}
            className="w-full flex items-center justify-center space-x-2 py-3 mb-4 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <MapPinIcon className="w-5 h-5" />
            <span>Use Current Location</span>
          </button>

          {/* Recent Locations */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Locations</h3>
            <div className="space-y-2">
              {recentLocations.map(location => (
                <button
                  key={location}
                  onClick={() => {
                    onSelectLocation(location);
                    onClose();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 ${
                    location === currentLocation ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 