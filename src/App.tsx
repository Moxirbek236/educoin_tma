import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from './theme';

import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Reports } from './pages/Reports';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { Tasks } from './pages/Tasks';
import { Rating } from './pages/Rating';
import type { Transaction, Product, NotificationItem } from './types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'reports' | 'notifications' | 'profile' | 'tasks' | 'rating'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [canResetPassword, setCanResetPassword] = useState<boolean>(false);

  const [userProfile, setUserProfile] = useState<any>(null);

  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationSuccess, setVerificationSuccess] = useState<boolean>(false);
  const [showPasswordReset, setShowPasswordReset] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');

  const [balance, setBalance] = useState<number>(0);
  const [latestReport, setLatestReport] = useState<string>('Yuklanmoqda...');
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [ratings, setRatings] = useState<any[]>([]);
  
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlChatId = searchParams.get('chatId');

    const tg = (window as any).Telegram?.WebApp;
    let activeChatId = urlChatId || '123456789';

    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#7F56D9');
      tg.setBackgroundColor('#F2F4F7');
      
      const user = tg.initDataUnsafe?.user;
      if (user?.id) {
        activeChatId = urlChatId || String(user.id);
      }
    }

    checkTmaAuth(activeChatId);

    // Backendni "uyg'oq" ushlab turish uchun har 1 daqiqada (60000ms) ping jo'natamiz
    const pingInterval = setInterval(() => {
      fetch(`${API_BASE}/bot/tma/auth?chatId=ping`).catch(() => {});
    }, 60000);

    return () => clearInterval(pingInterval);
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
        setTasks(data.tasks || []);
        setRatings(data.ratings || []);
        setCanResetPassword(!!data.canResetPassword);
        if (data.role && data.branchName) {
            setUserProfile((prev: any) => ({...prev, role: data.role, branchName: data.branchName}));
        }
      }
    } catch (err) {}
  };

  const handleSharePhone = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);
      setPhoneNumber(userProfile?.phone || '+998 99 123 45 67');
    }, 1500);
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

  if (isAuthenticated === null || (loading && !userProfile)) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <motion.img 
            src="https://educoin-b2b.educoinapp.uz/api/v1/files/educoin/default_coin.png" 
            alt="Educoin Logo" 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 20 }}
          />
          <CircularProgress color="primary" />
        </Box>
      </ThemeProvider>
    );
  }

  // Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
          <Paper elevation={0} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: '1rem', backgroundColor: 'transparent' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <img 
                  src="https://educoin-b2b.educoinapp.uz/api/v1/files/educoin/default_coin.png" 
                  alt="Logo" 
                  style={{ width: 80, height: 80, margin: '0 auto', marginBottom: 16 }}
                />
                <Typography variant="h5" color="textPrimary" sx={{ fontWeight: 'bold' }}>EduCoin'ga xush kelibsiz</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  Tizimdan foydalanish uchun bot orqali ro'yxatdan o'tishingiz yoki login qilishingiz kerak.
                </Typography>
              </Box>

              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                fullWidth
                onClick={() => {
                  if ((window as any).Telegram?.WebApp) {
                    (window as any).Telegram.WebApp.close();
                  } else {
                    window.location.href = "https://t.me/educoin_tma_bot";
                  }
                }}
                sx={{ mt: 1, py: 1.5, fontSize: '1rem', borderRadius: '0.65rem', fontWeight: 'bold' }}
              >
                Bot orqali kirish
              </Button>
            </motion.div>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ pb: 7, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header notifications={notifications} setActiveTab={setActiveTab} userProfile={userProfile} />
        
        <Box component="main" sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'home' && (
                <Home 
                  balance={balance} 
                  transactions={transactions} 
                  setBalance={setBalance}
                  setTransactions={setTransactions}
                  setActiveTab={setActiveTab} 
                  quizAnswered={quizAnswered} 
                  claimDailyQuiz={claimDailyQuiz} 
                  userProfile={userProfile}
                />
              )}
              {activeTab === 'shop' && (
                <Shop 
                  products={products} 
                  balance={balance}
                  setBalance={setBalance}
                  setTransactions={setTransactions}
                  transactions={transactions}
                />
              )}
              {activeTab === 'reports' && (
                <Reports latestReport={latestReport} />
              )}
              {activeTab === 'notifications' && (
                <Notifications notifications={notifications} />
              )}
              {activeTab === 'tasks' && (
                <Tasks tasks={tasks} />
              )}
              {activeTab === 'rating' && (
                <Rating ratings={ratings} />
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
                  userProfile={userProfile}
                  canResetPassword={canResetPassword}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </Box>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} role={userProfile?.role} />
      </Box>
    </ThemeProvider>
  );
}
