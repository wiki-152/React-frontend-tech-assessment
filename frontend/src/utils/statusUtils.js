/**
 * Status utility functions for task status management
 * Provides status cycling and validation
 */

/**
 * Get the status cycle order
 * @returns {string[]} Array of statuses in cycle order
 */
export const getStatusCycle = () => {
  return ['pending', 'in-progress', 'completed'];
};

/**
 * Get the next status in the cycle
 * pending → in-progress → completed → pending
 * @param {string} currentStatus - Current status
 * @returns {string} Next status in cycle
 */
export const getNextStatus = (currentStatus) => {
  const cycle = getStatusCycle();
  const currentIndex = cycle.indexOf(currentStatus);
  
  // If current status not found, default to first status
  if (currentIndex === -1) {
    return cycle[0];
  }
  
  // Get next status, wrap around to first if at end
  const nextIndex = (currentIndex + 1) % cycle.length;
  return cycle[nextIndex];
};

/**
 * Validate if a status is valid
 * @param {string} status - Status to validate
 * @returns {boolean} True if status is valid
 */
export const isValidStatus = (status) => {
  const validStatuses = getStatusCycle();
  return validStatuses.includes(status);
};

/**
 * Get status display label
 * @param {string} status - Status value
 * @returns {string} Formatted status label
 */
export const getStatusLabel = (status) => {
  const labels = {
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  };
  return labels[status] || status;
};
