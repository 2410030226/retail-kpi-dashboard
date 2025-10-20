import { SalesData, Product, Customer, Order, Payment, Store } from '../types';
import { subDays, format } from 'date-fns';

// Mock stores
export const stores: Store[] = [
  { id: 'store-1', name: 'Downtown Branch', location: 'Downtown' },
  { id: 'store-2', name: 'Mall Branch', location: 'Shopping Mall' },
  { id: 'store-3', name: 'Airport Branch', location: 'Airport' },
];

// Generate mock sales data for the last 30 days
export const generateSalesData = (storeId: string): SalesData[] => {
  const data: SalesData[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      id: `sales-${storeId}-${i}`,
      date: format(date, 'yyyy-MM-dd'),
      revenue: Math.floor(Math.random() * 50000) + 10000,
      transactions: Math.floor(Math.random() * 200) + 50,
      storeId,
    });
  }
  return data;
};

// Mock products data
export const generateProducts = (storeId: string): Product[] => {
  const productNames = [
    'iPhone 15 Pro', 'Samsung Galaxy S24', 'MacBook Air', 'Dell XPS 13',
    'AirPods Pro', 'Sony WH-1000XM5', 'iPad Pro', 'Surface Pro 9',
    'Nintendo Switch', 'PlayStation 5', 'Xbox Series X', 'Apple Watch',
    'Fitbit Charge 5', 'Canon EOS R5', 'Sony A7 IV', 'GoPro Hero 12'
  ];
  
  return productNames.map((name, index) => ({
    id: `product-${storeId}-${index}`,
    name,
    category: index < 4 ? 'Electronics' : index < 8 ? 'Audio' : index < 12 ? 'Gaming' : 'Accessories',
    stock: Math.floor(Math.random() * 100),
    price: Math.floor(Math.random() * 2000) + 100,
    sales: Math.floor(Math.random() * 500) + 10,
    storeId,
  }));
};

// Mock customers data
export const generateCustomers = (): Customer[] => {
  const names = [
    'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis',
    'David Wilson', 'Lisa Anderson', 'Robert Taylor', 'Jennifer Martinez',
    'William Garcia', 'Jessica Rodriguez', 'James Lopez', 'Ashley Lee'
  ];
  
  return names.map((name, index) => ({
    id: `customer-${index}`,
    name,
    email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
    totalSpent: Math.floor(Math.random() * 10000) + 500,
    orderCount: Math.floor(Math.random() * 20) + 1,
    joinDate: format(subDays(new Date(), Math.floor(Math.random() * 365)), 'yyyy-MM-dd'),
    lastPurchase: format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd'),
  }));
};

// Mock orders data
export const generateOrders = (storeId: string): Order[] => {
  const statuses: Order['status'][] = ['pending', 'shipped', 'delivered', 'returned'];
  const customers = generateCustomers();
  
  return Array.from({ length: 50 }, (_, index) => {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    return {
      id: `order-${storeId}-${index}`,
      customerId: customer.id,
      customerName: customer.name,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      total: Math.floor(Math.random() * 2000) + 50,
      date: format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd'),
      storeId,
    };
  });
};

// Mock payments data
export const generatePayments = (): Payment[] => {
  const methods: Payment['method'][] = ['card', 'upi', 'cash'];
  const failureReasons = [
    'Insufficient funds', 'Card declined', 'UPI timeout', 'Network error',
    'Invalid PIN', 'Card expired', 'Bank server down'
  ];
  
  return Array.from({ length: 100 }, (_, index) => {
    const isSuccess = Math.random() > 0.15; // 85% success rate
    return {
      id: `payment-${index}`,
      orderId: `order-${Math.floor(Math.random() * 3) + 1}-${Math.floor(Math.random() * 50)}`,
      amount: Math.floor(Math.random() * 2000) + 50,
      status: isSuccess ? 'success' : 'failed',
      method: methods[Math.floor(Math.random() * methods.length)],
      failureReason: isSuccess ? undefined : failureReasons[Math.floor(Math.random() * failureReasons.length)],
      date: format(subDays(new Date(), Math.floor(Math.random() * 7)), 'yyyy-MM-dd'),
    };
  });
};