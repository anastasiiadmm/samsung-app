import React from 'react';
import { Route, RouteObject, Routes, useRoutes } from 'react-router';

import PaperBase from 'components/PaperBase/PaperBase';
import Home from 'containers/Home/Home';
import SignIn from 'containers/SignIn/SignIn';
import { useAppSelector } from 'hooks/reduxHooks';
import { authSelector } from 'redux/auth/authSlice';

const routers: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
];

const App: React.FC = () => {
  const { tokens } = useAppSelector(authSelector);
  const router = useRoutes(routers);

  return <PaperBase>{router}</PaperBase>;
};

export default App;
