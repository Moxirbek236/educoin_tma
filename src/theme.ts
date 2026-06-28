import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#7F56D9',
    },
    secondary: {
      main: '#596371',
    },
    background: {
      default: '#F2F4F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#101828',
      secondary: '#475467',
    },
  },
  shape: {
    borderRadius: 10.4, 
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.65rem',
          boxShadow: 'none',
          padding: '10px 16px',
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 4px 10px rgba(127, 86, 217, 0.25)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0.65rem',
          boxShadow: '0px 2px 8px rgba(16, 24, 40, 0.06)',
          border: '1px solid #EAECF0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: '0.65rem',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          borderTop: '1px solid #EAECF0',
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.03)',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#596371',
          '&.Mui-selected': {
            color: '#7F56D9',
          },
        },
      },
    },
  },
});
