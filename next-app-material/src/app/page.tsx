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
  useTheme,
  Avatar,
  Stack
} from '@mui/material';
import {
  Menu,
  Sun,
  Moon,
  Github,
  ExternalLink,
  Sparkles,
  BookOpen,
  History,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const features = [
    {
      title: '理科教育の探求',
      description: '自然界の不思議を解き明かす楽しさを、実験や観察を通じて生徒たちに伝えています。',
      icon: <BookOpen size={40} style={{ color: '#6366f1' }} />
    },
    {
      title: '古物への情熱',
      description: '歴史を感じさせる「古物」の収集が趣味です。過去の技術から未来の科学を考えます。',
      icon: <History size={40} style={{ color: '#ec4899' }} />
    },
    {
      title: 'デジタルの挑戦',
      description: '最新のWeb技術（Next.js）を活用し、教育現場をより便利にするツールを自作しています。',
      icon: <Lightbulb size={40} style={{ color: '#06b6d4' }} />
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navbar */}
      <AppBar position="sticky" elevation={0} sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        backdropFilter: 'blur(8px)'
      }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 900, letterSpacing: '-0.5px' }}>
            AKIHITO USHIRO
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              component="a"
              href="https://gomeikin.github.io/my-first-site01/"
              color="inherit"
              sx={{ fontWeight: 600 }}
            >
              メインサイト
            </Button>
            <Link href="/blog" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit" sx={{ fontWeight: 600 }}>Blog</Button>
            </Link>
            <Link href="/calendar" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit" sx={{ fontWeight: 600 }}>Calendar</Button>
            </Link>
            <IconButton color="inherit">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{
        pt: { xs: 8, md: 15 },
        pb: { xs: 10, md: 20 },
        textAlign: 'center',
        background: isDarkMode
          ? 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)'
          : 'radial-gradient(circle at 50% 50%, #f8fafc 0%, #eff6ff 100%)'
      }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Avatar
              src="/profile.png"
              alt="後 明均"
              sx={{ width: 120, height: 120, mx: 'auto', mb: 4, border: '4px solid white', boxShadow: theme.shadows[4] }}
            />
            <Box sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'rgba(99, 102, 241, 0.1)',
              color: 'primary.main',
              px: 3,
              py: 1,
              borderRadius: 50,
              mb: 4,
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
              <Sparkles size={16} />
              <Typography variant="caption" fontWeight="800" sx={{ letterSpacing: '1px' }}>SCIENCE & EDUCATION</Typography>
            </Box>
            <Typography variant="h1" component="h1" fontWeight="900" gutterBottom sx={{
              fontSize: { xs: '3.5rem', md: '5.5rem' },
              letterSpacing: '-3px',
              lineHeight: 1,
              mb: 3
            }}>
              後 明均 <br />
              <span style={{
                background: 'linear-gradient(90deg, #6366f1, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Portfolio</span>
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 6, maxWidth: '650px', mx: 'auto', lineHeight: 1.6, fontWeight: 500 }}>
              理科の楽しさを伝え、古き良き技術に学び、<br />
              最新のデジタル技術で未来を築く。
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Link href="/blog" passHref style={{ textDecoration: 'none' }}>
                <Button variant="contained" size="large" endIcon={<ArrowRight size={20} />} sx={{ py: 1.8, px: 5, borderRadius: 4, fontWeight: 700, fontSize: '1.1rem', boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.4)' }}>
                  ブログを見る
                </Button>
              </Link>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Grid container spacing={5}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                style={{ height: '100%' }}
              >
                <Card sx={{
                  height: '100%',
                  p: 3,
                  borderRadius: 6,
                  border: '1px solid rgba(0,0,0,0.03)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
                    borderColor: 'primary.light'
                  }
                }}>
                  <CardContent sx={{ pt: 1 }}>
                    <Box sx={{
                      mb: 4,
                      p: 2,
                      display: 'inline-flex',
                      bgcolor: 'rgba(0,0,0,0.02)',
                      borderRadius: 4
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" fontWeight="900" gutterBottom sx={{ mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 3, pb: 3 }}>
                    <Button size="small" endIcon={<ExternalLink size={16} />} sx={{ fontWeight: 700 }}>詳細を読む</Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 10, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center', bgcolor: 'background.paper' }}>
        <Typography variant="h6" fontWeight="800" gutterBottom>後 明均</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          © {new Date().getFullYear()} Akihito Ushiro. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
