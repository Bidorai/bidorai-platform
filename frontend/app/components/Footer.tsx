'use client';

export default function Footer() {
  const footerLinks = {
    bidorai: [
      { name: 'About Us', href: '#about' },
      { name: 'Sustainability', href: '#sustainability' },
      { name: 'Farm Partners', href: '#partners' },
      { name: 'Contact', href: '#contact' }
    ],
    customers: [
      { name: 'Quality Guarantee', href: '#quality' },
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Support', href: '#support' },
      { name: 'FAQ', href: '#faq' }
    ],
    restaurants: [
      { name: 'Become a Partner', href: '#become-partner' },
      { name: 'Restaurant Portal', href: '#restaurant-portal' },
      { name: 'Sourcing Standards', href: '#sourcing' }
    ],
    legal: [
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: '📞 1-800-BIDORAI', href: 'tel:1-800-BIDORAI' }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section with Logo */}
        <div className="text-center mb-16 pb-16 border-b border-gray-700">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1877F2] to-[#1565C0] rounded-xl flex items-center justify-center text-2xl shadow-xl">
              🍽️
            </div>
            <span className="text-3xl font-extrabold text-white tracking-tight">Bidorai</span>
          </div>
          <p className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
            Connecting communities with premium fresh food through innovative bidding technology and sustainable partnerships.
          </p>
        </div>
        
        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* BIDORAI Column */}
          <div>
            <h4 className="text-[#1877F2] text-lg font-bold mb-6 flex items-center gap-2">
              <span>🌟</span>
              BIDORAI
            </h4>
            <ul className="space-y-3">
              {footerLinks.bidorai.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-300 hover:text-[#1877F2] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* For Customers Column */}
          <div>
            <h4 className="text-[#1877F2] text-lg font-bold mb-6 flex items-center gap-2">
              <span>👥</span>
              For Customers
            </h4>
            <ul className="space-y-3">
              {footerLinks.customers.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-300 hover:text-[#1877F2] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* For Restaurants Column */}
          <div>
            <h4 className="text-[#1877F2] text-lg font-bold mb-6 flex items-center gap-2">
              <span>🏪</span>
              For Restaurants
            </h4>
            <ul className="space-y-3">
              {footerLinks.restaurants.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-300 hover:text-[#1877F2] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal Column */}
          <div>
            <h4 className="text-[#1877F2] text-lg font-bold mb-6 flex items-center gap-2">
              <span>⚖️</span>
              Legal & Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-300 hover:text-[#1877F2] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="text-center pt-8 border-t border-gray-700">
          <div className="flex justify-center items-center gap-8 mb-5 flex-wrap text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-[#1877F2]">🚀</span>
              <span>Same-Day Party Pickup</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-[#1877F2]">🏆</span>
              <span>Premium Quality Certified</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-[#1877F2]">🤝</span>
              <span>Supporting Local Businesses</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; 2025 BIDORAI. Making party catering affordable and easy through smart bidding.
          </p>
        </div>
      </div>
    </footer>
  );
}