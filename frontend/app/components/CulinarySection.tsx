'use client';

export default function CulinarySection() {
  const restaurants = [
    {
      name: 'Farm Fresh Kitchen',
      icon: '🥗',
      description: 'Organic ingredients, sustainable sourcing',
      rating: 4.9,
      location: 'Deep Ellum',
      time: '30 min pickup',
      badge: '🌿 Certified Organic',
      gradient: 'from-blue-600 to-blue-700'
    },
    {
      name: 'Tokyo Sushi Bar',
      icon: '🍣',
      description: 'Fresh daily sourcing, master craftsmanship',
      rating: 4.8,
      location: 'Uptown',
      time: '25 min pickup',
      badge: '🐟 Daily Fresh',
      gradient: 'from-blue-800 to-blue-600'
    },
    {
      name: 'El Mariachi Cantina',
      icon: '🌮',
      description: 'Authentic Mexican, family recipes',
      rating: 4.6,
      location: 'Bishop Arts',
      time: '35 min pickup',
      badge: '🇲🇽 Authentic',
      gradient: 'from-blue-700 to-blue-500'
    },
    {
      name: 'Pasta Palace',
      icon: '🍝',
      description: 'Handmade pasta, authentic Italian',
      rating: 4.5,
      location: 'Little Italy',
      time: '40 min pickup',
      badge: '🇮🇹 Handmade',
      gradient: 'from-blue-600 to-blue-800'
    },
    {
      name: 'Green Garden Bistro',
      icon: '🥘',
      description: 'Farm-to-table, seasonal menu',
      rating: 4.8,
      location: 'Knox-Henderson',
      time: '35 min pickup',
      badge: '🌱 Farm-to-Table',
      gradient: 'from-blue-700 to-blue-900'
    },
    {
      name: 'Dallas BBQ Master',
      icon: '🍖',
      description: 'Authentic Texas BBQ, slow-smoked',
      rating: 4.7,
      location: 'Deep Ellum',
      time: '45 min pickup',
      badge: '🔥 Slow-Smoked',
      gradient: 'from-blue-800 to-blue-600'
    }
  ];

  return (
    <section className="bg-gray-900 py-20 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-5xl font-bold mb-5 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          Culinary Excellence from Dallas's Finest
        </h2>
        <p className="text-lg text-gray-300 mb-16 max-w-2xl mx-auto">
          Experience the artistry and passion of our premium restaurant partners and stunning mouth watering pictures of restaurants and food preparation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {restaurants.map((restaurant, idx) => (
            <div
              key={idx}
              className={`relative h-72 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br ${restaurant.gradient} shadow-xl`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex items-center justify-center">
                <div className="text-center p-5">
                  <div className="text-5xl mb-4">{restaurant.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{restaurant.name}</h3>
                  <p className="text-sm text-gray-200 mb-3">{restaurant.description}</p>
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-200">
                    <span>⭐ {restaurant.rating}</span>
                    <span>📍 {restaurant.location}</span>
                    <span>🕒 {restaurant.time}</span>
                  </div>
                </div>
              </div>
              
              {/* Restaurant badge */}
              <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-2 rounded-full text-xs font-bold backdrop-blur-md">
                {restaurant.badge}
              </div>
            </div>
          ))}
        </div>
        
        <button className="bg-gradient-to-r from-[#1877F2] to-[#1565C0] text-white px-9 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-wide">
          🍽️ Explore Our Restaurant Partners
        </button>
      </div>
    </section>
  );
}