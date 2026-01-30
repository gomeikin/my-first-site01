'use client';

import React from 'react';
import {
    Box,
    Container,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Stack,
    Avatar,
    Divider,
    Button
} from '@mui/material';
import {
    ArrowLeft,
    Share2,
    Calendar,
    Tag
} from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const postData = {
    'science-experiment-01': {
        title: '身近な道具でできる！結晶作り実験のコツ',
        date: '2026.01.25',
        category: '理科実験',
        image: 'https://images.unsplash.com/photo-1532187875605-2fe358a71428?auto=format&fit=crop&q=80&w=1200',
        content: `
      理科の授業で最も盛り上がる実験の一つが「結晶作り」です。
      今回は、身近な塩やミョウバンを使って、宝石のように美しい巨大な結晶を作るためのプロのコツを解説します。

      ### 1. 飽和水溶液を作る
      まずはお湯（約60度）に、これ以上溶けないという限界まで材料を溶かします。

      ### 2. 「種」を見つける
      数日放置すると、底に小さな粒が出てきます。その中で最も形の整った一つを選び出し、テグスで吊るします。

      ### 3. 温度変化を避ける
      ここが一番重要です。発泡スチロール箱などに入れ、ゆっくりと温度を下げることで、透明度の高い大きな結晶が育ちます。
    `
    },
    'antique-collecting-guide': {
        title: '100年前の技術を愛でる：アンティーク時計の魅力',
        date: '2026.01.20',
        category: '古物収集',
        image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?auto=format&fit=crop&q=80&w=1200',
        content: `
      デジタル時計が溢れる現代だからこそ、100年前の「機械式時計」の音が心に響きます。
      電気を一切使わず、ゼンマイの力だけで刻まれる時間は、職人たちの魂の記録でもあります。

      私が所有している1920年代の懐中時計は、今でも日差1分以内で正確に動き続けています。
      定期的なオーバーホール（分解掃除）さえすれば、数世代にわたって受け継ぐことができる。
      これこそが、使い捨てではない「古物」の真髄です。
    `
    }
};

export default function BlogPost() {
    const { slug } = useParams();
    const post = postData[slug as string] || postData['science-experiment-01'];

    return (
        <Box sx={{ bgcolor: 'background.paper', minHeight: '100vh' }}>
            <AppBar position="sticky" elevation={0} sx={{
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                color: 'text.primary'
            }}>
                <Toolbar>
                    <Link href="/blog" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                            <ArrowLeft size={20} />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 900 }}>記事を読む</Typography>
                    <IconButton color="inherit"><Share2 size={20} /></IconButton>
                </Toolbar>
            </AppBar>

            <Box sx={{ width: '100%', height: { xs: '30vh', md: '500px' }, position: 'relative', overflow: 'hidden' }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>

            <Container maxWidth="md" sx={{ py: 8 }}>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="overline" color="primary" fontWeight="800" sx={{ letterSpacing: '2px' }}>
                            {post.category}
                        </Typography>
                        <Typography variant="h1" fontWeight="900" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mt: 1, lineHeight: 1.2 }}>
                            {post.title}
                        </Typography>
                    </Box>

                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar src="/profile.png" />
                        <Box>
                            <Typography variant="subtitle2" fontWeight="700">後 明均</Typography>
                            <Typography variant="caption" color="text.secondary">{post.date}</Typography>
                        </Box>
                    </Stack>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="body1" sx={{
                        lineHeight: 2,
                        fontSize: '1.1rem',
                        whiteSpace: 'pre-wrap',
                        color: 'text.primary'
                    }}>
                        {post.content}
                    </Typography>

                    <Box sx={{ mt: 10, p: 6, bgcolor: 'rgba(99, 102, 241, 0.05)', borderRadius: 8, textAlign: 'center' }}>
                        <Typography variant="h5" fontWeight="900" gutterBottom>
                            この記事はいかがでしたか？
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                            感想や質問があれば、お気軽にお知らせください。
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 700 }}>
                            メッセージを送る
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
