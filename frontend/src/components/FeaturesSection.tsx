import { Zap, Gamepad2, Smartphone } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    { icon: <Zap className="w-16 h-16" />, title: 'Easy Ordering', description: 'Simple online ordering with flexible pickup and delivery options.' },
    { icon: <Gamepad2 className="w-16 h-16" />, title: 'Fun Bidding Experience', description: 'Turn catering into an exciting game with live auctions.' },
    { icon: <Smartphone className="w-16 h-16" />, title: 'Real-time Updates', description: 'Get instant notifications about your orders, bids, and offers.' }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-10 text-center shadow-lg">
              <div className="text-gray-600 mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}