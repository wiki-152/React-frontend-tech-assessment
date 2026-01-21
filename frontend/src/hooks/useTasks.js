import { useState, useEffect, useCallback } from 'react';
import { fetchTasks } from '../api/tasks';
import { validateTasksArray } from '../utils/validation';

/**
 * Custom hook for fetching and managing tasks
 * Handles loading, error states, and data fetching with filtering support
 * @param {Object} filters - Filter options { status?: string, priority?: string }
 * @returns {Object} { tasks, loading, error, refetch, total }
 */
export const useTasks = (filters = { status: null, priority: null }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  /**
   * Fetch tasks from the API with optional filters
   * @param {boolean} checkMounted - Optional function to check if component is still mounted
   */
  const loadTasks = useCallback(async (checkMounted = null) => {
    setLoading(true);
    setError(null);

    try {
      // Build filter options (only include non-null filters)
      const filterOptions = {};
      if (filters.status) filterOptions.status = filters.status;
      if (filters.priority) filterOptions.priority = filters.priority;
      
      const response = await fetchTasks(filterOptions);
      
      // Check if component unmounted before updating state
      if (checkMounted && !checkMounted()) return;
      
      // Validate response structure
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid API response format');
      }

      // Validate tasks array
      const validation = validateTasksArray(response.tasks || []);
      
      if (!validation.isValid && validation.errors.length > 0) {
        console.warn('Some tasks failed validation:', validation.errors);
        // Use valid tasks even if some failed validation
      }

      // Check again before setting state
      if (checkMounted && !checkMounted()) return;
      
      setTasks(validation.validTasks || []);
      setTotal(response.total || validation.validTasks?.length || 0);
      setError(null);
    } catch (err) {
      // Check if component unmounted before updating state
      if (checkMounted && !checkMounted()) return;
      
      // Handle axios errors
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to fetch tasks. Please try again.';
      setError(errorMessage);
      setTasks([]);
    } finally {
      // Check if component unmounted before updating state
      if (!checkMounted || checkMounted()) {
        setLoading(false);
      }
    }
  }, [filters]);

  /**
   * Refetch tasks (useful after creating/updating tasks)
   */
  const refetch = useCallback(() => {
    loadTasks();
  }, [loadTasks]);

  // Fetch tasks on mount and when filters change
  useEffect(() => {
    let isMounted = true;

    // Call async function inside useEffect
    loadTasks(() => isMounted);

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [loadTasks]);

  return {
    tasks,
    loading,
    error,
    refetch,
    total
  };
};
