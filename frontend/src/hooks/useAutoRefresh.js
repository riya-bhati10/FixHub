import { useEffect, useRef } from 'react';

const useAutoRefresh = (fetchFunction, interval = 5000) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    fetchFunction();

    intervalRef.current = setInterval(() => {
      fetchFunction();
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [interval]);

  const refresh = () => {
    fetchFunction();
  };

  return { refresh };
};

export default useAutoRefresh;