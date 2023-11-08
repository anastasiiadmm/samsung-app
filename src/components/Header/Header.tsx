import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { CircularProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { fetchUser, usersSelector } from 'redux/users/UsersSlice';

interface HeaderProps {
  onDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const { onDrawerToggle } = props;
  const dispatch = useAppDispatch();
  const { user, userLoading } = useAppSelector(usersSelector);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <AppBar color='primary' position='sticky' elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems='center'>
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={onDrawerToggle}
                edge='start'
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Tooltip title='Alerts • No alerts'>
                <IconButton color='inherit'>
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component='div' color='primary' position='static' elevation={0} sx={{ zIndex: 0 }}>
        <Toolbar>
          <Grid container alignItems='center' spacing={1}>
            <Grid item xs>
              {userLoading ? (
                <CircularProgress />
              ) : (
                <Typography color='inherit' variant='h5' component='h1'>
                  Привет, {user?.username}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
