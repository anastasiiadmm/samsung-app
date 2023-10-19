import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

import screen1 from 'assets/images/screen1.png';
import screen2 from 'assets/images/screen2.png';
import useAlert from 'hooks/useAlert';

const BlockModal = () => {
  const { showAlert } = useAlert();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // await dispatch().unwrap(); добавить когда будет готова api
    } catch (e) {
      showAlert('error', e?.message || 'Ошибка отправки запроса');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      <Typography variant='h5' component='div'>
        Блокировка экрана
      </Typography>
      <Typography variant='body2' gutterBottom>
        Укажите сообщение и контактную информацию, которые будут отображаться при блокировке
        пользовательских устройств
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              required
              rows={4}
              multiline
              id='outlined-basic'
              label='Введите сообщение'
              variant='outlined'
            />

            <Typography variant='body2' gutterBottom>
              Укажите контактную информацию
            </Typography>

            <TextField required id='outlined-basic' label='Номер телефона' variant='outlined' />

            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
              Отправить
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexWrap: 'wrap' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <img style={{ width: 120 }} src={screen1} alt='screen1' />
            <img style={{ width: 120 }} src={screen2} alt='screen2' />
          </Box>
          <Typography variant='body2' gutterBottom style={{ width: 350 }}>
            Укажите сообщение и контактную информацию, которые будут отображаться при блокировке
            пользовательских устройств
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BlockModal;
