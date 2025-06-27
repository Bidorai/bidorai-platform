export function WhyChoose() {
  const benefits = [
    {
      icon: '💎',
      title: 'Premium Quality',
      description: 'All restaurants are carefully vetted for quality, freshness, and food safety standards.'
    },
    {
      icon: '💰',
      title: 'Maximum Savings',
      description: 'Save up to 25% on premium catering through our unique bidding system.'
    },
    {
      icon: '⚡',
      title: 'Instant Delivery',
      description: 'Fast pickup times with real-time tracking and guaranteed freshness.'
    },
    {
      icon: '🤝',
      title: 'Support Local',
      description: 'Every purchase supports local restaurants and strengthens our community.'
    },
    {
      icon: '🛡️',
      title: 'Guaranteed Satisfaction',
      description: '100% satisfaction guarantee with full refunds if you\'re not completely satisfied.'
    },
    {
      icon: '📱',
      title: 'Easy to Use',
      description: 'Simple, intuitive platform that makes ordering and bidding effortless.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose BIDORAI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing the catering industry by connecting you directly with premium restaurants through our innovative bidding platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-blue-600 text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Join Thousands of Satisfied Customers
            </h3>
            <p className="text-blue-100 mb-6">
              Experience the future of catering with BIDORAI. Start saving today while enjoying premium quality food from Dallas's finest restaurants.
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-3 rounded-lg font-bold text-lg transition-colors">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 