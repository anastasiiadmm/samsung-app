import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

// @ts-ignore
import logo from '@/assets/images/logo.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { authSelector, loginUser } from '@/redux/auth/authSlice';
import useAlert from '@/hooks/useAlert';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { showAlert, Alert } = useAlert();
  const { loading } = useAppSelector(authSelector);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginData = {
        username,
        password,
      };

      await dispatch(loginUser(loginData)).unwrap();
    } catch (e) {
      showAlert('error', e?.message || 'Ошибка авторизации');
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img style={{ width: 150 }} src={logo} alt='logo' />
        <Typography component='h1' variant='h5'>
          Войти
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            sx={{ mb: 2 }}
            margin='normal'
            required
            fullWidth
            id='username'
            label='Логин'
            name='username'
            autoComplete='username'
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormControl sx={{ mb: 2, width: '100%' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>Пароль</InputLabel>
            <OutlinedInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Пароль'
            />
          </FormControl>
          <Grid container sx={{ display: 'flex', justifyContent: 'right' }}>
            <Link to='/password-recovery' style={{ textDecoration: 'none', color: '#009be5' }}>
              Забыли пароль?
            </Link>
          </Grid>
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Запомнить меня'
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            {loading ? <CircularProgress size={24} color='inherit' /> : 'Войти'}
          </Button>
        </Box>
      </Box>
      {Alert}
    </Container>
  );
};

export default SignIn;
