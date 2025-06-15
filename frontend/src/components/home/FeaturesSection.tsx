'use client'

import { Zap, Gamepad2, Smartphone } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Easy Ordering',
      description: 'Simple online ordering with flexible pickup and delivery options for your convenience.'
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'Fun Bidding', 
      description: 'Turn catering into an exciting experience with live auctions and competitive savings.'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Real-time Updates',
      description: 'Get instant notifications about your orders, bids, and exclusive second-chance offers.'
    }
  ]

  return (
    <section className="bg-bidorai-neutral-50 py-15">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-10 text-center shadow-lg transition-transform duration-200 hover:-translate-y-1 border border-transparent hover:border-bidorai-blue-600 hover:shadow-xl hover:shadow-bidorai-blue-600/10"
            >
              <div className="w-20 h-20 bg-bidorai-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-bidorai-blue-600/30">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-bidorai-navy-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-base text-bidorai-neutral-600 leading-relaxed max-w-[280px] mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}