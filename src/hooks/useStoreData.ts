import { useState, useEffect } from 'react';
import { SalesData, Product, Customer, Order, KPIMetrics } from '../types';
import { 
  generateSalesData, 
  generateProducts, 
  generateCustomers, 
  generateOrders, 
  stores 
} from '../data/mockData';

export const useStoreData = (selectedStoreId: string) => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API calls with delays
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSalesData(generateSalesData(selectedStoreId));
      setProducts(generateProducts(selectedStoreId));
      setCustomers(generateCustomers());
      setOrders(generateOrders(selectedStoreId));
      
      setLoading(false);
    };

    fetchData();
  }, [selectedStoreId]);

  const kpiMetrics: KPIMetrics = {
    totalRevenue: salesData.reduce((sum, day) => sum + day.revenue, 0),
    totalOrders: orders.length,
    averageOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0,
    newCustomers: customers.filter(customer => {
      const joinDate = new Date(customer.joinDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return joinDate >= thirtyDaysAgo;
    }).length,
    lowStockItems: products.filter(product => product.stock < 10).length,
  };

  return {
    salesData,
    products,
    customers,
    orders,
    kpiMetrics,
    loading,
    stores,
  };
};