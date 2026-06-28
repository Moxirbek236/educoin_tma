import React from 'react';
import { Box, Card, Typography, Avatar, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';
import type { RatingUser } from '../types';

interface RatingProps {
  ratings: RatingUser[];
}

export const Rating: React.FC<RatingProps> = ({ ratings }) => {
  const getIconForRank = (rank: number) => {
    switch(rank) {
      case 1: return <Trophy color="#FFD700" size={24} />;
      case 2: return <Medal color="#C0C0C0" size={24} />;
      case 3: return <Medal color="#CD7F32" size={24} />;
      default: return <Typography sx={{ fontWeight: 'bold', color: 'text.secondary', width: 24, textAlign: 'center' }}>{rank}</Typography>;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Star color="#7F56D9" />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Top Reyting</Typography>
      </Box>
      
      {ratings.length === 0 ? (
        <Typography color="textSecondary">Hozircha reyting mavjud emas.</Typography>
      ) : (
        <Card sx={{ borderRadius: '0.65rem', border: '1px solid #EAECF0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          {ratings.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {getIconForRank(user.rank)}
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.light', color: 'primary.main', fontWeight: 'bold' }}>
                    {user.fullname.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{user.fullname}</Typography>
                    <Typography variant="caption" color="textSecondary">{user.branchName}</Typography>
                  </Box>
                </Box>
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>{user.coins} 💰</Typography>
              </Box>
              {index < ratings.length - 1 && <Divider />}
            </motion.div>
          ))}
        </Card>
      )}
    </Box>
  );
};
