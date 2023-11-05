import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'redux/auth/authSlice';
import commandsSlice from 'redux/commands/commandsSlice';
import devicesSlice from 'redux/devices/devicesSlice';
import uploadSlice from 'redux/upload/uploadSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    commands: commandsSlice,
    devices: devicesSlice,
    upload: uploadSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
