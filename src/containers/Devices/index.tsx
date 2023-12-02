import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Box, Grid, TextField, Toolbar, Typography } from '@mui/material';

import TableComponent from '@/components/TableComponent';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useDebounce } from '@/hooks/useDebounce';
import { ICommands, ICommandVarious } from '@/interfaces/ICommands';
import { IDevice } from '@/interfaces/IDevice';
import { IMessage } from '@/interfaces/IMessage';
import { postCommands } from '@/redux/commands/commandsSlice';
import { devicesSelector, fetchDevices } from '@/redux/devices/devicesSlice';
import { fetchPolitics } from '@/redux/politics/politicsSlice';
import useAlert from '@/hooks/useAlert';

const Devices = () => {
  const dispatch = useAppDispatch();
  const { showAlert, Alert } = useAlert();
  const { devices, devicesLoading, devicesListPagination } = useAppSelector(devicesSelector);

  const [filters, setFilters] = useState({ page: 1, search: '' });
  const debouncedSearchTerm = useDebounce(filters?.search, 500);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [selectedModal, setSelectedModel] = useState<IDevice | null>(null);

  useEffect(() => {
    const criteria = {
      search: filters?.search,
      page: filters?.page || 1,
    };

    dispatch(fetchDevices(criteria));
  }, [debouncedSearchTerm, filters.page, dispatch]);

  const fetchMessage = useCallback(
    async (type: ICommandVarious) => {
      const {
        // @ts-ignore
        payload: { results },
      } = await dispatch(fetchPolitics({ message_type: type }));
      // for chosen `type` extract needed message object
      return !!results.length ? results[0] : {};
    },
    [dispatch],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, search: value }));
  };

  const handleRowSelectionChange = (newRowSelectionModel: GridRowSelectionModel) => {
    if (newRowSelectionModel.length > 1) {
      // eslint-disable-next-line no-param-reassign
      newRowSelectionModel = [newRowSelectionModel[newRowSelectionModel.length - 1]];
    }

    setRowSelectionModel(newRowSelectionModel);

    if (newRowSelectionModel.length > 0) {
      const selectedRowId = newRowSelectionModel[0];
      const selectedRow = devices?.find((row) => row.id === selectedRowId);

      // re-set new row in selected model
      if (selectedRow) setSelectedModel(selectedRow);
    }
  };

  const sendDevicesHandler = async (type: string) => {
    let data: ICommands = {};
    const imei: string = selectedModal.imei || selectedModal.imei2;

    let message: IMessage | null = null;
    const chosenMessage = [ICommandVarious.unlock, ICommandVarious.lock].includes(
      type as ICommandVarious,
    );
    if (chosenMessage) {
      message = await fetchMessage(type as ICommandVarious);
      if (!message) showAlert('error', 'Не возможно получить сообщение, создайте новую политику!');
    }

    switch (type) {
      case ICommandVarious.sendMessage:
        data = {
          command: ICommandVarious.sendMessage,
          payload: {
            tel: message?.tel,
            message: message?.text,
            enable_full_screen: false,
          },
        } as ICommands;
        break;
      case ICommandVarious.unlock:
        data = {
          command: ICommandVarious.unlock,
          payload: {
            device_uid: imei,
            message: message?.text,
          },
        } as ICommands;
        break;
      case ICommandVarious.lock:
        data = {
          command: ICommandVarious.lock,
          payload: {
            device_uid: imei,
            message: message?.text,
            tel: selectedModal.sim_card_number || '',
          },
        } as ICommands;
        break;
      case ICommandVarious.delete:
        data = {
          command: ICommandVarious.delete,
          payload: { device_uid: imei },
        } as ICommands;
        break;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }

    await dispatch(postCommands({ data }));
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
        <Toolbar
          sx={{
            width: 340,
            borderRadius: '6px',
            backgroundColor: 'white',
            border: '1px solid rgba(0, 0, 0, 0.2)',
          }}
        >
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
          <Button
            size='small'
            variant='outlined'
            sx={{ backgroundColor: 'white' }}
            disabled={!rowSelectionModel.length}
            onClick={() => sendDevicesHandler('send-message')}
          >
            Уведомление
          </Button>
          <Button
            size='small'
            color='error'
            variant='outlined'
            sx={{ backgroundColor: 'white' }}
            disabled={!rowSelectionModel.length}
            onClick={() => sendDevicesHandler('lock')}
          >
            Заблокировать
          </Button>
          <Button
            size='small'
            variant='outlined'
            sx={{ backgroundColor: 'white' }}
            disabled={!rowSelectionModel.length}
            onClick={() => sendDevicesHandler('unlock')}
          >
            Разблокировать
          </Button>
          <Button
            size='small'
            color='success'
            variant='outlined'
            sx={{ backgroundColor: 'white' }}
            disabled
            onClick={() => sendDevicesHandler('activate')}
          >
            Активировать
          </Button>
          <Button
            size='small'
            color='error'
            variant='contained'
            disabled={!rowSelectionModel.length}
            onClick={() => sendDevicesHandler('delete')}
          >
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
      {Alert}
    </Box>
  );
};

export default Devices;
