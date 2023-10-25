import AddAlertIcon from '@mui/icons-material/AddAlert';
import AppBlockingIcon from '@mui/icons-material/AppBlocking';
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood';
import SimCardIcon from '@mui/icons-material/SimCard';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React from 'react';

import ModalComponent from 'components/Modals/ModalComponent';
import BlockModal from 'components/Modals/Modals/BlockModal/BlockModal';
import ReminderModal from 'components/Modals/Modals/ReminderModal/ReminderModal';
import SendNotificationModal from 'components/Modals/Modals/SendNotificationModal/SendNotificationModal';

const categories = [
  {
    id: 'Блокировка устройства',
    children: [
      {
        id: 'Заблокировать',
        icon: <PhonelinkLockIcon sx={{ fontSize: 50 }} />,
        path: '/lock-phone',
        active: false,
      },
      {
        id: 'Разблокировать',
        icon: <SecurityUpdateGoodIcon sx={{ fontSize: 50 }} />,
        path: '/unlock-phone',
        active: false,
      },
    ],
  },
  {
    id: 'Расширенные элементы управления',
    children: [
      {
        id: 'Активировать',
        icon: <SimCardIcon sx={{ fontSize: 50 }} />,
        path: '/activate-phone',
        active: false,
      },
    ],
  },
  {
    id: 'Обмен сообщениями',
    children: [
      {
        id: 'Уведомление',
        icon: <AppBlockingIcon sx={{ fontSize: 50 }} />,
        path: '/send-notification',
        active: false,
      },
      {
        id: 'Напоминание',
        icon: <AddAlertIcon sx={{ fontSize: 50 }} />,
        path: '/reminder',
        active: false,
      },
    ],
  },
];

const Policies = () => {
  const [open, setOpen] = React.useState(false);
  const [currentModalPath, setCurrentModalPath] = React.useState<string | null>(null);

  const handleOpen = (path: string) => {
    setCurrentModalPath(path);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentModalPath(null);
  };

  const renderModalContent = (path: string | null) => {
    switch (path) {
      case '/lock-phone':
        return <BlockModal />;
      case '/send-notification':
        return <SendNotificationModal />;
      case '/reminder':
        return <ReminderModal />;
      default:
        return null;
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, flexWrap: 'wrap' }}>
        {categories?.map((category) => {
          return (
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexWrap: 'wrap' }}
              key={category.id}
            >
              <Typography variant='h5' component='div'>
                {category.id}
              </Typography>
              <Box sx={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {category.children.map((item) => {
                  return (
                    <Card variant='outlined' key={item.id} onClick={() => handleOpen(item.path)}>
                      <CardActionArea>
                        <CardContent>
                          <Box
                            display='flex'
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='center'
                            height='100%'
                          >
                            {item.icon}
                            <Typography variant='h6' component='div'>
                              {item.id}
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
      <ModalComponent open={open} handleClose={handleClose}>
        {renderModalContent(currentModalPath)}
      </ModalComponent>
    </>
  );
};

export default Policies;
