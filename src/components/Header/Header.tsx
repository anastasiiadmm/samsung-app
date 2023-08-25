import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';

import avatar from 'assets/images/1.jpeg';

interface HeaderProps {
  onDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const { onDrawerToggle } = props;

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
            <Grid item>
              <IconButton color='inherit' sx={{ p: 0.5 }}>
                <Avatar src={avatar} alt='My Avatar' />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component='div' color='primary' position='static' elevation={0} sx={{ zIndex: 0 }}>
        <Toolbar>
          <Grid container alignItems='center' spacing={1}>
            <Grid item xs>
              <Typography color='inherit' variant='h5' component='h1'>
                Привет, Mirbek
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
