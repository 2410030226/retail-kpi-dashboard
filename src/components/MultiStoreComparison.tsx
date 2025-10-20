import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Store } from '../types';
import { useStoreData } from '../hooks/useStoreData';
import { Building2 } from 'lucide-react';

interface MultiStoreComparisonProps {
  stores: Store[];
}

export const MultiStoreComparison: React.FC<MultiStoreComparisonProps> = ({ stores }) => {
  // Get data for all stores
  const storeData = stores.map(store => {
    const { kpiMetrics } = useStoreData(store.id);
    return {
      name: store.name,
      revenue: kpiMetrics.totalRevenue,
      orders: kpiMetrics.totalOrders,
      customers: kpiMetrics.newCustomers,
    };
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900">Multi-Store Comparison</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Comparison */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Revenue Comparison</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={storeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Comparison */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Orders Comparison</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={storeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  formatter={(value: number) => [value, 'Orders']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Store Performance Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {storeData.map((store, index) => (
          <div key={store.name} className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">{store.name}</h5>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue:</span>
                <span className="font-medium">${store.revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Orders:</span>
                <span className="font-medium">{store.orders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">New Customers:</span>
                <span className="font-medium">{store.customers}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};