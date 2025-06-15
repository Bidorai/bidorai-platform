'use client';

import React from 'react';

interface AuthLoadingSpinnerProps {
  message?: string;
  submessage?: string;
}

const AuthLoadingSpinner: React.FC<AuthLoadingSpinnerProps> = ({ 
  message = "Getting your feast ready...", 
  submessage = "This will just take a moment" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Animated Food Icons */}
      <div className="relative mb-6">
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
      
      {/* Spinning Food Icon */}
      <div className="relative mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-3xl animate-spin shadow-lg shadow-blue-600/30" style={{ animationDuration: '2s' }}>
          🍽️
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-xs animate-pulse">
          ✓
        </div>
      </div>
      
      {/* Loading Messages */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{message}</h3>
        <p className="text-gray-600 text-sm">{submessage}</p>
      </div>
      
      {/* Progress Indicators */}
      <div className="mt-6 flex space-x-2">
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Secure</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Fast</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Delicious</span>
        </div>
      </div>
    </div>
  );
};

export default AuthLoadingSpinner;