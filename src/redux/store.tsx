import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { injectStore } from "@/utils/helper";
import { authReducers } from './auth/authSlice';
import { usersReducers } from './users/usersSlice';
import { uploadReducers } from './upload/uploadSlice';
import { devicesReducers } from './devices/devicesSlice';
import { commandsReducer } from './commands/commandsSlice';
import { politicsReducers } from './politics/politicsSlice';
import { companyReducers } from './companies/companiesSlice';

const reducer = combineReducers({
  auth: authReducers,
  users: usersReducers,
  commands: commandsReducer,
  politics: politicsReducers,
  devices: devicesReducers,
  upload: uploadReducers,
  companies: companyReducers,
});

export const store = configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

injectStore(store);
setupListeners(store.dispatch);
