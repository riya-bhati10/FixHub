# Real-Time Data Hooks

## useRealTimeData Hook

A custom React hook for implementing **ultra-fast real-time data synchronization** with automatic polling, optimistic updates, and immediate UI feedback.

### Features

- **Ultra-Fast Polling**: 5-7 second intervals for instant updates
- **Optimistic Updates**: Immediate UI updates before server response
- **Smart Caching**: Reduces API calls and improves performance
- **Live Indicators**: Shows real-time status with timestamps
- **Performance Monitoring**: Logs API response times
- **Memory Management**: Proper cleanup on component unmount
- **Error Recovery**: Automatic revert on failed optimistic updates

### Usage

```javascript
import { useRealTimeData } from '../hooks/useRealTimeData';

const MyComponent = () => {
  const fetchData = async () => {
    const response = await api.get('/data');
    return response.data;
  };

  const { 
    data, 
    loading, 
    error, 
    lastUpdated, 
    refresh,
    updateDataOptimistically 
  } = useRealTimeData(fetchData, {
    interval: 5000,        // 5 seconds for ultra-fast
    optimisticUpdate: true, // Enable instant UI updates
    cacheKey: 'my-data',  // Smart caching
    showToast: false,       // Don't spam with toasts
    successMessage: 'Data updated!',
    errorMessage: 'Failed to update data'
  });

  // Optimistic update example
  const handleAction = async (itemId, newStatus) => {
    // Update UI immediately
    updateDataOptimistically(prevData => 
      prevData.map(item => 
        item.id === itemId 
          ? { ...item, status: newStatus }
          : item
      )
    );

    // Then call API
    await api.patch(`/items/${itemId}`, { status: newStatus });
  };

  return (
    <div>
      {lastUpdated && (
        <div className="live-indicator">
          <div className="pulse-dot"></div>
          Live • Updated {formatTime(lastUpdated)}
        </div>
      )}
      <button onClick={refresh}>Manual Refresh</button>
      {/* Render data */}
    </div>
  );
};
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| interval | number | 5000 | Polling interval in milliseconds (5s = ultra-fast) |
| immediate | boolean | true | Fetch data immediately on mount |
| dependencies | array | [] | Refetch when dependencies change |
| showToast | boolean | false | Show toast notifications on updates |
| successMessage | string | 'Data updated' | Success toast message |
| errorMessage | string | 'Failed to update' | Error toast message |
| optimisticUpdate | boolean | false | Enable immediate UI updates |
| cacheKey | string | null | Cache key for performance optimization |

### Return Values

| Value | Type | Description |
|--------|------|-------------|
| data | any | Latest fetched data |
| loading | boolean | Loading state |
| error | string | Error message if any |
| lastUpdated | Date | Timestamp of last update |
| refresh | function | Manual refresh function |
| startPolling | function | Start polling manually |
| stopPolling | function | Stop polling manually |
| updateDataOptimistically | function | Immediate UI update function |

### Implementation in FixHub

- **Technician Dashboard**: 5-second intervals + optimistic updates
- **Customer Bookings**: 7-second intervals + optimistic updates  
- **Admin Panel**: 10-second intervals for overview data

### Performance Features

1. **Instant Response**: Optimistic updates show changes immediately
2. **Smart Polling**: Different intervals for different use cases
3. **Background Sync**: No loading spinners for background updates
4. **API Monitoring**: Console logs track response times
5. **Cache Optimization**: Reduces redundant API calls
6. **Error Recovery**: Auto-revert on failed operations

### Speed Comparison

| Feature | Before | After |
|---------|--------|-------|
| New Booking Detection | 15-30s | 5s (Technician) / 7s (Customer) |
| Status Change Feedback | Wait for API | Instant (Optimistic) |
| Background Updates | No loading | Seamless |
| API Response Time | Hidden | Logged & Monitored |

### Benefits

1. **Lightning Fast**: 5-second polling for near real-time feel
2. **Immediate UI**: No waiting for server responses
3. **Smart Caching**: Reduces server load
4. **Live Experience**: Pulsing indicators show activity
5. **Performance Tracking**: Monitor API speeds
6. **Error Handling**: Graceful recovery from failures
