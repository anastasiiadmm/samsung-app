import React from 'react';
import { Route, RouteObject, Routes, useRoutes } from 'react-router';

import PaperBase from 'components/PaperBase/PaperBase';
import SignIn from 'containers/SignIn/SignIn';
import { useAppSelector } from 'hooks/reduxHooks';
import { authSelector } from 'redux/auth/authSlice';

const routers: RouteObject[] = [
  {
    path: '/',
    element: <PaperBase />,
  },
];

const App: React.FC = () => {
  const { tokens } = useAppSelector(authSelector);
  const router = useRoutes(routers);

  return tokens?.access && tokens?.refresh ? (
    router
  ) : (
    <Routes>
      {tokens?.access && tokens?.refresh ? null : <Route path='*' element={<SignIn />} />}
    </Routes>
  );
};

export default App;
