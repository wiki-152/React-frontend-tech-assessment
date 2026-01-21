import React, { useRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

// Create Material-UI theme with brutalist aesthetic
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2a2a2a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#2a2a2a',
    },
    divider: '#000000',
  },
  typography: {
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    h1: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 0, // Brutalist: no rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 600,
          padding: '12px 24px',
          textTransform: 'none',
          boxShadow: 'none',
          border: '2px solid #000000',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#000000',
            color: '#ffffff',
          },
        },
        outlined: {
          border: '2px solid #000000',
          '&:hover': {
            border: '2px solid #000000',
            backgroundColor: '#000000',
            color: '#ffffff',
          },
        },
        contained: {
          backgroundColor: '#000000',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#1a1a1a',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            backgroundColor: '#ffffff',
            '& fieldset': {
              borderColor: '#000000',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#000000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000000',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
            borderWidth: '2px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

function App() {
  const taskListRefetchRef = useRef(null);

  // Handle task creation - refresh task list
  const handleTaskCreated = () => {
    if (taskListRefetchRef.current) {
      taskListRefetchRef.current();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <header className="app-header">
          <h1>Task Manager</h1>
          <p>React Frontend Developer Assessment</p>
        </header>
        
        <main className="app-main">
          {/* Task 2: TaskForm component */}
          <TaskForm onTaskCreated={handleTaskCreated} />
          
          {/* Task 1: TaskList component */}
          <TaskList refetchRef={taskListRefetchRef} />
          
          {/* 
            Task 3: Filtering and status management (will be integrated into TaskList)
          */}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
