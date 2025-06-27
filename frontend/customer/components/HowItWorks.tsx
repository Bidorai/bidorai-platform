export function HowItWorks() {
  const steps = [
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
      icon: '💸',
      title: 'Second Chance',
      description: "Didn't win? Get an exclusive offer to match the winning bid and still enjoy premium quality at great prices."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Three Ways to Save on Catering</h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Choose the option that works best for your event and budget
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 