import { useState, useEffect, useRef, useCallback } from 'react';

export const useRealTimeData = (fetchFunction, options = {}) => {
  const {
    interval = 5000,
    immediate = true,
    dependencies = [],
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);
  const mountedRef = useRef(true);

  const fetchData = useCallback(async (showLoading = true, isBackground = false) => {
    if (!mountedRef.current) return;
    
    try {
      if (showLoading && !isBackground) setLoading(true);
      
      const result = await fetchFunction();
      
      if (mountedRef.current) {
        setData(result);
        setLastUpdated(new Date());
      }
    } catch (err) {
      } finally {
      if (mountedRef.current && showLoading && !isBackground) {
        setLoading(false);
      }
    }
  }, [fetchFunction]);

  const refresh = useCallback(() => {
    fetchData(true, false);
  }, [fetchData]);

  const startPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      fetchData(false, true);
    }, interval);
  }, [fetchData, interval]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

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

  useEffect(() => {
    if (intervalRef.current) {
      stopPolling();
      startPolling();
    }
  }, [interval, startPolling, stopPolling]);

  return {
    data,
    loading,
    lastUpdated,
    refresh,
    startPolling,
    stopPolling
  };
};
