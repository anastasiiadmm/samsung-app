import React from 'react';
import { Box, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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
  overflowY: 'auto',
  maxHeight: '95vh',
  border: '1px solid gray',
};

const Index: React.FC<Props> = ({ open, children, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={handleClose}
            aria-label='delete'
            sx={{ position: 'absolute', top: '-42px', right: '-10px' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <div>{children}</div>
      </Box>
    </Modal>
  );
};

export default Index;
