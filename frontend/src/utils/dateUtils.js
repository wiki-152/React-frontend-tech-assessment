/**
 * Date utility functions for formatting and displaying dates
 */

/**
 * Format a date string to a readable format
 * @param {string|null|undefined} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date string or "No due date"
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'No due date';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Get relative date description (e.g., "Due in 3 days", "Overdue")
 * @param {string|null|undefined} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} Relative date description
 */
export const getRelativeDate = (dateString) => {
  if (!dateString) return null;
  
  try {
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    if (isNaN(dueDate.getTime())) return null;
    
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else if (diffDays <= 7) {
      return `Due in ${diffDays} days`;
    } else {
      return formatDate(dateString);
    }
  } catch (error) {
    console.error('Error calculating relative date:', error);
    return formatDate(dateString);
  }
};

/**
 * Check if a date is overdue
 * @param {string|null|undefined} dateString - ISO date string (YYYY-MM-DD)
 * @returns {boolean} True if date is overdue
 */
export const isOverdue = (dateString) => {
  if (!dateString) return false;
  
  try {
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    return !isNaN(dueDate.getTime()) && dueDate < today;
  } catch (error) {
    console.error('Error checking overdue date:', error);
    return false;
  }
};
