interface RestaurantBidCardProps {
  restaurant: {
    id: string;
    name: string;
    rating: number;
    distance: string;
    cuisine: string;
    dish: string;
    serves: number;
    currentBid: number;
    biddersCount: number;
    avatar: string;
    status: string;
    icon: string;
  };
}

export default function RestaurantBidCard({ restaurant }: RestaurantBidCardProps) {
  const progressWidth = Math.min((restaurant.currentBid / 300) * 100, 100);

  return (
    <div className="bg-blue-50 rounded-lg p-3">
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-3 flex-1">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
            {restaurant.avatar}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 mb-1">{restaurant.name}</h3>
            <div className="text-sm text-gray-600 mb-1">
              <span className="text-yellow-500 font-semibold">⭐ {restaurant.rating}</span>
              <span className="mx-1">•</span>
              <span>{restaurant.distance}</span>
              <span className="mx-1">•</span>
              <span className="font-semibold">{restaurant.cuisine}</span>
            </div>
            <div className="text-sm text-gray-600 mb-1">
              🍛 {restaurant.dish} • Serves {restaurant.serves}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span>👥 {restaurant.biddersCount} people bidding</span>
            </div>
          </div>
        </div>
        <div className="text-2xl font-bold text-blue-600">
          ${restaurant.currentBid}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 rounded-full mb-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      
      {/* Status */}
      <div className="flex justify-center">
        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <span>{restaurant.icon}</span>
          <span>{restaurant.status}</span>
        </div>
      </div>
    </div>
  );
}