import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ThreeSuperIPsNotifyProps {
  isVisible: boolean;
  onClose: () => void;
}

const ThreeSuperIPsNotify = ({
  isVisible,
  onClose,
}: ThreeSuperIPsNotifyProps) => {
  return (
    <div
      className={cn(
        "fixed left-0 bottom-8 z-50 transition-transform duration-500 ease-in-out transform",
        isVisible ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="bg-white border-r-1 border-y-1 rounded-r-xl  p-4 min-w-[350px] max-w-[500px]">
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </button>

        <h3 className="text-lg text-center font-semibold mt-6">
          Powered by Three Super IPs!
        </h3>

        <div className="relative h-38 w-full">
          <Image
            src="/images/three-super-ips-1.png"
            alt="Three Super IPs"
            fill
            className="rounded-lg object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ThreeSuperIPsNotify;
