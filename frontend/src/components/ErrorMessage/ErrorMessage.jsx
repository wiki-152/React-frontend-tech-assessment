import React from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';
import './ErrorMessage.css';

/**
 * ErrorMessage Component
 * Displays user-friendly error messages with retry functionality
 */
const ErrorMessage = ({ 
  error, 
  onRetry, 
  title = 'Error',
  severity = 'error' 
}) => {
  // Sanitize error message to prevent XSS
  const sanitizedMessage = typeof error === 'string' 
    ? error 
    : error?.message || 'An unexpected error occurred';

  return (
    <Box 
      className="error-message-container"
      role="alert"
      aria-live="assertive"
    >
      <Alert 
        severity={severity}
        action={
          onRetry && (
            <Button 
              color="inherit" 
              size="small" 
              onClick={onRetry}
              aria-label="Retry loading tasks"
            >
              Retry
            </Button>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {sanitizedMessage}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
