import React from 'react';
import { Send, QrCode, ShoppingBag, Award } from 'lucide-react';
import type { Transaction } from '../types';

interface HomeProps {
  balance: number;
  transactions: Transaction[];
  setActiveTab: (tab: 'home' | 'shop' | 'reports' | 'notifications' | 'profile') => void;
  setShowSendModal: (show: boolean) => void;
  quizAnswered: boolean;
  claimDailyQuiz: () => void;
}

export const Home: React.FC<HomeProps> = ({
  balance,
  transactions,
  setActiveTab,
  setShowSendModal,
  quizAnswered,
  claimDailyQuiz,
}) => {
  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Profile Card & Balance Box */}
      <div className="bg-cardBg p-5 rounded-custom shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 rounded-full -mr-8 -mt-8"></div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex justify-center items-center text-primary font-bold text-lg">
              SM
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Sardor Mustafoyev</h2>
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                Bronze League
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400">Jami Coinlar</span>
            <div className="flex items-center justify-end space-x-1">
              <img 
                src="https://educoin-b2b.educoinapp.uz/api/v1/files/educoin/default_coin.png" 
                alt="coin" 
                className="w-5 h-5"
              />
              <span className="text-2xl font-bold text-gray-800">{balance}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
          <button 
            onClick={() => setShowSendModal(true)}
            className="flex flex-col items-center justify-center py-2 hover:bg-gray-50 rounded-custom transition-all"
          >
            <Send className="w-5 h-5 text-primary mb-1" />
            <span className="text-xs text-gray-600">Yuborish</span>
          </button>
          <button 
            onClick={() => alert("QR-Kodni skanerlash faqat Telegram orqali ishlaydi")}
            className="flex flex-col items-center justify-center py-2 hover:bg-gray-50 rounded-custom transition-all"
          >
            <QrCode className="w-5 h-5 text-primary mb-1" />
            <span className="text-xs text-gray-600">QR Skaner</span>
          </button>
          <button 
            onClick={() => setActiveTab('shop')}
            className="flex flex-col items-center justify-center py-2 hover:bg-gray-50 rounded-custom transition-all"
          >
            <ShoppingBag className="w-5 h-5 text-primary mb-1" />
            <span className="text-xs text-gray-600">Do'kon</span>
          </button>
        </div>
      </div>

      {/* Gamification / Daily Task */}
      <div className="bg-cardBg p-4 rounded-custom shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
            <Award className="w-5 h-5 text-primary" />
            <span>Kunlik Vazifa</span>
          </h3>
          <span className="text-xs text-primary font-semibold">+5 Coin</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">Bugungi dars mavzusi yuzasidan testni yeching va coinni qo'lga kiriting!</p>
        {quizAnswered ? (
          <div className="bg-green-50 text-green-700 text-sm p-3 rounded-custom text-center font-medium flex items-center justify-center space-x-2">
            <CheckCircleIcon />
            <span>Mukofot olindi!</span>
          </div>
        ) : (
          <button 
            onClick={claimDailyQuiz}
            className="w-full bg-primary text-white py-2 rounded-custom font-medium hover:bg-opacity-95 transition-all text-sm"
          >
            Testni boshlash
          </button>
        )}
      </div>

      {/* Recent Transactions list */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-semibold text-gray-700 text-sm">Oxirgi harakatlar</h3>
          <span className="text-xs text-primary font-medium">Barchasi</span>
        </div>

        <div className="space-y-2">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-cardBg p-3 rounded-custom shadow-sm flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className={`w-9 h-9 rounded-full flex justify-center items-center text-sm font-semibold ${
                  tx.type === 'RECEIVED' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {tx.type === 'RECEIVED' ? '+' : '-'}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">{tx.description}</h4>
                  <span className="text-xs text-gray-400">{tx.date} • {tx.category}</span>
                </div>
              </div>
              <span className={`font-semibold text-sm ${
                tx.type === 'RECEIVED' ? 'text-green-600' : 'text-red-600'
              }`}>
                {tx.type === 'RECEIVED' ? '+' : '-'}{tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);
