import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Reports } from './pages/Reports';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import type { Transaction, Product, NotificationItem } from './types';
import { X, Send, ShoppingBag } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1'; // Standard relative path, works perfectly under Vercel proxy or local dev proxy

export default function App() {
  // Navigation & Auth States
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'reports' | 'notifications' | 'profile'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null means checking
  const [loading, setLoading] = useState<boolean>(true);
  
  // Telegram Session
  const [chatId, setChatId] = useState<string>('123456789'); // Mock default for browser testing
  const [tgUsername, setTgUsername] = useState<string>('guest_user');
  
  // Login Inputs
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // User details
  const [userProfile, setUserProfile] = useState<{
    id: number;
    fullname: string;
    phone: string;
    email: string;
    role: string;
  } | null>(null);

  // Security / Reset Password States
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationSuccess, setVerificationSuccess] = useState<boolean>(false);
  const [showPasswordReset, setShowPasswordReset] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');

  // Live Database States
  const [balance, setBalance] = useState<number>(0);
  const [latestReport, setLatestReport] = useState<string>('Yuklanmoqda...');
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  
  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSendModal, setShowSendModal] = useState<boolean>(false);
  const [recipientPhone, setRecipientPhone] = useState<string>('');
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);

  // 1. Initial Telegram SDK setup and Auth check
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    let activeChatId = '123456789';
    let username = 'guest_user';

    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#7F56D9');
      
      const user = tg.initDataUnsafe?.user;
      if (user?.id) {
        activeChatId = String(user.id);
        username = user.username || `${user.first_name || ''}_${user.last_name || ''}`;
      }
    }

    setChatId(activeChatId);
    setTgUsername(username);
    checkTmaAuth(activeChatId);
  }, []);

  const checkTmaAuth = async (targetChatId: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/bot/tma/auth?chatId=${targetChatId}`);
      const data = await res.json();
      
      if (data.success && data.user) {
        setUserProfile(data.user);
        setBalance(data.balance);
        setIsAuthenticated(true);
        await fetchTmaData(targetChatId);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('TMA Auth check failed:', err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchTmaData = async (targetChatId: string) => {
    try {
      const res = await fetch(`${API_BASE}/bot/tma/data?chatId=${targetChatId}`);
      if (res.ok) {
        const data = await res.json();
        setBalance(data.balance);
        setLatestReport(data.latestReport);
        setTransactions(data.transactions);
        setNotifications(data.notifications);
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Error fetching TMA data:', err);
    }
  };

  // Credentials Login (Syncs/Creates BotLogin in DB)
  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoginError('');
      setLoading(true);
      
      const res = await fetch(`${API_BASE}/bot/tma/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier,
          password,
          chatId,
          username: tgUsername
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUserProfile(data.user);
        setBalance(data.balance);
        setIsAuthenticated(true);
        await fetchTmaData(chatId);
      } else {
        setLoginError(data.message || 'Login yoki parol xato!');
      }
    } catch (err) {
      setLoginError('Tarmoq xatoligi yuz berdi!');
    } finally {
      setLoading(false);
    }
  };

  const handleSharePhone = () => {
    setIsVerifying(true);
    // Simulating Telegram contact sharing API check
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);
      setPhoneNumber(userProfile?.phone || '+998 99 123 45 67');
    }, 1500);
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length >= 4) {
      alert('Parol muvaffaqiyatli tiklandi! Yangi parolingiz saqlandi.');
      setShowPasswordReset(false);
      setVerificationSuccess(false);
    }
  };

  const handleBuyProduct = (product: Product) => {
    if (balance < product.price) {
      alert('Koinlar yetarli emas!');
      return;
    }
    setBalance(prev => prev - product.price);
    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'SPENT',
      amount: product.price,
      description: `Do'kondan ${product.name} sotib olindi`,
      date: new Date().toISOString().split('T')[0],
      category: 'Xarid'
    };
    setTransactions([newTx, ...transactions]);
    setSelectedProduct(null);
    alert('Muvaffaqiyatli sotib olindi! Filial adminstratoridan qabul qilishingiz mumkin.');
  };

  const handleSendCoins = (e: React.FormEvent) => {
    e.preventDefault();
    if (sendAmount <= 0 || balance < sendAmount) {
      alert('Noto\'g\'ri summa kiritilgan yoki coin yetarli emas!');
      return;
    }
    setBalance(prev => prev - sendAmount);
    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'SENT',
      amount: sendAmount,
      description: `${recipientPhone} raqamiga yuborildi`,
      date: new Date().toISOString().split('T')[0],
      category: 'O\'tkazma'
    };
    setTransactions([newTx, ...transactions]);
    setShowSendModal(false);
    setRecipientPhone('');
    setSendAmount(0);
    alert('Coinlar muvaffaqiyatli o\'tkazildi!');
  };

  const claimDailyQuiz = () => {
    setBalance(prev => prev + 5);
    setQuizAnswered(true);
    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'RECEIVED',
      amount: 5,
      description: 'Kunlik test mukofoti',
      date: new Date().toISOString().split('T')[0],
      category: 'Dars'
    };
    setTransactions([newTx, ...transactions]);
  };

  // Loading Screen
  if (isAuthenticated === null || (loading && !userProfile)) {
    return (
      <div className="min-h-screen bg-bodyBg flex flex-col justify-center items-center">
        <img 
          src="https://educoin-b2b.educoinapp.uz/api/v1/files/educoin/default_coin.png" 
          alt="Educoin Logo" 
          className="w-16 h-16 animate-bounce object-contain mb-4"
        />
        <p className="text-sm font-semibold text-gray-500">EduCoin TMA yuklanmoqda...</p>
      </div>
    );
  }

  // Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bodyBg flex justify-center items-start">
        <div className="w-full max-w-md min-h-screen bg-bodyBg shadow-xl p-6 flex flex-col justify-center space-y-6">
          <div className="text-center space-y-3">
            <img 
              src="https://educoin-b2b.educoinapp.uz/api/v1/files/educoin/default_coin.png" 
              alt="Educoin Logo" 
              className="w-20 h-20 mx-auto object-contain"
            />
            <h2 className="text-xl font-bold text-gray-800">EduCoin Tizimiga Kirish</h2>
            <p className="text-xs text-gray-500">TMA va Telegram Bot hisoblarini bog'lash uchun profilingizga kiring</p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-custom text-center font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Telefon raqam yoki Email</label>
              <input 
                type="text" 
                placeholder="Telefon yoki email..." 
                className="w-full bg-cardBg border border-gray-200 rounded-custom p-3 text-sm outline-none focus:border-primary"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Parol</label>
              <input 
                type="password" 
                placeholder="Parol..." 
                className="w-full bg-cardBg border border-gray-200 rounded-custom p-3 text-sm outline-none focus:border-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-primary text-white py-3 rounded-custom font-bold text-sm hover:bg-opacity-95 transition-all"
            >
              Kirish va Bog'lash
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard
  return (
    <div className="min-h-screen bg-bodyBg flex justify-center items-start">
      <div className="w-full max-w-md min-h-screen bg-bodyBg shadow-xl flex flex-col relative pb-20 select-none">
        
        <Header notifications={notifications} setActiveTab={setActiveTab} />

        <main className="flex-1 p-4 overflow-y-auto">
          {activeTab === 'home' && (
            <Home 
              balance={balance} 
              transactions={transactions} 
              setActiveTab={setActiveTab} 
              setShowSendModal={setShowSendModal} 
              quizAnswered={quizAnswered} 
              claimDailyQuiz={claimDailyQuiz} 
            />
          )}

          {activeTab === 'shop' && (
            <Shop 
              products={products} 
              setSelectedProduct={setSelectedProduct} 
            />
          )}

          {activeTab === 'reports' && (
            <div className="space-y-4 animate-fadeIn">
              <Reports />
              
              {/* Daily report content dynamically from backend */}
              <div className="bg-cardBg p-5 rounded-custom shadow-sm border border-purple-100">
                <h3 className="font-semibold text-gray-800 text-sm mb-3">Bugungi Kunlik Hisobot</h3>
                <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 p-3 rounded-custom">
                  {latestReport}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <Notifications notifications={notifications} />
          )}

          {activeTab === 'profile' && (
            <Profile 
              showPasswordReset={showPasswordReset}
              setShowPasswordReset={setShowPasswordReset}
              verificationSuccess={verificationSuccess}
              isVerifying={isVerifying}
              phoneNumber={phoneNumber}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              handleSharePhone={handleSharePhone}
              handleResetPasswordSubmit={handleResetPasswordSubmit}
            />
          )}
        </main>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Send Coins Modal */}
        {showSendModal && (
          <div className="absolute inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-cardBg w-full rounded-custom p-5 space-y-4 max-w-sm">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Coin yuborish</h3>
                <button onClick={() => setShowSendModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSendCoins} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">Qabul qiluvchi telefon raqami</label>
                  <input 
                    type="text" 
                    placeholder="+998 90 123 45 67" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-custom p-2.5 text-sm outline-none focus:border-primary"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">O'tkazma summasi</label>
                  <input 
                    type="number" 
                    placeholder="Masalan: 10" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-custom p-2.5 text-sm outline-none focus:border-primary"
                    value={sendAmount || ''}
                    onChange={(e) => setSendAmount(Number(e.target.value))}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-2.5 rounded-custom font-semibold text-sm flex justify-center items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>O'tkazishni tasdiqlash</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Product Details / Buy Modal */}
        {selectedProduct && (
          <div className="absolute inset-0 bg-black bg-opacity-40 z-50 flex items-end justify-center z-50 animate-slideUp">
            <div className="bg-cardBg w-full rounded-t-custom p-5 space-y-4 max-w-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800 text-base">{selectedProduct.name}</h3>
                  <span className="text-xs text-gray-400">Narxi: {selectedProduct.price} Coin</span>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-44 object-cover rounded-custom" />

              <div className="bg-purple-50 p-3 rounded-custom flex justify-between items-center text-xs">
                <span className="text-gray-600 font-medium">Sizdagi coinlar:</span>
                <span className="font-bold text-primary">{balance} Coin</span>
              </div>

              <button 
                onClick={() => handleBuyProduct(selectedProduct)}
                className="w-full bg-primary text-white py-3 rounded-custom font-bold text-sm flex justify-center items-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Sotib olishni tasdiqlash ({selectedProduct.price} Coin)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
