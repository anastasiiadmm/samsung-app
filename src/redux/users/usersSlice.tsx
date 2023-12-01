import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosApi from '@/utils/axios-api';
import { IErrors } from '@/interfaces/IErrors';
import { IUser } from '@/interfaces/IUser';
import { RootState } from '@/hooks/reduxHooks';

const nameSpace = 'users';

interface UsersState {
  user: IUser | null;
  userLoading: boolean;
  userError: IErrors | null;
}

const INITIAL_STATE = {
  user: null,
  userLoading: false,
  userError: null,
} as UsersState;

export const fetchUser = createAsyncThunk<IUser, void>(
  `${nameSpace}/fetchUser`,
  async (query, { rejectWithValue }) => {
    try {
      const { data: user } = await axiosApi.get('/users/me/');

      if (!user) return null;
      return user;
    } catch (error) {
      return rejectWithValue({ detail: error?.message });
    }
  },
);

export const usersSlice = createSlice({
  name: nameSpace,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.userLoading = true;
      state.userError = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }: any) => {
      state.userLoading = false;
      state.userError = null;
      state.user = payload;
    });
    builder.addCase(fetchUser.rejected, (state, { payload }) => {
      state.userLoading = false;
      if (payload && typeof payload === 'object' && 'detail' in payload) {
        state.userError = { detail: payload.detail as string | null };
      }
    });
  },
});

export const usersSelector = (state: RootState) => state.users;
export const usersReducers = usersSlice.reducer;
