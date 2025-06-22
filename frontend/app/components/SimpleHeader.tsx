// app/components/SimpleHeader.tsx
export default function SimpleHeader() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-[#1877F2] to-[#1565C0] rounded-lg flex items-center justify-center text-white shadow-lg">
              <span className="text-base">🍽️</span>
            </div>
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Bidorai</span>
          </div>
          
          <div className="flex items-center gap-5">
            <span className="hidden md:flex items-center gap-1 text-gray-600 font-medium">
              📞 1-800-BIDORAI
            </span>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold">
              Sign In
            </button>
            <button className="px-4 py-2 bg-[#1877F2] text-white hover:bg-[#1565C0] rounded-lg font-semibold">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}