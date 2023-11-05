import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'hooks/reduxHooks';
import { IErrors } from 'interfaces/IErrors';
import axiosApi from 'utils/axios-api';

const nameSpace = 'upload';

interface UploadState {
  uploadLoading: Boolean;
  uploadSuccess: Boolean;
  uploadError: IErrors | null;
}

const INITIAL_STATE = {
  uploadLoading: false,
  uploadSuccess: false,
  uploadError: null,
} as UploadState;

export const uploadFile = createAsyncThunk<void, FormData>(
  `${nameSpace}/uploadFile`,
  async (data, { rejectWithValue }) => {
    try {
      await axiosApi.post(`/upload/`, data);
    } catch (e) {
      return rejectWithValue({ detail: e?.message });
    }
  },
);

export const uploadSlice = createSlice({
  name: nameSpace,
  initialState: INITIAL_STATE,
  reducers: {
    resetUploadSuccess: (state) => {
      state.uploadSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadFile.pending, (state) => {
      state.uploadLoading = true;
      state.uploadSuccess = false;
      state.uploadError = null;
    });
    builder.addCase(uploadFile.fulfilled, (state) => {
      state.uploadLoading = false;
      state.uploadLoading = true;
      state.uploadError = null;
    });
    builder.addCase(uploadFile.rejected, (state, { payload }) => {
      state.uploadSuccess = false;
      state.uploadLoading = false;
      if (payload && typeof payload === 'object' && 'detail' in payload) {
        state.uploadError = { detail: payload.detail as string | null };
      }
    });
  },
});

export const { resetUploadSuccess } = uploadSlice.actions;
export const uploadSelector = (state: RootState) => state.upload;
export default uploadSlice.reducer;
