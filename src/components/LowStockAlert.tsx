import React from 'react';
import { Product } from '../types';
import { AlertTriangle, Package } from 'lucide-react';

interface LowStockAlertProps {
  products: Product[];
}

export const LowStockAlert: React.FC<LowStockAlertProps> = ({ products }) => {
  const lowStockProducts = products.filter(product => product.stock < 10);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <h3 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h3>
        {lowStockProducts.length > 0 && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {lowStockProducts.length}
          </span>
        )}
      </div>
      
      {lowStockProducts.length === 0 ? (
        <div className="text-center py-8">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">All products are well stocked!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lowStockProducts.slice(0, 5).map((product) => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-red-600">{product.stock} left</p>
                <p className="text-xs text-gray-500">Reorder needed</p>
              </div>
            </div>
          ))}
          {lowStockProducts.length > 5 && (
            <p className="text-sm text-gray-600 text-center pt-2">
              +{lowStockProducts.length - 5} more items need restocking
            </p>
          )}
        </div>
      )}
    </div>
  );
};