import React from 'react';
import { Product } from '../types';
import { TrendingUp } from 'lucide-react';

interface TopProductsProps {
  products: Product[];
}

export const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
  const topProducts = products
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Top 5 Products</h3>
      </div>
      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{product.sales} sold</p>
              <p className="text-sm text-gray-600">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};