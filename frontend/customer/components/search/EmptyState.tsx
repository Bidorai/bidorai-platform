'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No restaurants found</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Try adjusting your filters or search in a different area to find more options.
      </p>
      <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
        Clear all filters
      </button>
    </div>
  );
} 