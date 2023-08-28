import { useAppSelector } from 'hooks/reduxHooks';
import { authSelector } from 'redux/auth/authSlice';

export const useTokenConfigs = () => {
  const { tokens } = useAppSelector(authSelector);

  return tokens?.access && tokens?.refresh;
};
