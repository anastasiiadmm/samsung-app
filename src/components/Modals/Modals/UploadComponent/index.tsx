import React, { ChangeEvent, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import useAlert from '@/hooks/useAlert';
import { uploadFile } from '@/redux/upload/uploadSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { commandsSelector, fetchCompanies } from '@/redux/companies/companiesSlice';
import { ICompany } from '@/interfaces/ICompany';

const UploadComponent = () => {
  const { showAlert, Alert } = useAlert();
  const dispatch = useAppDispatch();
  const [companyID, setCompanyID] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const { companies } = useAppSelector(commandsSelector);

  useEffect(() => {
    dispatch(fetchCompanies({ page: 1 }));
  }, [dispatch]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('company_id', companyID);
      if (file) formData.append('excel_file', file);

      await dispatch(uploadFile(formData)).unwrap();
    } catch (e) {
      showAlert('error', e?.message || 'Ошибка загрузки файла');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        flexWrap: 'wrap',
        mr: 5,
        width: 400,
      }}
    >
      <Typography variant='h5' component='div'>
        Загрузить файл
      </Typography>

      <Box
        component='form'
        onSubmit={handleSubmit}
        noValidate
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          marginRight: '-40px',
        }}
      >
        <FormControl fullWidth>
          <InputLabel id='company-select-label'>ID компании</InputLabel>
          <Select
            required
            id='company-list'
            value={companyID}
            label='ID компании'
            labelId='company-select-label'
            onChange={(e) => setCompanyID(e.target.value)}
          >
            {companies?.map((company: ICompany) => {
              return (
                <MenuItem key={company?.id} value={company?.id}>
                  {company?.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {file && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p>{file?.name}</p>
            <IconButton aria-label='delete' size='small' onClick={() => setFile(null)}>
              <DeleteIcon fontSize='inherit' />
            </IconButton>
          </Box>
        )}

        <Button variant='outlined' component='label' sx={{ width: '100%' }}>
          Загрузить файл
          <input type='file' hidden onChange={handleFileChange} />
        </Button>

        <Button type='submit' variant='contained' sx={{ width: '100%', mt: 3 }}>
          Отправить
        </Button>
      </Box>
      {Alert}
    </Box>
  );
};

export default UploadComponent;
