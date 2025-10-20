import React from 'react';
import { Customer } from '../types';
import { Users, Crown, DollarSign } from 'lucide-react';

interface CustomerInsightsProps {
  customers: Customer[];
}

export const CustomerInsights: React.FC<CustomerInsightsProps> = ({ customers }) => {
  const newCustomers = customers.filter(customer => {
    const joinDate = new Date(customer.joinDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return joinDate >= thirtyDaysAgo;
  });

  const loyalCustomers = customers
    .sort((a, b) => b.orderCount - a.orderCount)
    .slice(0, 3);

  const topSpenders = customers
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Customer Insights</h3>
      </div>

      <div className="space-y-6">
        {/* New Customers */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h4 className="font-medium text-gray-900">New Customers (30 days)</h4>
          </div>
          <p className="text-2xl font-bold text-green-600 mb-2">{newCustomers.length}</p>
          <div className="space-y-2">
            {newCustomers.slice(0, 3).map((customer) => (
              <div key={customer.id} className="text-sm text-gray-600">
                {customer.name} - Joined {new Date(customer.joinDate).toLocaleDateString()}
              </div>
            ))}
          </div>
        </div>

        {/* Most Loyal Customers */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-4 h-4 text-yellow-500" />
            <h4 className="font-medium text-gray-900">Most Loyal Customers</h4>
          </div>
          <div className="space-y-2">
            {loyalCustomers.map((customer, index) => (
              <div key={customer.id} className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">#{index + 1} {customer.name}</p>
                  <p className="text-sm text-gray-600">{customer.orderCount} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Spenders */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-4 h-4 text-green-500" />
            <h4 className="font-medium text-gray-900">Top Spenders</h4>
          </div>
          <div className="space-y-2">
            {topSpenders.map((customer, index) => (
              <div key={customer.id} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">#{index + 1} {customer.name}</p>
                  <p className="text-sm text-gray-600">${customer.totalSpent.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};