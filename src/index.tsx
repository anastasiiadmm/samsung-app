import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/* eslint-disable */
import store from 'redux/store';
import App from 'App';
import 'assets/scss/_index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const defaultTheme = createTheme();

root.render(
  <Provider store={store}>
    <BrowserRouter basename='/'>
      <ThemeProvider theme={defaultTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
