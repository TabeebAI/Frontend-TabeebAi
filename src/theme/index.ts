import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#f1ece6',
      light: '#f8f5f0',
      dark: '#3a332c',
      contrastText: '#2a2a2a',
    },
    secondary: {
      main: '#2a9d8f',
      light: '#6abfb5',
      dark: '#1d6d62',
    },
    background: {
      default: '#f9f6f1',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: ['Inter', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    button: {
      textTransform: 'none',
    },
  },
});
