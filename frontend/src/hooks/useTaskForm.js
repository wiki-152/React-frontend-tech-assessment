import { useState, useCallback } from 'react';
import { validateTaskFormData, validateTaskTitle, validateTaskDescription, validateDueDate, validatePriority } from '../utils/formValidation';
import { sanitizeString } from '../utils/validation';

/**
 * Custom hook for managing task form state, validation, and submission
 * @param {Function} onSubmit - Callback function called on successful form submission
 * @returns {Object} Form state and handlers
 */
export const useTaskForm = (onSubmit) => {
  // Initial form values
  const initialValues = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  };

  // Form state
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({
    title: [],
    description: [],
    dueDate: [],
    priority: []
  });
  const [touched, setTouched] = useState({
    title: false,
    description: false,
    dueDate: false,
    priority: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  /**
   * Validate a single field
   * @param {string} field - Field name
   * @param {*} value - Field value
   * @returns {string[]} Array of error messages
   */
  const validateField = useCallback((field, value) => {
    switch (field) {
      case 'title':
        return validateTaskTitle(value).errors;
      case 'description':
        return validateTaskDescription(value).errors;
      case 'dueDate':
        return validateDueDate(value).errors;
      case 'priority':
        return validatePriority(value).errors;
      default:
        return [];
    }
  }, []);

  /**
   * Handle field value change with real-time validation
   * @param {string} field - Field name
   * @param {*} value - New field value
   */
  const handleChange = useCallback((field, value) => {
    // Sanitize string inputs
    let sanitizedValue = value;
    if (field === 'title' || field === 'description') {
      sanitizedValue = typeof value === 'string' ? value : '';
    }
    
    // Update field value
    setValues(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));

    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError(null);
    }

    // Real-time validation if field has been touched
    if (touched[field]) {
      const fieldErrors = validateField(field, sanitizedValue);
      setErrors(prev => ({
        ...prev,
        [field]: fieldErrors
      }));
    }
  }, [touched, validateField, submitError]);

  /**
   * Handle field blur event
   * @param {string} field - Field name
   */
  const handleBlur = useCallback((field) => {
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    // Validate field
    const fieldErrors = validateField(field, values[field]);
    setErrors(prev => ({
      ...prev,
      [field]: fieldErrors
    }));
  }, [values, validateField]);

  /**
   * Validate entire form
   * @returns {boolean} True if form is valid
   */
  const validateForm = useCallback(() => {
    const validation = validateTaskFormData(values);
    setErrors(validation.errors);
    
    // Mark all fields as touched
    setTouched({
      title: true,
      description: true,
      dueDate: true,
      priority: true
    });
    
    return validation.isValid;
  }, [values]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({
      title: [],
      description: [],
      dueDate: [],
      priority: []
    });
    setTouched({
      title: false,
      description: false,
      dueDate: false,
      priority: false
    });
    setSubmitError(null);
  }, []);

  /**
   * Handle form submission
   * @param {Function} onSuccess - Callback on successful submission
   */
  const handleSubmit = useCallback(async (onSuccess) => {
    // Clear previous submit error
    setSubmitError(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      // Prepare form data for API
      const formData = {
        title: sanitizeString(values.title),
        description: values.description ? sanitizeString(values.description) : undefined,
        dueDate: values.dueDate || undefined,
        priority: values.priority || 'medium'
      };

      // Call onSubmit callback (which will handle API call)
      await onSubmit(formData);

      // Reset form on success
      resetForm();

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // Handle submission error
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to create task. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }, [values, validateForm, onSubmit, resetForm]);

  // Check if form is valid
  const isValid = Object.values(errors).every(fieldErrors => fieldErrors.length === 0) &&
                  values.title.trim().length > 0;

  return {
    values,
    errors,
    touched,
    submitting,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isValid
  };
};
