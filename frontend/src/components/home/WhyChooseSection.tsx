'use client'

import { PartyPopper, DollarSign, Award } from 'lucide-react'

export function WhyChooseSection() {
  const benefits = [
    {
      icon: <PartyPopper className="w-8 h-8" />,
      title: 'Premium Events',
      description: 'Perfect for corporate events, celebrations, and premium gatherings of any size with quality guaranteed.'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Guaranteed Savings', 
      description: 'Save 10-25% on every order without compromising quality. Multiple ways to secure the best deals.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Certified Partners',
      description: 'Only the finest restaurants that meet our strict quality, freshness, and service standards.'
    }
  ]

  return (
    <section className="bg-white py-15">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-bidorai-navy-900 mb-4">
          Why Choose BIDORAI?
        </h2>
        <p className="text-lg text-bidorai-neutral-600 mb-15">
          Premium quality meets innovative savings
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-bidorai-neutral-50 rounded-xl p-10 text-center transition-transform duration-200 hover:-translate-y-1 border border-transparent hover:border-bidorai-blue-600 hover:shadow-lg hover:shadow-bidorai-blue-600/10"
            >
              <div className="w-20 h-20 bg-bidorai-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-bidorai-blue-600/30">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-bidorai-navy-900 mb-4">
                {benefit.title}
              </h3>
              <p className="text-base text-bidorai-neutral-600 leading-relaxed max-w-[280px] mx-auto">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}