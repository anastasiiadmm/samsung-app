import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosApi from '@/utils/axios-api';
import { getParams } from '@/utils/helper';
import { RootState } from '@/hooks/reduxHooks';
import { IMessage, ISubmitMessage } from '@/interfaces/IMessage';
import { IPagination } from '@/interfaces/IDevice';
import { IError } from '@/interfaces/IError';
import { KnownError } from '@/redux/core';

const nameSpace = 'politics';

interface MessagesState {
  messages: IMessage[] | null;
  isLoading: boolean;
  error: IError | null;
  pagination: IPagination | null;
}

interface IMessageResponse extends IPagination {
  results: IMessage[];
}

const INITIAL_STATE = {
  messages: null,
  isLoading: false,
  error: null,
  pagination: null,
} as MessagesState;

export const fetchPolitics = createAsyncThunk<
  IMessageResponse,
  object,
  // @ts-ignore
  {
    rejectWithValue: KnownError;
  }
>(`${nameSpace}/`, async (params, { rejectWithValue }) => {
  try {
    const { data: messages } = await axiosApi.get<IMessageResponse>(
      `/messages/${getParams(params)}`,
    );

    if (!messages) return [];
    return messages;
  } catch (error) {
    return rejectWithValue({ detail: error?.message });
  }
});

export const submitPolitics = createAsyncThunk<
  IMessage,
  ISubmitMessage,
  // @ts-ignore
  {
    rejectWithValue: KnownError;
  }
>(`${nameSpace}/submit`, async (mutationMessage, { rejectWithValue }) => {
  try {
    const { data: messages } = await axiosApi.post('/messages/', mutationMessage);

    if (!messages) return [];
    return messages;
  } catch (error) {
    return rejectWithValue({ detail: error?.message });
  }
});

export const politicsSlice = createSlice({
  name: nameSpace,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPolitics.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchPolitics.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.messages = payload.results;
      state.pagination = { ...state.pagination, count: payload.count };
    });
    // submit
    builder.addCase(fetchPolitics.rejected, (state, { payload }) => {
      state.isLoading = false;
      if (payload && typeof payload === 'object' && 'detail' in payload) {
        state.error = { detail: payload.detail as string | null };
      }
    });
  },
});

export const messagesSelector = (state: RootState) => state.politics;
export const politicsReducers = politicsSlice.reducer;
