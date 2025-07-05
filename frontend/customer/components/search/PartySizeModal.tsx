'use client';

import { useState } from 'react';
import { UsersIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface PartySizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize: (size: number) => void;
  currentSize: number;
}

export function PartySizeModal({ isOpen, onClose, onSelectSize, currentSize }: PartySizeModalProps) {
  const [customSize, setCustomSize] = useState(currentSize.toString());

  const commonSizes = [10, 15, 20, 25, 30, 40, 50, 75, 100];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Number of People</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Custom Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter number of people
            </label>
            <input
              type="number"
              min="1"
              value={customSize}
              onChange={(e) => setCustomSize(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Common Sizes */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Common party sizes</h3>
            <div className="grid grid-cols-3 gap-3">
              {commonSizes.map(size => (
                <button
                  key={size}
                  onClick={() => {
                    onSelectSize(size);
                    onClose();
                  }}
                  className={`py-3 rounded-lg font-medium transition-colors ${
                    size === currentSize
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => {
              onSelectSize(parseInt(customSize) || 1);
              onClose();
            }}
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
} 