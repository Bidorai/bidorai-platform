export default function TestimonialsSection() {
  const testimonials = [
    { quote: "BIDORAI saved us over $200 on our company holiday party catering. The bidding was fun and the food was amazing!", author: "Sarah Chen, Marketing Manager" },
    { quote: "Perfect for my daughter's birthday party. Got premium catering at a great price without any hassle.", author: "Mike Rodriguez, Parent" },
    { quote: "The second-chance feature is brilliant. Even when I didn't win the bid, I still saved 20% on our team lunch.", author: "Jennifer Park, HR Director" }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-5 text-center">
        <h2 className="text-5xl font-bold text-gray-700 mb-16">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 text-left">
              <p className="text-gray-700 leading-relaxed mb-5 italic">"{testimonial.quote}"</p>
              <div className="text-sm text-blue-600 font-medium">{testimonial.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}