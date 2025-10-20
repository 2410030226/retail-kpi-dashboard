import React, { useState } from 'react';
import { Order } from '../types';
import { Package, Filter, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

interface OrderStatusProps {
  orders: Order[];
}

export const OrderStatus: React.FC<OrderStatusProps> = ({ orders }) => {
  const [filter, setFilter] = useState<Order['status'] | 'all'>('all');

  const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

  const statusCounts = {
    pending: orders.filter(o => o.status === 'pending').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    returned: orders.filter(o => o.status === 'returned').length,
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'returned': return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'returned': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Order Status Monitor</h3>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Order['status'] | 'all')}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="returned">Returned</option>
          </select>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              {getStatusIcon(status as Order['status'])}
            </div>
            <p className="text-lg font-bold text-gray-900">{count}</p>
            <p className="text-xs text-gray-600 capitalize">{status}</p>
          </div>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredOrders.slice(0, 10).map((order) => (
          <div key={order.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {getStatusIcon(order.status)}
              </div>
              <div>
                <p className="font-medium text-gray-900">#{order.id.slice(-8)}</p>
                <p className="text-sm text-gray-600">{order.customerName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">${order.total}</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};