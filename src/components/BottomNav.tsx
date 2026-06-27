import React from 'react';
import { Home, ShoppingBag, FileText, Bell, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'shop' | 'reports' | 'notifications' | 'profile';
  setActiveTab: (tab: 'home' | 'shop' | 'reports' | 'notifications' | 'profile') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-cardBg border-t border-gray-100 py-2 px-6 flex justify-between items-center z-40">
      <button 
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center ${activeTab === 'home' ? 'text-primary' : 'text-icon'}`}
      >
        <Home className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-medium">Bosh sahifa</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('shop')}
        className={`flex flex-col items-center ${activeTab === 'shop' ? 'text-primary' : 'text-icon'}`}
      >
        <ShoppingBag className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-medium">Do'kon</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('reports')}
        className={`flex flex-col items-center ${activeTab === 'reports' ? 'text-primary' : 'text-icon'}`}
      >
        <FileText className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-medium">Hisobot</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('notifications')}
        className={`flex flex-col items-center ${activeTab === 'notifications' ? 'text-primary' : 'text-icon'}`}
      >
        <Bell className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-medium">Xabarlar</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-primary' : 'text-icon'}`}
      >
        <User className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-medium">Profil</span>
      </button>
    </nav>
  );
};
