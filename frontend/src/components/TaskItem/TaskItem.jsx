import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { formatDate, getRelativeDate, isOverdue } from '../../utils/dateUtils';
import { sanitizeString, truncateText } from '../../utils/validation';
import './TaskItem.css';

/**
 * TaskItem Component
 * Displays a single task card with status, priority, and due date indicators
 */
const TaskItem = ({ task }) => {
  if (!task) return null;

  // Get status color mapping
  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'default',
      'in-progress': 'primary',
      'completed': 'success'
    };
    return statusColors[status] || 'default';
  };

  // Get priority color mapping
  const getPriorityColor = (priority) => {
    const priorityColors = {
      'low': 'info',
      'medium': 'warning',
      'high': 'error'
    };
    return priorityColors[priority] || 'default';
  };

  // Format status text for display
  const formatStatus = (status) => {
    return status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Format priority text for display
  const formatPriority = (priority) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  // Sanitize task data
  const title = sanitizeString(task.title || 'Untitled Task');
  const description = task.description ? truncateText(sanitizeString(task.description), 150) : '';
  const status = task.status || 'pending';
  const priority = task.priority || 'medium';
  const dueDate = task.dueDate || null;
  const overdue = dueDate && isOverdue(dueDate) && status !== 'completed';

  return (
    <Card 
      className={`task-item ${overdue ? 'task-item-overdue' : ''}`}
      elevation={2}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header with status and priority chips */}
        <Box 
          className="task-item-header"
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: 1,
            gap: 1,
            flexWrap: 'wrap'
          }}
        >
          <Chip 
            label={formatStatus(status)}
            color={getStatusColor(status)}
            size="small"
            aria-label={`Task status: ${status}`}
          />
          <Chip 
            label={formatPriority(priority)}
            color={getPriorityColor(priority)}
            size="small"
            variant="outlined"
            aria-label={`Task priority: ${priority}`}
          />
        </Box>

        {/* Task title */}
        <Typography 
          variant="h6" 
          component="h3"
          className="task-item-title"
          sx={{ 
            marginBottom: 1,
            fontWeight: 600,
            wordBreak: 'break-word'
          }}
        >
          {title}
        </Typography>

        {/* Task description */}
        {description && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            className="task-item-description"
            sx={{ 
              marginBottom: 2,
              flexGrow: 1,
              wordBreak: 'break-word'
            }}
          >
            {description}
          </Typography>
        )}

        {/* Due date */}
        {dueDate && (
          <Box 
            className={`task-item-due-date ${overdue ? 'task-item-due-date-overdue' : ''}`}
            sx={{ 
              marginTop: 'auto',
              paddingTop: 1
            }}
          >
            <Typography 
              variant="caption" 
              component="p"
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontWeight: overdue ? 600 : 400,
                color: overdue ? 'error.main' : 'text.secondary'
              }}
              aria-label={`Due date: ${formatDate(dueDate)}`}
            >
              <span>📅</span>
              <span>{getRelativeDate(dueDate) || formatDate(dueDate)}</span>
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskItem;
