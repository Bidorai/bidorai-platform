interface RestaurantCardProps {
  name: string;
  description: string;
  rating: number;
  location: string;
  pickupTime: string;
  tags: string[];
  image: string;
}

export function RestaurantCard({
  name,
  description,
  rating,
  location,
  pickupTime,
  tags,
  image
}: RestaurantCardProps) {
  const getTagIcon = (tag: string) => {
    switch (tag) {
      case 'Certified Organic': return '🌱';
      case 'Daily Fresh': return '🐟';
      case 'Authentic': return '🌮';
      case 'Handmade': return '🍝';
      case 'Slow-Smoked': return '🔥';
      case 'Farm-to-Table': return '🌾';
      default: return '✨';
    }
  };

  return (
    <div className="bg-blue-800/50 backdrop-blur rounded-2xl p-6 hover:bg-blue-700/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <span className="inline-flex items-center gap-2 bg-black/30 text-white px-3 py-1 rounded-full text-sm">
          {getTagIcon(tags[0])} {tags[0]}
        </span>
      </div>
      
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl">
          {tags[0] === 'Certified Organic' ? '🥗' : tags[0] === 'Daily Fresh' ? '🍣' : '🌮'}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
      <p className="text-blue-200 mb-4">{description}</p>
      
      <div className="flex items-center gap-4 text-sm text-blue-200">
        <span className="flex items-center gap-1">
          ⭐ {rating}
        </span>
        <span>📍 {location}</span>
        <span>⏱️ {pickupTime}</span>
      </div>
    </div>
  );
} 