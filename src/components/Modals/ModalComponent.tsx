import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React from 'react';

type Props = {
  open: boolean;
  children: React.ReactNode;
  handleClose: () => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'baseline',
};

const ModalComponent: React.FC<Props> = ({ open, children, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton onClick={handleClose} aria-label='delete'>
          <CloseIcon />
        </IconButton>
        <div>{children}</div>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
