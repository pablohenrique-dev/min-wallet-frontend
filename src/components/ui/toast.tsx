import React from "react";
import { AlertIcon } from "../icons/alert";
import { ErrorIcon } from "../icons/error";
import { SuccessIcon } from "../icons/success";
import { cn } from "@/lib/utils";

export type StatusType = "success" | "error" | "alert";

export interface ToastValues {
  message: string;
  type: StatusType;
}

interface ToastProps extends ToastValues {
  closeToast: React.Dispatch<
    React.SetStateAction<{
      message: string;
      type: StatusType;
    } | null>
  >;
}

export function Toast({ message, type, closeToast }: ToastProps) {
  function selectToastStyle(type: StatusType) {
    const statusStyle = {
      error: "border-red-600 bg-red-50",
      success: "border-green-600 bg-green-50",
      alert: "border-yellow-600 bg-yellow-50",
    };
    return statusStyle[type];
  }

  function selectTimerStyle(type: StatusType) {
    const statusStyle = {
      error: "bg-red-600",
      success: "bg-green-600",
      alert: "bg-yellow-600",
    };
    return statusStyle[type];
  }

  function selectToastIcon(type: StatusType) {
    const icons = {
      error: <ErrorIcon />,
      success: <SuccessIcon />,
      alert: <AlertIcon />,
    };

    return icons[type];
  }

  const toastBaseStyle =
    "absolute overflow-hidden right-4 top-11 m-2 animate-fade-bottom rounded border-l-[6px] px-5 py-3 text-sm font-medium shadow-lg sm:text-base";
  const toastStatusStyle = selectToastStyle(type);
  const combinedToastClasses = cn(toastBaseStyle, toastStatusStyle);

  const toastTimerBaseStyle =
    "absolute bottom-0 left-0 h-[2px] w-full animate-timer";
  const toastTimerStatusStyle = selectTimerStyle(type);
  const combinedToastTimerClasses = cn(
    toastTimerBaseStyle,
    toastTimerStatusStyle,
  );

  React.useEffect(() => {
    const closeToastTimer = setTimeout(() => {
      closeToast(null);
    }, 5000);

    return () => {
      clearTimeout(closeToastTimer);
    };
  }, [closeToast]);

  return (
    <aside className={combinedToastClasses}>
      <div className="relative flex items-center justify-between gap-4">
        {selectToastIcon(type)}
        <p>{message}</p>
      </div>
      <span className={combinedToastTimerClasses}></span>
    </aside>
  );
}
