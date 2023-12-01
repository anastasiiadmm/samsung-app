import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/hooks/reduxHooks';
import { IDevice, IPagination } from '@/interfaces/IDevice';
import { IErrors } from '@/interfaces/IErrors';
import { getParams } from "@/utils/helper";
import axiosApi from '@/utils/axios-api';

const nameSpace = 'devices';

interface DevicesState {
  devices: IDevice[] | null;
  devicesLoading: boolean;
  devicesError: IErrors | null;
  devicesListPagination: IPagination | null;
  devicesDeleteLoading: boolean;
  devicesDeleteError: IErrors | null;
}

const INITIAL_STATE = {
  devices: null,
  devicesLoading: false,
  devicesError: null,
  devicesListPagination: null,
} as DevicesState;

export const fetchDevices = createAsyncThunk<IDevice[], object>(
  `${nameSpace}/fetchDevices`,
  async (params, { rejectWithValue }) => {
    try {
      const { data: devices } = await axiosApi.get<IDevice[] | null>(
        `/devices/${getParams(params)}`,
      );

      if (!devices) return [];
      return devices;
    } catch (error) {
      return rejectWithValue({ detail: error?.message });
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
export const devicesReducers = devicesSlice.reducer;
