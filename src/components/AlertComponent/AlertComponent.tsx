import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface Props {
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
  open: boolean;
  onClose: () => void;
}

const AlertComponent: React.FC<Props> = ({ severity, message, open, onClose }) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
