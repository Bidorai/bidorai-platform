/**
 * 🚫 CTA SECTION - FROZEN DESIGN
 * 
 * IMPORTANT: This component is part of the frozen home page design.
 * The layout and styling should not be modified without approval.
 * 
 * Reference: frontend/customer/backup/homepage-frozen/CTASection.tsx
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

export function CTASection() {
  return (
    <section className="py-20 bg-white border-t">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="mb-6">
          <button className="bg-blue-50 text-blue-700 font-semibold rounded-full px-6 py-2 mb-6 text-base flex items-center gap-2 mx-auto">
            <span className="text-lg">🚀</span> Join 10,000+ satisfied customers
          </button>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Save on Your Next Event?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of satisfied customers who trust BIDORAI for their catering needs.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <a href="/search" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg transition-all transform hover:scale-105">
            <span role="img" aria-label="order">🍽️</span> Start Ordering Now
          </a>
          <button className="bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
            <span role="img" aria-label="info">📅</span> See How It Works
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-gray-500 text-base mt-8">
          <div className="flex items-center gap-2"><span className="text-blue-600">✔️</span> No subscription fees</div>
          <div className="flex items-center gap-2"><span className="text-blue-600">🛡️</span> Quality guaranteed</div>
          <div className="flex items-center gap-2"><span className="text-blue-600">⚡</span> Same-day pickup</div>
        </div>
      </div>
    </section>
  );
} 