import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import './LoadingSpinner.css';

/**
 * LoadingSpinner Component
 * Reusable loading indicator with accessibility support
 */
const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <Box 
      className="loading-spinner-container"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <CircularProgress 
        size={48} 
        thickness={4}
        aria-hidden="true"
      />
      <p className="loading-spinner-message">{message}</p>
    </Box>
  );
};

export default LoadingSpinner;
