'use client';

import React from 'react';
import Button from './Button';

// Food Showcase Section
export const FoodShowcase: React.FC = () => {
  const restaurants = [
    { name: 'Farm Fresh Kitchen', cuisine: 'Organic ingredients, sustainable sourcing', emoji: '🥗', badge: '🌿 Certified Organic' },
    { name: 'Tokyo Sushi Bar', cuisine: 'Fresh daily sourcing, master craftsmanship', emoji: '🍣', badge: '🐟 Daily Fresh' },
    { name: 'El Mariachi Cantina', cuisine: 'Authentic Mexican, family recipes', emoji: '🌮', badge: '🇲🇽 Authentic' },
    { name: 'Pasta Palace', cuisine: 'Handmade pasta, authentic Italian', emoji: '🍝', badge: '🇮🇹 Handmade' },
    { name: 'Green Garden Bistro', cuisine: 'Farm-to-table, seasonal menu', emoji: '🥘', badge: '🌱 Farm-to-Table' },
    { name: 'Dallas BBQ Master', cuisine: 'Authentic Texas BBQ, slow-smoked', emoji: '🍖', badge: '🔥 Slow-Smoked' }
  ];

  return (
    <section className="bg-gray-800 py-20 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-blue-600/5"></div>
      
      <div className="max-w-6xl mx-auto px-5 text-center relative z-10">
        <h2 className="text-5xl font-bold mb-5 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          Culinary Excellence from Dallas's Finest
        </h2>
        <p className="text-lg text-gray-300 mb-15 max-w-2xl mx-auto">
          Experience the artistry and passion of our premium restaurant partners and stunning mouth watering pictures of restaurants and food preparation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="relative h-70 rounded-2xl overflow-hidden cursor-pointer transition-all duration-400 hover:scale-105 hover:-translate-y-4 bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg shadow-blue-600/30">
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-blue-600/20 flex items-center justify-center">
                <div className="text-center p-5">
                  <div className="text-5xl mb-4">{restaurant.emoji}</div>
                  <h3 className="text-2xl font-bold mb-2">{restaurant.name}</h3>
                  <p className="text-sm text-white/90 mb-3">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-center gap-4 text-xs text-white/80">
                    <span>⭐ 4.8</span>
                    <span>📍 Dallas</span>
                    <span>🕒 30 min</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-2 rounded-2xl text-xs font-bold backdrop-blur-lg">
                {restaurant.badge}
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="primary" size="lg" className="text-lg font-bold uppercase tracking-wide">
          🍽️ Explore Our Restaurant Partners
        </Button>
      </div>
    </section>
  );
};

// Benefits Section
export const BenefitsSection: React.FC = () => {
  const benefits = [
    { icon: '🎉', title: 'Premium Events', desc: 'Perfect for eco-conscious celebrations, corporate sustainability events, and premium gatherings of any size.' },
    { icon: '💰', title: 'Guaranteed Quality', desc: 'Save 10-25% without compromising on quality. Farm-fresh ingredients and sustainable sourcing guaranteed.' },
    { icon: '🍽️', title: 'Certified Partners', desc: 'Only the finest restaurants committed to sustainable practices and premium ingredient sourcing.' }
  ];

  return (
    <section className="bg-white py-15">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">Why Choose BIDORAI?</h2>
        <p className="text-lg text-gray-600 mb-15">Premium quality meets responsible pricing</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-10 text-center transition-transform duration-200 hover:-translate-y-1 border border-transparent hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/10">
              <span className="text-6xl block mb-6">{benefit.icon}</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
              <p className="text-base text-gray-600 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Section
export const FeaturesSection: React.FC = () => {
  const features = [
    { icon: '⚡', title: 'Sustainable Ordering', desc: 'Simple online ordering with carbon-neutral delivery options and minimal packaging waste.' },
    { icon: '🎮', title: 'Transparent Bidding', desc: 'Fair, transparent auctions that support local restaurants while giving you premium food at great prices.' },
    { icon: '📱', title: 'Quality Updates', desc: 'Real-time notifications about freshness, sourcing details, and exclusive farm-direct offers.' }
  ];

  return (
    <section className="bg-gray-50 py-15">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-10 text-center shadow-lg transition-transform duration-200 hover:-translate-y-1 border border-transparent hover:border-blue-600 hover:shadow-xl hover:shadow-blue-600/10">
              <span className="text-6xl block mb-6">{feature.icon}</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-base text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    { quote: "BIDORAI delivered incredible quality for our company Earth Day event. The food was fresh, sustainable, and absolutely delicious!", author: "Sarah Chen, Sustainability Manager" },
    { quote: "Perfect for my daughter's eco-themed birthday party. Premium quality ingredients at a price that actually made sense.", author: "Mike Rodriguez, Parent" },
    { quote: "The transparency about sourcing and the freshness guarantee sold me. Plus, the bidding system actually works - saved 20%!", author: "Jennifer Park, Event Coordinator" }
  ];

  return (
    <section className="bg-white py-15">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-15">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 text-left transition-transform duration-200 hover:-translate-y-0.5 border border-transparent hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/10">
              <p className="text-base text-gray-800 leading-relaxed mb-5 italic">"{testimonial.quote}"</p>
              <div className="text-sm text-blue-600 font-medium">{testimonial.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
export const CTASection: React.FC = () => (
  <section className="bg-gradient-to-r from-gray-50 to-white py-25 text-center border-t border-gray-200">
    <div className="max-w-4xl mx-auto px-5">
      <div className="inline-flex items-center bg-blue-50 text-blue-600 px-6 py-3 rounded-full font-semibold text-sm mb-8 border border-blue-200">
        <span className="mr-2">🚀</span>
        Join 10,000+ satisfied customers
      </div>
      
      <h2 className="text-5xl font-extrabold text-gray-800 mb-6 tracking-tight leading-tight">Ready to Save on Your Next Event?</h2>
      <p className="text-xl text-gray-600 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">Join thousands of satisfied customers who trust BIDORAI for their catering needs.</p>
      
      <div className="flex justify-center gap-5 flex-wrap mb-10">
        <Button variant="primary" size="lg" className="min-w-50 text-lg font-bold">
          <span className="mr-2 text-xl">🍽️</span>
          Start Ordering Now
        </Button>
        <Button variant="navy-outline" size="lg" className="min-w-50 text-lg font-semibold">
          <span className="mr-2 text-xl">📺</span>
          See How It Works
        </Button>
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

// Footer
export const Footer: React.FC = () => {
  const footerLinks = {
    'BIDORAI': ['About Us', 'Sustainability', 'Farm Partners', 'Contact'],
    'For Customers': ['Quality Guarantee', 'How It Works', 'Support', 'FAQ'],
    'For Restaurants': ['Become a Partner', 'Restaurant Portal', 'Sourcing Standards'],
    'Legal & Support': ['Terms of Service', 'Privacy Policy', 'Cookie Policy', '📞 1-800-BIDORAI']
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-blue-600/5"></div>
      
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="text-center mb-15 pb-15 border-b border-white/10">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-blue-600/30">🍽️</div>
            <span className="text-3xl font-extrabold text-white tracking-tight">Bidorai</span>
          </div>
          <p className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">Connecting communities with premium fresh food through innovative bidding technology and sustainable partnerships.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-15">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-blue-400 text-lg font-bold mb-6 flex items-center gap-2">
                <span className="text-base">{category === 'BIDORAI' ? '🌟' : category === 'For Customers' ? '👥' : category === 'For Restaurants' ? '🏪' : '⚖️'}</span>
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 py-1">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center pt-8 border-t border-white/10">
          <div className="flex justify-center items-center gap-8 mb-5 flex-wrap">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-blue-400">🚀</span>
              <span>Same-Day Party Pickup</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-blue-400">🏆</span>
              <span>Premium Quality Certified</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-blue-400">🤝</span>
              <span>Supporting Local Businesses</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm">&copy; 2025 BIDORAI. Making party catering affordable and easy through smart bidding.</p>
        </div>
      </div>
    </footer>
  );
};