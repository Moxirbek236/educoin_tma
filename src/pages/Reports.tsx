import React from 'react';
import { Box, Card, Typography, Alert, AlertTitle } from '@mui/material';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface ReportsProps {
  latestReport?: string;
}

export const Reports: React.FC<ReportsProps> = ({ latestReport }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold', mb: 1 }}>Kunlik Hisobotlar</Typography>
        
        <Card sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FileText size={20} color="#7F56D9" />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Bugungi Hisobot</Typography>
          </Box>
          
          <Alert severity="info" icon={false} sx={{ bgcolor: '#F9FAFB', border: '1px solid #EAECF0', '& .MuiAlert-message': { width: '100%' } }}>
            <AlertTitle sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
              O'quv markazidagi oxirgi yangiliklar
            </AlertTitle>
            <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
              {latestReport || 'Hozircha hisobot mavjud emas...'}
            </Typography>
          </Alert>
        </Card>
      </motion.div>
    </Box>
  );
};
