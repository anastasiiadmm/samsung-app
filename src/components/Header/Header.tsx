import React from 'react';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import avatar from 'assets/images/1.jpeg';

const lightColor = 'rgba(255, 255, 255, 0.7)';

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
              <Link
                href='/'
                variant='body2'
                sx={{
                  textDecoration: 'none',
                  color: lightColor,
                  '&:hover': {
                    color: 'common.white',
                  },
                }}
                rel='noopener noreferrer'
                target='_blank'
              >
                Go to main page
              </Link>
            </Grid>
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
                Authentication
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ borderColor: lightColor }}
                variant='outlined'
                color='inherit'
                size='small'
              >
                Web setup
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title='Help'>
                <IconButton color='inherit'>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component='div' position='static' elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={0} textColor='inherit'>
          <Tab label='Users' />
          <Tab label='Sign-in method' />
          <Tab label='Templates' />
          <Tab label='Usage' />
        </Tabs>
      </AppBar>
    </>
  );
};

export default Header;
