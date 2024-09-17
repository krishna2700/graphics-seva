import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Customize the theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color for buttons and inputs
    },
    secondary: {
      main: '#dc004e', // Secondary color if needed
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
