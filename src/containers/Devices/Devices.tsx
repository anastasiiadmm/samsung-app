import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, TextField, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import TableComponent from 'components/TableComponent/TableComponent';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useDebounce } from 'hooks/useDebounce';
import { devicesSelector, fetchDevices } from 'redux/devices/devicesSlice';
import { getParams } from 'utils/helper';

const Devices = () => {
  const dispatch = useAppDispatch();
  const { devices, devicesLoading, devicesListPagination } = useAppSelector(devicesSelector);
  const [filters, setFilters] = useState({
    page: devicesListPagination?.next
      ? Number(devicesListPagination?.next)
      : Number(devicesListPagination?.previous),
    search: '',
  });
  const debouncedSearchTerm = useDebounce(filters?.search, 500);

  useEffect(() => {
    const queryString = getParams({
      page: filters?.page,
      search: debouncedSearchTerm,
    });

    dispatch(fetchDevices({ query: queryString }));
  }, [debouncedSearchTerm, filters.page, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, search: value }));
  };

  const columns: GridColDef[] = [
    { field: 'imei', headerName: 'IMEI код устройства #1', width: 180 },
    { field: 'imei2', headerName: 'IMEI код устройства #2', width: 180 },
    {
      field: 'created_at',
      headerName: 'Дата создания',
      width: 140,
      valueFormatter: (params) => moment(params.value as number).format('DD MMM YYYY'),
    },
    {
      field: 'updated_at',
      headerName: 'Дата обновления',
      width: 140,
      valueFormatter: (params) => moment(params.value as number).format('DD MMM YYYY'),
    },
    { field: 'serial_number', headerName: 'Cерийный номер (S/N)', width: 170 },
    { field: 'object_id', headerName: 'KG-ID устройства', width: 170 },
    { field: 'model', headerName: 'Модель устройства', width: 160 },
    { field: 'status', headerName: 'Статус устройства', width: 140 },
    { field: 'is_blocked', headerName: 'Заблокирован', width: 140 },
    { field: 'is_deleted', headerName: 'Удален', width: 140 },
    { field: 'sim_card_number', headerName: 'Номер сим-карты', width: 140 },
    { field: 'payment_status', headerName: 'Статус оплаты', width: 140 },
    { field: 'company', headerName: 'Компания', width: 140 },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, flexWrap: 'wrap' }}>
      <Typography variant='h5' component='div'>
        Устройства
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 4,
          flexWrap: 'wrap',
        }}
      >
        <Toolbar sx={{ backgroundColor: 'white', borderRadius: 6, width: 340 }}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              <SearchIcon color='inherit' sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder='Поиск по IMEI/SN или по ID'
                value={filters?.search}
                onChange={handleSearchChange}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant='standard'
              />
            </Grid>
          </Grid>
        </Toolbar>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Button variant='contained'>Уведомление</Button>
          <Button variant='contained' color='error'>
            Заблокировать
          </Button>
          <Button variant='contained'>Разблокировать</Button>
          <Button variant='contained' color='success'>
            Активировать
          </Button>
        </Box>
      </Box>
      <Box>
        <TableComponent
          loading={devicesLoading}
          onPageChange={(newPage) => {
            setFilters({ ...filters, page: newPage + 1 });
          }}
          currentPage={filters.page - 1}
          rows={devices}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Devices;
