import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/hooks/reduxHooks';
import { ICommands } from '@/interfaces/ICommands';
import { IErrors } from '@/interfaces/IErrors';
import axiosApi from '@/utils/axios-api';

const nameSpace = 'commands';

interface CommandsState {
  commandsLoading: Boolean;
  commandsError: IErrors | null;
}

const INITIAL_STATE = {
  commandsLoading: false,
  commandsError: null,
} as CommandsState;

interface postCommandsParams {
  data: ICommands;
}

export const postCommands = createAsyncThunk<void, postCommandsParams>(
  `${nameSpace}/postCommands`,
  async ({ data }, { rejectWithValue }) => {
    try {
      await axiosApi.post(`/commands/`, data);
    } catch (e) {
      return rejectWithValue({ detail: e?.message });
    }
  },
);

export const commandsSlice = createSlice({
  name: nameSpace,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postCommands.pending, (state) => {
      state.commandsLoading = true;
      state.commandsError = null;
    });
    builder.addCase(postCommands.fulfilled, (state, { payload }: any) => {
      state.commandsLoading = false;
      state.commandsError = null;
    });
    builder.addCase(postCommands.rejected, (state, { payload }) => {
      state.commandsLoading = false;
      if (payload && typeof payload === 'object' && 'detail' in payload) {
        state.commandsError = { detail: payload.detail as string | null };
      }
    });
  },
});

export const commandsSelector = (state: RootState) => state.commands;
export const commandsReducer = commandsSlice.reducer;
