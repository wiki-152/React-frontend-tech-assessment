import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Box, 
  Tooltip, 
  CircularProgress 
} from '@mui/material';
import {
  AccessTime as PendingIcon,
  PlayArrow as InProgressIcon,
  CheckCircle as CompletedIcon,
  ArrowDownward as LowPriorityIcon,
  Remove as MediumPriorityIcon,
  ArrowUpward as HighPriorityIcon
} from '@mui/icons-material';
import { formatDate, getRelativeDate, isOverdue } from '../../utils/dateUtils';
import { sanitizeString, truncateText } from '../../utils/validation';
import { getNextStatus, getStatusLabel } from '../../utils/statusUtils';
import './TaskItem.css';

/**
 * TaskItem Component
 * Displays a single task card with status, priority, and due date indicators
 * Enhanced with clickable status chip for status updates (Task 3)
 */
const TaskItem = ({ task, onStatusUpdate }) => {
  const [updatingStatus, setUpdatingStatus] = useState(false);
  
  if (!task) return null;

  // Get status icon
  const getStatusIcon = (status) => {
    const icons = {
      'pending': <PendingIcon sx={{ fontSize: 16 }} />,
      'in-progress': <InProgressIcon sx={{ fontSize: 16 }} />,
      'completed': <CompletedIcon sx={{ fontSize: 16 }} />
    };
    return icons[status] || <PendingIcon sx={{ fontSize: 16 }} />;
  };

  // Get status color mapping with custom colors
  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'default',
      'in-progress': 'primary',
      'completed': 'success'
    };
    return statusColors[status] || 'default';
  };

  // Get status text color for better visibility
  const getStatusTextColor = (status) => {
    const textColors = {
      'pending': '#616161',
      'in-progress': '#1976d2',
      'completed': '#2e7d32'
    };
    return textColors[status] || '#616161';
  };

  // Get status background color for visual distinction
  const getStatusBgColor = (status) => {
    const bgColors = {
      'pending': 'rgba(158, 158, 158, 0.1)',
      'in-progress': 'rgba(25, 118, 210, 0.15)',
      'completed': 'rgba(46, 125, 50, 0.1)'
    };
    return bgColors[status] || 'rgba(158, 158, 158, 0.1)';
  };

  // Get card background color - very light tint based on status (white dominant with subtle color)
  const getCardBgColor = (status) => {
    // Very subtle tint - mixing white with status color at low opacity
    const cardBgColors = {
      'pending': 'rgba(250, 250, 250, 1)', // Almost white with slight gray tint
      'in-progress': 'rgba(240, 247, 255, 1)', // Almost white with cleaner, darker blue tint
      'completed': 'rgba(247, 255, 247, 1)' // Almost white with slight green tint
    };
    return cardBgColors[status] || 'rgba(255, 255, 255, 1)';
  };

  // Get priority icon
  const getPriorityIcon = (priority) => {
    const icons = {
      'low': <LowPriorityIcon sx={{ fontSize: 16 }} />,
      'medium': <MediumPriorityIcon sx={{ fontSize: 16 }} />,
      'high': <HighPriorityIcon sx={{ fontSize: 16 }} />
    };
    return icons[priority] || <MediumPriorityIcon sx={{ fontSize: 16 }} />;
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

  // Get priority background color for visual distinction
  const getPriorityBgColor = (priority) => {
    const bgColors = {
      'low': 'rgba(2, 136, 209, 0.1)',
      'medium': 'rgba(237, 108, 2, 0.1)',
      'high': 'rgba(211, 47, 47, 0.1)'
    };
    return bgColors[priority] || 'rgba(237, 108, 2, 0.1)';
  };

  // Format status text for display
  const formatStatus = (status) => {
    return getStatusLabel(status);
  };

  // Handle status chip click
  const handleStatusClick = async () => {
    if (!onStatusUpdate || updatingStatus) return;
    
    const currentStatus = task.status || 'pending';
    const nextStatus = getNextStatus(currentStatus);
    
    setUpdatingStatus(true);
    try {
      await onStatusUpdate(task.id, nextStatus);
    } catch (error) {
      // Error handling is done in parent component
      console.error('Failed to update task status:', error);
    } finally {
      setUpdatingStatus(false);
    }
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

  // Get status border color for visual distinction
  const getStatusBorderColor = (status) => {
    const borderColors = {
      'pending': '#9e9e9e',
      'in-progress': '#1976d2',
      'completed': '#2e7d32'
    };
    return borderColors[status] || '#9e9e9e';
  };

  return (
    <Card 
      className={`task-item ${overdue ? 'task-item-overdue' : ''} task-item-status-${status}`}
      elevation={0}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: getCardBgColor(status),
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
          <Tooltip title={onStatusUpdate ? "Click to change status" : `Status: ${formatStatus(status)}`}>
            <Chip 
              icon={updatingStatus ? undefined : getStatusIcon(status)}
              label={
                updatingStatus ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CircularProgress size={12} />
                    <span>Updating...</span>
                  </Box>
                ) : (
                  formatStatus(status)
                )
              }
              color={getStatusColor(status)}
              size="small"
              onClick={onStatusUpdate ? handleStatusClick : undefined}
              disabled={updatingStatus}
              className={`task-item-status-chip task-item-status-chip-${status} ${onStatusUpdate ? 'task-item-status-clickable' : ''}`}
              sx={{
                backgroundColor: getStatusBgColor(status),
                color: getStatusTextColor(status),
                fontWeight: 600,
                opacity: 1,
                '& .MuiChip-icon': {
                  marginLeft: '8px',
                  opacity: 1,
                  color: getStatusTextColor(status)
                },
                '& .MuiChip-label': {
                  opacity: 1,
                  color: getStatusTextColor(status)
                },
                '&:hover': onStatusUpdate ? {
                  transform: 'scale(1.05)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  opacity: 1,
                  backgroundColor: getStatusBgColor(status),
                  color: getStatusTextColor(status),
                  '& .MuiChip-icon': {
                    color: getStatusTextColor(status)
                  },
                  '& .MuiChip-label': {
                    color: getStatusTextColor(status)
                  }
                } : {
                  opacity: 1
                }
              }}
              aria-label={`Task status: ${status}. ${onStatusUpdate ? 'Click to change status' : ''}`}
              role={onStatusUpdate ? 'button' : undefined}
              tabIndex={onStatusUpdate ? 0 : undefined}
              onKeyDown={onStatusUpdate ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleStatusClick();
                }
              } : undefined}
            />
          </Tooltip>
          <Chip 
            icon={getPriorityIcon(priority)}
            label={formatPriority(priority)}
            color={getPriorityColor(priority)}
            size="small"
            variant="outlined"
            sx={{
              backgroundColor: getPriorityBgColor(priority),
              fontWeight: 600,
              borderWidth: 2,
              minWidth: '100px',
              width: '100px',
              justifyContent: 'center',
              opacity: 1,
              '& .MuiChip-icon': {
                marginLeft: '8px',
                opacity: 1
              },
              '& .MuiChip-label': {
                opacity: 1,
                width: '100%',
                textAlign: 'center',
                paddingLeft: '4px',
                paddingRight: '4px'
              }
            }}
            className="task-item-priority-chip"
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
              {getRelativeDate(dueDate) || formatDate(dueDate)}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskItem;
