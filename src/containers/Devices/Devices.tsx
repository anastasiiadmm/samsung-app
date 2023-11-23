import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, TextField, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import TableComponent from 'components/TableComponent/TableComponent';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useDebounce } from 'hooks/useDebounce';
import { ICommands } from 'interfaces/ICommands';
import { IDevices } from 'interfaces/IDevices';
import { postCommands } from 'redux/commands/commandsSlice';
import { devicesSelector, fetchDevices } from 'redux/devices/devicesSlice';
import { getParams } from 'utils/helper';

const Devices = () => {
  const dispatch = useAppDispatch();
  const { devices, devicesLoading, devicesListPagination } = useAppSelector(devicesSelector);
  const determinePageNumber = () => {
    if (devicesListPagination?.next) {
      return Number(devicesListPagination.next);
    }
    if (devicesListPagination?.previous) {
      return Number(devicesListPagination.previous);
    }
    return 1;
  };
  const [filters, setFilters] = useState({
    page: determinePageNumber(),
    search: '',
  });
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [selectedModal, setSelectedModel] = useState<IDevices | null>(null);
  const debouncedSearchTerm = useDebounce(filters?.search, 500);

  useEffect(() => {
    const queryString = getParams({
      page: filters?.page,
      search: filters?.search,
    });

    dispatch(fetchDevices({ query: queryString }));
  }, [debouncedSearchTerm, filters.page, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, search: value }));
  };

  const handleRowSelectionChange = (newRowSelectionModel: GridRowSelectionModel) => {
    if (newRowSelectionModel.length > 1) {
      newRowSelectionModel = [newRowSelectionModel[newRowSelectionModel.length - 1]];
    }

    setRowSelectionModel(newRowSelectionModel);

    if (newRowSelectionModel.length > 0) {
      const selectedRowId = newRowSelectionModel[0];
      const selectedRow = devices?.find((row) => row.id === selectedRowId);

      if (selectedRow) {
        setSelectedModel(selectedRow);
      }
    }
  };

  const sendDevicesHandler = (type: string) => {
    let data: ICommands = {};

    switch (type) {
      case 'send-message':
        data = {
          command: 'send-message',
          payload: {
            message: '',
            tel: '',
            enable_full_screen: false,
          },
        } as ICommands;
        break;
      case 'unlock':
        data = {
          command: 'unlock',
          payload: {
            device_uid: selectedModal?.imei || '',
            message: 'something',
          },
        } as ICommands;
        break;
      case 'lock':
        data = {
          command: 'lock',
          payload: {
            device_uid: selectedModal?.imei || '',
            message: '',
            tel: selectedModal?.sim_card_number || '',
            email: '',
          },
        } as ICommands;
        break;
      case 'delete':
        data = {
          command: 'delete',
          payload: {
            device_uid: selectedModal?.imei || '',
          },
        } as ICommands;
        break;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }

    dispatch(postCommands({ data }));
  };

  const columns: GridColDef[] = [
    { field: 'imei', headerName: 'IMEI код устройства #1', width: 180 },
    { field: 'imei2', headerName: 'IMEI код устройства #2', width: 180 },
    { field: 'serial_number', headerName: 'Cерийный номер (S/N)', width: 170 },
    { field: 'model', headerName: 'Модель устройства', width: 160 },
    { field: 'status', headerName: 'Статус устройства', width: 140 },
    { field: 'is_blocked', headerName: 'Заблокирован', width: 140 },
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
                placeholder='Поиск по IMEI/SN'
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
          <Button variant='contained' onClick={() => sendDevicesHandler('send-message')}>
            Уведомление
          </Button>
          <Button variant='contained' color='error' onClick={() => sendDevicesHandler('unlock')}>
            Заблокировать
          </Button>
          <Button variant='contained' onClick={() => sendDevicesHandler('lock')}>
            Разблокировать
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={() => sendDevicesHandler('activate')}
          >
            Активировать
          </Button>
          <Button variant='contained' color='error' onClick={() => sendDevicesHandler('delete')}>
            Удалить
          </Button>
        </Box>
      </Box>
      <Box>
        <TableComponent
          loading={devicesLoading}
          onPageChange={(newPage) => {
            setFilters({ ...filters, page: newPage + 1 });
          }}
          rowCount={devicesListPagination?.count || 0}
          currentPage={filters.page - 1}
          rows={devices}
          columns={columns}
          rowSelectionModel={rowSelectionModel}
          handleRowSelectionChange={handleRowSelectionChange}
        />
      </Box>
    </Box>
  );
};

export default Devices;
