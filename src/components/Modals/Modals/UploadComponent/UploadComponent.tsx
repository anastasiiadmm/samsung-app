import { Box, Button, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

import useAlert from 'hooks/useAlert';

const UploadComponent = () => {
  const { showAlert, Alert } = useAlert();
  const [companyID, setCompanyID] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        companyID,
        file,
      };

      // await dispatch().unwrap();
    } catch (e) {
      showAlert('error', e?.message || 'Ошибка загрузки файла');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, flexWrap: 'wrap', mr: 8 }}>
      <Typography variant='h5' component='div'>
        Загрузить файл
      </Typography>

      <Box
        component='form'
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <TextField
          margin='normal'
          required
          fullWidth
          id='company_id'
          label='ID компании'
          name='company_id'
          autoFocus
          value={companyID}
          onChange={(e) => setCompanyID(e.target.value)}
        />

        <Button variant='contained' component='label' sx={{ width: 200 }}>
          Загрузить файл
          <input type='file' hidden onChange={handleFileChange} />
        </Button>

        <Button variant='contained' component='label' sx={{ width: 200 }}>
          Отправить
        </Button>
      </Box>
      {Alert}
    </Box>
  );
};

export default UploadComponent;
