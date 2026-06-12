import { useCallback, useState } from "react";

/** Управление показом уведомления о лимите (в т.ч. при повторных кликах) */
export function useCartLimitNotification() {
  const [open, setOpen] = useState(false);
  const [notificationKey, setNotificationKey] = useState(0);

  const showNotification = useCallback(() => {
    setOpen((prev) => {
      if (prev) {
        setNotificationKey((key) => key + 1);
      }
      return true;
    });
  }, []);

  const hideNotification = useCallback(() => {
    setOpen(false);
  }, []);

  return { open, notificationKey, showNotification, hideNotification };
}
