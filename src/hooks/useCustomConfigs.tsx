import { useAppSelector } from 'hooks/reduxHooks';
import { authSelector } from 'redux/auth/authSlice';

export const useTokenConfigs = () => {
  const { access, refresh } = useAppSelector(authSelector);

  return access && refresh;
};
