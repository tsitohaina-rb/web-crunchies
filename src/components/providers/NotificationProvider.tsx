"use client";

import React from "react";
import ThreeSuperIPsNotify from "@/components/main/ThreeSuperIPsNotify";
import { useNotificationTimer } from "@/hooks/use-notification-timer";

export function NotificationProvider() {
  const { isVisible, hideNotification } = useNotificationTimer();

  return (
    <ThreeSuperIPsNotify isVisible={isVisible} onClose={hideNotification} />
  );
}
