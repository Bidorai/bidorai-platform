"use client";
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';

export default function OrdersPage() {
  // Mock data - replace with actual API calls
  const orders = [
    {
      id: 'ORD-001',
      customerName: 'John Smith',
      customerPhone: '+1 (555) 123-4567',
      items: [
        { name: 'Organic Garden Salad Tray', quantity: 1, price: 45 },
        { name: 'Fresh Fruit Platter', quantity: 1, price: 40 },
      ],
      total: 85,
      status: 'pending',
      orderTime: '2024-01-15T10:30:00Z',
      pickupTime: '2024-01-15T18:00:00Z',
      specialInstructions: 'Please ensure all items are organic and fresh',
    },
    {
      id: 'ORD-002',
      customerName: 'Sarah Johnson',
      customerPhone: '+1 (555) 234-5678',
      items: [
        { name: 'Mediterranean Mezze Platter', quantity: 1, price: 65 },
      ],
      total: 65,
      status: 'preparing',
      orderTime: '2024-01-15T09:15:00Z',
      pickupTime: '2024-01-15T17:30:00Z',
      specialInstructions: 'Extra hummus on the side',
    },
    {
      id: 'ORD-003',
      customerName: 'Mike Wilson',
      customerPhone: '+1 (555) 345-6789',
      items: [
        { name: 'Artisan Cheese Board', quantity: 1, price: 75 },
        { name: 'Gourmet Sandwiches', quantity: 2, price: 45 },
      ],
      total: 165,
      status: 'completed',
      orderTime: '2024-01-15T08:45:00Z',
      pickupTime: '2024-01-15T16:00:00Z',
      specialInstructions: 'Include gluten-free options',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready for Pickup';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // Mock function - replace with actual API call
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="px-4 sm:px-0 mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage incoming orders and track their status
            </p>
          </div>

          {/* Orders List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">All Orders</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div key={order.id} className="px-6 py-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{order.id}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                          <p className="text-sm text-gray-500">{order.customerPhone}</p>
                          <p className="text-sm text-gray-500">
                            Order Time: {new Date(order.orderTime).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Pickup Time: {new Date(order.pickupTime).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Items:</p>
                          <ul className="text-sm text-gray-500">
                            {order.items.map((item, index) => (
                              <li key={index}>
                                {item.quantity}x {item.name} - ${item.price}
                              </li>
                            ))}
                          </ul>
                          <p className="text-sm font-medium text-gray-900 mt-2">
                            Total: ${order.total}
                          </p>
                        </div>
                      </div>

                      {order.specialInstructions && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-900">Special Instructions:</p>
                          <p className="text-sm text-gray-500">{order.specialInstructions}</p>
                        </div>
                      )}
                    </div>

                    <div className="ml-6 flex flex-col space-y-2">
                      {order.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Start Preparing
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Cancel Order
                          </button>
                        </>
                      )}
                      {order.status === 'preparing' && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Mark Ready
                          </button>
                        </>
                      )}
                      {order.status === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="px-4 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 