import React, { useCallback, useEffect } from 'react';
import { Route, RouteObject, Routes, useRoutes } from 'react-router';

import PaperBase from 'components/PaperBase/PaperBase';
import Devices from 'containers/Devices/Devices';
import Home from 'containers/Home/Home';
import Policies from 'containers/Policies/Policies';
import SignIn from 'containers/SignIn/SignIn';
import Support from 'containers/Support/Support';
import { useAppDispatch } from 'hooks/reduxHooks';
import { useTokenConfigs } from 'hooks/useCustomConfigs';
import { IListener } from 'interfaces/IApp';
import { checkForTokens, clearTokens, logoutUser } from 'redux/auth/authSlice';

import { tokensLocalStorage } from 'utils/config';
import { defaultLocalStorage, getUserLocalStorage, logoutLocalStorage } from 'utils/storage';

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
  {
    path: '/support',
    element: <Support />,
  },
];

const App: React.FC = () => {
  const router = useRoutes(routers);
  const dispatch = useAppDispatch();
  const tokenConfigs = useTokenConfigs();

  const initializeApp = useCallback(() => {
    const tokensLocal = getUserLocalStorage();
    if (tokensLocal?.access && tokensLocal?.refresh) {
      dispatch(checkForTokens(tokensLocal));
    } else {
      logoutLocalStorage();
      dispatch(clearTokens());
    }
  }, [dispatch]);

  const handleStorageEvent = useCallback(
    ({ key, newValue }: IListener) => {
      if (key === tokensLocalStorage && newValue === JSON.stringify(defaultLocalStorage)) {
        dispatch(logoutUser());
        logoutLocalStorage();
      } else {
        dispatch(checkForTokens(JSON.parse(newValue || '')));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  useEffect(() => {
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [handleStorageEvent]);

  return tokenConfigs ? (
    <PaperBase>{router}</PaperBase>
  ) : (
    <Routes>{tokenConfigs ? null : <Route path='*' element={<SignIn />} />}</Routes>
  );
};

export default App;
