'use client';

import React, { useState } from 'react';
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
    Stack,
    Card,
    CardContent,
    Chip,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip
} from '@mui/material';
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    ArrowLeft,
    Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Sample events for a school
const schoolEvents = [
    { id: 1, date: '2026-02-02', title: '全校朝礼', category: '行事', color: '#6366f1' },
    { id: 2, date: '2026-02-11', title: '建国記念の日', category: '祝日', color: '#ef4444' },
    { id: 3, date: '2026-02-15', title: '理科実験教室', category: '授業', color: '#10b981' },
    { id: 4, date: '2026-02-23', title: '天皇誕生日', category: '祝日', color: '#ef4444' },
    { id: 5, date: '2026-02-25', title: '学年末試験 (1日目)', category: '試験', color: '#f59e0b' },
    { id: 6, date: '2026-02-26', title: '学年末試験 (2日目)', category: '試験', color: '#f59e0b' },
];

export default function CalendarPage() {
    const theme = useTheme();
    const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const monthName = currentDate.toLocaleString('ja-JP', { month: 'long', year: 'numeric' });

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const calendarDays = [];
    // Fill empty slots for previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(null);
    }
    // Fill actual days
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
    }

    const getEventsForDay = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return schoolEvents.filter(e => e.date === dateStr);
    };

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
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>学校行事カレンダー</Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Calendar Header */}
                    <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 6, border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'background.paper' }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: '-1px' }}>{monthName}</Typography>
                            <Box>
                                <IconButton onClick={prevMonth} sx={{ bgcolor: 'rgba(0,0,0,0.03)', mr: 1 }}><ChevronLeft /></IconButton>
                                <IconButton onClick={nextMonth} sx={{ bgcolor: 'rgba(0,0,0,0.03)' }}><ChevronRight /></IconButton>
                            </Box>
                        </Stack>
                        <Button variant="contained" startIcon={<Plus size={20} />} sx={{ borderRadius: 3, fontWeight: 700, px: 3 }}>
                            予定を追加
                        </Button>
                    </Paper>

                    {/* Calendar Grid */}
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 6, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', overflow: 'hidden' }}>
                        <Grid container spacing={1}>
                            {['日', '月', '火', '水', '木', '金', '土'].map((d, i) => (
                                <Grid size={{ xs: 12 / 7 }} key={d} sx={{ textAlign: 'center', py: 2 }}>
                                    <Typography variant="subtitle2" fontWeight="900" color={i === 0 ? 'error' : i === 6 ? 'primary' : 'text.secondary'}>
                                        {d}
                                    </Typography>
                                </Grid>
                            ))}

                            {calendarDays.map((day, idx) => {
                                const events = day ? getEventsForDay(day) : [];
                                const isSunday = idx % 7 === 0;
                                const isSaturday = idx % 7 === 6;

                                return (
                                    <Grid
                                        size={{ xs: 12 / 7 }}
                                        key={idx}
                                        sx={{
                                            minHeight: { xs: 80, md: 120 },
                                            border: '1px solid rgba(0,0,0,0.03)',
                                            p: 1,
                                            position: 'relative',
                                            bgcolor: day ? 'background.paper' : 'rgba(0,0,0,0.01)',
                                            transition: 'all 0.2s',
                                            '&:hover': day ? { bgcolor: 'rgba(99, 102, 241, 0.05)', cursor: 'pointer' } : {}
                                        }}
                                        onClick={() => day && setSelectedDate(`${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${day}日`)}
                                    >
                                        {day && (
                                            <>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight="700"
                                                    sx={{
                                                        color: isSunday ? 'error.main' : isSaturday ? 'primary.main' : 'text.primary',
                                                        opacity: 0.8
                                                    }}
                                                >
                                                    {day}
                                                </Typography>
                                                <Stack spacing={0.5} sx={{ mt: 1 }}>
                                                    {events.map(event => (
                                                        <Tooltip key={event.id} title={event.title}>
                                                            <Box sx={{
                                                                bgcolor: event.color,
                                                                color: 'white',
                                                                px: 1,
                                                                py: 0.2,
                                                                borderRadius: 1,
                                                                fontSize: '0.7rem',
                                                                fontWeight: 600,
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                            }}>
                                                                {event.title}
                                                            </Box>
                                                        </Tooltip>
                                                    ))}
                                                </Stack>
                                            </>
                                        )}
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Paper>
                </motion.div>
            </Container>

            {/* Day Details Dialog */}
            <Dialog
                open={Boolean(selectedDate)}
                onClose={() => setSelectedDate(null)}
                PaperProps={{ sx: { borderRadius: 6, p: 2, minWidth: 320 } }}
            >
                <DialogTitle sx={{ fontWeight: 900, pb: 1 }}>{selectedDate}の予定</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        {selectedDate && schoolEvents.filter(e => {
                            const d = selectedDate.match(/\d+/g);
                            const dateStr = `${d?.[0]}-${String(d?.[1]).padStart(2, '0')}-${String(d?.[2]).padStart(2, '0')}`;
                            return e.date === dateStr;
                        }).length > 0 ? (
                            schoolEvents.filter(e => {
                                const d = selectedDate.match(/\d+/g);
                                const dateStr = `${d?.[0]}-${String(d?.[1]).padStart(2, '0')}-${String(d?.[2]).padStart(2, '0')}`;
                                return e.date === dateStr;
                            }).map(event => (
                                <Card key={event.id} variant="outlined" sx={{ borderRadius: 4, borderLeft: `6px solid ${event.color}` }}>
                                    <CardContent sx={{ py: 2 }}>
                                        <Typography variant="h6" fontWeight="800">{event.title}</Typography>
                                        <Stack direction="row" spacing={1} sx={{ mt: 1, color: 'text.secondary' }}>
                                            <Chip label={event.category} size="small" sx={{ fontWeight: 700 }} />
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Clock size={16} />
                                                <Typography variant="caption">終日</Typography>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Typography color="text.secondary">予定はありません。</Typography>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedDate(null)} sx={{ fontWeight: 700 }}>とじる</Button>
                    <Button variant="contained" sx={{ borderRadius: 2, fontWeight: 700 }}>予定を追加</Button>
                </DialogActions>
            </Dialog>

            {/* Footer */}
            <Box sx={{ py: 10, textAlign: 'center', color: 'text.secondary' }}>
                <Typography variant="body2">
                    © {new Date().getFullYear()} Akihito Ushiro. School Calendar System
                </Typography>
            </Box>
        </Box>
    );
}
