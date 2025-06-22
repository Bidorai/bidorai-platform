// ThreeWaysSection
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
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">Three Ways to Save on Catering</h2>
        <p className="text-lg text-gray-600 mb-12">Choose the option that works best for your event and budget</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {ways.map((way, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
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

// WhyChooseSection
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
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">Why Choose BIDORAI?</h2>
        <p className="text-lg text-gray-600 mb-12">Premium quality meets responsible pricing</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-10 text-center hover:-translate-y-1 hover:shadow-lg transition-all hover:border-[#1877F2] border border-transparent">
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

// FeaturesSection
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
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl p-10 text-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all hover:border-[#1877F2] border border-transparent">
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

// TestimonialsSection
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
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-12">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-8 text-left hover:-translate-y-0.5 hover:shadow-lg transition-all hover:border-[#1877F2] border border-transparent">
              <p className="text-gray-700 italic leading-relaxed mb-5">"{testimonial.quote}"</p>
              <div className="text-[#1877F2] font-medium">{testimonial.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTASection
export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-white py-24 text-center border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="inline-flex items-center bg-blue-50 text-[#1877F2] px-6 py-3 rounded-full font-semibold text-sm mb-8 border border-blue-100">
          <span className="mr-2">🚀</span>
          Join 10,000+ satisfied customers
        </div>
        
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Ready to Save on Your Next Event?
        </h2>
        <p className="text-xl text-gray-600 mb-12 font-medium max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust BIDORAI for their catering needs.
        </p>
        
        <div className="flex justify-center gap-5 flex-wrap mb-10">
          <button className="bg-gradient-to-r from-[#1877F2] to-[#1565C0] text-white px-9 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
            <span className="text-xl">🍽️</span>
            Start Ordering Now
          </button>
          <button className="bg-white text-gray-900 border-2 border-gray-900 px-9 py-4 rounded-xl font-semibold text-lg hover:bg-gray-900 hover:text-white hover:-translate-y-1 transition-all flex items-center gap-2 shadow-md">
            <span className="text-xl">📺</span>
            See How It Works
          </button>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex justify-center gap-10 flex-wrap text-gray-600 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="text-[#1877F2] text-lg">✅</span>
            <span>No subscription fees</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#1877F2] text-lg">🛡️</span>
            <span>Quality guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#1877F2] text-lg">⚡</span>
            <span>Same-day pickup</span>
          </div>
        </div>
      </div>
    </section>
  );
}