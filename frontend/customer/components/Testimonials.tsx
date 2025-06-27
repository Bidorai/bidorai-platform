export function Testimonials() {
  const testimonials = [
    {
      quote: '"BIDORAI saved us over $200 on our company holiday party catering. The bidding was fun and the food was amazing!"',
      name: 'Sarah Chen',
      role: 'Marketing Manager',
      color: 'text-blue-600'
    },
    {
      quote: '"Perfect for my daughter\'s birthday party. Got premium catering at a great price without any hassle."',
      name: 'Mike Rodriguez',
      role: 'Parent',
      color: 'text-blue-600'
    },
    {
      quote: '"The second-chance feature is brilliant. Even when I didn\'t win the bid, I still saved 20% on our team lunch."',
      name: 'Jennifer Park',
      role: 'HR Director',
      color: 'text-blue-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 rounded-xl shadow-sm p-8 flex flex-col items-center text-center">
              <p className="text-lg text-gray-800 mb-6 font-medium">{t.quote}</p>
              <span className="font-semibold {t.color}">{t.name}</span>
              <span className="text-gray-500 text-sm">, {t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 