export default function BenefitsSection() {
  const benefits = [
    { icon: '🎉', title: 'Personal & Corporate', description: 'Perfect for birthdays, weddings, office lunches, and corporate events of any size.' },
    { icon: '💰', title: 'Guaranteed Savings', description: 'Save 10-25% on every order with multiple ways to secure the best deals.' },
    { icon: '🍽️', title: 'Premium Restaurants', description: 'Only the best local restaurants that meet our strict quality and service standards.' }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-5 text-center">
        <h2 className="text-5xl font-bold text-gray-700 mb-4">Why Choose BIDORAI?</h2>
        <p className="text-lg text-gray-600 mb-16">The smart way to order catering for any occasion</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-10 text-center">
              <span className="text-6xl block mb-6">{benefit.icon}</span>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}