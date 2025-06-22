export default function CulinarySection() {
  const restaurants = [
    {
      name: 'Farm Fresh Kitchen',
      icon: '🥗',
      description: 'Organic ingredients, sustainable sourcing',
      rating: 4.9,
      location: 'Deep Ellum',
      time: '30 min pickup',
      badge: '🌿 Certified Organic'
    },
    {
      name: 'Tokyo Sushi Bar',
      icon: '🍣',
      description: 'Fresh daily sourcing, master craftsmanship',
      rating: 4.8,
      location: 'Uptown',
      time: '25 min pickup',
      badge: '🐟 Daily Fresh'
    },
    {
      name: 'El Mariachi Cantina',
      icon: '🌮',
      description: 'Authentic Mexican, family recipes',
      rating: 4.6,
      location: 'Bishop Arts',
      time: '35 min pickup',
      badge: '🇲🇽 Authentic'
    },
    {
      name: 'Bella Vista Trattoria',
      icon: '🍝',
      description: 'Handmade pasta, authentic Italian',
      rating: 4.7,
      location: 'Little Italy',
      time: '40 min pickup',
      badge: '🇮🇹 Handmade'
    },
    {
      name: 'Dallas BBQ Master',
      icon: '🍖',
      description: 'Authentic Texas BBQ, slow-smoked',
      rating: 4.7,
      location: 'Deep Ellum',
      time: '45 min pickup',
      badge: '🔥 Slow-Smoked'
    },
    {
      name: 'Green Garden Bistro',
      icon: '🥘',
      description: 'Farm-to-table, seasonal menu',
      rating: 4.8,
      location: 'Knox-Henderson',
      time: '35 min pickup',
      badge: '🌱 Farm-to-Table'
    }
  ];

  return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Culinary Excellence from Dallas's Finest
        </h2>
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
          Experience the artistry and passion of our premium restaurant partners 
          committed to quality and freshness.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {restaurants.map((restaurant, idx) => (
            <div
              key={idx}
              className="relative h-64 rounded-xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2] to-[#0d47a1] group-hover:from-[#1565C0] group-hover:to-[#0d47a1] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                <div className="text-5xl mb-3">{restaurant.icon}</div>
                <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                <p className="text-sm opacity-90 mb-3">{restaurant.description}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span>⭐ {restaurant.rating}</span>
                  <span>📍 {restaurant.location}</span>
                  <span>⏱️ {restaurant.time}</span>
                </div>
              </div>
              
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                {restaurant.badge}
              </div>
            </div>
          ))}
        </div>
        
        <button className="bg-[#1877F2] text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-[#1565C0] transition-all transform hover:-translate-y-1">
          🍽️ EXPLORE OUR RESTAURANT PARTNERS
        </button>
      </div>
    </section>
  );
}