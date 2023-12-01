import React, { useState } from 'react';

import AlertComponent from '@/components/AlertComponent';

const useAlert = () => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('success');
  const [message, setMessage] = useState('');

  const showAlert = (newSeverity: 'error' | 'warning' | 'info' | 'success', newMessage: string) => {
    setSeverity(newSeverity);
    setMessage(newMessage);
    setOpen(true);
  };

  const hideAlert = () => setOpen(false);

  const Alert = (
    <AlertComponent severity={severity} message={message} open={open} onClose={hideAlert} />
  );

  return {
    showAlert,
    Alert,
  };
};

export default useAlert;
