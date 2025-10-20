export interface SalesData {
  id: string;
  date: string;
  revenue: number;
  transactions: number;
  storeId: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  sales: number;
  storeId: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  orderCount: number;
  joinDate: string;
  lastPurchase: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  status: 'pending' | 'shipped' | 'delivered' | 'returned';
  total: number;
  date: string;
  storeId: string;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: 'success' | 'failed';
  method: 'card' | 'upi' | 'cash';
  failureReason?: string;
  date: string;
}

export interface Store {
  id: string;
  name: string;
  location: string;
}

export interface KPIMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  newCustomers: number;
  lowStockItems: number;
}