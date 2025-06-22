// app/components/Footer.tsx
'use client';

export default function Footer() {
  return (
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
  );
}