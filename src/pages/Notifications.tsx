import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Bell, ShieldCheck } from 'lucide-react';
import type { NotificationItem } from '../types';

interface NotificationsProps {
  notifications: NotificationItem[];
}

export const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>Bildirishnomalar</Typography>

      <Paper elevation={0} sx={{ borderRadius: '0.65rem', border: '1px solid #EAECF0', overflow: 'hidden' }}>
        <List sx={{ p: 0 }}>
          {notifications.length === 0 ? (
            <ListItem sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Bell size={32} color="#D0D5DD" />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>Hozircha bildirishnomalar yo'q</Typography>
            </ListItem>
          ) : (
            notifications.map((notif, index) => (
              <React.Fragment key={notif.id}>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                  <ListItem sx={{ py: 2, px: 2, bgcolor: notif.isRead ? 'transparent' : '#F9FAFB' }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: notif.type === 'system' ? '#FEF3F2' : '#F4EBFF', color: notif.type === 'system' ? '#B42318' : '#7F56D9' }}>
                        {notif.type === 'system' ? <ShieldCheck size={20} /> : <Bell size={20} />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={
                        <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: notif.isRead ? "normal" : "bold" }}>
                          {notif.title}
                        </Typography>
                      }
                      secondary={
                        <Box component="span" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{notif.message}</Typography>
                          <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500 }}>{notif.date}</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </motion.div>
                {index < notifications.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};
