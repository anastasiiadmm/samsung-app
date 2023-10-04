import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'redux/auth/authSlice';
import devicesSlice from 'redux/devices/devicesSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    devices: devicesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
