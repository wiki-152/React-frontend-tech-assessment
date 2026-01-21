import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useTasks } from '../../hooks/useTasks';
import TaskFilters from '../TaskFilters';
import TaskItem from '../TaskItem';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import { updateTask } from '../../api/tasks';
import './TaskList.css';

/**
 * TaskList Component
 * Main component for Task 1 - Displays a list of tasks fetched from the API
 * Enhanced with filtering and status management (Task 3)
 * 
 * Requirements:
 * - Fetch tasks from GET /api/tasks
 * - Display tasks in clean, organized list
 * - Show task title, description, status, and due date
 * - Handle loading and error states
 * - Use modern React patterns (hooks, functional components)
 * - Filter tasks by status and priority (Task 3)
 * - Update task status via clickable status chip (Task 3)
 */
const TaskList = ({ refetchRef }) => {
  const [filters, setFilters] = useState({
    status: null,
    priority: null
  });
  
  const { tasks, loading, error, refetch, total } = useTasks(filters);

  // Handle status update with optimistic updates
  const handleStatusUpdate = useCallback(async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      // Refetch tasks with current filters to update the list
      refetch();
    } catch (error) {
      // Re-throw error so TaskItem can handle it
      throw error;
    }
  }, [refetch]);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setFilters({
      status: null,
      priority: null
    });
  }, []);

  // Check if any filters are active
  const hasActiveFilters = filters.status !== null || filters.priority !== null;

  // Expose refetch function to parent component via ref
  useEffect(() => {
    if (refetchRef) {
      refetchRef.current = refetch;
    }
  }, [refetch, refetchRef]);

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
        <TaskFilters filters={filters} onFilterChange={setFilters} />
        
        {hasActiveFilters && (
          <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={handleClearFilters}
              aria-label="Clear all filters"
            >
              Clear Filters
            </Button>
          </Box>
        )}
        
        <Box 
          className="task-list-empty"
          sx={{
            textAlign: 'center',
            padding: 4,
            color: 'text.secondary'
          }}
        >
          <Typography variant="h6" component="p" gutterBottom>
            {hasActiveFilters ? 'No tasks match your filters' : 'No tasks found'}
          </Typography>
          <Typography variant="body2">
            {hasActiveFilters 
              ? 'Try adjusting your filters or create a new task.'
              : 'Tasks will appear here once they are created.'}
          </Typography>
          {hasActiveFilters && (
            <Button 
              variant="text" 
              onClick={handleClearFilters}
              sx={{ marginTop: 2 }}
            >
              Clear Filters
            </Button>
          )}
        </Box>
      </Container>
    );
  }

  // Success state - display tasks
  return (
    <Container maxWidth="lg" className="task-list-container">
      {/* Task Filters */}
      <TaskFilters filters={filters} onFilterChange={setFilters} />
      
      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={handleClearFilters}
            aria-label="Clear all filters"
          >
            Clear Filters
          </Button>
        </Box>
      )}
      
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
          {total} {total === 1 ? 'task' : 'tasks'} {hasActiveFilters ? 'matching filters' : 'total'}
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
            <TaskItem task={task} onStatusUpdate={handleStatusUpdate} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default TaskList;
