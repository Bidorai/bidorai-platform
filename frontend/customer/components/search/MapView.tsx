'use client';

import { MapIcon } from '@heroicons/react/24/outline';

interface MapViewProps {
  restaurants: any[];
}

export function MapView({ restaurants }: MapViewProps) {
  return (
    <div className="h-full bg-gray-200 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <MapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Map view coming soon</p>
        <p className="text-sm text-gray-500 mt-2">
          View restaurants on an interactive map
        </p>
      </div>
    </div>
  );
} 