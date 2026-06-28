import React from 'react';
import { Box, Card, CardContent, Typography, Button, Divider, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';
import type { TaskItem } from '../types';

interface TasksProps {
  tasks: TaskItem[];
}

export const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Mavjud Vazifalar</Typography>
      {tasks.length === 0 ? (
        <Typography color="textSecondary">Hozircha vazifalar yo'q.</Typography>
      ) : (
        tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card sx={{ mb: 2, borderRadius: '0.65rem', border: '1px solid #EAECF0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }}>{task.title}</Typography>
                  <Chip 
                    label={task.status === 'COMPLETED' ? 'Bajarilgan' : 'Jarayonda'} 
                    size="small" 
                    color={task.status === 'COMPLETED' ? 'success' : 'warning'} 
                    variant="outlined" 
                  />
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {task.description}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Clock size={16} color="#596371" />
                    <Typography variant="caption" color="textSecondary">{task.deadline}</Typography>
                  </Box>
                  <Button variant="contained" size="small" startIcon={<CheckCircle size={16} />} sx={{ borderRadius: '0.65rem' }}>
                    Coin Berish
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </Box>
  );
};
