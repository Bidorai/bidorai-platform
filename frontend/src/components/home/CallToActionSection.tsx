'use client'

import { toast } from 'sonner'
import { CheckCircle, Shield, Zap } from 'lucide-react'

export function CallToActionSection() {
  const startOrdering = () => {
    toast.info('Starting your order...')
    console.log('🚀 Start ordering clicked')
  }

  const seeHowItWorks = () => {
    toast.info('Loading how it works...')
    console.log('📖 How it works clicked')
  }

  return (
    <section 
      className="py-25 text-center border-t border-bidorai-neutral-200"
      style={{
        background: 'linear-gradient(135deg, #f8fafc, white)'
      }}
    >
      <div className="max-w-4xl mx-auto px-5">
        <div className="inline-flex items-center bg-bidorai-blue-50 text-bidorai-blue-600 px-6 py-3 rounded-full font-semibold text-sm mb-8 border border-bidorai-blue-200">
          <span className="mr-2">🚀</span>
          Join 10,000+ satisfied customers
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-extrabold text-bidorai-navy-900 mb-6 leading-tight tracking-tight">
          Ready to Save on Your Next Event?
        </h2>
        <p className="text-xl text-bidorai-neutral-600 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
          Join thousands of satisfied customers who trust BIDORAI for their catering needs.
        </p>
        
        <div className="flex justify-center gap-5 flex-wrap mb-10">
          <button
            onClick={startOrdering}
            className="min-w-[200px] text-lg font-bold bg-orange-500 hover:bg-orange-600 text-white px-9 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
          >
            <span className="text-xl">🍽️</span>
            Start Ordering Now
          </button>
          <button
            onClick={seeHowItWorks}
            className="min-w-[200px] text-lg font-semibold bg-transparent border-2 border-bidorai-navy-900 text-bidorai-navy-900 hover:bg-bidorai-navy-50 px-9 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span className="text-xl">📺</span>
            See How It Works
          </button>
        </div>
        
        <div className="flex justify-center gap-10 flex-wrap text-bidorai-neutral-600 text-sm font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-bidorai-blue-600 w-5 h-5" />
            <span>No subscription fees</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="text-bidorai-blue-600 w-5 h-5" />
            <span>Quality guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="text-bidorai-blue-600 w-5 h-5" />
            <span>Same-day pickup</span>
          </div>
        </div>
      </div>
    </section>
  )
}