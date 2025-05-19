import { ToastPosition, ToastType } from "@/components/ui/toast";
import { ToastItem } from "@/components/ui/toast-container";
import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

interface ToastOptions {
  title?: string;
  duration?: number;
  position?: ToastPosition;
  type?: ToastType;
}

interface ToastReturn {
  toasts: ToastItem[];
  position: ToastPosition;
  showToast: (message: string, options?: ToastOptions) => string;
  hideToast: (id: string) => void;
  clearToasts: () => void;
  setPosition: (position: ToastPosition) => void;
}

const useToast = (
  defaultPosition: ToastPosition = "top-right"
): ToastReturn => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [position, setPosition] = useState<ToastPosition>(defaultPosition);

  const showToast = useCallback(
    (message: string, options?: ToastOptions): string => {
      const id = uuidv4();
      const newToast: ToastItem = {
        id,
        message,
        title: options?.title,
        type: options?.type || "default",
        duration: options?.duration || 5000,
      };

      setToasts((prev) => [...prev, newToast]);

      if (options?.position) {
        setPosition(options.position);
      }

      return id;
    },
    []
  );

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    position,
    showToast,
    hideToast,
    clearToasts,
    setPosition,
  };
};

export default useToast;
