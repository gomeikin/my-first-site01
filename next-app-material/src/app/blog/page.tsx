'use client';

import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid2 as Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Stack,
    Chip
} from '@mui/material';
import {
    ArrowLeft,
    Calendar,
    Clock,
    ChevronRight,
    BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const blogPosts = [
    {
        slug: 'science-experiment-01',
        title: '身近な道具でできる！結晶作り実験のコツ',
        excerpt: 'キッチンにある塩や砂糖を使って、美しい結晶を作る方法を紹介します。理科の授業でも大人気の実験です。',
        date: '2026.01.25',
        readTime: '5 min read',
        category: '理科実験',
        image: 'https://images.unsplash.com/photo-1532187875605-2fe358a71428?auto=format&fit=crop&q=80&w=800'
    },
    {
        slug: 'antique-collecting-guide',
        title: '100年前の技術を愛でる：アンティーク時計の魅力',
        excerpt: 'ゼンマイと歯車だけで動く機械式時計。その精密な構造と歴史的背景について、私のコレクションと共に語ります。',
        date: '2026.01.20',
        readTime: '8 min read',
        category: '古物収集',
        image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?auto=format&fit=crop&q=80&w=800'
    }
];

export default function BlogList() {
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
                    <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                            <ArrowLeft size={20} />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>BLOG</Typography>
                </Toolbar>
            </AppBar>

            {/* Header */}
            <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', bgcolor: 'rgba(99, 102, 241, 0.03)' }}>
                <Container maxWidth="md">
                    <Typography variant="h2" fontWeight="900" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, letterSpacing: '-2px' }}>
                        探求の記録
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                        理科、科学、そして古物。日々の発見を綴ります。
                    </Typography>
                </Container>
            </Box>

            {/* Post List */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Grid container spacing={4}>
                    {blogPosts.map((post, index) => (
                        <Grid size={{ xs: 12, md: 6 }} key={post.slug}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    borderRadius: 6,
                                    overflow: 'hidden',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
                                    }
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image={post.image}
                                        alt={post.title}
                                    />
                                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                                        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                            <Chip label={post.category} size="small" sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.main', fontWeight: 800 }} />
                                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', gap: 0.5 }}>
                                                <Calendar size={14} />
                                                <Typography variant="caption">{post.date}</Typography>
                                            </Box>
                                        </Stack>
                                        <Typography variant="h4" fontWeight="800" gutterBottom sx={{ fontSize: '1.5rem', lineHeight: 1.4 }}>
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                                            {post.excerpt}
                                        </Typography>
                                        <Link href={`/blog/${post.slug}`} passHref style={{ textDecoration: 'none' }}>
                                            <Button endIcon={<ChevronRight size={18} />} sx={{ fontWeight: 700, p: 0 }}>
                                                続きを読む
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Footer */}
            <Box sx={{ py: 10, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} Akihito Ushiro. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}
