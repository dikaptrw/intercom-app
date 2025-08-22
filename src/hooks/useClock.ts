import { useEffect, useState } from 'react';

type UseClockOptions = {
  format?: 12 | 24; // default 24
  updateInterval?: number; // default 1000ms
};

export function useClock(options: UseClockOptions = {}) {
  const { format = 24, updateInterval = 1000 } = options;
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: format === 12,
      });
      setTime(formatted);
    };

    updateTime(); // set immediately
    const interval = setInterval(updateTime, updateInterval);

    return () => clearInterval(interval);
  }, [format, updateInterval]);

  return time;
}
