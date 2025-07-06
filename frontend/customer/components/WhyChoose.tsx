/**
 * 🚫 WHY CHOOSE - FROZEN DESIGN
 * 
 * IMPORTANT: This component is part of the frozen home page design.
 * The layout and styling should not be modified without approval.
 * 
 * Reference: frontend/customer/backup/homepage-frozen/WhyChoose.tsx
 * 
 * Last Modified: December 7, 2024
 * Version: 1.0.0 (FROZEN)
 * 
 * DO NOT MODIFY:
 * - Section layout and structure
 * - Styling classes and colors
 * - Component positioning
 * 
 * Allowed modifications:
 * - Content updates (text, images)
 * - Bug fixes
 * - Performance improvements
 * 
 * Before making any changes, consult the frozen backup version.
 */

export function WhyChoose() {
  const features = [
    {
      icon: '🎉',
      title: 'Premium Events',
      desc: 'Perfect for corporate events, celebrations, and premium gatherings of any size with quality guaranteed.'
    },
    {
      icon: '💲',
      title: 'Guaranteed Savings',
      desc: 'Save 10-25% on every order without compromising quality. Multiple ways to secure the best deals.'
    },
    {
      icon: '🎖️',
      title: 'Certified Partners',
      desc: 'Only the finest restaurants that meet our strict quality, freshness, and service standards.'
    },
    {
      icon: '⚡',
      title: 'Easy Ordering',
      desc: 'Simple online ordering with flexible pickup and delivery options for your convenience.'
    },
    {
      icon: '🎮',
      title: 'Fun Bidding',
      desc: 'Turn catering into an exciting experience with live auctions and competitive savings.'
    },
    {
      icon: '📱',
      title: 'Real-time Updates',
      desc: 'Get instant notifications about your orders, bids, and exclusive second-chance offers.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-12">Why Choose BIDORAI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-gray-50 rounded-xl shadow-md p-8 flex flex-col items-center text-center border border-gray-200 hover:shadow-lg transition">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 mb-4 shadow text-white text-3xl">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-600 text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 