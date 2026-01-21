import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Chip
} from '@mui/material';
import {
  AccessTime as PendingIcon,
  PlayArrow as InProgressIcon,
  CheckCircle as CompletedIcon,
  ArrowDownward as LowPriorityIcon,
  Remove as MediumPriorityIcon,
  ArrowUpward as HighPriorityIcon
} from '@mui/icons-material';
import './TaskFilters.css';

/**
 * TaskFilters Component
 * Task 3 - Filter dropdowns for status and priority
 * 
 * Requirements:
 * - Filter by Status (all, pending, in-progress, completed)
 * - Filter by Priority (all, low, medium, high)
 * - Real-time filtering (updates immediately on change)
 * - Clear visual indication of active filters
 */
const TaskFilters = ({ filters, onFilterChange }) => {
  const handleStatusChange = (event) => {
    const newStatus = event.target.value === 'all' ? null : event.target.value;
    onFilterChange({
      ...filters,
      status: newStatus
    });
  };

  const handlePriorityChange = (event) => {
    const newPriority = event.target.value === 'all' ? null : event.target.value;
    onFilterChange({
      ...filters,
      priority: newPriority
    });
  };

  return (
    <Box className="task-filters-container">
      <Typography 
        variant="subtitle2" 
        sx={{ 
          marginBottom: 1.5,
          fontWeight: 600,
          color: 'text.secondary'
        }}
      >
        Filters
      </Typography>
      
      <Grid container spacing={2}>
        {/* Status Filter */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={filters.status || 'all'}
              onChange={handleStatusChange}
              label="Status"
              aria-label="Filter tasks by status"
              renderValue={(value) => {
                if (value === 'all') return 'All Statuses';
                const statusLabels = {
                  'pending': 'Pending',
                  'in-progress': 'In Progress',
                  'completed': 'Completed'
                };
                return (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {value === 'pending' && <PendingIcon sx={{ fontSize: 18 }} />}
                    {value === 'in-progress' && <InProgressIcon sx={{ fontSize: 18 }} />}
                    {value === 'completed' && <CompletedIcon sx={{ fontSize: 18 }} />}
                    <span>{statusLabels[value]}</span>
                  </Box>
                );
              }}
            >
              <MenuItem value="all">
                <span>All Statuses</span>
              </MenuItem>
              <MenuItem value="pending">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                  <PendingIcon sx={{ fontSize: 18, color: '#616161' }} />
                  <span>Pending</span>
                </Box>
              </MenuItem>
              <MenuItem value="in-progress">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                  <InProgressIcon sx={{ fontSize: 18, color: '#1976d2' }} />
                  <span>In Progress</span>
                </Box>
              </MenuItem>
              <MenuItem value="completed">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                  <CompletedIcon sx={{ fontSize: 18, color: '#2e7d32' }} />
                  <span>Completed</span>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Priority Filter */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="priority-filter-label">Priority</InputLabel>
            <Select
              labelId="priority-filter-label"
              id="priority-filter"
              value={filters.priority || 'all'}
              onChange={handlePriorityChange}
              label="Priority"
              aria-label="Filter tasks by priority"
              renderValue={(value) => {
                if (value === 'all') return 'All Priorities';
                const priorityLabels = {
                  'low': 'Low',
                  'medium': 'Medium',
                  'high': 'High'
                };
                return (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {value === 'low' && <LowPriorityIcon sx={{ fontSize: 18 }} />}
                    {value === 'medium' && <MediumPriorityIcon sx={{ fontSize: 18 }} />}
                    {value === 'high' && <HighPriorityIcon sx={{ fontSize: 18 }} />}
                    <span>{priorityLabels[value]}</span>
                  </Box>
                );
              }}
            >
              <MenuItem value="all">
                <span>All Priorities</span>
              </MenuItem>
              <MenuItem value="low">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                  <LowPriorityIcon sx={{ fontSize: 18, color: '#0288d1' }} />
                  <span>Low</span>
                </Box>
              </MenuItem>
              <MenuItem value="medium">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                  <MediumPriorityIcon sx={{ fontSize: 18, color: '#ed6c02' }} />
                  <span>Medium</span>
                </Box>
              </MenuItem>
              <MenuItem value="high">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                  <HighPriorityIcon sx={{ fontSize: 18, color: '#d32f2f' }} />
                  <span>High</span>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskFilters;
