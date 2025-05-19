import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
  Bell,
} from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning" | "default";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastProps {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

const toastTypeConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-100",
    borderColor: "border-green-500",
    textColor: "text-green-800",
    iconColor: "text-green-500",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-100",
    borderColor: "border-red-500",
    textColor: "text-red-800",
    iconColor: "text-red-500",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-100",
    borderColor: "border-blue-500",
    textColor: "text-blue-800",
    iconColor: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-800",
    iconColor: "text-yellow-500",
  },
  default: {
    icon: Bell,
    bgColor: "bg-gray-100",
    borderColor: "border-gray-500",
    textColor: "text-gray-800",
    iconColor: "text-gray-500",
  },
};

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  message,
  type = "default",
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const config = toastTypeConfig[type];
  const IconComponent = config.icon;

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const progressInterval = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;
      const percentage = (remaining / duration) * 100;

      if (percentage <= 0) {
        clearInterval(progressInterval);
        setIsVisible(false);
        setTimeout(() => onClose(id), 300); // Allow time for exit animation
      } else {
        setProgress(percentage);
      }
    }, 16);

    return () => clearInterval(progressInterval);
  }, [duration, id, onClose]);

  return (
    <div
      className={`relative max-w-sm w-full transform transition-all duration-300 ease-in-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
      }`}
    >
      <div
        className={`p-4 rounded-lg shadow-lg border-l-4 ${config.bgColor} ${config.borderColor} flex items-start gap-3`}
      >
        <div className={`${config.iconColor} flex-shrink-0 mt-0.5`}>
          <IconComponent size={20} />
        </div>

        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={`font-semibold ${config.textColor}`}>{title}</h3>
          )}
          <p className={`text-sm mt-1 ${config.textColor}`}>{message}</p>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-200 absolute bottom-0 left-0 rounded-b-lg overflow-hidden">
        <div
          className={`h-full ${
            type === "success"
              ? "bg-green-500"
              : type === "error"
              ? "bg-red-500"
              : type === "info"
              ? "bg-blue-500"
              : type === "warning"
              ? "bg-yellow-500"
              : "bg-gray-500"
          } transition-all duration-100 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast;
