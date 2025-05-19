import { useState, useEffect } from "react";

const SHOW_DURATION = 5000; // 5 seconds
const INTERVAL_DURATION = 120000; // 2 minutes
// const INTERVAL_DURATION = 300000; // 5 minutes
// const INTERVAL_DURATION = 600000; // 10 minutes

export function useNotificationTimer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, SHOW_DURATION);
    };

    // Show first notification after 1 second
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 1000);

    // Set up interval for subsequent notifications
    const interval = setInterval(showNotification, INTERVAL_DURATION);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const hideNotification = () => {
    setIsVisible(false);
  };

  return { isVisible, hideNotification };
}
