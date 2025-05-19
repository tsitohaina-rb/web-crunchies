"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { ToastPosition, ToastType } from "../ui/toast";
import useToast from "@/hooks/use-toast";
import ToastContainer from "../ui/toast-container";
interface ToastContextProps {
  showToast: (
    message: string,
    options?: {
      title?: string;
      duration?: number;
      position?: ToastPosition;
      type?: ToastType;
    }
  ) => string;
  hideToast: (id: string) => void;
  clearToasts: () => void;
  setPosition: (position: ToastPosition) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
  defaultPosition?: ToastPosition;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultPosition = "top-right",
}) => {
  const toast = useToast(defaultPosition);

  return (
    <ToastContext.Provider
      value={{
        showToast: toast.showToast,
        hideToast: toast.hideToast,
        clearToasts: toast.clearToasts,
        setPosition: toast.setPosition,
      }}
    >
      {children}
      <ToastContainer
        toasts={toast.toasts}
        position={toast.position}
        onClose={toast.hideToast}
      />
    </ToastContext.Provider>
  );
};

export const useToastify = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastify must be used within a ToastProvider");
  }
  return context;
};
