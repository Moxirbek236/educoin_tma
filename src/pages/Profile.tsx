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
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
        <Card sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lock size={20} color="#7F56D9" />
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Xavfsizlik</Typography>
            </Box>
            <Typography variant="caption" color="primary.main" sx={{ fontWeight: 'bold' }}>Boshqarish</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
            Parolingizni unutgan bo'lsangiz, Telegram orqali kontaktingizni tasdiqlab uni yangilashingiz mumkin.
          </Typography>

          <AnimatePresence mode="wait">
            {showPasswordReset ? (
              <motion.div key="reset-form" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <Box sx={{ bgcolor: '#F4EBFF', border: '1px solid #E9D7FE', p: 2, borderRadius: 2 }}>
                  {!verificationSuccess ? (
                    <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <ShieldAlert size={40} color="#7F56D9" style={{ margin: '0 auto' }} />
                      <Typography variant="caption" color="text.primary" sx={{ fontWeight: 'medium' }}>
                        Telefon raqamingiz rostan ham ushbu Telegram akkauntingizga tegishli ekanligini tasdiqlang.
                      </Typography>
                      <Button 
                        variant="contained" 
                        fullWidth 
                        onClick={handleSharePhone} 
                        disabled={isVerifying}
                        startIcon={isVerifying ? <CircularProgress size={16} color="inherit" /> : <Send size={16} />}
                        sx={{ mt: 1 }}
                      >
                        {isVerifying ? 'Tasdiqlanmoqda...' : 'Telefon raqamni yuborish'}
                      </Button>
                    </Box>
                  ) : (
                    <Box component="form" onSubmit={submitHandler} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, color: '#027A48' }}>
                        <CheckCircle size={16} />
                        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Tasdiqlandi: {phoneNumber}</Typography>
                      </Box>
                      <TextField 
                        type="password" 
                        label="Yangi parol" 
                        variant="outlined" 
                        size="small" 
                        fullWidth 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        sx={{ bgcolor: '#fff' }}
                      />
                      <Button type="submit" variant="contained" fullWidth>Saqlash</Button>
                    </Box>
                  )}
                </Box>
              </motion.div>
            ) : (
              <motion.div key="reset-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Button variant="outlined" fullWidth onClick={() => setShowPasswordReset(true)} color="inherit" sx={{ borderColor: '#EAECF0' }}>
                  Parolni tiklash
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Logout */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <Button 
          fullWidth 
          sx={{ bgcolor: '#FEF3F2', color: '#B42318', py: 1.5, fontWeight: 'bold', '&:hover': { bgcolor: '#FEE4E2' } }}
          startIcon={<LogOut size={18} />}
          onClick={() => alert('Chiqish tizimi faol')}
        >
          Tizimdan chiqish
        </Button>
      </motion.div>
    </Box>
  );
};
