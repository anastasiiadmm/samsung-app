import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

import { useAppDispatch } from 'hooks/reduxHooks';
import { logoutUser } from 'redux/auth/authSlice';
import { logoutLocalStorage } from 'utils/storage';

const categories = [
  {
    id: 'Build',
    children: [
      { id: 'Главная', icon: <HomeIcon />, path: '/', active: false },
      { id: 'Устройства', icon: <PeopleIcon />, path: '/devices', active: false },
      { id: 'Политика', icon: <DnsRoundedIcon />, path: '/policies', active: false },
      {
        id: 'Журнал активности',
        icon: <SettingsEthernetIcon />,
        path: '/activity-log',
        active: false,
      },
    ],
  },
  {
    id: 'Quality',
    children: [{ id: 'Поддержка', icon: <SettingsIcon />, path: '/support', active: false }],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

const Navigator: React.FC<DrawerProps> = ({ ...other }) => {
  const location = useLocation();
  const push = useNavigate();
  const dispatch = useAppDispatch();

  const updatedCategories = categories.map((category) => {
    const updatedChildren = category.children.map((child) => {
      return {
        ...child,
        active: child.path === location.pathname,
      };
    });

    return {
      ...category,
      children: updatedChildren,
    };
  });

  const logoutHandler = () => {
    push('/');
    logoutLocalStorage();
    dispatch(logoutUser());
    window.location.reload();
  };

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
            KNOX KG
          </ListItem>
        </NavLink>
        {updatedCategories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            {children.map(({ id: childId, icon, path, active }) => (
              <NavLink to={path} key={childId} style={{ textDecoration: 'none' }}>
                <ListItem disablePadding>
                  <ListItemButton selected={active} sx={item}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
      <Box sx={{ bgcolor: '#101F33', color: 'white' }}>
        <ListItem disablePadding onClick={logoutHandler}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Выход</ListItemText>
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Navigator;
