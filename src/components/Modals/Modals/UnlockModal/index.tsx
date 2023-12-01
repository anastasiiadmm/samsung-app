import React from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import useAlert from '@/hooks/useAlert';

const UnlockModal = () => {
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
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', width: 350 }}>
      <Typography variant='h5' component='div'>
        Разблокировать экран
      </Typography>

      <Typography variant='body2' gutterBottom>
        Нажимая на кнопку ниже, вы разблокируете телефон пользователя.
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
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
        >
          <Button fullWidth type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
            Разблокировать
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UnlockModal;
