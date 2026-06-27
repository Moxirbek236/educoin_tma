export interface Transaction {
  id: string;
  type: 'RECEIVED' | 'SENT' | 'SPENT';
  amount: number;
  description: string;
  date: string;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  time: string;
  unread: boolean;
}
