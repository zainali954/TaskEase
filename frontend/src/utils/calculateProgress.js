export const calculateProgress = (startTime, endTime) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const now = Date.now();
  
    if (isNaN(start) || isNaN(end) || start >= end) {
      return 0; // Invalid dates or end time is before start time
    }
  
    if (now >= end) {
      return 100; // If the current time has passed the end time
    }
  
    if (now <= start) {
      return 0; // If the current time is before the start time
    }
  
    // Calculate percentage
    const elapsed = now - start;
    const total = end - start;
    return Math.floor((elapsed / total) * 100); // Round down to nearest integer
  };
  