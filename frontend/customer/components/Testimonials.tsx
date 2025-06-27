export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Planner",
      company: "Dallas Events Co.",
      content: "BIDORAI has transformed how we source catering. The live bidding system saved us 30% on our last corporate event while maintaining premium quality. Our clients were impressed!",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "Restaurant Owner",
      company: "Tokyo Sushi Bar",
      content: "As a restaurant partner, BIDORAI has helped us reach new customers and fill our kitchen during off-peak hours. The platform is intuitive and the support team is fantastic.",
      rating: 5,
      avatar: "👨‍🍳"
    },
    {
      name: "Emily Rodriguez",
      role: "Wedding Coordinator",
      company: "Dream Weddings",
      content: "I've been using BIDORAI for all my wedding catering needs. The second-chance offers are a game-changer - we never miss out on great deals!",
      rating: 5,
      avatar: "👰‍♀️"
    },
    {
      name: "David Thompson",
      role: "Office Manager",
      company: "TechStart Inc.",
      content: "Our team loves the variety of restaurants available. The bidding process is fun and engaging, and we've saved thousands on our monthly team lunches.",
      rating: 5,
      avatar: "👨‍💻"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have discovered the perfect blend of quality and savings with BIDORAI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-blue-600">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-blue-100 mb-6">
              Join our community of satisfied customers and start saving on premium catering today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-3 rounded-lg font-bold transition-colors">
                Start Bidding Now
              </button>
              <button className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                View All Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 