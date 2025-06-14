'use client';

import React from 'react';

const ThreeWaysSection: React.FC = () => {
  const ways = [
    {
      icon: '⚡',
      title: 'Instant Order',
      description: 'Order directly from premium restaurants at 10% below market price. Guaranteed freshness and quality.'
    },
    {
      icon: '🎯',
      title: 'Live Bidding',
      description: 'Join live auctions for farm-fresh catering packages. Save up to 25% while supporting local farmers.'
    },
    {
      icon: '🔄',
      title: 'Second Chance',
      description: 'Didn\'t win? Get an exclusive offer to match the winning bid and still enjoy premium quality at great prices.'
    }
  ];

  return (
    <section className="bg-white py-15">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">Three Ways to Save on Catering</h2>
        <p className="text-lg text-gray-600 mb-15">Choose the option that works best for your event and budget</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {ways.map((way, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-3xl text-white mb-6 shadow-lg shadow-blue-600/30">
                {way.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{way.title}</h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-70">{way.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeWaysSection;