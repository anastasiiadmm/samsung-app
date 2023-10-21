import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Icon, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';

import notification from 'assets/images/notification.png';
import useAlert from 'hooks/useAlert';

const SendNotificationModal = () => {
  const { showAlert } = useAlert();
  const [data, setData] = useState({ phone: '' });
  const [notificationFields, setNotificationFields] = useState([3]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleAddField = () => {
    if (notificationFields.length < 8) {
      setNotificationFields((prev) => [...prev, prev[prev.length - 1] + 1]);
    }
  };

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
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Typography variant='h5' component='div'>
        Уведомление
      </Typography>
      <Typography variant='body2' gutterBottom>
        Укажите контактную информацию и выберите сообщение, которое будет отображаться при отправке
        уведомления на пользовательское устройство
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: 400,
          }}
        >
          <TextField
            style={{ margin: 0 }}
            margin='normal'
            required
            fullWidth
            id='phone'
            label='Номер телефона'
            name='phone_number'
            autoFocus
            value={data.phone}
            onChange={changeHandler}
          />
          <TextField
            rows={2}
            multiline
            id='outlined-basic'
            label='Уведомление 1'
            variant='outlined'
            defaultValue='Просим вас произвести ежемесечную оплату за ваш телефон'
          />
          <TextField
            rows={2}
            multiline
            id='outlined-basic'
            label='Уведомление 2'
            variant='outlined'
            defaultValue='Срок оплаты истек и началось начисление пени. Просим погасить задолженность'
          />
          <TextField
            rows={2}
            multiline
            id='outlined-basic'
            label='Уведомление 3'
            variant='outlined'
            defaultValue='Во избежание отключение вашего телефона, просим вас погасить задолженность'
          />
          {notificationFields.map((fieldNumber) => (
            <TextField
              key={fieldNumber}
              rows={2}
              multiline
              id={`outlined-basic-${fieldNumber}`}
              label={`Уведомление ${fieldNumber}`}
              variant='outlined'
              defaultValue=''
            />
          ))}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton aria-label='add' onClick={handleAddField}>
              <Icon>
                <AddIcon />
              </Icon>
            </IconButton>
            <Typography variant='body2'>Добавить другой текст уведомления (максимум 10)</Typography>
          </Box>
          <Button variant='contained'>Сохранить</Button>
        </Box>
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: 400,
          }}
        >
          <img style={{ width: 200 }} src={notification} alt='notification' />
        </Box>
      </Box>
    </Box>
  );
};

export default SendNotificationModal;
