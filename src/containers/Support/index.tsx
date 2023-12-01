import React from 'react';
import { Box, Typography } from '@mui/material';

const Support = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box component='section' sx={{ p: 2, bgcolor: '#eaeff1' }}>
        <Typography variant='h4' gutterBottom sx={{ mb: 4 }}>
          FAQ по работе с KNOX GUARD
        </Typography>
        <Typography variant='h5' gutterBottom>
          КАК ДОБАВИТЬ НОВОЕ УСТРОЙСТВО?
        </Typography>
        <Typography variant='subtitle1' gutterBottom sx={{ mb: 3 }}>
          Чтобы загрузить устройство в вашу базу для дальнейшего контроля через программу Knox
          Guard, обращайтесь к ответственному менеджеру.
        </Typography>
        <Typography variant='h5' gutterBottom>
          АКТИВАЦИЯ УСТРОЙСТВА
        </Typography>
        <Typography variant='subtitle1' gutterBottom sx={{ mb: 3 }}>
          Загруженные устройства находятся в состоянии ожидания активации. Для того, чтобы
          активировать устройство для управления, вам необходимо сначала выбрать необходимое
          устройство по его IMEI коду и нажать на кнопку ‘Активировать’ на странице ‘Устройства’.
          После нажатия кнопки, у вас появится QR-код, который необходимо провести желаемым
          устройством. Вас перекинет на страницу активации и вам необходимо нажать на кнопку ‘ENROLL
          THIS DEVICE’. Далее на это устройство придет смс-код подтверждение, которое вы должны
          ввести в соответствующую графу. Это дает вам и нам уверенность, что на устройство успешно
          установился Knox Guard и теперь вы имеете возможность контроля. Лицензия KNOX GUARD
          действует 3 года со времени активации.
        </Typography>
        <Typography variant='h5' gutterBottom>
          ОТПРАВКА УВЕДОМЛЕНИЙ
        </Typography>
        <Typography variant='subtitle1' gutterBottom sx={{ mb: 3 }}>
          У вас есть возможность сохранить 10 разных сообщений для отправки на устройство. По
          нажатию кнопки ‘Уведомление’, вам необходимо выбрать одно из 10 уведомлений и нажать
          ‘Отправить’.
        </Typography>
        <Typography variant='h5' gutterBottom>
          РЕДАКТИРОВАНИЕ УВЕДОМЛЕНИЙ
        </Typography>
        <Typography variant='subtitle1' gutterBottom sx={{ mb: 3 }}>
          На странице ‘Политика’ нажмите на кнопку ‘Уведомление’ и у вас появится возможность как
          редактирования созданных ранее уведомлений, так и создания новых. В списке 10 уведомлений
          на разные случаи по вашему усмотрению. Условно 1 - оповещение о выплате, 2 - оповещение о
          предстоящей блокировки и т.д.
        </Typography>
        <Typography variant='h5' gutterBottom>
          КОЛИЧЕСТВО УВЕДОМЛЕНИЙ
        </Typography>
        <Typography variant='subtitle1' gutterBottom sx={{ mb: 3 }}>
          По условиям на каждое устройство выделено 5 уведомлений в месяц. Для расширения количества
          уведомлений обращаться к менеджеру.
        </Typography>
        <Typography variant='h5' gutterBottom>
          БЛОКИРОВКА/РАЗБЛОКИРОВКА УСТРОЙСТВА
        </Typography>
        <Typography variant='subtitle1' gutterBottom sx={{ mb: 3 }}>
          Логика такая же, как и для отправки уведомлений. Выбирается нужное устройство и
          блокируется/разблокируется по кнопке выбора. Блокировка/разблокировка идет через сеть
          интернет и при первом же подключении к сети, оно заблокируется. Редактирование сообщения
          блокировки/разблокировки также в ‘Политика’.
        </Typography>
        <Typography variant='h5' gutterBottom>
          УДАЛЕНИЕ УСТРОЙСТВА
        </Typography>
        <Typography variant='subtitle1' gutterBottom sx={{ mb: 3 }}>
          После успешного выполнения обязательств со стороны держателя устройства, вы можете удалить
          привязку Knox Guard без дальнейшей возможности контроля с вашей стороны. Выбирается
          устройство и нажимается кнопка ‘Удалить’.
        </Typography>
        <Typography variant='h5' gutterBottom>
          ЗАБЫЛ ПАРОЛЬ
        </Typography>
        <Typography variant='subtitle1' gutterBottom sx={{ mb: 3 }}>
          Если вы забыли пароль, то вы можете скинуть его, нажав на соответствующую кнопку при входе
          на сайт. Письмо с подтверждением придет на введённую почту.
        </Typography>
        <Typography variant='subtitle2' gutterBottom>
          По всем дополнительным вопросам обращаться в поддержку Telegram:{' '}
          <a href='https://t.me/hijackmt' target='_blank' rel='noreferrer'>
            https://t.me/hijackmt
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Support;
