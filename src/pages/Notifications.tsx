import React from 'react';
import type { NotificationItem } from '../types';

interface NotificationsProps {
  notifications: NotificationItem[];
}

export const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  return (
    <div className="space-y-3 animate-fadeIn">
      <h3 className="font-semibold text-gray-700 text-sm px-1 mb-2">Kelgan bildirishnomalar</h3>
      
      {notifications.map((n) => (
        <div 
          key={n.id} 
          className={`p-4 rounded-custom shadow-sm border-l-4 ${
            n.unread ? 'bg-purple-50 border-primary' : 'bg-cardBg border-gray-300'
          }`}
        >
          <div className="flex justify-between items-start mb-1">
            <h4 className="text-sm font-semibold text-gray-800">{n.title}</h4>
            <span className="text-xs text-gray-400">{n.time}</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">{n.content}</p>
        </div>
      ))}
    </div>
  );
};
