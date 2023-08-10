import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'hooks/reduxHooks';

const nameSpace = 'auth';

const INITIAL_STATE = {
  tokens: {
    access: '',
    refresh: '',
  },
};

export const authSlice = createSlice({
  name: nameSpace,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {},
});

export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
