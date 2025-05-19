"use client";

import React from "react";
import { createPortal } from "react-dom";
import Toast, { ToastPosition } from "./toast";

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type?: "success" | "error" | "info" | "warning" | "default";
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  position?: ToastPosition;
  onClose: (id: string) => void;
}

const positionClasses: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4 flex-col",
  "top-center": "top-4 left-1/2 -translate-x-1/2 flex-col",
  "top-right": "top-4 right-4 flex-col",
  "bottom-left": "bottom-4 left-4 flex-col-reverse",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 flex-col-reverse",
  "bottom-right": "bottom-4 right-4 flex-col-reverse",
};

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = "top-right",
  onClose,
}) => {
  return (
    <div className={`fixed z-50 flex gap-3 ${positionClasses[position]}`}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
