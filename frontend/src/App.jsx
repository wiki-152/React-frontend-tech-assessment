import React, { useRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

// Create Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#3498db',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
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
