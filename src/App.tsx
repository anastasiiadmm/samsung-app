import React from 'react';
import { Route, RouteObject, Routes, useRoutes } from 'react-router';

import PaperBase from 'components/PaperBase/PaperBase';
import Devices from 'containers/Devices/Devices';
import Home from 'containers/Home/Home';
import Policies from 'containers/Policies/Policies';
import SignIn from 'containers/SignIn/SignIn';
import { useTokenConfigs } from 'hooks/useCustomConfigs';

const routers: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/devices',
    element: <Devices />,
  },
  {
    path: '/policies',
    element: <Policies />,
  },
];

const App: React.FC = () => {
  const router = useRoutes(routers);
  const tokenConfigs = useTokenConfigs();

  return tokenConfigs ? (
    <PaperBase>{router}</PaperBase>
  ) : (
    <Routes>{tokenConfigs ? null : <Route path='*' element={<SignIn />} />}</Routes>
  );
};

export default App;
