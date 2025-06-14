import { Button } from '@/components/ui/Button';

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20 text-center">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-5xl font-extrabold text-white mb-5">Ready to Save on Your Next Event?</h2>
        <p className="text-lg text-blue-100 mb-10">Join thousands of satisfied customers who trust BIDORAI for their catering needs.</p>
        
        <div className="flex justify-center gap-5 flex-wrap">
          <Button variant="cta" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 min-w-[180px]">
            🍽️ Start Ordering Now
          </Button>
          <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 min-w-[180px]">
            📺 See How It Works
          </Button>
        </div>
      </div>
    </section>
  );
}