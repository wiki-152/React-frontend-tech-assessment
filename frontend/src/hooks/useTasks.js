import { useState, useEffect, useCallback } from 'react';
import { fetchTasks } from '../api/tasks';
import { validateTasksArray } from '../utils/validation';

/**
 * Custom hook for fetching and managing tasks
 * Handles loading, error states, and data fetching
 * @returns {Object} { tasks, loading, error, refetch }
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch tasks from the API
   * @param {boolean} checkMounted - Optional function to check if component is still mounted
   */
  const loadTasks = useCallback(async (checkMounted = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchTasks();
      
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
  }, []);

  /**
   * Refetch tasks (useful after creating/updating tasks)
   */
  const refetch = useCallback(() => {
    loadTasks();
  }, [loadTasks]);

  // Fetch tasks on mount
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
    refetch
  };
};
