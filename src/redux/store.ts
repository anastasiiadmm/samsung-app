import { configureStore } from '@reduxjs/toolkit';

import authReducer from 'redux/auth/authSlice';
import commandsSlice from 'redux/commands/commandsSlice';
import companiesSlice from 'redux/companies/companiesSlice';
import devicesSlice from 'redux/devices/devicesSlice';
import uploadSlice from 'redux/upload/uploadSlice';
import usersSlice from 'redux/users/UsersSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    commands: commandsSlice,
    devices: devicesSlice,
    upload: uploadSlice,
    users: usersSlice,
    companies: companiesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
