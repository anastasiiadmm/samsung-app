import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'hooks/reduxHooks';
import { IErrors } from 'interfaces/IErrors';
import { IUser } from 'interfaces/IUser';
import axiosApi from 'utils/axios-api';

const nameSpace = 'users';

interface UsersState {
  user: IUser | null;
  userLoading: Boolean;
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
      const resp = await axiosApi.get('/users/me/');
      const { data: user } = resp;

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
export default usersSlice.reducer;
