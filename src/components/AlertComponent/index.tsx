import React from 'react';
import { Alert, Snackbar } from '@mui/material';

interface AlertProps {
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
  open: boolean;
  onClose: () => void;
}

const AlertComponent: React.FC<AlertProps> = ({ severity, message, open, onClose }) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={3_000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
