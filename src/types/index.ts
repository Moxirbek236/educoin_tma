export type UserRole = 'STUDENT' | 'SCHOOL_STUDENT' | 'TEACHER' | 'ADMIN' | 'CREATOR';

export interface UserProfile {
  id: number;
  fullname: string;
  phone: string;
  email: string;
  role: UserRole;
  branchId: number | null;
  branchName?: string;
}

export interface Transaction {
  id: string;
  type: 'RECEIVED' | 'SENT' | 'SPENT' | 'GIVEN';
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
  content?: string;
  message?: string;
  time?: string;
  date?: string;
  unread?: boolean;
  isRead?: boolean;
  type?: 'system' | 'user';
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  coinReward: number;
  deadline: string;
  status: 'PENDING' | 'COMPLETED' | 'OVERDUE';
}

export interface RatingUser {
  rank: number;
  id: number;
  fullname: string;
  coins: number;
  branchName: string;
}
