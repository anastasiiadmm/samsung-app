import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'redux/auth/authSlice';
import commandsSlice from 'redux/commands/commandsSlice';
import devicesSlice from 'redux/devices/devicesSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    commands: commandsSlice,
    devices: devicesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
