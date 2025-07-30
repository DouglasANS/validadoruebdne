import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingUI = ({ message = 'Carregando...' }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress color="primary" />
      <Typography variant="subtitle1" style={{ marginTop: '16px' }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingUI;
