import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, ShoppingBag, FileText, Bell, User, CheckCircle, Star } from 'lucide-react';
import type { UserRole } from '../types';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  role?: UserRole;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, role }) => {
  const isStudent = role === 'STUDENT' || role === 'SCHOOL_STUDENT';
  const isTeacher = role === 'TEACHER';
  const isCreator = role === 'CREATOR' || role === 'ADMIN';

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', overflow: 'hidden' }} elevation={3}>
      <BottomNavigation
        showLabels
        value={activeTab}
        onChange={(_, newValue) => {
          setActiveTab(newValue);
        }}
        sx={{
          bgcolor: 'background.paper',
          height: 65,
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.65rem',
            mt: 0.5,
          },
          '& .Mui-selected': {
            fontSize: '0.7rem !important',
            fontWeight: 'bold',
          }
        }}
      >
        <BottomNavigationAction label="Bosh sahifa" value="home" icon={<Home size={22} />} />
        
        {(isStudent || isTeacher) && <BottomNavigationAction label="Do'kon" value="shop" icon={<ShoppingBag size={22} />} />}
        {isTeacher && <BottomNavigationAction label="Vazifalar" value="tasks" icon={<CheckCircle size={22} />} />}
        {(isCreator || isStudent) && <BottomNavigationAction label="Reyting" value="rating" icon={<Star size={22} />} />}
        
        <BottomNavigationAction label="Hisobot" value="reports" icon={<FileText size={22} />} />
        <BottomNavigationAction label="Xabarlar" value="notifications" icon={<Bell size={22} />} />
        {/* We keep Profile for everyone */}
        <BottomNavigationAction label="Profil" value="profile" icon={<User size={22} />} />
      </BottomNavigation>
    </Paper>
  );
};
