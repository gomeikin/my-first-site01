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
                        main: '#6366f1', // Indigo
                    },
                    secondary: {
                        main: '#ec4899', // Pink
                    },
                    background: {
                        default: prefersDarkMode ? '#0f172a' : '#f8fafc',
                        paper: prefersDarkMode ? '#1e293b' : '#ffffff',
                    },
                },
                typography: {
                    fontFamily: '"Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
                },
                shape: {
                    borderRadius: 16,
                },
                components: {
                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                backgroundImage: 'none',
                                boxShadow: prefersDarkMode
                                    ? '0px 4px 20px rgba(0, 0, 0, 0.5)'
                                    : '0px 4px 20px rgba(0, 0, 0, 0.05)',
                            },
                        },
                    },
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 12,
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
