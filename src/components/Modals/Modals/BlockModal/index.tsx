import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

// @ts-ignore
import screen1 from '@/assets/images/screen1.png';
// @ts-ignore
import screen2 from '@/assets/images/screen2.png';
import useAlert from '@/hooks/useAlert';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { ISubmitMessage } from '@/interfaces/IMessage';
import { submitPolitics } from '@/redux/politics/politicsSlice';

const BlockModal = () => {
  const dispatch = useAppDispatch();
  const { showAlert, Alert } = useAlert();
  const [submitPayload, setSubmitPayload] = useState<ISubmitMessage>({
    message_type: 'lock',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(submitPolitics(submitPayload)).unwrap();
      showAlert('success', 'Сообщение для блокировки добавлено!');
    } catch (e) {
      showAlert('error', e.detail);
    }
  };

  const onHandleChangeField = (
    type: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    setSubmitPayload((prevState) => ({
      ...prevState,
      [type]: value,
    }));
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
          gap: 2,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            width: '50%',
          }}
        >
          <Box
            noValidate
            component='form'
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              required
              rows={4}
              multiline
              id='outlined-basic'
              label='Введите сообщение'
              variant='outlined'
              onChange={(e) => onHandleChangeField('text', e)}
            />

            <Typography variant='body2' gutterBottom>
              Укажите контактную информацию
            </Typography>

            <TextField
              required
              id='outlined-basic'
              label='Номер телефона'
              variant='outlined'
              onChange={(e) => onHandleChangeField('tel', e)}
            />

            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
              Сохранить
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
      {Alert}
    </Box>
  );
};

export default BlockModal;
