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
      description: 'Join live auctions for premium catering packages. Save up to 25% while supporting local restaurants.'
    },
    {
      icon: '🔄',
      title: 'Second Chance',
      description: "Didn't win? Get an exclusive offer to match the winning bid and still enjoy premium quality at great prices."
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Three Ways to Save on Catering</h2>
        <p className="text-lg text-gray-600 mb-12">Choose the option that works best for your event and budget</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ways.map((way, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-[#1877F2] rounded-full flex items-center justify-center text-3xl text-white mb-6 shadow-lg">
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

export function WhyChooseSection() {
  const benefits = [
    {
      icon: '🎉',
      title: 'Premium Events',
      description: 'Perfect for corporate events, celebrations, and premium gatherings of any size with quality guaranteed.'
    },
    {
      icon: '💰',
      title: 'Guaranteed Savings',
      description: 'Save 10-25% on every order without compromising quality. Multiple ways to secure the best deals.'
    },
    {
      icon: '🏆',
      title: 'Certified Partners',
      description: 'Only the finest restaurants that meet our strict quality, freshness, and service standards.'
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BIDORAI?</h2>
        <p className="text-lg text-gray-600 mb-12">Premium quality meets innovative savings</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center text-2xl text-white mb-4 mx-auto">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
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
      title: 'Easy Ordering',
      description: 'Simple online ordering with flexible pickup and delivery options for your convenience.'
    },
    {
      icon: '🎮',
      title: 'Fun Bidding',
      description: 'Turn catering into an exciting experience with live auctions and competitive savings.'
    },
    {
      icon: '📱',
      title: 'Real-time Updates',
      description: 'Get instant notifications about your orders, bids, and exclusive second-chance offers.'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center">
              <div className="w-20 h-20 bg-[#1877F2] rounded-full flex items-center justify-center text-3xl text-white mb-6 mx-auto shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
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
      quote: "BIDORAI saved us over $200 on our company holiday party catering. The bidding was fun and the food was amazing!",
      author: "Sarah Chen, Marketing Manager",
      rating: 5
    },
    {
      quote: "Perfect for my daughter's birthday party. Got premium catering at a great price without any hassle.",
      author: "Mike Rodriguez, Parent",
      rating: 5
    },
    {
      quote: "The second-chance feature is brilliant. Even when I didn't win the bid, I still saved 20% on our team lunch.",
      author: "Jennifer Park, HR Director",
      rating: 5
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-[#1877F2] font-semibold">{testimonial.author}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <p className="text-gray-600 font-medium">🚀 Join 10,000+ satisfied customers</p>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Save on Your Next Event?</h2>
        <p className="text-xl text-gray-600 mb-10">
          Join thousands of satisfied customers who trust BIDORAI for their catering needs.
        </p>
        
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          <button className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-orange-600 transition-all transform hover:-translate-y-1">
            🍽️ Start Ordering Now
          </button>
          <button className="bg-white text-gray-900 border-2 border-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-900 hover:text-white transition-all">
            📹 See How It Works
          </button>
        </div>
        
        <div className="flex justify-center gap-8 flex-wrap text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-[#1877F2]">✅</span>
            <span>No subscription fees</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#1877F2]">🛡️</span>
            <span>Quality guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#1877F2]">⚡</span>
            <span>Same-day pickup</span>
          </div>
        </div>
      </div>
    </section>
  );
}