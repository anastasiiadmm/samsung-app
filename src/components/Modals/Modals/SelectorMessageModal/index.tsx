import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { IMessage } from '@/interfaces/IMessage';
import { ICommands, ICommandVarious } from '@/interfaces/ICommands';
import { postCommands } from '@/redux/commands/commandsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchPolitics, messagesSelector } from '@/redux/politics/politicsSlice';

export const SelectorMessageModal = () => {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector(messagesSelector);
  const [message, setMessage] = useState(null);

  const handleSubmit = (payloadMsg: IMessage) => {
    const data = {
      command: ICommandVarious.sendMessage,
      payload: {
        tel: payloadMsg.tel,
        email: payloadMsg.email,
        message: payloadMsg.text,
        enable_full_screen: false,
      },
    } as ICommands;
    dispatch(postCommands({ data }));
  };

  useEffect(() => {
    dispatch(fetchPolitics({ message_type: ICommandVarious.sendMessage }));
  }, []);

  useEffect(() => {
    if (message) {
      const msgId = message.target.value;
      const payloadMsg = messages.find((msg) => msg.id === msgId);
      handleSubmit(payloadMsg);
    }
  }, [message]);

  return (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', width: 350 }}>
      <Typography variant='h5' component='div'>
        Выбор сообщения для уведомления
      </Typography>

      {!messages && (
        <Typography variant='body2' gutterBottom>
          Сообщений нету, создайте их <Link to={'/policies'}>Политике</Link>
        </Typography>
      )}
      {!!messages && (
        <Box
          sx={{
            gap: 2,
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <TextField
            select
            fullWidth
            size='small'
            label='Текстовка'
            value={message?.text}
            onChange={setMessage}
          >
            {messages.map((message, index) => (
              <MenuItem value={message.id} key={`MESSAGE_ITEM_${index}`}>
                {message.text}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}
    </Box>
  );
};
