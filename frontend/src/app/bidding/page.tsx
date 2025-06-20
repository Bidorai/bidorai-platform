// frontend/src/app/bidding/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/home/Header";
import { LiveBiddingPanel } from "@/components/bidding/LiveBiddingPanel";

export default function BiddingPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="minimal" />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Live Bidding!
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join exciting live auctions and bid on premium catering from top Dallas restaurants. 
              Save 10-25% on every order!
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-gray-600">Live Auctions</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">18%</div>
              <div className="text-gray-600">Avg Savings</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-orange-600 mb-2">156</div>
              <div className="text-gray-600">Active Bidders</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">45</div>
              <div className="text-gray-600">Restaurants</div>
            </div>
          </div>

          {/* Main Bidding Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Bidding Panel */}
            <div className="lg:col-span-2">
              <LiveBiddingPanel />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Tips */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  💡 Bidding Tips
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Bid in small increments to stay competitive</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Watch for auctions ending soon for best deals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Set a budget and stick to it</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Check pickup times before bidding</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🔥 Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Farm Fresh Kitchen</span>
                    <span className="text-green-600 font-medium">+$15</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tokyo Sushi Bar</span>
                    <span className="text-blue-600 font-medium">New bid</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Green Garden Bistro</span>
                    <span className="text-green-600 font-medium">+$10</span>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Need Help?
                </h3>
                <p className="text-blue-700 text-sm mb-4">
                  Our team is here to help you get the best deals!
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}