'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#6200ee',
            light: '#9c4dff',
            dark: '#3700b3',
          },
          secondary: {
            main: '#03dac6',
          },
          background: {
            default: prefersDarkMode ? '#0a0a0a' : '#f0f2f5',
            paper: prefersDarkMode ? '#1e1e1e' : '#ffffff',
          },
        },
        typography: {
          fontFamily: '"Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
          h4: {
            fontWeight: 800,
          },
        },
        shape: {
          borderRadius: 16,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: prefersDarkMode ? '#333' : '#ccc',
                  borderRadius: '20px',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                boxShadow: prefersDarkMode
                  ? '0px 10px 30px rgba(0, 0, 0, 0.5)'
                  : '0px 10px 30px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: 12,
                padding: '8px 20px',
              },
            },
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
