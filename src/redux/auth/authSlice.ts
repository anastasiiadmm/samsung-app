import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'hooks/reduxHooks';
import { AuthError, IErrors } from 'interfaces/IErrors';
import { IJWTokens } from 'interfaces/IJWTokens';
import { ITokens, userMutation } from 'interfaces/IUser';
import axiosApi from 'utils/axios-api';
import { addLocalStorage, getUserLocalStorage } from 'utils/storage';

interface AuthState extends IJWTokens {
  user: null;
  error: AuthError | null;
  commonError: IErrors | null;
  success: boolean | null;
  loading: boolean;
}

const nameSpace = 'auth';

const INITIAL_STATE = {
  user: null,
  access: '',
  refresh: '',
  error: null,
  commonError: null,
  success: null,
  loading: false,
} as AuthState;

export const loginUser = createAsyncThunk<ITokens, userMutation>(
  `${nameSpace}/loginUser`,
  async (loginData, { rejectWithValue }) => {
    try {
      const resp = await axiosApi.post(`/token/`, loginData);
      addLocalStorage({ access: resp.data.access, refresh: resp.data.refresh });
      return resp.data;
    } catch (e) {
      return rejectWithValue({ detail: e?.message });
    }
  },
);

export const refreshToken = createAsyncThunk(`${nameSpace}/refreshToken`, async () => {
  const tokens = getUserLocalStorage();

  if (tokens?.refresh) {
    const resp = await axiosApi.post('/token/refresh/', tokens.refresh);
    return resp.data;
  }
});

export const authSlice = createSlice({
  name: nameSpace,
  initialState: INITIAL_STATE,
  reducers: {
    clearAuthState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    logoutUser: () => INITIAL_STATE,
    refreshAccessToken: (state, { payload }) => {
      state.access = payload.access;
      state.refresh = payload.refresh;
    },
    checkForTokens: (state, { payload }) => {
      state.access = payload.access;
      state.refresh = payload.refresh;
    },
    clearTokens: (state) => {
      state.access = '';
      state.refresh = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.commonError = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.access = payload.access;
      state.refresh = payload.refresh;
      state.loading = false;
      state.success = true;
      state.error = null;
      state.commonError = null;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      if (payload && typeof payload === 'object' && 'detail' in payload) {
        state.error = { detail: payload.detail as string | null };
      }
    });

    builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
      state.access = payload.access;
      state.refresh = payload.refresh;
    });
  },
});

export const { logoutUser, checkForTokens, clearTokens } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
