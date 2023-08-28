import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import React from 'react';

import TableComponent from 'components/TableComponent/TableComponent';

const Devices = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, flexWrap: 'wrap' }}>
      <Typography variant='h5' component='div'>
        Устройства
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 4,
          flexWrap: 'wrap',
        }}
      >
        <Toolbar sx={{ backgroundColor: 'white', borderRadius: 6, width: 340 }}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              <SearchIcon color='inherit' sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder='Поиск по IMEI/SN или по ID'
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant='standard'
              />
            </Grid>
            <Grid item>
              <Tooltip title='Reload'>
                <IconButton>
                  <RefreshIcon color='inherit' sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Button variant='contained'>Уведомление</Button>
          <Button variant='contained' color='error'>
            Заблокировать
          </Button>
          <Button variant='contained'>Разблокировать</Button>
          <Button variant='contained' color='success'>
            Активировать
          </Button>
        </Box>
      </Box>
      <TableComponent />
    </Box>
  );
};

export default Devices;
