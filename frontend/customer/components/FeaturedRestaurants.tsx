/**
 * 🚫 FEATURED RESTAURANTS - FROZEN DESIGN
 * 
 * IMPORTANT: This component is part of the frozen home page design.
 * The layout and styling should not be modified without approval.
 * 
 * Reference: frontend/customer/backup/homepage-frozen/FeaturedRestaurants.tsx
 * 
 * Last Modified: December 7, 2024
 * Version: 1.0.0 (FROZEN)
 * 
 * DO NOT MODIFY:
 * - Section layout and structure
 * - Styling classes and colors
 * - Component positioning
 * 
 * Allowed modifications:
 * - Content updates (restaurant data, images)
 * - Bug fixes
 * - Performance improvements
 * 
 * Before making any changes, consult the frozen backup version.
 */

export function FeaturedRestaurants() {
  const restaurants = [
    {
      name: "Farm Fresh Kitchen",
      description: "Organic ingredients, sustainable sourcing",
      rating: 4.9,
      location: "Deep Ellum",
      pickupTime: "30 min pickup",
      tag: "Certified Organic",
      icon: "🥗"
    },
    {
      name: "Tokyo Sushi Bar",
      description: "Fresh daily sourcing, master craftsmanship",
      rating: 4.8,
      location: "Uptown",
      pickupTime: "25 min pickup",
      tag: "Daily Fresh",
      icon: "🍣"
    },
    {
      name: "El Mariachi Cantina",
      description: "Authentic Mexican, family recipes",
      rating: 4.6,
      location: "Bishop Arts",
      pickupTime: "35 min pickup",
      tag: "Authentic",
      icon: "🌮"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Culinary Excellence from Dallas's Finest
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Experience the artistry and passion of our premium restaurant partners committed to quality and freshness.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="bg-blue-800/50 backdrop-blur rounded-2xl p-6 hover:bg-blue-700/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <span className="inline-flex items-center gap-2 bg-black/30 text-white px-3 py-1 rounded-full text-sm">
                  {restaurant.tag === 'Certified Organic' ? '🌱' : restaurant.tag === 'Daily Fresh' ? '🐟' : '🌮'} {restaurant.tag}
                </span>
              </div>
              
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                  {restaurant.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{restaurant.name}</h3>
              <p className="text-blue-200 mb-4">{restaurant.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-blue-200">
                <span className="flex items-center gap-1">⭐ {restaurant.rating}</span>
                <span>📍 {restaurant.location}</span>
                <span>⏱️ {restaurant.pickupTime}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="/search" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            🍴 EXPLORE OUR RESTAURANT PARTNERS
          </a>
        </div>
      </div>
    </section>
  );
} 