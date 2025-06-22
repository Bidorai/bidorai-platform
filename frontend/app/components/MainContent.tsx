'use client';

import { ClientOnly } from './ClientOnly';

export function MainContent() {
  return (
    <ClientOnly>
      <div className="min-h-screen bg-gray-50">
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

        {/* Main Content */}
        <main className="bg-gray-50">
          {/* Hero and Bidding Section */}
          <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Hero Section */}
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col justify-center">
                {/* ... rest of the hero section content ... */}
              </div>

              {/* Bidding Panel */}
              <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col">
                {/* ... rest of the bidding panel content ... */}
              </div>
            </div>
          </div>
        </main>

        {/* Three Ways Section */}
        <section className="bg-white py-16">
          {/* ... three ways section content ... */}
        </section>

        {/* Culinary Excellence Section */}
        <section className="bg-gray-900 py-20">
          {/* ... culinary excellence section content ... */}
        </section>

        {/* Why Choose Section */}
        <section className="bg-gray-50 py-16">
          {/* ... why choose section content ... */}
        </section>
      </div>
    </ClientOnly>
  );
}
