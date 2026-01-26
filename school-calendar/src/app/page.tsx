'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  IconButton,
  Button,
  Chip,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useTheme,
  Grow,
  Tooltip
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Home,
  Info,
  Sparkles
} from 'lucide-react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  eachDayOfInterval,
  isToday
} from 'date-fns';
import { ja } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

// サンプルデータ
const EVENTS = [
  { id: 1, date: new Date(2026, 0, 15), title: '3学期 始業式', category: '行事', color: '#7c4dff' },
  { id: 2, date: new Date(2026, 0, 21), title: '理科 実験', category: '授業', color: '#00e5ff' },
  { id: 3, date: new Date(2026, 1, 10), title: '期末試験 開始', category: '試験', color: '#ff5252' },
  { id: 4, date: new Date(2026, 1, 14), title: '創立記念日', category: '祝日', color: '#ffd740' },
  { id: 5, date: new Date(2026, 0, 28), title: '古物研究会 特別講義', category: 'クラブ', color: '#ff9100' },
];

export default function CalendarPage() {
  const theme = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const isDarkMode = theme.palette.mode === 'dark';

  const renderHeader = () => (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: 4,
      background: isDarkMode
        ? 'rgba(255, 255, 255, 0.05)'
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      p: 3,
      borderRadius: 4,
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Sparkles size={28} color={theme.palette.primary.main} />
        <Typography variant="h4" component="h1" fontWeight="800" sx={{
          letterSpacing: '-1px',
          background: isDarkMode
            ? 'linear-gradient(45deg, #fff, #bbb)'
            : 'linear-gradient(45deg, #2c3e50, #000)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {format(currentMonth, 'yyyy年 M月', { locale: ja })}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="前月">
          <IconButton onClick={prevMonth} sx={{ bgcolor: 'background.paper' }}>
            <ChevronLeft />
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          onClick={() => setCurrentMonth(new Date())}
          sx={{
            px: 3,
            borderRadius: 50,
            boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
          }}
        >
          今月
        </Button>
        <Tooltip title="次月">
          <IconButton onClick={nextMonth} sx={{ bgcolor: 'background.paper' }}>
            <ChevronRight />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  const renderDays = () => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return (
      <Grid container spacing={1} sx={{ mb: 2 }}>
        {days.map((day, index) => (
          <Grid size={{ xs: 1.71 }} key={day} sx={{ textAlign: 'center' }}>
            <Typography variant="caption" fontWeight="bold" sx={{
              color: index === 0 ? 'error.main' : index === 6 ? 'primary.main' : 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <Grid container spacing={1.5}>
        <AnimatePresence mode="wait">
          {allDays.map((d, i) => {
            const eventsOnDay = EVENTS.filter(e => isSameDay(e.date, d));
            const isSelected = isSameDay(d, selectedDate);
            const isCurrentMonth = isSameMonth(d, monthStart);
            const isTodayDate = isToday(d);

            return (
              <Grid size={{ xs: 1.71 }} key={d.toString()}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.01 }}
                  whileHover={{ y: -5 }}
                >
                  <Paper
                    elevation={isSelected ? 8 : 1}
                    onClick={() => setSelectedDate(d)}
                    sx={{
                      height: { xs: 80, md: 130 },
                      p: 1.5,
                      cursor: 'pointer',
                      borderRadius: 3,
                      border: isSelected ? `2px solid ${theme.palette.primary.main}` : '1px solid rgba(0,0,0,0.05)',
                      backgroundColor: isTodayDate
                        ? (isDarkMode ? 'rgba(98, 0, 238, 0.15)' : 'rgba(98, 0, 238, 0.05)')
                        : !isCurrentMonth ? (isDarkMode ? '#0d0d0d' : '#fcfcfc') : 'background.paper',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                        borderColor: theme.palette.primary.light
                      },
                      '&::after': isTodayDate ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '30px',
                        height: '30px',
                        background: 'linear-gradient(45deg, transparent 50%, #6200ee 50%)',
                        opacity: 0.8
                      } : {}
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={isTodayDate ? '900' : '500'}
                      sx={{
                        color: isTodayDate ? 'primary.main' : !isCurrentMonth ? 'text.disabled' : 'text.primary',
                        fontSize: isTodayDate ? '1.2rem' : '1rem'
                      }}
                    >
                      {format(d, 'd')}
                    </Typography>

                    <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      {eventsOnDay.map(event => (
                        <Box
                          key={event.id}
                          sx={{
                            backgroundColor: event.color,
                            color: '#fff',
                            px: 1,
                            py: 0.5,
                            borderRadius: '6px',
                            fontSize: '0.7rem',
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'white' }} />
                          {event.title}
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            );
          })}
        </AnimatePresence>
      </Grid>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: (theme) => isDarkMode ? '#0a0a0a' : '#f0f2f5' }}>
      <AppBar position="sticky" elevation={0} sx={{
        bgcolor: isDarkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        zIndex: theme.zIndex.drawer + 1
      }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <CalendarIcon color="#6200ee" size={28} />
            </motion.div>
            <Typography variant="h6" sx={{ ml: 2, color: 'text.primary', fontWeight: 800, letterSpacing: '-0.5px' }}>
              Academic Tracker
            </Typography>
          </Box>
          <Button
            component="a"
            href="../index.html"
            variant="text"
            startIcon={<Home size={20} />}
            sx={{
              color: 'text.primary',
              borderRadius: 3,
              fontWeight: 700,
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.05)'
              }
            }}
          >
            ポートフォリオに戻る
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 9 }}>
            <Grow in timeout={500}>
              <Box>
                {renderHeader()}
                <Paper sx={{ p: 4, borderRadius: 5, boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
                  {renderDays()}
                  {renderCells()}
                </Paper>
              </Box>
            </Grow>
          </Grid>

          <Grid size={{ xs: 12, lg: 3 }}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Typography variant="h5" fontWeight="900" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Info size={24} color="#6200ee" />
                Event Details
              </Typography>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDate.toString()}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card sx={{
                    borderRadius: 5,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                    overflow: 'visible',
                    position: 'relative',
                    bgcolor: isDarkMode ? '#1e1e1e' : '#fff'
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h4" fontWeight="800" color="primary" gutterBottom>
                        {format(selectedDate, 'M月d日')}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
                        {format(selectedDate, 'EEEE', { locale: ja })}
                      </Typography>

                      {EVENTS.filter(e => isSameDay(e.date, selectedDate)).length > 0 ? (
                        EVENTS.filter(e => isSameDay(e.date, selectedDate)).map(event => (
                          <Paper
                            key={event.id}
                            elevation={0}
                            sx={{
                              p: 2,
                              mb: 2,
                              borderRadius: 4,
                              border: '1px solid rgba(0,0,0,0.05)',
                              bgcolor: isDarkMode ? 'rgba(255,255,255,0.02)' : '#f9f9f9',
                              transition: 'transform 0.2s',
                              '&:hover': { transform: 'scale(1.02)' }
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Chip
                                label={event.category}
                                size="small"
                                sx={{
                                  bgcolor: event.color,
                                  color: '#fff',
                                  fontWeight: 700,
                                  fontSize: '0.65rem'
                                }}
                              />
                            </Box>
                            <Typography variant="h6" fontWeight="700" sx={{ mb: 2 }}>{event.title}</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.secondary' }}>
                                <Clock size={18} />
                                <Typography variant="body2" fontWeight="500">09:00 - 10:30</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.secondary' }}>
                                <MapPin size={18} />
                                <Typography variant="body2" fontWeight="500">第1講義室</Typography>
                              </Box>
                            </Box>
                          </Paper>
                        ))
                      ) : (
                        <Box sx={{
                          py: 10,
                          textAlign: 'center',
                          border: '2px dashed rgba(0,0,0,0.1)',
                          borderRadius: 4,
                          color: 'text.disabled'
                        }}>
                          <Typography>予定はありません</Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
