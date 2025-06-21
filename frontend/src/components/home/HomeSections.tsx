// frontend/src/components/home/HomeSections.tsx
import React from 'react';

export function ThreeWaysSection() {
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
      description: "Didn't win? Get an exclusive offer to match the winning bid and still enjoy premium quality at great prices."
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">Three Ways to Save on Catering</h2>
        <p className="text-lg text-gray-600 mb-12">Choose the option that works best for your event and budget</p>
        
        <div className="grid md:grid-cols-3 gap-10">
          {ways.map((way, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-3xl text-white mb-6 shadow-lg">
                {way.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{way.title}</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">{way.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CulinaryExcellenceSection() {
  const restaurants = [
    { name: 'Farm Fresh Kitchen', icon: '🥗', rating: 4.9, location: 'Deep Ellum', time: '30 min pickup', badge: 'Certified Organic' },
    { name: 'Tokyo Sushi Bar', icon: '🍣', rating: 4.8, location: 'Uptown', time: '25 min pickup', badge: 'Daily Fresh' },
    { name: 'El Mariachi Cantina', icon: '🌮', rating: 4.6, location: 'Bishop Arts', time: '35 min pickup', badge: 'Authentic' },
    { name: 'Pasta Palace', icon: '🍝', rating: 4.5, location: 'Little Italy', time: '40 min pickup', badge: 'Handmade' },
    { name: 'Green Garden Bistro', icon: '🥘', rating: 4.8, location: 'Knox-Henderson', time: '35 min pickup', badge: 'Farm-to-Table' },
    { name: 'Dallas BBQ Master', icon: '🍖', rating: 4.7, location: 'Deep Ellum', time: '45 min pickup', badge: 'Slow-Smoked' }
  ];

  return (
    <section className="bg-gray-900 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-blue-600/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-5xl font-bold text-white mb-5">Culinary Excellence from Dallas's Finest</h2>
        <p className="text-lg text-gray-300 mb-16 max-w-2xl mx-auto">
          Experience the artistry and passion of our premium restaurant partners and stunning mouth watering pictures of restaurants and food preparation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="relative h-72 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-blue-600 to-blue-800">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-blue-600/20 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-5xl mb-4">{restaurant.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{restaurant.name}</h3>
                  <p className="text-sm text-white/90 mb-3">Organic ingredients, sustainable sourcing</p>
                  <div className="flex items-center justify-center gap-4 text-xs text-white/80">
                    <span>⭐ {restaurant.rating}</span>
                    <span>📍 {restaurant.location}</span>
                    <span>🕒 {restaurant.time}</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-2 rounded-full text-xs font-bold backdrop-blur-sm">
                {restaurant.icon} {restaurant.badge}
              </div>
            </div>
          ))}
        </div>
        
        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 uppercase tracking-wide">
          🍽️ Explore Our Restaurant Partners
        </button>
      </div>
    </section>
  );
}

export function WhyChooseSection() {
  const benefits = [
    {
      icon: '🎉',
      title: 'Premium Events',
      description: 'Perfect for eco-conscious celebrations, corporate sustainability events, and premium gatherings of any size.'
    },
    {
      icon: '💰',
      title: 'Guaranteed Quality',
      description: 'Save 10-25% without compromising on quality. Farm-fresh ingredients and sustainable sourcing guaranteed.'
    },
    {
      icon: '🍽️',
      title: 'Certified Partners',
      description: 'Only the finest restaurants committed to sustainable practices and premium ingredient sourcing.'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">Why Choose BIDORAI?</h2>
        <p className="text-lg text-gray-600 mb-12">Premium quality meets responsible pricing</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-10 text-center hover:-translate-y-1 hover:shadow-lg transition-all border border-transparent hover:border-blue-600">
              <span className="text-6xl block mb-6">{benefit.icon}</span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: '⚡',
      title: 'Sustainable Ordering',
      description: 'Simple online ordering with carbon-neutral delivery options and minimal packaging waste.'
    },
    {
      icon: '🎮',
      title: 'Transparent Bidding',
      description: 'Fair, transparent auctions that support local restaurants while giving you premium food at great prices.'
    },
    {
      icon: '📱',
      title: 'Quality Updates',
      description: 'Real-time notifications about freshness, sourcing details, and exclusive farm-direct offers.'
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-10 text-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all border border-transparent hover:border-blue-600">
              <span className="text-6xl block mb-6">{feature.icon}</span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "BIDORAI delivered incredible quality for our company Earth Day event. The food was fresh, sustainable, and absolutely delicious!",
      author: "Sarah Chen, Sustainability Manager"
    },
    {
      quote: "Perfect for my daughter's eco-themed birthday party. Premium quality ingredients at a price that actually made sense.",
      author: "Mike Rodriguez, Parent"
    },
    {
      quote: "The transparency about sourcing and the freshness guarantee sold me. Plus, the bidding system actually works - saved 20%!",
      author: "Jennifer Park, Event Coordinator"
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-12">What Our Customers Say</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 text-left hover:-translate-y-1 hover:shadow-lg transition-all border border-transparent hover:border-blue-600">
              <p className="text-gray-900 leading-relaxed mb-5 italic">"{testimonial.quote}"</p>
              <div className="text-sm text-blue-600 font-medium">{testimonial.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24 text-center border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center bg-blue-50 text-blue-600 px-6 py-3 rounded-full font-semibold text-sm mb-8 border border-blue-100">
          <span className="mr-2">🚀</span>
          Join 10,000+ satisfied customers
        </div>
        
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">Ready to Save on Your Next Event?</h2>
        <p className="text-xl text-gray-600 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
          Join thousands of satisfied customers who trust BIDORAI for their catering needs.
        </p>
        
        <div className="flex justify-center gap-5 flex-wrap mb-10">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-9 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 text-lg flex items-center gap-2">
            <span className="text-xl">🍽️</span>
            Start Ordering Now
          </button>
          <button className="bg-white text-gray-900 border-2 border-gray-900 px-9 py-4 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-all transform hover:-translate-y-1 text-lg flex items-center gap-2 shadow-md">
            <span className="text-xl">📺</span>
            See How It Works
          </button>
        </div>
        
        <div className="flex justify-center gap-10 flex-wrap text-gray-600 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 text-lg">✅</span>
            <span>No subscription fees</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600 text-lg">🛡️</span>
            <span>Quality guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600 text-lg">⚡</span>
            <span>Same-day pickup</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-blue-600/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section */}
        <div className="text-center mb-16 pb-16 border-b border-gray-700/50">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🍽️
            </div>
            <span className="text-3xl font-extrabold text-white tracking-tight">Bidorai</span>
          </div>
          <p className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
            Connecting communities with premium fresh food through innovative bidding technology and sustainable partnerships.
          </p>
        </div>
        
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h4 className="text-blue-500 text-lg font-bold mb-6 flex items-center gap-2">
              <span>🌟</span> BIDORAI
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Sustainability</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Farm Partners</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-blue-500 text-lg font-bold mb-6 flex items-center gap-2">
              <span>👥</span> For Customers
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Quality Guarantee</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-blue-500 text-lg font-bold mb-6 flex items-center gap-2">
              <span>🏪</span> For Restaurants
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Become a Partner</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Restaurant Portal</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Sourcing Standards</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-blue-500 text-lg font-bold mb-6 flex items-center gap-2">
              <span>⚖️</span> Legal & Support
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">Cookie Policy</a></li>
              <li><a href="tel:1-800-BIDORAI" className="text-gray-300 hover:text-blue-500 transition-colors flex items-center gap-1">
                📞 1-800-BIDORAI
              </a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="text-center pt-8 border-t border-gray-700/50">
          <div className="flex justify-center items-center gap-8 mb-5 flex-wrap text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-blue-500">🚀</span>
              <span>Same-Day Party Pickup</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-blue-500">🏆</span>
              <span>Premium Quality Certified</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-blue-500">🤝</span>
              <span>Supporting Local Businesses</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 BIDORAI. Making party catering affordable and easy through smart bidding.
          </p>
        </div>
      </div>
    </footer>
  );
}