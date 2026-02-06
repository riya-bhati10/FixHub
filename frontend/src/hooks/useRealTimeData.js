import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'sonner';

export const useRealTimeData = (fetchFunction, options = {}) => {
  const {
    interval = 5000, // 5 seconds for ultra-fast feel
    immediate = true,
    dependencies = [],
    showToast = false,
    successMessage = 'Data updated successfully',
    errorMessage = 'Failed to update data',
    optimisticUpdate = false, // Enable optimistic updates
    cacheKey = null // For caching
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);
  const mountedRef = useRef(true);
  const cacheRef = useRef(new Map());

  // Optimistic update function
  const updateDataOptimistically = useCallback((updateFn) => {
    if (!optimisticUpdate) return;
    
    setData(prevData => {
      const newData = updateFn(prevData);
      // Cache the optimistic update
      if (cacheKey) {
        cacheRef.current.set(cacheKey, newData);
      }
      return newData;
    });
  }, [optimisticUpdate, cacheKey]);

  const fetchData = useCallback(async (showLoading = true, isBackground = false) => {
    if (!mountedRef.current) return;
    
    try {
      if (showLoading && !isBackground) setLoading(true);
      setError(null);
      
      // Add timestamp for cache busting
      const startTime = performance.now();
      const result = await fetchFunction();
      const endTime = performance.now();
      
      console.log(`API call took ${(endTime - startTime).toFixed(2)}ms`);
      
      if (mountedRef.current) {
        setData(result);
        setLastUpdated(new Date());
        
        // Cache successful response
        if (cacheKey) {
          cacheRef.current.set(cacheKey, result);
        }
        
        if (showToast && lastUpdated && !isBackground) {
          toast.success(successMessage);
        }
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err.message);
        if (showToast && !isBackground) {
          toast.error(errorMessage);
        }
      }
    } finally {
      if (mountedRef.current && showLoading && !isBackground) {
        setLoading(false);
      }
    }
  }, [fetchFunction, showToast, successMessage, errorMessage, lastUpdated, cacheKey]);

  // Manual refresh function
  const refresh = useCallback(() => {
    fetchData(true, false);
  }, [fetchData]);

  // Start polling
  const startPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      fetchData(false, true); // Background update, no loading
    }, interval);
  }, [fetchData, interval]);

  // Stop polling
  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Initial fetch and setup polling
  useEffect(() => {
    mountedRef.current = true;

    if (immediate) {
      fetchData(true, false);
    }

    startPolling();

    return () => {
      mountedRef.current = false;
      stopPolling();
    };
  }, dependencies);

  // Update interval when it changes
  useEffect(() => {
    if (intervalRef.current) {
      stopPolling();
      startPolling();
    }
  }, [interval, startPolling, stopPolling]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    startPolling,
    stopPolling,
    updateDataOptimistically
  };
};
