import React from 'react';
import {Route, RouteObject, Routes, useRoutes} from 'react-router';

import {useAppSelector} from 'hooks/reduxHooks';
import {authSelector} from 'redux/auth/authSlice';
import AppRouter from 'AppRouter/AppRouter';
import SignIn from 'containers/SignIn/SignIn';

const routers: RouteObject[] = [];


const App: React.FC = () => {
  const { tokens } = useAppSelector(authSelector);
  const router = useRoutes(routers);

  return tokens?.access && tokens?.refresh ? (
    <AppRouter />
  ) : (
    <Routes>
      {tokens?.access && tokens?.refresh ? null : <Route path='*' element={<SignIn />} />}
    </Routes>
  );
};

export default App;
