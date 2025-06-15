'use client'

import Link from 'next/link'

export function Footer() {
  const footerLinks = {
    'BIDORAI': [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Contact', href: '/contact' }
    ],
    'For Customers': [
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Support', href: '/support' },
      { name: 'FAQ', href: '/faq' }
    ],
    'For Restaurants': [
      { name: 'Become a Partner', href: '/partner' },
      { name: 'Restaurant Portal', href: '/portal' },
      { name: 'Resources', href: '/resources' }
    ],
    'Legal': [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: '📞 1-800-BIDORAI', href: 'tel:1-800-BIDORAI' }
    ]
  }

  const features = [
    { icon: '🚀', text: 'Same-Day Pickup' },
    { icon: '🏆', text: 'Premium Quality' },
    { icon: '🤝', text: 'Local Partners' }
  ]

  return (
    <footer className="bg-gradient-to-r from-bidorai-navy-800 to-bidorai-navy-900 text-bidorai-neutral-300 py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bidorai-blue-600/10 via-transparent to-bidorai-blue-600/5" />
      
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        {/* Header */}
        <div className="text-center mb-15 pb-15 border-b border-white/10">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gradient-to-r from-bidorai-blue-600 to-bidorai-blue-700 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-bidorai-blue-600/30">
              🍽️
            </div>
            <span className="text-3xl font-extrabold text-white tracking-tight">
              Bidorai
            </span>
          </div>
          <p className="text-lg text-bidorai-neutral-400 max-w-lg mx-auto leading-relaxed">
            Connecting communities with premium fresh food through innovative bidding technology and restaurant partnerships.
          </p>
        </div>
        
        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-15">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-bidorai-blue-400 text-lg font-bold mb-6 flex items-center gap-2">
                <span className="text-base">
                  {category === 'BIDORAI' ? '🌟' : 
                   category === 'For Customers' ? '👥' : 
                   category === 'For Restaurants' ? '🏪' : '⚖️'}
                </span>
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-bidorai-neutral-300 hover:text-bidorai-blue-400 transition-colors duration-200 flex items-center gap-2 py-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom */}
        <div className="text-center pt-8 border-t border-white/10">
          <div className="flex justify-center gap-8 mb-5 flex-wrap text-sm font-medium">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-bidorai-neutral-400">
                <span className="text-bidorai-blue-400 text-lg">{feature.icon}</span>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
          <p className="text-bidorai-neutral-400 text-sm">
            &copy; 2025 BIDORAI. Making party catering affordable and accessible.
          </p>
        </div>
      </div>
    </footer>
  )
}