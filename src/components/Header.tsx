import React from 'react';
import { Bell } from 'lucide-react';
import type { NotificationItem } from '../types';

interface HeaderProps {
  notifications: NotificationItem[];
  setActiveTab: (tab: 'home' | 'shop' | 'reports' | 'notifications' | 'profile') => void;
}

export const Header: React.FC<HeaderProps> = ({ notifications, setActiveTab }) => {
  const hasUnread = notifications.some(n => n.unread);

  return (
    <header className="bg-primary text-white p-4 sticky top-0 z-30 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="https://educoin-b2b.educoinapp.uz/api/v1/files/educoin/default_coin.png" 
            alt="Educoin Logo" 
            className="w-9 h-9 object-contain"
          />
          <div>
            <h1 className="text-lg font-bold tracking-wide">EduCoin</h1>
            <p className="text-xs text-purple-200">Chilonzor Filiali • Student</p>
          </div>
        </div>
        
        <button 
          onClick={() => setActiveTab('notifications')}
          className="relative p-2 bg-white bg-opacity-10 rounded-custom transition-all hover:bg-opacity-20"
        >
          <Bell className="w-5 h-5 text-white" />
          {hasUnread && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-primary"></span>
          )}
        </button>
      </div>
    </header>
  );
};
