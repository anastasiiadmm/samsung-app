import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'hooks/reduxHooks';
import { IDevices, pagination } from 'interfaces/IDevices';
import { IErrors } from 'interfaces/IErrors';
import axiosApi from 'utils/axios-api';

const nameSpace = 'devices';

interface DevicesState {
  devices: IDevices[] | null;
  devicesLoading: Boolean;
  devicesError: IErrors | null;
  devicesListPagination: pagination | null;
}

const INITIAL_STATE = {
  devices: null,
  devicesLoading: false,
  devicesError: null,
  devicesListPagination: null,
} as DevicesState;

interface fetchDevicesParams {
  query?: string;
}

export const fetchDevices = createAsyncThunk<IDevices[], fetchDevicesParams>(
  `${nameSpace}/fetchDevices`,
  async (data, { rejectWithValue }) => {
    try {
      const resp = await axiosApi.get<IDevices[] | null>(`/devices/`, {
        params: data?.query,
      });
      const { data: devices } = resp;

      if (!devices) return [];

      return devices;
    } catch (e) {
      return rejectWithValue({ detail: e?.message });
    }
  },
);

export const devicesSlice = createSlice({
  name: nameSpace,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.pending, (state) => {
      state.devicesLoading = true;
      state.devicesError = null;
    });
    builder.addCase(fetchDevices.fulfilled, (state, { payload }: any) => {
      state.devicesLoading = false;
      state.devicesError = null;
      state.devices = payload.results;
      state.devicesListPagination = {
        ...state.devicesListPagination,
        count: payload.count,
        next: payload.next,
        previous: payload.previous,
      };
    });
    builder.addCase(fetchDevices.rejected, (state, { payload }) => {
      state.devicesLoading = false;
      if (payload && typeof payload === 'object' && 'detail' in payload) {
        state.devicesError = { detail: payload.detail as string | null };
      }
    });
  },
});

export const devicesSelector = (state: RootState) => state.devices;
export default devicesSlice.reducer;
