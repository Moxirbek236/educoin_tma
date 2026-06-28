import React from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Badge } from '@mui/material';
import { Bell } from 'lucide-react';
import type { NotificationItem } from '../types';

interface HeaderProps {
  notifications: NotificationItem[];
  setActiveTab: (tab: 'home' | 'shop' | 'reports' | 'notifications' | 'profile') => void;
}

export const Header: React.FC<HeaderProps> = ({ notifications, setActiveTab }) => {
  const hasUnread = notifications.some(n => n.unread || !n.isRead);

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'primary.main', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
      <Toolbar sx={{ justifyContent: 'space-between', p: 1.5, minHeight: 'unset !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <img 
            src="https://educoin-b2b.educoinapp.uz/api/v1/files/educoin/default_coin.png" 
            alt="Educoin Logo" 
            style={{ width: 36, height: 36, objectFit: 'contain' }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>EduCoin</Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Chilonzor Filiali • Student</Typography>
          </Box>
        </Box>
        
        <IconButton 
          onClick={() => setActiveTab('notifications')}
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' } }}
        >
          <Badge color="error" variant="dot" invisible={!hasUnread}>
            <Bell size={20} color="#FFFFFF" />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
