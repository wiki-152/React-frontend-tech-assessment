import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
  Grid,
  Alert,
  Snackbar
} from '@mui/material';
import { useTaskForm } from '../../hooks/useTaskForm';
import { createTask } from '../../api/tasks';
import './TaskForm.css';

/**
 * TaskForm Component
 * Task 2 - Form component for creating new tasks
 * 
 * Requirements:
 * - Form fields: title (required), description, due date, priority (low/medium/high)
 * - Form validation (show error messages for invalid inputs)
 * - Submit to POST /api/tasks
 * - After successful creation, refresh task list
 * - Reset form after successful submission
 * - Use controlled components
 */
const TaskForm = ({ onTaskCreated }) => {
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    await createTask(formData);
  };

  // Handle successful task creation
  const handleSuccess = () => {
    setSuccessMessage('Task created successfully!');
    // Refresh task list
    if (onTaskCreated) {
      onTaskCreated();
    }
  };

  const {
    values,
    errors,
    touched,
    submitting,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid
  } = useTaskForm(handleFormSubmit);

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(handleSuccess);
  };

  // Close success message
  const handleCloseSuccess = () => {
    setSuccessMessage(null);
  };

  return (
    <Container maxWidth="lg" className="task-form-container">
      <Paper elevation={2} className="task-form-paper">
        <Box className="task-form-header" sx={{ marginBottom: 3 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            Create New Task
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill in the details to create a new task
          </Typography>
        </Box>

        <form onSubmit={onSubmit} noValidate aria-label="Create new task form">
          {/* Title Field - Required */}
          <TextField
            fullWidth
            required
            label="Title"
            name="title"
            value={values.title}
            onChange={(e) => handleChange('title', e.target.value)}
            onBlur={() => handleBlur('title')}
            error={touched.title && errors.title.length > 0}
            helperText={touched.title && errors.title.length > 0 ? errors.title[0] : ''}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            aria-required="true"
            aria-invalid={touched.title && errors.title.length > 0}
            aria-describedby={touched.title && errors.title.length > 0 ? 'title-error' : undefined}
          />
          {touched.title && errors.title.length > 0 && (
            <div id="title-error" role="alert" aria-live="polite" className="sr-only">
              {errors.title.join(', ')}
            </div>
          )}

          {/* Description Field - Optional */}
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={values.description}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            error={touched.description && errors.description.length > 0}
            helperText={
              touched.description && errors.description.length > 0
                ? errors.description[0]
                : 'Optional: Add a detailed description for this task'
            }
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            autoComplete="off"
            aria-invalid={touched.description && errors.description.length > 0}
            aria-describedby={touched.description && errors.description.length > 0 ? 'description-error' : undefined}
          />
          {touched.description && errors.description.length > 0 && (
            <div id="description-error" role="alert" aria-live="polite" className="sr-only">
              {errors.description.join(', ')}
            </div>
          )}

          {/* Due Date and Priority - Side by side on desktop */}
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            {/* Due Date Field - Optional */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Due Date"
                name="dueDate"
                type="date"
                value={values.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                onBlur={() => handleBlur('dueDate')}
                error={touched.dueDate && errors.dueDate.length > 0}
                helperText={
                  touched.dueDate && errors.dueDate.length > 0
                    ? errors.dueDate[0]
                    : 'Optional: Select a due date'
                }
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  'aria-label': 'Due date',
                  'aria-invalid': touched.dueDate && errors.dueDate.length > 0,
                  'aria-describedby': touched.dueDate && errors.dueDate.length > 0 ? 'duedate-error' : undefined
                }}
              />
              {touched.dueDate && errors.dueDate.length > 0 && (
                <div id="duedate-error" role="alert" aria-live="polite" className="sr-only">
                  {errors.dueDate.join(', ')}
                </div>
              )}
            </Grid>

            {/* Priority Field - Optional */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  id="priority"
                  name="priority"
                  value={values.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  onBlur={() => handleBlur('priority')}
                  label="Priority"
                  error={touched.priority && errors.priority.length > 0}
                  aria-invalid={touched.priority && errors.priority.length > 0}
                  aria-describedby={touched.priority && errors.priority.length > 0 ? 'priority-error' : undefined}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
                {touched.priority && errors.priority.length > 0 && (
                  <Typography variant="caption" color="error" sx={{ marginLeft: 1.5, marginTop: 0.5 }}>
                    {errors.priority[0]}
                  </Typography>
                )}
              </FormControl>
              {touched.priority && errors.priority.length > 0 && (
                <div id="priority-error" role="alert" aria-live="polite" className="sr-only">
                  {errors.priority.join(', ')}
                </div>
              )}
            </Grid>
          </Grid>

          {/* Submit Error Message */}
          {submitError && (
            <Alert severity="error" sx={{ marginTop: 2 }} role="alert" aria-live="assertive">
              {submitError}
            </Alert>
          )}

          {/* Submit Button */}
          <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={submitting || !isValid}
              sx={{ minWidth: 120 }}
              aria-label="Create task"
            >
              {submitting ? 'Creating...' : 'Create Task'}
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TaskForm;
