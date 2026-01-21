import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useTasks } from '../../hooks/useTasks';
import TaskItem from '../TaskItem';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import './TaskList.css';

/**
 * TaskList Component
 * Main component for Task 1 - Displays a list of tasks fetched from the API
 * 
 * Requirements:
 * - Fetch tasks from GET /api/tasks
 * - Display tasks in clean, organized list
 * - Show task title, description, status, and due date
 * - Handle loading and error states
 * - Use modern React patterns (hooks, functional components)
 */
const TaskList = () => {
  const { tasks, loading, error, refetch } = useTasks();

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="lg" className="task-list-container">
        <LoadingSpinner message="Loading tasks..." />
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="lg" className="task-list-container">
        <ErrorMessage 
          error={error} 
          onRetry={refetch}
          title="Failed to Load Tasks"
        />
      </Container>
    );
  }

  // Empty state
  if (!tasks || tasks.length === 0) {
    return (
      <Container maxWidth="lg" className="task-list-container">
        <Box 
          className="task-list-empty"
          sx={{
            textAlign: 'center',
            padding: 4,
            color: 'text.secondary'
          }}
        >
          <Typography variant="h6" component="p" gutterBottom>
            No tasks found
          </Typography>
          <Typography variant="body2">
            Tasks will appear here once they are created.
          </Typography>
        </Box>
      </Container>
    );
  }

  // Success state - display tasks
  return (
    <Container maxWidth="lg" className="task-list-container">
      <Box className="task-list-header" sx={{ marginBottom: 3 }}>
        <Typography 
          variant="h5" 
          component="h2"
          sx={{ 
            fontWeight: 600,
            marginBottom: 1
          }}
        >
          Tasks
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          aria-live="polite"
          aria-atomic="true"
        >
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
        </Typography>
      </Box>

      <Box
        className="task-list"
        component="ul"
        aria-label="Task list"
      >
        {tasks.map((task) => (
          <Box
            key={task.id}
            component="li"
            className="task-list-item"
          >
            <TaskItem task={task} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default TaskList;
