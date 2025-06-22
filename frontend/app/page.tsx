// app/page.tsx
export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-[#1877F2] to-[#1565C0] rounded-lg flex items-center justify-center text-white shadow-lg">
                <span className="text-base">🍽️</span>
              </div>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Bidorai</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:flex items-center gap-1 text-gray-600 font-medium text-sm">
                📞 1-800-BIDORAI
              </span>
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-all text-sm">
                Sign In
              </button>
              <button className="px-4 py-2 bg-[#1877F2] text-white hover:bg-[#1565C0] rounded-lg font-semibold shadow-md hover:shadow-lg transition-all text-sm">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="bg-gray-50">
        {/* Hero and Bidding Section */}
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col justify-center">
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 text-[#1877F2] px-6 py-3 rounded-full font-black text-base border-2 border-blue-200 shadow-md">
                  🎉 The world's first party tray food bidding app
                </div>
              </div>

              <h1 className="text-6xl font-black text-gray-900 text-center mb-8 leading-tight tracking-tight">
                Bid your Meal.<br />
                <span className="text-[#1877F2] drop-shadow-sm">Win your Order.</span><br />
                <span className="text-orange-500 drop-shadow-sm">Feast your Party.</span>
              </h1>

              <p className="text-xl text-gray-700 text-center mb-10 max-w-xl mx-auto font-medium leading-relaxed">
                Bid on delicious half & full tray meals from local restaurants.{' '}
                <span className="text-[#1877F2] font-black text-2xl">Name your price</span> and pick it up fresh.
              </p>

              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="📍 Enter your location"
                  className="w-full pl-4 pr-3 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-[#1877F2] focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="👥 Number of guests"
                  className="w-full pl-4 pr-3 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-[#1877F2] focus:outline-none"
                />
                <button className="w-full bg-orange-500 text-white font-bold text-lg py-4 rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl">
                  🍽️ Find My Perfect Party Menu
                </button>
              </div>

              <div className="space-y-3">
                <div className="text-center text-gray-700 font-medium">
                  🚀 Now launching in Dallas, TX
                </div>
                <div className="bg-blue-50 text-[#1877F2] px-4 py-3 rounded-lg text-center font-semibold">
                  🍽️ $1 Tray Bids every Friday. Limited spots only.
                </div>
              </div>
            </div>

            {/* Bidding Panel */}
            <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-gray-900">Party Menu Bidding</span>
                  <span className="text-blue-500">ℹ️</span>
                </div>
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  LIVE
                </span>
              </div>

              <div className="bg-[#1877F2] text-white px-4 py-3 rounded-lg text-center font-bold mb-4">
                ⏰ 2:38 remaining
              </div>

              <div className="bg-gray-900 text-white p-4 rounded-lg text-center mb-4">
                <div className="text-2xl font-bold">Save $284</div>
                <div className="text-sm opacity-90">🎯 Average 18% below market price</div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {/* Restaurant 1 */}
                <div className="rounded-lg p-3 border hover:shadow-md transition-all bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center text-white font-bold shadow">
                        F
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">Farm Fresh Kitchen</h3>
                        <div className="text-sm text-gray-600">
                          ⭐ 4.9 • 📍 0.8 km • Organic Certified
                        </div>
                        <div className="text-sm text-gray-700 font-medium">
                          Organic Harvest Bowl • Serves 15
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>👥 8 people bidding</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-[#1877F2]">
                      $217
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#1877F2] to-[#1565C0]" style={{ width: '75%' }}></div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-xs font-semibold text-[#1877F2]">🌿 Fresh picked today!</span>
                  </div>
                </div>

                {/* Restaurant 2 */}
                <div className="rounded-lg p-3 border hover:shadow-md transition-all bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center text-white font-bold shadow">
                        G
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">Green Garden Bistro</h3>
                        <div className="text-sm text-gray-600">
                          ⭐ 4.8 • 📍 1.2 km • Farm-to-Table
                        </div>
                        <div className="text-sm text-gray-700 font-medium">
                          Sustainable Feast Tray • Serves 12
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>👥 12 people bidding</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-[#1877F2]">
                      $185
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#1877F2] to-[#1565C0]" style={{ width: '60%' }}></div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-xs font-semibold text-[#1877F2]">🏆 Best value!</span>
                  </div>
                </div>

                {/* Restaurant 3 */}
                <div className="rounded-lg p-3 border hover:shadow-md transition-all bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center text-white font-bold shadow">
                        T
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">Tokyo Sushi</h3>
                        <div className="text-sm text-gray-600">
                          ⭐ 4.8 • 📍 2.5 km • Japanese
                        </div>
                        <div className="text-sm text-gray-700 font-medium">
                          Premium Sushi Platter • Serves 10
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>👥 6 people bidding</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-[#1877F2]">
                      $165
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors shadow-lg">
                  🎯 Place Your Bid Now
                </button>
                <button className="w-full bg-white text-gray-900 border-2 border-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-all">
                  ▶️ Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Three Ways Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Three Ways to Save on Catering</h2>
          <p className="text-lg text-gray-600 mb-12">Choose the option that works best for your event and budget</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-[#1877F2] rounded-full flex items-center justify-center text-3xl text-white mb-6 shadow-lg">
                ⚡
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Order</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">
                Order directly from premium restaurants at 10% below market price. Guaranteed freshness and quality.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-[#1877F2] rounded-full flex items-center justify-center text-3xl text-white mb-6 shadow-lg">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Bidding</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">
                Join live auctions for premium catering packages. Save up to 25% while supporting local restaurants.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-[#1877F2] rounded-full flex items-center justify-center text-3xl text-white mb-6 shadow-lg">
                🔄
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Second Chance</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">
                Didn't win? Get an exclusive offer to match the winning bid and still enjoy premium quality at great prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Excellence Section */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Culinary Excellence from Dallas's Finest
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            Experience the artistry and passion of our premium restaurant partners 
            committed to quality and freshness.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Restaurant Cards */}
            <div className="relative h-64 rounded-xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2] to-[#0d47a1] group-hover:from-[#1565C0] group-hover:to-[#0d47a1] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                <div className="text-5xl mb-3">🥗</div>
                <h3 className="text-xl font-bold mb-2">Farm Fresh Kitchen</h3>
                <p className="text-sm opacity-90 mb-3">Organic ingredients, sustainable sourcing</p>
                <div className="flex items-center gap-3 text-xs">
                  <span>⭐ 4.9</span>
                  <span>📍 Deep Ellum</span>
                  <span>⏱️ 30 min pickup</span>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                🌿 Certified Organic
              </div>
            </div>

            <div className="relative h-64 rounded-xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2] to-[#0d47a1] group-hover:from-[#1565C0] group-hover:to-[#0d47a1] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                <div className="text-5xl mb-3">🍣</div>
                <h3 className="text-xl font-bold mb-2">Tokyo Sushi Bar</h3>
                <p className="text-sm opacity-90 mb-3">Fresh daily sourcing, master craftsmanship</p>
                <div className="flex items-center gap-3 text-xs">
                  <span>⭐ 4.8</span>
                  <span>📍 Uptown</span>
                  <span>⏱️ 25 min pickup</span>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                🐟 Daily Fresh
              </div>
            </div>

            <div className="relative h-64 rounded-xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2] to-[#0d47a1] group-hover:from-[#1565C0] group-hover:to-[#0d47a1] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                <div className="text-5xl mb-3">🌮</div>
                <h3 className="text-xl font-bold mb-2">El Mariachi Cantina</h3>
                <p className="text-sm opacity-90 mb-3">Authentic Mexican, family recipes</p>
                <div className="flex items-center gap-3 text-xs">
                  <span>⭐ 4.6</span>
                  <span>📍 Bishop Arts</span>
                  <span>⏱️ 35 min pickup</span>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                🇲🇽 Authentic
              </div>
            </div>

            <div className="relative h-64 rounded-xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2] to-[#0d47a1] group-hover:from-[#1565C0] group-hover:to-[#0d47a1] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                <div className="text-5xl mb-3">🍝</div>
                <h3 className="text-xl font-bold mb-2">Bella Vista Trattoria</h3>
                <p className="text-sm opacity-90 mb-3">Handmade pasta, authentic Italian</p>
                <div className="flex items-center gap-3 text-xs">
                  <span>⭐ 4.7</span>
                  <span>📍 Little Italy</span>
                  <span>⏱️ 40 min pickup</span>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                🇮🇹 Handmade
              </div>
            </div>

            <div className="relative h-64 rounded-xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2] to-[#0d47a1] group-hover:from-[#1565C0] group-hover:to-[#0d47a1] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                <div className="text-5xl mb-3">🍖</div>
                <h3 className="text-xl font-bold mb-2">Dallas BBQ Master</h3>
                <p className="text-sm opacity-90 mb-3">Authentic Texas BBQ, slow-smoked</p>
                <div className="flex items-center gap-3 text-xs">
                  <span>⭐ 4.7</span>
                  <span>📍 Deep Ellum</span>
                  <span>⏱️ 45 min pickup</span>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                🔥 Slow-Smoked
              </div>
            </div>

            <div className="relative h-64 rounded-xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2] to-[#0d47a1] group-hover:from-[#1565C0] group-hover:to-[#0d47a1] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                <div className="text-5xl mb-3">🥘</div>
                <h3 className="text-xl font-bold mb-2">Green Garden Bistro</h3>
                <p className="text-sm opacity-90 mb-3">Farm-to-table, seasonal menu</p>
                <div className="flex items-center gap-3 text-xs">
                  <span>⭐ 4.8</span>
                  <span>📍 Knox-Henderson</span>
                  <span>⏱️ 35 min pickup</span>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                🌱 Farm-to-Table
              </div>
            </div>
          </div>
          
          <button className="bg-[#1877F2] text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-[#1565C0] transition-all transform hover:-translate-y-1">
            🍽️ EXPLORE OUR RESTAURANT PARTNERS
          </button>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BIDORAI?</h2>
          <p className="text-lg text-gray-600 mb-12">Premium quality meets innovative savings</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center text-2xl text-white mb-4 mx-auto">
                🎉
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Events</h3>
              <p className="text-gray-600">
                Perfect for corporate events, celebrations, and premium gatherings of any size with quality guaranteed.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center text-2xl text-white mb-4 mx-auto">
                💰
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Guaranteed Savings</h3>
              <p className="text-gray-600">
                Save 10-25% on every order without compromising quality. Multiple ways to secure the best deals.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center text-2xl text-white mb-4 mx-auto">
                🏆
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Certified Partners</h3>
              <p className="text-gray-600">
                Only the finest restaurants that meet our strict quality, freshness, and service standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#1877F2] rounded-full flex items-center justify-center text-3xl text-white mb-6 mx-auto shadow-lg">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Ordering</h3>
              <p className="text-gray-600">
                Simple online ordering with flexible pickup and delivery options for your convenience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#1877F2] rounded-full flex items-center justify-center text-3xl text-white mb-6 mx-auto shadow-lg">
                🎮
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fun Bidding</h3>
              <p className="text-gray-600">
                Turn catering into an exciting experience with live auctions and competitive savings.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#1877F2] rounded-full flex items-center justify-center text-3xl text-white mb-6 mx-auto shadow-lg">
                📱
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Updates</h3>
              <p className="text-gray-600">
                Get instant notifications about your orders, bids, and exclusive second-chance offers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-center mb-4">
                <span className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 italic mb-4">
                "BIDORAI saved us over $200 on our company holiday party catering. The bidding was fun and the food was amazing!"
              </p>
              <p className="text-[#1877F2] font-semibold">Sarah Chen, Marketing Manager</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-center mb-4">
                <span className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 italic mb-4">
                "Perfect for my daughter's birthday party. Got premium catering at a great price without any hassle."
              </p>
              <p className="text-[#1877F2] font-semibold">Mike Rodriguez, Parent</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-center mb-4">
                <span className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 italic mb-4">
                "The second-chance feature is brilliant. Even when I didn't win the bid, I still saved 20% on our team lunch."
              </p>
              <p className="text-[#1877F2] font-semibold">Jennifer Park, HR Director</p>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-gray-600 font-medium">🚀 Join 10,000+ satisfied customers</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Save on Your Next Event?</h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of satisfied customers who trust BIDORAI for their catering needs.
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap mb-8">
            <button className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-orange-600 transition-all transform hover:-translate-y-1">
              🍽️ Start Ordering Now
            </button>
            <button className="bg-white text-gray-900 border-2 border-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-900 hover:text-white transition-all">
              📹 See How It Works
            </button>
          </div>
          
          <div className="flex justify-center gap-8 flex-wrap text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-[#1877F2]">✅</span>
              <span>No subscription fees</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#1877F2]">🛡️</span>
              <span>Quality guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#1877F2]">⚡</span>
              <span>Same-day pickup</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4">
          {/* Logo and Description */}
          <div className="text-center mb-12 pb-12 border-b border-gray-700">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1877F2] to-[#1565C0] rounded-xl flex items-center justify-center text-2xl shadow-lg">
                🍽️
              </div>
              <span className="text-3xl font-bold text-white">Bidorai</span>
            </div>
            <p className="text-gray-400 max-w-lg mx-auto">
              Connecting communities with premium fresh food through 
              innovative bidding technology and restaurant partnerships.
            </p>
          </div>
          
          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* BIDORAI Column */}
            <div>
              <h4 className="text-[#1877F2] font-bold mb-4 flex items-center gap-2">
                <span>⭐</span> BIDORAI
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#1877F2] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#1877F2] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#1877F2] transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-[#1877F2] transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* For Customers Column */}
            <div>
              <h4 className="text-[#1877F2] font-bold mb-4 flex items-center gap-2">
                <span>👥</span> For Customers
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#1877F2] transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-[#1877F2] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#1877F2] transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-[#1877F2] transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            {/* For Restaurants Column */}
            <div>
              <h4 className="text-[#1877F2] font-bold mb-4 flex items-center gap-2">
                <span>🏪</span> For Restaurants
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#1877F2] transition-colors">Become a Partner</a></li>
                <li><a href="#" className="hover:text-[#1877F2] transition-colors">Restaurant Portal</a></li>
                <li><a href="#" className="hover:text-[#1877F2] transition-colors">Resources</a></li>
              </ul>
            </div>
            
            {/* Legal Column */}
            <div>
              <h4 className="text-[#1877F2] font-bold mb-4 flex items-center gap-2">
                <span>⚖️</span> Legal
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#1877F2] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#1877F2] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#1877F2] transition-colors">Cookie Policy</a></li>
                <li><a href="tel:1-800-BIDORAI" className="hover:text-[#1877F2] transition-colors">📞 1-800-BIDORAI</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="text-center pt-8 border-t border-gray-700">
            <div className="flex justify-center items-center gap-6 mb-4 flex-wrap text-sm">
              <span className="flex items-center gap-1">
                <span className="text-[#1877F2]">🚀</span> Same-Day Pickup
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#1877F2]">🏆</span> Premium Quality
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#1877F2]">🤝</span> Local Partners
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 BIDORAI. Making party catering affordable and accessible.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}