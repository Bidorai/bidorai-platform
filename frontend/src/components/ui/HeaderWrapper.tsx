'use client';

import React, { Suspense } from 'react';
import Header from './Header';

const HeaderWrapper: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="bg-white border-b border-gray-200 shadow-sm h-16 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    }>
      <Header />
    </Suspense>
  );
};

export default HeaderWrapper;