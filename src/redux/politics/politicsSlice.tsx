import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosApi from "@/utils/axios-api";
import { getParams } from "@/utils/helper";
import { RootState } from "@/hooks/reduxHooks";
import { ISubmitMessage, IMessage } from "@/interfaces/IMessage";

const nameSpace = 'politics';

export const fetchPolitics = createAsyncThunk<IMessage[], object>(
  `${nameSpace}/`,
  async (params, { rejectWithValue }) => {
    try {
      const { data: messages } = await axiosApi.get<IMessage[] | null>(
        `/${nameSpace}/${getParams(params)}`,
      );

      if (!messages) return [];
      return messages;
    } catch (error) {
      return rejectWithValue({ detail: error?.message });
    }
  },
);

export const submitPolitics = createAsyncThunk<IMessage, ISubmitMessage>(
  `${nameSpace}/submit`,
  async (mutationMessage, { rejectWithValue }) => {
    try {
      const { data: messages } = await axiosApi.post(`/messages/`, mutationMessage);

      if (!messages) return [];
      return messages;
    } catch (error) {
      return rejectWithValue({ detail: error?.message });
    }
  },
);

export const politicsSlice = createSlice({
  name: nameSpace,
  initialState: { kek: [1] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPolitics.fulfilled, (state, { payload }) => {
    });
    builder.addCase(fetchPolitics.pending, (state) => {
    });
    // submit
    builder.addCase(fetchPolitics.rejected, (state, { payload }) => {
    });
  },
});

export const messagesSelector = (state: RootState) => state;
export const politicsReducers = politicsSlice.reducer;
