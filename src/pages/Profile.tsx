// @ts-nocheck
import React from 'react';
import { Box, Card, Typography, Avatar, Button, TextField, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
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
  handleResetPasswordSubmit?: (e: React.FormEvent) => void;
  userProfile?: any;
  canResetPassword?: boolean;
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
  userProfile,
  canResetPassword
}) => {
  
  const submitHandler = handleResetPasswordSubmit || ((e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length >= 4) {
      alert('Parol muvaffaqiyatli tiklandi! Yangi parolingiz saqlandi.');
      setShowPasswordReset(false);
    }
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Profile Info */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: '#F4EBFF', color: 'primary.main', fontSize: '2rem', fontWeight: 'bold' }}>
            {userProfile?.fullname ? userProfile.fullname.substring(0, 2).toUpperCase() : 'SM'}
          </Avatar>
          <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>{userProfile?.fullname || 'Sardor Mustafoyev'}</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>
            {userProfile?.phone || '+998 99 123 45 67'}
          </Typography>
          
          <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 2, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">Guruh:</Typography>
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>FN-32 Front-End</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">Student ID:</Typography>
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>#{userProfile?.id || '4573'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">Roli (RBAC):</Typography>
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{userProfile?.role || 'STUDENT'}</Typography>
            </Box>
          </Box>
        </Card>
      </motion.div>

      {/* Security */}
      {canResetPassword && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <Card sx={{ p: 2, mb: 2, bgcolor: '#F9FAFB', boxShadow: 'none', border: '1px solid #EAECF0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Lock size={20} color="#7F56D9" />
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Xavfsizlik</Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              Telefon raqamingiz tasdiqlangan. Yangi parol yaratish uchun quyidagi tugmani bosing.
            </Typography>

            <Button 
              variant="contained" 
              fullWidth 
              onClick={async () => {
                try {
                  const searchParams = new URLSearchParams(window.location.search);
                  let activeChatId = searchParams.get('chatId');
                  if (!activeChatId) {
                    const tg = (window as any).Telegram?.WebApp;
                    if (tg) activeChatId = tg.initDataUnsafe?.user?.id;
                  }
                  
                  const res = await fetch('https://educoin-b2b.educoinapp.uz/api/v1/bot/tma/reset-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chatId: activeChatId })
                  });
                  const data = await res.json();
                  if (data.success && data.newPassword) {
                    alert(`✅ Parolingiz tiklandi!\n\n🔑 Yangi parol: ${data.newPassword}\n\nUshbu parol Telegram orqali ham yuborildi.`);
                  } else {
                    alert("Xatolik yuz berdi!");
                  }
                } catch (e) {
                  alert("Xatolik yuz berdi!");
                }
              }} 
              sx={{ bgcolor: '#7F56D9', '&:hover': { bgcolor: '#6941C6' } }}
            >
              Yangi parol yaratish
            </Button>
          </Card>
        </motion.div>
      )}

      {/* Logout */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <Button 
          fullWidth 
          sx={{ bgcolor: '#FEF3F2', color: '#B42318', py: 1.5, fontWeight: 'bold', '&:hover': { bgcolor: '#FEE4E2' } }}
          startIcon={<LogOut size={18} />}
          onClick={async () => {
            try {
              const searchParams = new URLSearchParams(window.location.search);
              let activeChatId = searchParams.get('chatId');
              const tg = (window as any).Telegram?.WebApp;
              
              if (!activeChatId && tg) {
                activeChatId = tg.initDataUnsafe?.user?.id;
              }

              if (activeChatId) {
                await fetch('https://educoin-b2b.educoinapp.uz/api/v1/bot/tma/logout', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ chatId: String(activeChatId) })
                });
              }

              if (tg) {
                tg.close();
              } else {
                window.location.reload();
              }
            } catch (err) {
              console.error(err);
              if ((window as any).Telegram?.WebApp) {
                (window as any).Telegram.WebApp.close();
              }
            }
          }}
        >
          Tizimdan chiqish
        </Button>
      </motion.div>
    </Box>
  );
};
