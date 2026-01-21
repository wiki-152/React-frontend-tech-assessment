import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <header className="app-header">
          <h1>Task Manager</h1>
          <p>React Frontend Developer Assessment</p>
        </header>
        
        <main className="app-main">
          {/* Task 1: TaskList component */}
          <TaskList />
          
          {/* 
            Future tasks will be integrated here:
            - Task 2: TaskForm component (will be added above TaskList)
            - Task 3: Filtering and status management (will be integrated into TaskList)
          */}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
