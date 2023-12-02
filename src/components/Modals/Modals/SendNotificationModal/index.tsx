import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Box, Button, Icon, TextField, Typography } from '@mui/material';

// @ts-ignore
import notification from '@/assets/images/notification.png';
import useAlert from '@/hooks/useAlert';
import { fetchPolitics, messagesSelector, submitPolitics } from '@/redux/politics/politicsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { ISubmitMessage } from '@/interfaces/IMessage';
import { ICommandVarious } from '@/interfaces/ICommands';

const SendNotificationModal = () => {
  const { showAlert } = useAlert();
  const dispatch = useAppDispatch();
  const { messages, error } = useAppSelector(messagesSelector);
  const [submitPayload, setSubmitPayload] = useState<ISubmitMessage>({
    tel: '',
    text: '',
    msgPack: {},
    message_type: ICommandVarious.sendMessage,
  });

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    uniqFieldId: string | null = null,
  ) => {
    let { name, value } = e.target;
    if (uniqFieldId) name = uniqFieldId;
    setSubmitPayload((data) => ({ ...data, [name]: value }));
  };

  const handleAddEmptyField = () => {
    setSubmitPayload((payload) => {
      const prevPack = payload.msgPack;
      // @ts-ignore
      const lastIndexPack = Math.max(...Object.keys(prevPack).map((key) => key.split('-')[2])) || 0;
      prevPack[`message-param-${lastIndexPack + 1}`] = '';
      return { ...payload, msgPack: prevPack };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Object.entries(submitPayload.msgPack || {}).flatMap(async ([key, value]) => {
      try {
        if (key.startsWith('message-param')) submitPayload.text = value;
        await dispatch(submitPolitics(submitPayload)).unwrap();
        showAlert('success', 'Сообщения для уведомления добавлены!');
      } catch (e) {
        showAlert('error', e.detail);
      }
    });
  };

  useEffect(() => {
    dispatch(fetchPolitics({ message_type: ICommandVarious.sendMessage }));
    setSubmitPayload({
      id: undefined,
      tel: undefined,
      text: undefined,
      message_type: undefined,
      msgPack:
        messages?.reduce(
          (accumulator, message, currentIndex) => ({
            ...accumulator,
            [`message-param-${currentIndex}`]: message.text,
          }),
          {},
        ) || {},
    });
  }, []);

  if (!!error) return showAlert('error', error.detail);

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
            onChange={changeHandler}
            defaultValue={submitPayload.tel}
          />
          {Object.entries(submitPayload.msgPack).flatMap(([key, value], index) => (
            <TextField
              key={key}
              rows={2}
              multiline
              variant='outlined'
              onChange={(e) => changeHandler(e, `message-param-${index}`)}
              defaultValue={value?.text || value}
              id={`outlined-basic-${index}`}
              label={`Уведомление ${index + 1}`}
            />
          ))}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton aria-label='add' onClick={handleAddEmptyField}>
              <Icon>
                <AddIcon />
              </Icon>
            </IconButton>
            <Typography variant='body2'>Добавить другой текст уведомления (максимум 10)</Typography>
          </Box>
          <Button type='submit' variant='contained'>
            Сохранить
          </Button>
        </Box>
        <Box
          component='div'
          display='flex'
          alignItems='center'
          justifyContent='space-around'
          sx={{
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
