import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';
  const partySize = searchParams.get('partySize') || '15';
  const sortBy = searchParams.get('sortBy') || 'recommended';
  const cuisines = searchParams.get('cuisines')?.split(',') || [];
  const dietaryOptions = searchParams.get('dietaryOptions')?.split(',') || [];
  const minRating = searchParams.get('minRating') || '0';
  const maxDistance = searchParams.get('maxDistance') || '10';
  const minPrice = searchParams.get('minPrice') || '0';
  const maxPrice = searchParams.get('maxPrice') || '500';
  const features = searchParams.get('features')?.split(',') || [];
  const deliveryDate = searchParams.get('deliveryDate') || '';
  const deliveryTime = searchParams.get('deliveryTime') || '';

  try {
    // In a real application, this would query your database
    // For now, we'll return mock data
    const restaurants = await searchRestaurants({
      query,
      location,
      partySize: parseInt(partySize),
      sortBy,
      filters: {
        cuisines,
        dietaryOptions,
        minRating: parseFloat(minRating),
        maxDistance: parseFloat(maxDistance),
        priceRange: [parseFloat(minPrice), parseFloat(maxPrice)],
        features,
        deliveryDate,
        deliveryTime
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        restaurants,
        total: restaurants.length,
        filters: {
          cuisines: getAvailableCuisines(),
          dietaryOptions: getAvailableDietaryOptions(),
          features: getAvailableFeatures()
        }
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search restaurants' },
      { status: 500 }
    );
  }
}

// Mock functions - replace with actual database queries
async function searchRestaurants(params: any) {
  // This would typically query your database
  // For now, return mock data
  const mockRestaurants = [
    {
      id: '1',
      name: 'Bella Italia Catering',
      description: 'Authentic Italian cuisine perfect for any event',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 324,
      cuisine: ['Italian', 'Pizza'],
      priceRange: '$$',
      distance: 2.3,
      deliveryTime: '45-60 min',
      minimumOrder: 100,
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free'],
      featured: true,
      onTimeDelivery: 96,
      tags: ['Popular', 'Free Delivery'],
      address: '123 Main St, Dallas, TX 75201',
      coordinates: { lat: 32.7767, lng: -96.7970 },
      available: true,
      menus: [
        {
          id: 'm1',
          name: 'Italian Feast Package',
          description: 'Lasagna, Caesar salad, garlic bread, and tiramisu',
          price: 18.99,
          serves: 1,
          image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop',
          category: 'Package Deals',
          dietaryOptions: ['Vegetarian'],
          popularItem: true,
          bidEnabled: true,
          currentBid: 16.99,
          bidEndTime: new Date(Date.now() + 3600000).toISOString()
        },
        {
          id: 'm2',
          name: 'Pizza Party Platter',
          description: 'Assorted pizzas with sides and dessert',
          price: 15.99,
          serves: 1,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
          category: 'Pizza',
          dietaryOptions: ['Vegetarian', 'Vegan'],
          popularItem: false,
          bidEnabled: false,
          currentBid: null,
          bidEndTime: null
        }
      ]
    },
    {
      id: '2',
      name: 'Taco Fiesta Catering',
      description: 'Build-your-own taco bar with all the fixings',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
      rating: 4.6,
      reviewCount: 189,
      cuisine: ['Mexican'],
      priceRange: '$',
      distance: 3.5,
      deliveryTime: '30-45 min',
      minimumOrder: 75,
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free'],
      featured: false,
      onTimeDelivery: 94,
      tags: ['Fast Delivery', 'Budget-Friendly'],
      address: '456 Oak Ave, Dallas, TX 75202',
      coordinates: { lat: 32.7767, lng: -96.7970 },
      available: true,
      menus: [
        {
          id: 'm3',
          name: 'Taco Bar Package',
          description: 'Choice of proteins, shells, and all toppings',
          price: 12.99,
          serves: 1,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
          category: 'Mexican',
          dietaryOptions: ['Vegetarian', 'Vegan'],
          popularItem: true,
          bidEnabled: true,
          currentBid: 11.99,
          bidEndTime: new Date(Date.now() + 7200000).toISOString()
        }
      ]
    },
    {
      id: '3',
      name: 'BBQ Smokehouse',
      description: 'Slow-smoked meats and Southern sides',
      image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop',
      rating: 4.9,
      reviewCount: 412,
      cuisine: ['BBQ', 'American'],
      priceRange: '$$$',
      distance: 1.8,
      deliveryTime: '60-75 min',
      minimumOrder: 150,
      dietaryOptions: ['Gluten-Free'],
      featured: true,
      onTimeDelivery: 98,
      tags: ['Top Rated', 'Award Winning'],
      address: '789 Elm St, Dallas, TX 75203',
      coordinates: { lat: 32.7767, lng: -96.7970 },
      available: true,
      menus: [
        {
          id: 'm4',
          name: 'BBQ Feast Package',
          description: 'Brisket, ribs, pulled pork with sides and cornbread',
          price: 25.99,
          serves: 1,
          image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop',
          category: 'BBQ',
          dietaryOptions: [],
          popularItem: true,
          bidEnabled: true,
          currentBid: 23.99,
          bidEndTime: new Date(Date.now() + 5400000).toISOString()
        }
      ]
    },
    {
      id: '4',
      name: 'Green Garden Bistro',
      description: 'Farm-to-table dining experience with locally sourced ingredients',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
      rating: 4.9,
      reviewCount: 156,
      cuisine: ['Mediterranean', 'Vegetarian'],
      priceRange: '$$',
      distance: 1.8,
      deliveryTime: '35-50 min',
      minimumOrder: 80,
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Organic'],
      featured: false,
      onTimeDelivery: 98,
      tags: ['Organic', 'Local'],
      address: '321 Pine St, Dallas, TX 75204',
      coordinates: { lat: 32.7767, lng: -96.7970 },
      available: true,
      menus: [
        {
          id: 'm5',
          name: 'Garden Fresh Platter',
          description: 'Seasonal vegetables, hummus, falafel, and fresh bread',
          price: 16.99,
          serves: 1,
          image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
          category: 'Vegetarian',
          dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free'],
          popularItem: true,
          bidEnabled: false,
          currentBid: null,
          bidEndTime: null
        }
      ]
    },
    {
      id: '5',
      name: 'Asian Fusion Express',
      description: 'Modern Asian cuisine with a contemporary twist',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
      rating: 4.7,
      reviewCount: 203,
      cuisine: ['Chinese', 'Japanese', 'Thai'],
      priceRange: '$$',
      distance: 4.2,
      deliveryTime: '40-55 min',
      minimumOrder: 90,
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free'],
      featured: false,
      onTimeDelivery: 95,
      tags: ['Fusion', 'Modern'],
      address: '654 Maple Dr, Dallas, TX 75205',
      coordinates: { lat: 32.7767, lng: -96.7970 },
      available: true,
      menus: [
        {
          id: 'm6',
          name: 'Asian Fusion Feast',
          description: 'Sushi, stir-fry, and traditional Asian dishes',
          price: 22.99,
          serves: 1,
          image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
          category: 'Fusion',
          dietaryOptions: ['Vegetarian', 'Vegan'],
          popularItem: true,
          bidEnabled: true,
          currentBid: 20.99,
          bidEndTime: new Date(Date.now() + 4800000).toISOString()
        }
      ]
    }
  ];

  // Apply filters
  let filtered = mockRestaurants;

  if (params.query) {
    filtered = filtered.filter(r => 
      r.name.toLowerCase().includes(params.query.toLowerCase()) ||
      r.description.toLowerCase().includes(params.query.toLowerCase()) ||
      r.cuisine.some(c => c.toLowerCase().includes(params.query.toLowerCase()))
    );
  }

  if (params.filters.cuisines.length > 0) {
    filtered = filtered.filter(r =>
      r.cuisine.some(c => params.filters.cuisines.includes(c))
    );
  }

  if (params.filters.dietaryOptions.length > 0) {
    filtered = filtered.filter(r =>
      params.filters.dietaryOptions.every(opt => r.dietaryOptions.includes(opt))
    );
  }

  if (params.filters.minRating > 0) {
    filtered = filtered.filter(r => r.rating >= params.filters.minRating);
  }

  if (params.filters.maxDistance < 10) {
    filtered = filtered.filter(r => r.distance <= params.filters.maxDistance);
  }

  // Sort results
  switch (params.sortBy) {
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'distance':
      filtered.sort((a, b) => a.distance - b.distance);
      break;
    case 'price_low':
      filtered.sort((a, b) => a.priceRange.length - b.priceRange.length);
      break;
    case 'price_high':
      filtered.sort((a, b) => b.priceRange.length - a.priceRange.length);
      break;
    default:
      // 'recommended' - could use a complex algorithm here
      break;
  }

  return filtered;
}

function getAvailableCuisines() {
  return [
    'American', 'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese',
    'Thai', 'Mediterranean', 'BBQ', 'Seafood', 'Pizza', 'Sandwiches',
    'Breakfast', 'Bakery', 'Greek', 'Korean', 'Vietnamese', 'French'
  ];
}

function getAvailableDietaryOptions() {
  return [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free',
    'Halal', 'Kosher', 'Low-Carb', 'Keto-Friendly', 'Organic'
  ];
}

function getAvailableFeatures() {
  return [
    'Free Delivery', 'Eco-Friendly Packaging', 'Individually Packaged',
    'Setup Service', 'Utensils Included', 'Contactless Delivery'
  ];
} 