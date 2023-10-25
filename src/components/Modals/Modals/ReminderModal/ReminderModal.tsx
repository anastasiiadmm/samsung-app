import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

import reminder from 'assets/images/reminder.png';
import useAlert from 'hooks/useAlert';

const ReminderModal = () => {
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
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        flexWrap: 'wrap',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant='h5' component='div'>
        Напоминание
      </Typography>
      <Typography variant='body2' gutterBottom>
        Укажите сообщение и контактную информацию, которые будут отображаться при отправке мигающего
        напоминания на устройства пользователя. Пользователи устройств будут периодически видеть это
        напоминание, пока оно не будет остановлено
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
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 420 }}
          >
            <TextField
              required
              id='period'
              label='Период'
              defaultValue='300 секунд'
              variant='outlined'
            />

            <TextField
              required
              rows={4}
              multiline
              id='outlined-basic'
              label='Введите сообщение'
              variant='outlined'
              defaultValue='Ваш БАНКОВСКИЙ взнос не был оплачен в установленный срок. Пока вы не заплатите, это сообщение будет
периодически показываться.'
            />

            <Typography variant='body2' gutterBottom>
              Укажите контактную информацию
            </Typography>

            <TextField required id='outlined' label='Номер телефона' variant='outlined' />
            <TextField required id='email' label='Email' variant='outlined' />

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
            <img style={{ width: 175 }} src={reminder} alt='reminder' />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReminderModal;
