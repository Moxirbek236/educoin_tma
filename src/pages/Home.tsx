import React, { useState } from 'react';
import { Card, Box, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, List } from '@mui/material';
import { motion } from 'framer-motion';
import { Send, QrCode, ShoppingBag, Award } from 'lucide-react';
import type { Transaction, UserProfile } from '../types';

interface HomeProps {
  balance: number;
  transactions: Transaction[];
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setActiveTab: (tab: 'home' | 'shop' | 'reports' | 'notifications' | 'profile') => void;
  quizAnswered: boolean;
  claimDailyQuiz: () => void;
  userProfile?: UserProfile;
}

export const Home: React.FC<HomeProps> = ({
  balance,
  transactions,
  setBalance,
  setTransactions,
  setActiveTab,
  quizAnswered,
  claimDailyQuiz,
  userProfile,
}) => {
  const [showSendModal, setShowSendModal] = useState(false);
  const [recipientPhone, setRecipientPhone] = useState('');
  const [sendAmount, setSendAmount] = useState<number | ''>('');

  const handleSendCoins = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendAmount || sendAmount <= 0 || balance < sendAmount) {
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
    setSendAmount('');
    alert('Coinlar muvaffaqiyatli o\'tkazildi!');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Profile Card & Balance */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
        <Card sx={{ p: 2, position: 'relative', overflow: 'hidden', backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #fcfaff 100%)' }}>
          <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', bgcolor: 'primary.main', opacity: 0.05 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: '#F4EBFF', color: 'primary.main', fontWeight: 'bold' }}>
                {userProfile?.fullname?.charAt(0) || 'U'}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{userProfile?.fullname || "Foydalanuvchi"}</Typography>
                <Typography variant="caption" sx={{ bgcolor: '#F4EBFF', color: 'primary.main', px: 1, py: 0.5, borderRadius: 10, fontWeight: 600 }}>
                  Bronze League
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary">Jami Coinlar</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
                <img src="https://educoin-b2b.educoinapp.uz/api/v1/files/educoin/default_coin.png" alt="coin" width={20} height={20} />
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{balance}</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, pt: 2, borderTop: '1px solid #EAECF0' }}>
            <Box onClick={() => setShowSendModal(true)} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1, cursor: 'pointer', borderRadius: 2, '&:hover': { bgcolor: 'action.hover' } }}>
              <Send size={20} color="#7F56D9" />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>Yuborish</Typography>
            </Box>
            <Box onClick={() => alert("QR-Kodni skanerlash faqat Telegram orqali ishlaydi")} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1, cursor: 'pointer', borderRadius: 2, '&:hover': { bgcolor: 'action.hover' } }}>
              <QrCode size={20} color="#7F56D9" />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>QR Skaner</Typography>
            </Box>
            <Box onClick={() => setActiveTab('shop')} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1, cursor: 'pointer', borderRadius: 2, '&:hover': { bgcolor: 'action.hover' } }}>
              <ShoppingBag size={20} color="#7F56D9" />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>Do'kon</Typography>
            </Box>
          </Box>
        </Card>
      </motion.div>

      {/* Gamification */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Award size={20} color="#7F56D9" />
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Kunlik Vazifa</Typography>
            </Box>
            <Typography variant="caption" color="primary.main" sx={{ fontWeight: 'bold' }}>+5 Coin</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Bugungi dars mavzusi yuzasidan testni yeching va coinni qo'lga kiriting!</Typography>
          {quizAnswered ? (
            <Box sx={{ bgcolor: '#ECFDF3', color: '#027A48', p: 1.5, borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Mukofot olindi!</Typography>
            </Box>
          ) : (
            <Button variant="contained" fullWidth onClick={claimDailyQuiz}>Testni boshlash</Button>
          )}
        </Card>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0.5, mb: 1 }}>
          <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 'bold' }}>Oxirgi harakatlar</Typography>
          <Typography variant="caption" color="primary.main" sx={{ fontWeight: 'bold' }}>Barchasi</Typography>
        </Box>
        <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {transactions.map((tx, index) => (
            <motion.div key={tx.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.1 }}>
              <Card sx={{ p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ bgcolor: tx.type === 'RECEIVED' ? '#ECFDF3' : '#FEF3F2', color: tx.type === 'RECEIVED' ? '#027A48' : '#B42318', width: 36, height: 36, fontSize: '1rem', fontWeight: 'bold' }}>
                    {tx.type === 'RECEIVED' ? '+' : '-'}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{tx.description}</Typography>
                    <Typography variant="caption" color="text.secondary">{tx.date} • {tx.category}</Typography>
                  </Box>
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: tx.type === 'RECEIVED' ? '#027A48' : '#B42318' }}>
                  {tx.type === 'RECEIVED' ? '+' : '-'}{tx.amount}
                </Typography>
              </Card>
            </motion.div>
          ))}
        </List>
      </motion.div>

      {/* Send Coins Modal */}
      <Dialog open={showSendModal} onClose={() => setShowSendModal(false)} slotProps={{ paper: { sx: { borderRadius: '1rem', width: '100%' } } }}>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Coin yuborish</Typography>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSendCoins} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField 
              label="Qabul qiluvchi telefon raqami" 
              variant="outlined" 
              fullWidth 
              size="small"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              required
            />
            <TextField 
              label="O'tkazma summasi" 
              type="number" 
              variant="outlined" 
              fullWidth 
              size="small"
              value={sendAmount}
              onChange={(e) => setSendAmount(Number(e.target.value))}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setShowSendModal(false)} color="inherit">Bekor qilish</Button>
          <Button onClick={handleSendCoins} variant="contained" color="primary">Yuborish</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
