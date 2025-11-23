import { useEffect, useRef, type ReactElement } from "react";
import { X, CheckCircle, AlertCircle, Info, ExternalLink } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastLink {
  text: string;
  url: string;
  external?: boolean;
}

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
  links?: ToastLink[];
  showCloseButton?: boolean;
}

export default function Toast({
  message,
  type = "info",
  duration = 4000,
  onClose,
  links = [],
  showCloseButton = true,
}: ToastProps): ReactElement {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Auto-hide after duration
    timeoutRef.current = window.setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [duration, onClose]);

  const handleMouseEnter = (): void => {
    // Pause auto-hide on hover
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseLeave = (): void => {
    // Resume auto-hide when mouse leaves
    timeoutRef.current = window.setTimeout(() => {
      onClose();
    }, duration);
  };

  const getIcon = (): ReactElement => {
    const iconClass = "w-5 h-5 flex-shrink-0";
    switch (type) {
      case "success":
        return <CheckCircle className={iconClass} />;
      case "error":
        return <AlertCircle className={iconClass} />;
      case "warning":
        return <AlertCircle className={iconClass} />;
      default:
        return <Info className={iconClass} />;
    }
  };

  const getBgColor = (): string => {
    switch (type) {
      case "success":
        return "bg-green-600";
      case "error":
        return "bg-red-600";
      case "warning":
        return "bg-yellow-600";
      default:
        return "bg-blue-600";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 ${getBgColor()} text-white rounded-lg shadow-lg min-w-[300px] max-w-[500px] animate-in slide-in-from-top-5`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start gap-3 p-4">
        {getIcon()}
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-sm font-medium leading-5">{message}</p>
          {links.length > 0 && (
            <div className="flex flex-col gap-1 mt-1">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-white/90 hover:text-white text-xs font-medium underline flex items-center gap-1"
                >
                  {link.text}
                  {link.external && <ExternalLink className="w-3 h-3" />}
                </a>
              ))}
            </div>
          )}
        </div>
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-1 transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

