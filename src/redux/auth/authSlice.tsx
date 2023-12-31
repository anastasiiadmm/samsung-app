import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosApi from '@/utils/axios-api';
import { RootState } from '@/hooks/reduxHooks';
import { AuthError, IError } from '@/interfaces/IError';
import { IJWToken } from '@/interfaces/IJWToken';
import { IUserSignIn } from '@/interfaces/IUser';
import { addLocalStorage } from '@/utils/storage';

interface AuthState extends IJWToken {
  user: null;
  error: AuthError | null;
  commonError: IError | null;
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

export const loginUser = createAsyncThunk<IJWToken, IUserSignIn>(
  `${nameSpace}/loginUser`,
  async (loginData: any, { rejectWithValue }: any) => {
    try {
      const { data: token } = await axiosApi.post<IJWToken>(`/token/`, loginData);
      addLocalStorage({ access: token.access, refresh: token.refresh });
      return token;
    } catch (e) {
      return rejectWithValue({ detail: e?.message });
    }
  },
);

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
  },
});

export const { logoutUser, checkForTokens, clearTokens } = authSlice.actions;
export const authReducers = authSlice.reducer;
export const authSelector = (state: RootState) => state.auth;
