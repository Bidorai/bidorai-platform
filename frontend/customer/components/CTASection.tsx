export function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Saving on Premium Catering?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of customers who are already enjoying premium quality food at unbeatable prices. 
            Whether you're planning a corporate event, wedding, or casual gathering, BIDORAI has you covered.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Join Live Auctions</h3>
              <p className="text-blue-200 text-sm">Bid on premium catering packages and save up to 25%</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Instant Orders</h3>
              <p className="text-blue-200 text-sm">Order directly from restaurants at 10% below market price</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="text-xl font-semibold mb-2">Second Chance</h3>
              <p className="text-blue-200 text-sm">Get exclusive offers even if you don't win the bid</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 transform hover:scale-105">
              🚀 Get Started Free
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200">
              📱 Download App
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold mb-4">🎉 Limited Time Offer</h3>
            <p className="text-blue-100 mb-4">
              New users get 50% off their first order! Plus, earn bonus credits for every successful bid.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <span className="text-3xl font-bold text-yellow-400">50% OFF</span>
              <span className="text-blue-200">on your first order</span>
            </div>
          </div>
          
          <div className="mt-8 text-blue-200">
            <p className="text-sm">
              💳 No credit card required • 🔒 100% secure • ⚡ Instant access
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 