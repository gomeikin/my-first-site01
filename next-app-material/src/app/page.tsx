'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  CardActions,
  useTheme
} from '@mui/material';
import {
  Menu,
  Sun,
  Moon,
  Github,
  ExternalLink,
  Sparkles,
  Layout,
  Smartphone,
  Palette
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const features = [
    {
      title: 'Modern Architecture',
      description: 'Built with Next.js App Router for maximum performance and SEO optimization.',
      icon: <Layout className="w-10 h-10 text-indigo-500" />
    },
    {
      title: 'Responsive Design',
      description: 'Fluid layouts that look stunning on any device, from mobile to ultra-wide monitors.',
      icon: <Smartphone className="w-10 h-10 text-pink-500" />
    },
    {
      title: 'Premium Aesthetics',
      description: 'Elegant animations and Material Design components for a professional feel.',
      icon: <Palette className="w-10 h-10 text-cyan-500" />
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navbar */}
      <AppBar position="sticky" elevation={0} sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary'
      }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 800 }}>
            Material App
          </Typography>
          <IconButton color="inherit">
            {isDarkMode ? <Sun /> : <Moon />}
          </IconButton>
          <IconButton color="inherit" component="a" href="https://github.com/gomeikin" target="_blank">
            <Github />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{
        py: 12,
        textAlign: 'center',
        background: isDarkMode
          ? 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)'
          : 'radial-gradient(circle at 50% 50%, #f1f5f9 0%, #f8fafc 100%)'
      }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'primary.main',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 50,
              mb: 4
            }}>
              <Sparkles size={16} />
              <Typography variant="caption" fontWeight="bold">NEW VERSION 2.0</Typography>
            </Box>
            <Typography variant="h2" component="h1" fontWeight="900" gutterBottom sx={{
              fontSize: { xs: '3rem', md: '4.5rem' },
              letterSpacing: '-2px'
            }}>
              Beautifully Crafted <br />
              <span style={{ color: theme.palette.primary.main }}>Modern UI</span>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}>
              A high-performance Next.js starter kit leveraging Material Design v3 principles
              with seamless dark mode integration.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button variant="contained" size="large" sx={{ py: 1.5, px: 4, borderRadius: 3 }}>
                Get Started
              </Button>
              <Button variant="outlined" size="large" sx={{ py: 1.5, px: 4, borderRadius: 3 }}>
                View Demo
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                style={{ height: '100%' }}
              >
                <Card sx={{
                  height: '100%',
                  p: 2,
                  borderRadius: 5,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-10px)' }
                }}>
                  <CardContent>
                    <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                    <Typography variant="h5" fontWeight="800" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button size="small" endIcon={<ExternalLink size={16} />}>Learn More</Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 8, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Material App. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
