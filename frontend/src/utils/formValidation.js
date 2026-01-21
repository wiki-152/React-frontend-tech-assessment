/**
 * Form validation utilities for Task Creation Form
 * Provides validation for form fields with detailed error messages
 */

import { sanitizeString } from './validation';

/**
 * Validate task title
 * @param {string} title - Title to validate
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export const validateTaskTitle = (title) => {
  const errors = [];
  
  if (!title || typeof title !== 'string') {
    errors.push('Title is required');
    return { isValid: false, errors };
  }
  
  const trimmed = sanitizeString(title);
  
  if (trimmed.length === 0) {
    errors.push('Title cannot be empty');
  } else if (trimmed.length > 200) {
    errors.push('Title must be 200 characters or less');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate task description
 * @param {string} description - Description to validate
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export const validateTaskDescription = (description) => {
  const errors = [];
  
  // Description is optional, but if provided, must be valid
  if (description === null || description === undefined || description === '') {
    return { isValid: true, errors: [] };
  }
  
  if (typeof description !== 'string') {
    errors.push('Description must be text');
    return { isValid: false, errors };
  }
  
  const trimmed = sanitizeString(description);
  
  if (trimmed.length > 1000) {
    errors.push('Description must be 1000 characters or less');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate due date
 * @param {string} dateString - Date string to validate (YYYY-MM-DD format)
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export const validateDueDate = (dateString) => {
  const errors = [];
  
  // Due date is optional
  if (!dateString || dateString === '') {
    return { isValid: true, errors: [] };
  }
  
  if (typeof dateString !== 'string') {
    errors.push('Date must be a valid date');
    return { isValid: false, errors };
  }
  
  // Validate ISO date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    errors.push('Date must be in YYYY-MM-DD format');
    return { isValid: false, errors };
  }
  
  // Check if date is valid
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    errors.push('Date is invalid');
    return { isValid: false, errors };
  }
  
  // Check if date is in the past (optional - you may want to allow past dates)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  
  if (date < today) {
    errors.push('Due date cannot be in the past');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate priority
 * @param {string} priority - Priority to validate
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export const validatePriority = (priority) => {
  const errors = [];
  
  // Priority is optional, defaults to 'medium'
  if (!priority || priority === '') {
    return { isValid: true, errors: [] };
  }
  
  const validPriorities = ['low', 'medium', 'high'];
  
  if (!validPriorities.includes(priority)) {
    errors.push(`Priority must be one of: ${validPriorities.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate entire task form data
 * @param {Object} formData - Form data object { title, description, dueDate, priority }
 * @returns {Object} { isValid: boolean, errors: { field: string[] } }
 */
export const validateTaskFormData = (formData) => {
  const errors = {
    title: [],
    description: [],
    dueDate: [],
    priority: []
  };
  
  // Validate each field
  const titleValidation = validateTaskTitle(formData.title);
  if (!titleValidation.isValid) {
    errors.title = titleValidation.errors;
  }
  
  const descriptionValidation = validateTaskDescription(formData.description);
  if (!descriptionValidation.isValid) {
    errors.description = descriptionValidation.errors;
  }
  
  const dateValidation = validateDueDate(formData.dueDate);
  if (!dateValidation.isValid) {
    errors.dueDate = dateValidation.errors;
  }
  
  const priorityValidation = validatePriority(formData.priority);
  if (!priorityValidation.isValid) {
    errors.priority = priorityValidation.errors;
  }
  
  // Check if form is valid (no errors in any field)
  const isValid = Object.values(errors).every(fieldErrors => fieldErrors.length === 0);
  
  return {
    isValid,
    errors
  };
};
