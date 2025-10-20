import React from 'react';
import { useState } from 'react';
import { useStoreData } from './hooks/useStoreData';
import { KPICard } from './components/KPICard';
import { SalesChart } from './components/SalesChart';
import { TopProducts } from './components/TopProducts';
import { LowStockAlert } from './components/LowStockAlert';
import { CustomerInsights } from './components/CustomerInsights';
import { OrderStatus } from './components/OrderStatus';
import { MultiStoreComparison } from './components/MultiStoreComparison';
import { RevenueForecasting } from './components/RevenueForecasting';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  Store,
  BarChart3,
  RefreshCw
} from 'lucide-react';

function App() {
  const [selectedStoreId, setSelectedStoreId] = useState('store-1');
  const { 
    salesData, 
    products, 
    customers, 
    orders, 
    kpiMetrics, 
    loading, 
    stores 
  } = useStoreData(selectedStoreId);

  const selectedStore = stores.find(store => store.id === selectedStoreId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600">Loading dashboard data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Retail KPI Dashboard</h1>
                <p className="text-sm text-gray-600">Real-time store performance insights</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedStoreId}
                  onChange={(e) => setSelectedStoreId(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{selectedStore?.name}</p>
                <p className="text-xs text-gray-600">{selectedStore?.location}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value={`$${kpiMetrics.totalRevenue.toLocaleString()}`}
            change="+12.5% vs last month"
            changeType="positive"
            icon={DollarSign}
            color="bg-green-500"
          />
          <KPICard
            title="Total Orders"
            value={kpiMetrics.totalOrders}
            change="+8.2% vs last month"
            changeType="positive"
            icon={ShoppingCart}
            color="bg-blue-500"
          />
          <KPICard
            title="Avg Order Value"
            value={`$${Math.round(kpiMetrics.averageOrderValue)}`}
            change="+3.1% vs last month"
            changeType="positive"
            icon={DollarSign}
            color="bg-purple-500"
          />
          <KPICard
            title="New Customers"
            value={kpiMetrics.newCustomers}
            change="+15.3% vs last month"
            changeType="positive"
            icon={Users}
            color="bg-indigo-500"
          />
          <KPICard
            title="Low Stock Items"
            value={kpiMetrics.lowStockItems}
            change={kpiMetrics.lowStockItems > 5 ? "Action needed" : "All good"}
            changeType={kpiMetrics.lowStockItems > 5 ? "negative" : "positive"}
            icon={Package}
            color="bg-orange-500"
          />
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SalesChart data={salesData} title="Revenue Trend (Last 30 Days)" />
          <TopProducts products={products} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <LowStockAlert products={products} />
          <CustomerInsights customers={customers} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <OrderStatus orders={orders} />
          <RevenueForecasting salesData={salesData} />
        </div>

        {/* Multi-Store Comparison */}
        <div className="mb-8">
          <MultiStoreComparison stores={stores} />
        </div>
      </main>
    </div>
  );
}

export default App;
