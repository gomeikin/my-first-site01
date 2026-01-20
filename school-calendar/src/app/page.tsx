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
  useTheme
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Menu as MenuIcon
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
  addDays,
  eachDayOfInterval,
  isToday
} from 'date-fns';
import { ja } from 'date-fns/locale';

// サンプルデータ
const EVENTS = [
  { id: 1, date: new Date(2026, 0, 15), title: '3学期 始業式', category: '行事', color: '#6200ee' },
  { id: 2, date: new Date(2026, 0, 21), title: '理科 実験', category: '授業', color: '#03dac6' },
  { id: 3, date: new Date(2026, 1, 10), title: '期末試験 開始', category: '試験', color: '#b00020' },
  { id: 4, date: new Date(2026, 1, 14), title: '創立記念日', category: '祝日', color: '#ffab00' },
];

export default function CalendarPage() {
  const theme = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="700">
        {format(currentMonth, 'yyyy年 M月', { locale: ja })}
      </Typography>
      <Box>
        <IconButton onClick={prevMonth}>
          <ChevronLeft />
        </IconButton>
        <Button variant="outlined" onClick={() => setCurrentMonth(new Date())} sx={{ mx: 2 }}>
          今月
        </Button>
        <IconButton onClick={nextMonth}>
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );

  const renderDays = () => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return (
      <Grid container spacing={1} sx={{ mb: 1 }}>
        {days.map((day, index) => (
          <Grid size={{ xs: 1.71 }} key={day} sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle2" color={index === 0 ? 'error' : index === 6 ? 'primary' : 'textSecondary'}>
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
      <Grid container spacing={1}>
        {allDays.map((d) => {
          const eventsOnDay = EVENTS.filter(e => isSameDay(e.date, d));
          const isSelected = isSameDay(d, selectedDate);
          const isCurrentMonth = isSameMonth(d, monthStart);

          return (
            <Grid size={{ xs: 1.71 }} key={d.toString()}>
              <Paper
                elevation={isSelected ? 4 : 0}
                onClick={() => setSelectedDate(d)}
                sx={{
                  height: { xs: 80, md: 120 },
                  p: 1,
                  cursor: 'pointer',
                  border: isSelected ? `2px solid ${theme.palette.primary.main}` : '1px solid rgba(0,0,0,0.05)',
                  backgroundColor: !isCurrentMonth ? (theme.palette.mode === 'dark' ? '#1a1a1a' : '#fafafa') : 'inherit',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2c2c2c' : '#f0f0f0',
                  },
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={isToday(d) ? '700' : '400'}
                  color={isToday(d) ? 'primary' : !isCurrentMonth ? 'textDisabled' : 'textPrimary'}
                >
                  {format(d, 'd')}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {eventsOnDay.map(event => (
                    <Box
                      key={event.id}
                      sx={{
                        backgroundColor: event.color,
                        color: 'white',
                        px: 0.5,
                        py: 0.2,
                        borderRadius: 1,
                        fontSize: { xs: '0.6rem', md: '0.75rem' },
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {event.title}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <CalendarIcon color={theme.palette.primary.main} style={{ marginRight: '12px' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary', fontWeight: 700 }}>
            学校行事カレンダー
          </Typography>
          <IconButton sx={{ color: 'text.primary' }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              {renderHeader()}
              {renderDays()}
              {renderCells()}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="700" sx={{ mb: 2 }}>
              {format(selectedDate, 'M月d日の予定', { locale: ja })}
            </Typography>

            {EVENTS.filter(e => isSameDay(e.date, selectedDate)).length > 0 ? (
              EVENTS.filter(e => isSameDay(e.date, selectedDate)).map(event => (
                <Card key={event.id} sx={{ mb: 2, borderLeft: `6px solid ${event.color}` }}>
                  <CardContent>
                    <Chip label={event.category} size="small" sx={{ mb: 1, backgroundColor: event.color, color: 'white' }} />
                    <Typography variant="h6">{event.title}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: 'text.secondary' }}>
                      <Clock size={16} />
                      <Typography variant="body2" sx={{ ml: 1 }}>09:00 - 10:30</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, color: 'text.secondary' }}>
                      <MapPin size={16} />
                      <Typography variant="body2" sx={{ ml: 1 }}>第1講義室</Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Paper sx={{ p: 4, textAlign: 'center', color: 'text.secondary', border: '2px dashed rgba(0,0,0,0.1)' }}>
                予定はありません
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
