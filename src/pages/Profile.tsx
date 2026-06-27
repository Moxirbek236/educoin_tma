import React from 'react';
import { Lock, LogOut, ShieldAlert, CheckCircle, Send } from 'lucide-react';

interface ProfileProps {
  showPasswordReset: boolean;
  setShowPasswordReset: (show: boolean) => void;
  verificationSuccess: boolean;
  isVerifying: boolean;
  phoneNumber: string;
  newPassword: string;
  setNewPassword: (pwd: string) => void;
  handleSharePhone: () => void;
  handleResetPasswordSubmit: (e: React.FormEvent) => void;
}

export const Profile: React.FC<ProfileProps> = ({
  showPasswordReset,
  setShowPasswordReset,
  verificationSuccess,
  isVerifying,
  phoneNumber,
  newPassword,
  setNewPassword,
  handleSharePhone,
  handleResetPasswordSubmit,
}) => {
  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Profile Card */}
      <div className="bg-cardBg p-5 rounded-custom shadow-sm text-center">
        <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto flex justify-center items-center text-primary font-bold text-2xl mb-3">
          SM
        </div>
        <h3 className="font-bold text-gray-800 text-lg">Sardor Mustafoyev</h3>
        <p className="text-xs text-gray-400 mb-4">+998 99 123 45 67</p>
        
        <div className="bg-gray-50 p-3 rounded-custom text-left space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Guruh:</span>
            <span className="font-medium text-gray-700">FN-32 Front-End</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Student ID:</span>
            <span className="font-medium text-gray-700">#4573</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Roli (RBAC):</span>
            <span className="font-medium text-gray-700">STUDENT</span>
          </div>
        </div>
      </div>

      {/* Password Recovery Manager */}
      <div className="bg-cardBg p-4 rounded-custom shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
            <Lock className="w-5 h-5 text-primary" />
            <span>Xavfsizlik</span>
          </h3>
          <span className="text-xs text-purple-600 font-medium">Boshqarish</span>
        </div>
        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
          Parolingizni unutgan bo'lsangiz, Telegram orqali kontaktingizni tasdiqlab uni yangilashingiz mumkin.
        </p>

        {showPasswordReset ? (
          <div className="p-3 bg-purple-50 rounded-custom border border-purple-100">
            {!verificationSuccess ? (
              <div className="text-center space-y-3">
                <ShieldAlert className="w-10 h-10 text-primary mx-auto" />
                <p className="text-xs text-gray-600 font-medium">
                  Telefon raqamingiz rostan ham ushbu Telegram akkauntingizga tegishli ekanligini tasdiqlang.
                </p>
                <button 
                  onClick={handleSharePhone}
                  disabled={isVerifying}
                  className="w-full bg-primary text-white py-2 rounded-custom text-xs font-semibold flex justify-center items-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isVerifying ? 'Tasdiqlanmoqda...' : 'Telefon raqamni yuborish'}</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-3">
                <div className="text-center text-xs text-green-600 font-medium flex justify-center items-center space-x-1 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Raqamingiz tasdiqlandi: {phoneNumber}</span>
                </div>
                <input 
                  type="password" 
                  placeholder="Yangi parol..." 
                  className="w-full bg-white border border-gray-200 rounded-custom p-2 text-xs outline-none focus:border-primary"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-custom text-xs font-semibold"
                >
                  Saqlash
                </button>
              </form>
            )}
          </div>
        ) : (
          <button 
            onClick={() => setShowPasswordReset(true)}
            className="w-full bg-gray-50 text-gray-700 py-2 border border-gray-200 rounded-custom text-xs font-medium hover:bg-gray-100 transition-all"
          >
            Parolni tiklash
          </button>
        )}
      </div>

      {/* Log out */}
      <button 
        onClick={() => alert('Chiqish tizimi faol')}
        className="w-full bg-red-50 text-red-600 py-3 rounded-custom text-sm font-semibold flex justify-center items-center space-x-2 hover:bg-red-100 transition-all"
      >
        <LogOut className="w-4 h-4" />
        <span>Tizimdan chiqish</span>
      </button>
    </div>
  );
};
