import React from 'react';
import moment from 'moment';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import ChartComponent from '@/components/ChartComponent';


const Home = () => {
  return (
    <Box sx={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
      <Card variant='outlined'>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h5' component='div'>
              Статус устройств
            </Typography>
            <Typography variant='h5' component='div' sx={{ display: 'flow' }}>
              1
              <Typography variant='body2' sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                Устройств(о)
              </Typography>
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <Typography variant='h3' component='div' sx={{ display: 'flow', color: 'red' }}>
              0
              <Typography variant='body2' sx={{ fontSize: 14 }} gutterBottom>
                Заблокировано
              </Typography>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                sx={{ display: 'flex', gap: 2, fontSize: 14, color: 'red' }}
                gutterBottom
                variant='h4'
              >
                0
                <Typography
                  variant='body2'
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  Заблокировано
                </Typography>
              </Typography>
              <Typography
                sx={{ display: 'flex', gap: 2, fontSize: 14, color: 'red' }}
                gutterBottom
                variant='h4'
              >
                0
                <Typography
                  variant='body2'
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  Напоминаний
                </Typography>
              </Typography>
              <Typography
                sx={{ display: 'flex', gap: 2, fontSize: 14, color: 'red' }}
                gutterBottom
                variant='h4'
              >
                0
                <Typography
                  variant='body2'
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  Заблокировано
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: 4,
                mr: 4,
              }}
            >
              <Typography variant='h3' component='div' sx={{ display: 'flow', color: 'green' }}>
                0
                <Typography variant='body2' sx={{ fontSize: 14 }} gutterBottom>
                  Активно
                </Typography>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card variant='outlined'>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Typography variant='h5' component='div'>
              Области устройств
            </Typography>
            <Typography variant='body2' sx={{ fontSize: 14 }} color='text.secondary'>
              Обновлено {moment().format('DD-MM-YYYY hh:mm:ss')}
            </Typography>
          </Box>
        </CardContent>
        <ChartComponent />
      </Card>
    </Box>
  );
};

export default Home;
