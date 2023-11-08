import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { ReactNode } from 'react';

import Header from 'components/Header/Header';
import Navigator from 'components/Navigator/Navigator';

import theme from 'theme';

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='/'>
        KNOX KG
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const drawerWidth = 256;

interface PaperBaseProps {
  children: ReactNode;
}

const PaperBase: React.FC<PaperBaseProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {isSmUp ? null : (
          <Navigator
            PaperProps={{ style: { width: drawerWidth, justifyContent: 'space-between' } }}
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        )}
        <Navigator
          PaperProps={{ style: { width: drawerWidth, justifyContent: 'space-between' } }}
          sx={{ display: { sm: 'block', xs: 'none' } }}
        />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header onDrawerToggle={handleDrawerToggle} />
        <Box component='main' sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
          {children}
        </Box>
        <Box component='footer' sx={{ p: 2, bgcolor: '#eaeff1' }}>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
};

export default PaperBase;
