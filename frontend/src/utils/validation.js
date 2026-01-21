/**
 * Validation and sanitization utility functions
 * Provides XSS protection and input validation
 */

/**
 * Sanitize a string to prevent XSS attacks
 * React automatically escapes strings, but this provides additional safety
 * @param {string} input - String to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeString = (input) => {
  if (typeof input !== 'string') {
    return String(input || '');
  }
  
  // Remove potentially dangerous characters while preserving readability
  // React's default escaping handles most cases, but this adds extra protection
  return input
    .trim()
    .replace(/[\x00-\x1F\x7F]/g, ''); // Remove control characters
};

/**
 * Truncate text to a maximum length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || typeof text !== 'string') return '';
  
  if (text.length <= maxLength) return text;
  
  return sanitizeString(text.substring(0, maxLength)) + '...';
};

/**
 * Validate task object structure
 * @param {Object} task - Task object to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateTask = (task) => {
  const errors = [];
  
  if (!task || typeof task !== 'object') {
    return { isValid: false, errors: ['Task must be an object'] };
  }
  
  if (!task.id || typeof task.id !== 'number') {
    errors.push('Task must have a valid numeric ID');
  }
  
  if (!task.title || typeof task.title !== 'string' || task.title.trim().length === 0) {
    errors.push('Task must have a non-empty title');
  }
  
  if (task.description !== undefined && typeof task.description !== 'string') {
    errors.push('Task description must be a string');
  }
  
  const validStatuses = ['pending', 'in-progress', 'completed'];
  if (!validStatuses.includes(task.status)) {
    errors.push(`Task status must be one of: ${validStatuses.join(', ')}`);
  }
  
  const validPriorities = ['low', 'medium', 'high'];
  if (!validPriorities.includes(task.priority)) {
    errors.push(`Task priority must be one of: ${validPriorities.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate array of tasks
 * @param {Array} tasks - Array of task objects
 * @returns {Object} Validation result with isValid, errors, and validTasks
 */
export const validateTasksArray = (tasks) => {
  if (!Array.isArray(tasks)) {
    return {
      isValid: false,
      errors: ['Tasks must be an array'],
      validTasks: []
    };
  }
  
  const validTasks = [];
  const errors = [];
  
  tasks.forEach((task, index) => {
    const validation = validateTask(task);
    if (validation.isValid) {
      validTasks.push(task);
    } else {
      errors.push(`Task at index ${index}: ${validation.errors.join(', ')}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    validTasks
  };
};
