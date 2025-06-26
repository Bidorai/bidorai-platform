"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  // Dummy data for restaurants and bidding
  const restaurants = [
    {
      name: "Farm Fresh Kitchen",
      desc: "Organic ingredients, sustainable sourcing",
      rating: 4.9,
      tag: "Certified Organic",
      area: "Deep Ellum",
      pickup: "30 min pickup",
      icon: "🥗",
    },
    {
      name: "Tokyo Sushi Bar",
      desc: "Fresh daily sourcing, master craftsmanship",
      rating: 4.8,
      tag: "Daily Fresh",
      area: "Uptown",
      pickup: "25 min pickup",
      icon: "🍣",
    },
    {
      name: "El Mariachi Cantina",
      desc: "Authentic Mexican, family recipes",
      rating: 4.6,
      tag: "Mx Authentic",
      area: "Bishop Arts",
      pickup: "35 min pickup",
      icon: "🌮",
    },
    {
      name: "Bella Vista Trattoria",
      desc: "Handmade pasta, authentic Italian",
      rating: 4.7,
      tag: "π Handmade",
      area: "Little Italy",
      pickup: "40 min pickup",
      icon: "🍝",
    },
    {
      name: "Dallas BBQ Master",
      desc: "Authentic Texas BBQ, slow-smoked",
      rating: 4.7,
      tag: "Slow-Smoked",
      area: "Deep Ellum",
      pickup: "45 min pickup",
      icon: "🍖",
    },
    {
      name: "Green Garden Bistro",
      desc: "Farm-to-table, seasonal menu",
      rating: 4.8,
      tag: "Farm-to-Table",
      area: "Knox-Henderson",
      pickup: "35 min pickup",
      icon: "🥦",
    },
  ];
  const [location, setLocation] = useState("Dallas, TX");
  const [guests, setGuests] = useState(15);

  return (
    <>
      <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Hero Card */}
          <section className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">✨ The world's first party tray food bidding app</span>
              </div>
              <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                <span className="text-black">Bid your Meal.</span><br />
                <span className="text-blue-600">Win your Order.</span><br />
                <span className="text-orange-500">Feast your Party.</span>
              </h1>
              <p className="text-lg text-gray-700 mb-6">Bid on delicious half & full tray meals from local restaurants. <span className="font-bold text-blue-700">Name your price</span> and pick it up fresh.</p>
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center bg-gray-100 border border-gray-200 rounded-md px-3 py-2">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <input
                    className="bg-transparent outline-none w-24 text-gray-700"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 text-sm">Use My Location</button>
                <div className="flex items-center bg-gray-100 border border-gray-200 rounded-md px-3 py-2">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V6a5 5 0 00-10 0v4m10 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0" /></svg>
                  <input
                    type="number"
                    min={1}
                    className="bg-transparent outline-none w-8 text-center text-gray-700"
                    value={guests}
                    onChange={e => setGuests(Number(e.target.value))}
                  />
                </div>
              </div>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-600 mb-4 flex items-center justify-center">
                <span className="mr-2">🍽️</span> Find My Perfect Party Menu
              </button>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold w-fit mb-1">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>
                  Now launching in Dallas, TX
                </div>
                <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold w-fit">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2M9 17a4 4 0 01-8 0v-2a4 4 0 018 0v2z" /></svg>
                  $1 Tray Bids every Friday. Limited spots only.
                </div>
              </div>
            </div>
          </section>
          {/* Right: Party Menu Bidding Card */}
          <section className="bg-white rounded-2xl shadow-lg p-8 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">Party Menu Bidding</span>
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">LIVE</span>
            </div>
            <div className="bg-blue-100 rounded-lg p-3 flex items-center justify-between mb-4">
              <span className="text-blue-700 font-semibold">2:36 remaining</span>
              <span className="text-gray-700 font-semibold">Save <span className="text-2xl text-blue-700 font-bold">$284</span></span>
            </div>
            <div className="bg-gray-900 text-white rounded-lg p-4 mb-4">
              <span className="text-lg font-bold">Save $284</span>
              <div className="text-sm">Average 18% below market price</div>
            </div>
            {/* Bidding List */}
            <div className="space-y-4 flex-1">
              <div className="bg-white border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-blue-700">Farm Fresh Kitchen</div>
                  <div className="text-xs text-gray-500">Organic Harvest Bowl • Serves 15</div>
                  <div className="text-xs text-gray-400">8 people bidding</div>
                </div>
                <div className="text-2xl font-bold text-blue-700">$217</div>
              </div>
              <div className="bg-white border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-blue-700">Green Garden Bistro</div>
                  <div className="text-xs text-gray-500">Sustainable Feast Tray • Serves 12</div>
                  <div className="text-xs text-gray-400">12 people bidding</div>
                </div>
                <div className="text-2xl font-bold text-blue-700">$185</div>
              </div>
              <div className="bg-white border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-blue-700">Tokyo Sushi</div>
                  <div className="text-xs text-gray-500">Sushi Party Tray • Serves 10</div>
                  <div className="text-xs text-gray-400">5 people bidding</div>
                </div>
                <div className="text-2xl font-bold text-blue-700">$165</div>
              </div>
            </div>
            <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-600 mt-6 flex items-center justify-center">
              <span className="mr-2">��️</span> Place Your Bid Now
            </button>
            <button className="w-full mt-2 text-blue-700 underline">Watch Demo</button>
          </section>
        </div>
      </main>

      {/* Three Ways to Save */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Three Ways to Save on Catering</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4"><span className="text-3xl">⚡</span></div>
            <h3 className="font-bold text-lg mb-2">Instant Order</h3>
            <p className="text-gray-600 text-center">Order directly from premium restaurants at 10% below market price. Guaranteed freshness and quality.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4"><span className="text-3xl">🎯</span></div>
            <h3 className="font-bold text-lg mb-2">Live Bidding</h3>
            <p className="text-gray-600 text-center">Join live auctions for premium catering packages. Save up to 25% while supporting local restaurants.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4"><span className="text-3xl">📩</span></div>
            <h3 className="font-bold text-lg mb-2">Second Chance</h3>
            <p className="text-gray-600 text-center">Didn't win? Get an exclusive offer to match the winning bid and still enjoy premium quality at great prices.</p>
          </div>
        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 py-12">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Culinary Excellence from Dallas's Finest</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-4">
          {restaurants.map((r, i) => (
            <div key={i} className="bg-blue-700 rounded-xl p-6 flex flex-col items-center text-white shadow-lg">
              <div className="mb-2 text-3xl">{r.icon}</div>
              <div className="font-bold text-lg mb-1">{r.name}</div>
              <div className="text-xs bg-blue-200 text-blue-900 px-2 py-1 rounded-full mb-2">{r.tag}</div>
              <div className="text-sm mb-1">{r.desc}</div>
              <div className="flex items-center space-x-2 text-xs text-blue-100">
                <span>★ {r.rating}</span>
                <span>{r.area}</span>
                <span>{r.pickup}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600">EXPLORE OUR RESTAURANT PARTNERS</button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4"><span className="text-3xl">🎉</span></div>
            <h3 className="font-bold text-lg mb-2">Premium Events</h3>
            <p className="text-gray-600 text-center">Perfect for corporate events, celebrations, and premium gatherings of any size with quality guaranteed.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4"><span className="text-3xl">💲</span></div>
            <h3 className="font-bold text-lg mb-2">Guaranteed Savings</h3>
            <p className="text-gray-600 text-center">Save 10-25% on every order without compromising quality. Multiple ways to secure the best deals.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4"><span className="text-3xl">🏅</span></div>
            <h3 className="font-bold text-lg mb-2">Certified Partners</h3>
            <p className="text-gray-600 text-center">Only the finest restaurants that meet our strict quality, freshness, and service standards.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4"><span className="text-3xl">⚡</span></div>
            <h3 className="font-bold text-lg mb-2">Easy Ordering</h3>
            <p className="text-gray-600 text-center">Simple online ordering with flexible pickup and delivery options for your convenience.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4"><span className="text-3xl">🎮</span></div>
            <h3 className="font-bold text-lg mb-2">Fun Bidding</h3>
            <p className="text-gray-600 text-center">Turn catering into an exciting experience with live auctions and competitive savings.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4"><span className="text-3xl">📱</span></div>
            <h3 className="font-bold text-lg mb-2">Real-time Updates</h3>
            <p className="text-gray-600 text-center">Get instant notifications about your orders, bids, and exclusive second-chance offers.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <p className="text-gray-700 text-center mb-4">"BIDORAI saved us over $200 on our company holiday party catering. The bidding was fun and the food was amazing!"</p>
            <span className="font-semibold text-blue-700">Sarah Chen, Marketing Manager</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <p className="text-gray-700 text-center mb-4">"Perfect for my daughter's birthday party. Got premium catering at a great price without any hassle."</p>
            <span className="font-semibold text-blue-700">Mike Rodriguez, Parent</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <p className="text-gray-700 text-center mb-4">"The second-chance feature is brilliant. Even when I didn't win the bid, I still saved 20% on our team lunch."</p>
            <span className="font-semibold text-blue-700">Jennifer Park, HR Director</span>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600">Start Ordering Now</button>
          <button className="ml-4 border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-600 hover:text-white">See How It Works</button>
        </div>
        <div className="flex justify-center mt-4 space-x-6 text-gray-500 text-sm">
          <span>No subscription fees</span>
          <span>•</span>
          <span>Quality guaranteed</span>
          <span>•</span>
          <span>Same-day pickup</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <span className="font-bold text-2xl">Bidorai</span>
            <div className="flex flex-wrap space-x-8 mt-4 md:mt-0">
              <Link href="#" className="hover:underline">About Us</Link>
              <Link href="#" className="hover:underline">Careers</Link>
              <Link href="#" className="hover:underline">Press</Link>
              <Link href="#" className="hover:underline">Contact</Link>
              <Link href="#" className="hover:underline">How It Works</Link>
              <Link href="#" className="hover:underline">Pricing</Link>
              <Link href="#" className="hover:underline">Support</Link>
              <Link href="#" className="hover:underline">FAQ</Link>
              <Link href="#" className="hover:underline">Become a Partner</Link>
              <Link href="#" className="hover:underline">Restaurant Portal</Link>
              <Link href="#" className="hover:underline">Resources</Link>
              <Link href="#" className="hover:underline">Terms of Service</Link>
              <Link href="#" className="hover:underline">Privacy Policy</Link>
              <Link href="#" className="hover:underline">Cookie Policy</Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-200">
            <div className="flex items-center space-x-4 mb-2 md:mb-0">
              <span>Same-Day Pickup</span>
              <span>•</span>
              <span>Premium Quality</span>
              <span>•</span>
              <span>Local Partners</span>
            </div>
            <span>© 2025 BIDORAI. Making party catering affordable and accessible.</span>
          </div>
        </div>
      </footer>
    </>
  );
} 